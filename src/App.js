import React, { useState } from 'react';

function SpectrumBar({ leftLabel, rightLabel, leftValue, rightValue, leftReasoning, rightReasoning, leftImprovements, rightImprovements, showDetails, onToggleDetails }) {
  const total = leftValue + rightValue;
  const leftPercentage = total > 0 ? (leftValue / total) * 100 : 50;
  const rightPercentage = total > 0 ? (rightValue / total) * 100 : 50;

  return (
    <div style={{ 
      marginBottom: '32px', 
      padding: '24px', 
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', 
      border: '1px solid #374151', 
      borderRadius: '16px', 
      boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#60a5fa',
          textShadow: '0 0 10px rgba(96, 165, 250, 0.3)'
        }}>{leftLabel}</span>
        <span style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#f87171',
          textShadow: '0 0 10px rgba(248, 113, 113, 0.3)'
        }}>{rightLabel}</span>
      </div>
      
      <div style={{ 
        position: 'relative', 
        height: '56px', 
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 
        borderRadius: '12px', 
        overflow: 'hidden',
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
        border: '1px solid #334155'
      }}>
        {/* Left side bar */}
        <div 
          style={{ 
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
            width: `${leftPercentage}%`,
            transition: 'width 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), 0 0 20px rgba(59, 130, 246, 0.4)',
            borderRadius: leftPercentage === 100 ? '12px' : '12px 0 0 12px'
          }}
        />
        {/* Right side bar */}
        <div 
          style={{ 
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
            width: `${rightPercentage}%`,
            transition: 'width 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), 0 0 20px rgba(239, 68, 68, 0.4)',
            borderRadius: rightPercentage === 100 ? '12px' : '0 12px 12px 0'
          }}
        />
        
        {/* Center divider line */}
        <div style={{ 
          position: 'absolute',
          left: '50%',
          top: '8px',
          bottom: '8px',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, #64748b, transparent)',
          transform: 'translateX(-50%)',
          zIndex: 10,
          borderRadius: '1px'
        }} />
        
        {/* Percentage labels on the bars */}
        {leftPercentage > 25 && (
          <div style={{ 
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            fontWeight: '900',
            fontSize: '16px',
            zIndex: 20,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            {leftValue}%
          </div>
        )}
        {rightPercentage > 25 && (
          <div style={{ 
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            fontWeight: '900',
            fontSize: '16px',
            zIndex: 20,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            {rightValue}%
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ 
            fontSize: '14px',
            color: '#60a5fa',
            fontWeight: '800',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(29, 78, 216, 0.3))',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            {leftValue}%
          </span>
          <button 
            style={{
              marginTop: '8px',
              fontSize: '12px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              background: '#1e40af',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '700',
              boxShadow: '0 2px 6px rgba(59,130,246,0.15)'
            }}
            onClick={onToggleDetails}
          >
            {showDetails ? 'Hide' : 'Show'} reasoning
          </button>
          {showDetails && (
            <div style={{ marginTop: '8px', background: 'rgba(30,58,138,0.08)', padding: '8px', borderRadius: '6px', color: '#dbeafe', fontSize: '13px', maxWidth: '250px' }}>
              <div><strong>Reasoning:</strong> {leftReasoning}</div>
              <div style={{ marginTop: '4px' }}><strong>Improvements:</strong> {leftImprovements}</div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ 
            fontSize: '14px',
            color: '#f87171',
            fontWeight: '800',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.3))',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            {rightValue}%
          </span>
          <button 
            style={{
              marginTop: '8px',
              fontSize: '12px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              background: '#b91c1c',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '700',
              boxShadow: '0 2px 6px rgba(239,68,68,0.15)'
            }}
            onClick={onToggleDetails}
          >
            {showDetails ? 'Hide' : 'Show'} reasoning
          </button>
          {showDetails && (
            <div style={{ marginTop: '8px', background: 'rgba(185,28,28,0.08)', padding: '8px', borderRadius: '6px', color: '#fee2e2', fontSize: '13px', maxWidth: '250px', textAlign: 'right' }}>
              <div><strong>Reasoning:</strong> {rightReasoning}</div>
              <div style={{ marginTop: '4px' }}><strong>Improvements:</strong> {rightImprovements}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [spectrumData, setSpectrumData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkboxesLocked, setCheckboxesLocked] = useState(false);
  const [detailsToggles, setDetailsToggles] = useState({});
  const [uploadedScreenshot, setUploadedScreenshot] = useState(null);
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'upload'
  const [uploadedImageBase64, setUploadedImageBase64] = useState(null);

  const parseAnalysis = (analysisText) => {
    console.log('Raw analysis text:', analysisText);
    
    try {
      // First try to parse the entire text as JSON
      const jsonData = JSON.parse(analysisText);
      console.log('Parsed JSON data:', jsonData);
      return jsonData;
    } catch (error) {
      console.log('Direct JSON parse failed, trying to extract JSON...');
      
      try {
        // Look for JSON in the analysis text
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonData = JSON.parse(jsonMatch[0]);
          console.log('Extracted JSON data:', jsonData);
          return jsonData;
        }
      } catch (error2) {
        console.error('Error parsing extracted JSON:', error2);
      }
    }
    
    // If JSON parsing fails, try to create data from the text format
    console.log('JSON parsing failed, attempting manual parsing...');
    return parseTextFormat(analysisText);
  };

  const parseTextFormat = (text) => {
    try {
      const lines = text.split('\n').filter(line => line.trim());
      const result = {};
      
      for (let i = 0; i < lines.length; i += 4) {
        if (i + 3 < lines.length) {
          const categoryLine = lines[i];
          const leftPercentLine = lines[i + 1];
          const rightPercentLine = lines[i + 2];
          const percentagesLine = lines[i + 3];
          
          // Extract category names
          const categories = spectrumCategories.find(cat => 
            categoryLine.includes(cat.left) && categoryLine.includes(cat.right)
          );
          
          if (categories) {
            // Extract percentages from the combined line like "80%20%"
            const percentMatch = percentagesLine.match(/(\d+)%(\d+)%/);
            if (percentMatch) {
              const leftPercent = parseInt(percentMatch[1]);
              const rightPercent = parseInt(percentMatch[2]);
              
              result[categories.key] = {
                [categories.left]: leftPercent,
                [categories.right]: rightPercent
              };
            }
          }
        }
      }
      
      console.log('Manual parsing result:', result);
      return Object.keys(result).length > 0 ? result : null;
    } catch (error) {
      console.error('Manual parsing failed:', error);
      return null;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(',')[1]; // Remove data:image/...;base64, prefix
        setUploadedImageBase64(base64);
        setUploadedScreenshot(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setImage(null);
    setAnalysis('');
    setSpectrumData(null);
    setCheckboxesLocked(true);
    try {
      const selectedSpectrums = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
      const requestBody = inputMode === 'url' 
        ? { url, spectrums: selectedSpectrums }
        : { screenshot_base64: uploadedImageBase64, spectrums: selectedSpectrums };
      
      // Use environment variable for API URL, fallback to localhost
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      const res = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (data.error) {
        setAnalysis(`Error: ${data.error}`);
      } else {
        // If we uploaded a screenshot, use that instead of the returned one
        setImage(inputMode === 'url' ? `data:image/png;base64,${data.screenshot_base64}` : uploadedScreenshot);
        setAnalysis(data.analysis);
        // Parse the analysis for spectrum data
        const parsedData = parseAnalysis(data.analysis);
        setSpectrumData(parsedData);
      }
    } catch (err) {
      setAnalysis(`Request failed: ${err.message}`);
    }
    setLoading(false);
  };

  const generateShareableDocument = () => {
    if (!spectrumData) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 2000; // Increased height to accommodate screenshot
    
    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Perceptr - Website Analysis Report', canvas.width / 2, 80);
    
    // Subtitle
    ctx.fillStyle = '#9ca3af';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText(`Analyzed: ${inputMode === 'url' ? url : 'Uploaded Screenshot'}`, canvas.width / 2, 120);
    ctx.fillText(`Generated: ${new Date().toLocaleDateString()}`, canvas.width / 2, 150);
    
    // Add screenshot if available
    let yPosition = 220;
    if (image) {
      // Screenshot section title
      ctx.fillStyle = '#f9fafb';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Website Screenshot:', 50, yPosition);
      yPosition += 40;
      
      // Create a new image element to load the screenshot
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Calculate dimensions to fit within canvas width while maintaining aspect ratio
        const maxWidth = canvas.width - 100; // 50px padding on each side
        const maxHeight = 400;
        let drawWidth = img.width;
        let drawHeight = img.height;
        
        // Scale down if too large
        if (drawWidth > maxWidth) {
          const ratio = maxWidth / drawWidth;
          drawWidth = maxWidth;
          drawHeight = img.height * ratio;
        }
        
        if (drawHeight > maxHeight) {
          const ratio = maxHeight / drawHeight;
          drawHeight = maxHeight;
          drawWidth = drawWidth * ratio;
        }
        
        // Center the image horizontally
        const x = (canvas.width - drawWidth) / 2;
        
        // Draw screenshot with border
        ctx.fillStyle = '#374151';
        ctx.fillRect(x - 4, yPosition - 4, drawWidth + 8, drawHeight + 8);
        ctx.drawImage(img, x, yPosition, drawWidth, drawHeight);
        
        yPosition += drawHeight + 40;
        
        // Continue with analysis results
        addAnalysisResults(yPosition);
      };
      
      img.onerror = () => {
        // If image fails to load, continue without it
        ctx.fillStyle = '#9ca3af';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText('Screenshot unavailable', 50, yPosition);
        yPosition += 40;
        addAnalysisResults(yPosition);
      };
      
      img.src = image;
    } else {
      // No screenshot available, continue with analysis
      addAnalysisResults(yPosition);
    }
    
    function addAnalysisResults(startYPosition) {
      let yPosition = startYPosition;
      
      // Analysis results title
      ctx.fillStyle = '#f9fafb';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Analysis Results:', 50, yPosition);
      yPosition += 40;
      
      spectrumCategories.filter(category => selectedCategories[category.key]).forEach(category => {
        const categoryData = spectrumData[category.key];
        if (!categoryData) return;
        
        const leftObj = categoryData[category.left] || {};
        const rightObj = categoryData[category.right] || {};
        const leftValue = typeof leftObj.percentage === 'number' ? leftObj.percentage : 0;
        const rightValue = typeof rightObj.percentage === 'number' ? rightObj.percentage : 0;
        
        // Category title
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 18px Arial, sans-serif';
        ctx.fillText(`${category.left} vs ${category.right}`, 50, yPosition);
        yPosition += 30;
        
        // Percentages
        ctx.fillStyle = '#3b82f6';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText(`${category.left}: ${leftValue}%`, 70, yPosition);
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`${category.right}: ${rightValue}%`, 300, yPosition);
        yPosition += 25;
        
        // Reasoning if available
        if (leftObj.reasoning || rightObj.reasoning) {
          ctx.fillStyle = '#9ca3af';
          ctx.font = '14px Arial, sans-serif';
          if (leftObj.reasoning) {
            const words = leftObj.reasoning.split(' ');
            let line = '';
            for (let word of words) {
              const testLine = line + word + ' ';
              if (ctx.measureText(testLine).width > 1000) {
                ctx.fillText(line, 70, yPosition);
                yPosition += 20;
                line = word + ' ';
              } else {
                line = testLine;
              }
            }
            if (line) {
              ctx.fillText(line, 70, yPosition);
              yPosition += 20;
            }
          }
          if (rightObj.reasoning) {
            const words = rightObj.reasoning.split(' ');
            let line = '';
            for (let word of words) {
              const testLine = line + word + ' ';
              if (ctx.measureText(testLine).width > 1000) {
                ctx.fillText(line, 70, yPosition);
                yPosition += 20;
                line = word + ' ';
              } else {
                line = testLine;
              }
            }
            if (line) {
              ctx.fillText(line, 70, yPosition);
              yPosition += 20;
            }
          }
        }
        
        yPosition += 20;
        
        // Check if we need a new page
        if (yPosition > 1800) {
          // Add page break indicator
          ctx.fillStyle = '#374151';
          ctx.fillRect(0, yPosition, canvas.width, 2);
          yPosition += 40;
        }
      });
      
      // Watermark
      ctx.fillStyle = 'rgba(156, 163, 175, 0.3)';
      ctx.font = 'italic 16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Made with Perceptr web analysis tool', canvas.width / 2, canvas.height - 30);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `perceptr-analysis-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  };

  const spectrumCategories = [
    { key: 'Lively vs Professional', left: 'Lively', right: 'Professional' },
    { key: 'Minimalist vs Feature dense', left: 'Minimalist', right: 'Feature dense' },
    { key: 'Casual vs Formal', left: 'Casual', right: 'Formal' },
    { key: 'Aspirational vs Practical', left: 'Aspirational', right: 'Practical' },
    { key: 'Niche focused vs General purpose', left: 'Niche focused', right: 'General purpose' },
    { key: 'Self serve vs High touch', left: 'Self serve', right: 'High touch' },
    { key: 'Disruptive vs Conventional', left: 'Disruptive', right: 'Conventional' },
    { key: 'Speed oriented vs Quality oriented', left: 'Speed oriented', right: 'Quality oriented' },
    { key: 'Affordable sounding vs Premium sounding', left: 'Affordable sounding', right: 'Premium sounding' },
    { key: 'Product first vs Brand first', left: 'Product first', right: 'Brand first' }
  ];

  // Default checked categories
  const defaultChecked = {
    'Lively vs Professional': true,
    'Speed oriented vs Quality oriented': true,
    'Minimalist vs Feature dense': true,
    'Affordable sounding vs Premium sounding': true
  };
  spectrumCategories.forEach(cat => {
    if (!(cat.key in defaultChecked)) defaultChecked[cat.key] = false;
  });
  const [selectedCategories, setSelectedCategories] = useState(defaultChecked);

  // When URL changes, re-enable checkboxes
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setCheckboxesLocked(false);
    setAnalysis('');
    setSpectrumData(null);
    setImage(null);
    setDetailsToggles({});
    setUploadedScreenshot(null);
    setUploadedImageBase64(null);
  };

  const handleInputModeChange = (mode) => {
    setInputMode(mode);
    setCheckboxesLocked(false);
    setAnalysis('');
    setSpectrumData(null);
    setImage(null);
    setDetailsToggles({});
    setUploadedScreenshot(null);
    setUploadedImageBase64(null);
    if (mode === 'url') {
      setUrl('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e293b 75%, #0f172a 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      padding: '32px 16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite'
      }} />

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)', 
          borderRadius: '24px', 
          padding: '48px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(75, 85, 99, 0.3)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '900', 
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f87171 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
              maxWidth: '650px',
              margin: '0 auto',
              marginBottom: '32px',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
              Perceptr - Website perception analyzer
            </h1>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: '18px', 
              fontWeight: '400',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
               Discover if your website design aligns with target audiences and desired brand image, to develop consistent branding.
            </p>
          </div>
          
          {/* Input mode toggle */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '32px',
            gap: '8px'
          }}>
            <button
              onClick={() => handleInputModeChange('url')}
              style={{
                padding: '12px 24px',
                background: inputMode === 'url' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'rgba(75, 85, 99, 0.5)',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: inputMode === 'url' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              Website URL
            </button>
            <button
              onClick={() => handleInputModeChange('upload')}
              style={{
                padding: '12px 24px',
                background: inputMode === 'upload' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'rgba(75, 85, 99, 0.5)',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: inputMode === 'upload' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              Upload Screenshot
            </button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 640 ? 'column' : 'row', 
            gap: '16px', 
            marginBottom: '48px',
            alignItems: 'center'
          }}>
            {inputMode === 'url' ? (
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter website URL (e.g., https://example.com)"
              style={{
                flex: 1,
                padding: '16px 24px',
                background: 'rgba(17, 24, 39, 0.8)',
                border: '2px solid rgba(75, 85, 99, 0.5)',
                borderRadius: '16px',
                color: '#f9fafb',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#60a5fa';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3), 0 0 0 3px rgba(96, 165, 250, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
              }}
              disabled={loading}
            />
            ) : (
              <div style={{
                flex: 1,
                padding: '16px 24px',
                background: 'rgba(17, 24, 39, 0.8)',
                border: '2px solid rgba(75, 85, 99, 0.5)',
                borderRadius: '16px',
                color: '#f9fafb',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="screenshot-upload"
                  disabled={loading}
                />
                <label 
                  htmlFor="screenshot-upload"
                  style={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📷</span>
                  {uploadedScreenshot ? 'Screenshot uploaded ✓' : 'Click to upload screenshot'}
                </label>
              </div>
            )}
            <button 
              onClick={handleAnalyze} 
              disabled={loading || (inputMode === 'url' ? !url.trim() : !uploadedImageBase64)}
              style={{
                padding: '16px 32px',
                background: loading ? 'rgba(75, 85, 99, 0.5)' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                fontWeight: '700',
                fontSize: '16px',
                borderRadius: '16px',
                border: 'none',
                cursor: loading || (inputMode === 'url' ? !url.trim() : !uploadedImageBase64) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.2)',
                minWidth: '140px'
              }}
              onMouseEnter={(e) => {
                if (!loading && (inputMode === 'url' ? url.trim() : uploadedImageBase64)) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && (inputMode === 'url' ? url.trim() : uploadedImageBase64)) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.2)';
                }
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Analyzing...
                </div>
              ) : 'Analyze'}
            </button>
          </div>

          {/* Preview uploaded screenshot */}
          {uploadedScreenshot && inputMode === 'upload' && (
            <div style={{ 
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#f9fafb', 
                marginBottom: '16px'
              }}>
                Uploaded Screenshot Preview
              </h3>
              <div style={{ 
                border: '2px solid rgba(75, 85, 99, 0.3)', 
                borderRadius: '16px', 
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                background: 'rgba(17, 24, 39, 0.5)',
                padding: '8px',
                width: 'fit-content',
                margin: '0 auto'
              }}>
                <img 
                  src={uploadedScreenshot} 
                  alt="Uploaded Screenshot"
                  style={{ 
                    maxWidth: '400px', 
                    maxHeight: '300px',
                    width: 'auto',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Category checkboxes (hide if locked) */}
          {!checkboxesLocked && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '40px',
              justifyContent: 'center',
              background: 'rgba(17,24,39,0.7)',
              borderRadius: '16px',
              padding: '16px 12px',
              border: '1px solid rgba(75,85,99,0.2)'
            }}>
              {spectrumCategories.map(cat => (
                <label key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', color: '#f3f4f6', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories[cat.key]}
                    onChange={() => setSelectedCategories(sel => ({ ...sel, [cat.key]: !sel[cat.key] }))}
                    style={{ accentColor: '#3b82f6', width: '18px', height: '18px', borderRadius: '4px', border: '1px solid #374151' }}
                  />
                  {cat.key}
                </label>
              ))}
            </div>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 24px',
                border: '4px solid rgba(96, 165, 250, 0.2)',
                borderTop: '4px solid #60a5fa',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ color: '#9ca3af', fontSize: '18px', fontWeight: '500' }}>
                Analyzing {inputMode === 'url' ? 'website' : 'screenshot'}...
              </p>
            </div>
          )}

          {spectrumData && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '32px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  color: '#f9fafb',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  margin: 0
                }}>
                  {inputMode === 'url' ? 'Website' : 'Screenshot'} Theme Analysis
                </h2>
                <button
                  onClick={generateShareableDocument}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  <span style={{ fontSize: '16px' }}>📄</span>
                  Share Results
                </button>
              </div>
              <div style={{ 
                background: 'rgba(17, 24, 39, 0.5)', 
                padding: '32px', 
                borderRadius: '20px',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {spectrumCategories.filter(category => selectedCategories[category.key]).map(category => {
                  const categoryData = spectrumData[category.key];
                  if (!categoryData) return null;
                  const leftObj = categoryData[category.left] || {};
                  const rightObj = categoryData[category.right] || {};
                  const leftValue = typeof leftObj.percentage === 'number' ? leftObj.percentage : 0;
                  const rightValue = typeof rightObj.percentage === 'number' ? rightObj.percentage : 0;
                  const showDetails = !!detailsToggles[category.key];
                  const onToggleDetails = () => setDetailsToggles(toggles => ({ ...toggles, [category.key]: !toggles[category.key] }));
                  return (
                    <SpectrumBar
                      key={category.key}
                      leftLabel={category.left}
                      rightLabel={category.right}
                      leftValue={leftValue}
                      rightValue={rightValue}
                      leftReasoning={leftObj.reasoning || ''}
                      rightReasoning={rightObj.reasoning || ''}
                      leftImprovements={leftObj.improvements || ''}
                      rightImprovements={rightObj.improvements || ''}
                      showDetails={showDetails}
                      onToggleDetails={onToggleDetails}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {image && (
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: '800', 
                color: '#f9fafb', 
                marginBottom: '24px',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                {inputMode === 'url' ? 'Website' : 'Uploaded'} Screenshot
              </h2>
              <div style={{ 
                border: '2px solid rgba(75, 85, 99, 0.3)', 
                borderRadius: '20px', 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                background: 'rgba(17, 24, 39, 0.5)',
                padding: '8px',
                width: 'fit-content',
                height: 'fit-content'
              }}>
                <img 
                  src={image} 
                  alt="Website Screenshot"
                  style={{ 
                    width: '35%', 
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
            </div>
          )}

          {analysis && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '800', 
                color: '#f9fafb', 
                marginBottom: '16px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                Debug Info
              </h2>
              <div style={{ 
                background: 'rgba(17, 24, 39, 0.8)', 
                padding: '24px', 
                borderRadius: '16px',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#9ca3af', 
                  marginBottom: '16px',
                  fontWeight: '600'
                }}>
                  Spectrum data found: {spectrumData ? 
                    <span style={{ color: '#10b981' }}>✓ Yes</span> : 
                    <span style={{ color: '#ef4444' }}>✗ No</span>
                  }
                </p>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  fontSize: '12px', 
                  color: '#d1d5db', 
                  fontFamily: 'monospace',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(75, 85, 99, 0.2)'
                }}>
                  {analysis}
                </pre>
              </div>
            </div>
          )}

          {analysis && analysis.includes('Error:') && (
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              borderRadius: '16px', 
              padding: '24px',
              boxShadow: '0 8px 25px rgba(239, 68, 68, 0.1)'
            }}>
              <p style={{ color: '#f87171', fontSize: '16px', fontWeight: '600' }}>
                {analysis}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;