import io
import base64
import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from playwright.sync_api import sync_playwright
import google.generativeai as genai
from PIL import Image
from typing import Optional

# Configure Gemini with your API key from environment variable
api_key = os.getenv("GOOGLE_API_KEY", "AIzaSyDVcqUtivXxg0Wpr6NGUwNf0H0_2505-A4")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash-lite")

app = FastAPI()

# Enable CORS to allow your frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://website-analyzer-orcin.vercel.app",  # Your actual Vercel domain
        "https://*.vercel.app"  # Allow all Vercel subdomains
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "healthy", "message": "Website Analyzer API is running"}

class AnalyzeRequest(BaseModel):
    url: Optional[str] = None
    screenshot_base64: Optional[str] = None
    spectrums: list[str]

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    # Validate that either URL or screenshot is provided
    if not request.url and not request.screenshot_base64:
        return {"error": "Either 'url' or 'screenshot_base64' must be provided"}
    
    if request.url and request.screenshot_base64:
        return {"error": "Provide either 'url' or 'screenshot_base64', not both"}
    
    spectrums = request.spectrums
    
    # Handle URL-based screenshot capture
    if request.url:
        url = request.url
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                page = browser.new_page()
                page.goto(url, timeout=30000, wait_until="load")
                page.wait_for_timeout(3000)  # Extra wait for dynamic content
                screenshot_bytes = page.screenshot(full_page=True)
                browser.close()
        except Exception as e:
            return {"error": f"Failed to capture screenshot: {str(e)}"}
    
    # Handle uploaded screenshot
    else:
        try:
            # Remove data URL prefix if present
            screenshot_data = request.screenshot_base64
            if screenshot_data.startswith('data:image'):
                screenshot_data = screenshot_data.split(',')[1]
            
            # Decode base64 to bytes
            screenshot_bytes = base64.b64decode(screenshot_data)
            
            # Validate image format
            try:
                image = Image.open(io.BytesIO(screenshot_bytes))
                # Convert to RGB if necessary
                if image.mode != 'RGB':
                    image = image.convert('RGB')
                    # Convert back to bytes
                    img_byte_arr = io.BytesIO()
                    image.save(img_byte_arr, format='PNG')
                    screenshot_bytes = img_byte_arr.getvalue()
            except Exception as e:
                return {"error": f"Invalid image format: {str(e)}"}
            
            # Check file size (10MB limit)
            if len(screenshot_bytes) > 10 * 1024 * 1024:
                return {"error": "Image file too large. Maximum size is 10MB."}
                
        except Exception as e:
            return {"error": f"Failed to process uploaded screenshot: {str(e)}"}

    # Build the spectrums string for the prompt
    spectrums_str = "\n".join([f"- {s}" for s in spectrums])

    prompt = f"""
You are analyzing a website's first impression for customers, based on its screenshot.If the uploaded image is not a website, put all values at 50%, and state that in the reasoning it doesn't look like a website. Do not analyse it unless it is a website.
For each of the following spectrums, do the following:
- Assign a percentage value to each side (totaling 100 between the pair).
- For each side, provide:
    - A short, 3-sentence reasoning for the score.
    - Suggested improvements to optimize for that side. This is not a list of improvements for the website UI/UX (although this could impact things like how premium is feels, etc), but rather a list of improvements to ensure that side of the spectrum could reach 100%

Output your answer as valid JSON in the following format:
{{
  "Spectrum Name": {{
    "Side1": {{
      "percentage": int,
      "reasoning": "string (3 sentences)",
      "improvements": "string (suggested improvements)"
    }},
    "Side2": {{
      "percentage": int,
      "reasoning": "string (3 sentences)",
      "improvements": "string (suggested improvements)"
    }}
  }},
  ...
}}

Spectrums:
{spectrums_str}

Base your analysis on aspects like font, coloring, headings, text, layout, calls to action, prices, images, photos, logos, graphics, etc. 
Do not base your analysis on things which cannot be analysed through a screenshot, such as animations. 
Purely base on what assumptions a user would make on the website, and ensure each analysis fits the category. This is not an analysis of how good the website is. 
If you are unsure about something, do not make assumptions, and put in the reasoning sections that you could not determine it with the information provided.
If the uploaded image is not a website, put all values at 50%, and state that in the reasoning it doesn't look like a website. Do not analyse it unless it is a website. Only output the JSON object, nothing else.
"""

    image = Image.open(io.BytesIO(screenshot_bytes)).convert("RGB")

    try:
        response = model.generate_content([prompt, image])
        analysis_text = response.text  # Keep as raw text string

        # Return screenshot only for URL-based requests
        screenshot_response = base64.b64encode(screenshot_bytes).decode() if request.url else None

        return {
            "screenshot_base64": screenshot_response,
            "analysis": analysis_text,   # Always a string here
            "url_received": request.url,
        }

    except Exception as e:
        return {"error": f"Gemini failed: {str(e)}"}
