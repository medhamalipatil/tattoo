import React, { useState, useEffect, useRef } from 'react';
import {
  Upload, Sparkles, FileImage, Image as ImageIcon, CheckCircle,
  TrendingUp, RefreshCw, DollarSign, Calendar, Star, Compass, Info
} from 'lucide-react';
import { PRESETS, analyzeUploadedImage, performVisionSearch, calculateEstimatedCost } from '../utils/visionEngine';

export default function ImageSearch({ globalCatalog, artistsList, setActiveTab }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [visionData, setVisionData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [costSize, setCostSize] = useState('Medium');

  const fileInputRef = useRef(null);

  const scanStepsText = [
    'Scanning visual gradients & contrasts...',
    'Deconstructing line thickness & geometry...',
    'Matching pattern signatures in visual database...',
    'Extracting dominant colour palettes...',
    'Mapping symbolic meanings & catalog references...',
    'Analysis complete!'
  ];

  // Laser scanner styling animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scanLine {
        0% { top: 0%; }
        50% { top: 100%; }
        100% { top: 0%; }
      }
      @keyframes pulseBorder {
        0%, 100% { border-color: rgba(0, 242, 254, 0.4); }
        50% { border-color: rgba(0, 242, 254, 1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const triggerScan = (data, imageSrc) => {
    setIsScanning(true);
    setScanStep(0);
    setVisionData(null);
    setSearchResults(null);
    setPreviewUrl(imageSrc);

    // Simulated scan sequence
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= scanStepsText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setVisionData(data);
          const results = performVisionSearch(data, globalCatalog, artistsList);
          setSearchResults(results);
          setIsScanning(false);
        }, 500);
      } else {
        setScanStep(step);
      }
    }, 600);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const data = analyzeUploadedImage(file);
      triggerScan(data, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePresetSelect = (preset) => {
    setSelectedFile(null);
    triggerScan(preset.detected, preset.imageUrl);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setVisionData(null);
    setSearchResults(null);
  };

  const handleBookArtist = () => {
    setActiveTab('Artists');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles className="gradient-text" /> AI Image Search
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
          Upload a sketch, Pinterest reference, or tattoo picture to identify its style, objects, and matching local artists.
        </p>
      </div>

      {/* Main Panel */}
      {!previewUrl && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
          
          {/* Uploader Box */}
          <div
            className="glass-panel"
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.2rem',
              cursor: 'pointer',
              border: '2px dashed rgba(0, 242, 254, 0.2)',
              borderRadius: '16px',
              background: 'rgba(0, 242, 254, 0.01)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)';
              e.currentTarget.style.background = 'rgba(0, 242, 254, 0.03)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.2)';
              e.currentTarget.style.background = 'rgba(0, 242, 254, 0.01)';
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(0, 242, 254, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)'
            }}>
              <Upload size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Upload Reference Image
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: '280px', margin: '0 auto' }}>
                Drag and drop your tattoo photo, drawing, or Pinterest screenshot here to scan.
              </p>
            </div>
          </div>

          {/* Preset Samples */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Or try a sample image
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {PRESETS.map(preset => (
                <div
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  style={{
                    display: 'flex', gap: '1rem', alignItems: 'center',
                    padding: '0.8rem', borderRadius: '12px', cursor: 'pointer',
                    background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-teal)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                >
                  <img
                    src={preset.imageUrl}
                    alt={preset.name}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{preset.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)' }}>{preset.detected.style} Style</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── SCANNING OVERLAY ── */}
      {isScanning && (
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          
          {/* Scanning frame container */}
          <div style={{
            position: 'relative', width: '220px', height: '220px',
            borderRadius: '16px', overflow: 'hidden',
            border: '2px solid rgba(0, 242, 254, 0.4)',
            animation: 'pulseBorder 2s infinite',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)'
          }}>
            <img
              src={previewUrl}
              alt="Scanning preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* The horizontal green scanning line */}
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '4px',
              background: 'linear-gradient(to right, transparent, var(--accent-teal), transparent)',
              boxShadow: '0 0 10px var(--accent-teal)',
              animation: 'scanLine 2.5s infinite linear'
            }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-teal)' }} />
              Analyzing Image Embeddings...
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {scanStepsText[scanStep]}
            </p>
          </div>
        </div>
      )}

      {/* ── RESULTS LAYOUT ── */}
      {!isScanning && visionData && searchResults && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'flex-start' }} className="animate-fade-in">
          
          {/* LEFT: Detected Specs Panel */}
          <div className="glass-panel" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Vision Report</h3>
              <button onClick={handleReset} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                Reset
              </button>
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <img src={previewUrl} alt="Analyzed Source" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover' }} />
            </div>

            {/* Spec fields */}
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Detected Style</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-teal)', marginTop: '0.1rem' }}>{visionData.style}</div>
            </div>

            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Objects & Elements</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.3rem' }}>
                {visionData.objects.map(obj => (
                  <span key={obj} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                    {obj}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Symbolic Meanings</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.3rem' }}>
                {visionData.symbols.map(sym => (
                  <span key={sym} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(0, 242, 254, 0.05)', color: 'var(--accent-teal)', border: '1px solid rgba(0, 242, 254, 0.1)' }}>
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Stroke Complexity</span>
              <div style={{ display: 'flex', gap: '2px', marginTop: '0.2rem', color: '#f59e0b' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={14} fill={star <= visionData.complexity ? 'currentColor' : 'none'} />
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Colour Palette ({visionData.colorName})</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '0.4rem' }}>
                {visionData.colors.map((c, i) => (
                  <div key={i} title={c} style={{ flex: 1, height: '24px', borderRadius: '4px', background: c, border: '1px solid rgba(255,255,255,0.08)' }} />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Matches and Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Suggested Meaning Card */}
            <div className="glass-panel" style={{ padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={18} style={{ color: 'var(--accent-teal)' }} /> AI Suggested Meaning
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {visionData.meaning}
              </p>
            </div>

            {/* Estimated Cost Card */}
            <div className="glass-panel" style={{ padding: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={18} style={{ color: 'var(--accent-teal)' }} /> Estimated Studio Cost
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                    Based on complexity, size tier, and matching local studio pricing parameters.
                  </p>
                </div>

                {/* Size picker to recalculate */}
                <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface-elevated)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Small', 'Medium', 'Large'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => setCostSize(sz)}
                      style={{
                        padding: '0.3rem 0.7rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        fontSize: '0.75rem', fontWeight: 600,
                        background: costSize === sz ? 'var(--accent-teal)' : 'transparent',
                        color: costSize === sz ? '#07070a' : 'var(--text-secondary)'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matched cost display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '1.2rem' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }} className="glow-text">
                  {calculateEstimatedCost(
                    visionData.complexity,
                    searchResults.matchingArtists[0]?.price || '$$',
                    costSize
                  )}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--status-success)', fontWeight: 600 }}>
                  Estimated Consultation Included
                </span>
              </div>
            </div>

            {/* Similar Tattoos Matching */}
            <div className="glass-panel" style={{ padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Similar Tattoos in Catalog</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {searchResults.similarTattoos.map(tattoo => (
                  <div
                    key={tattoo.id}
                    style={{
                      padding: '1rem', background: 'var(--bg-surface-elevated)',
                      border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: tattoo.svgMarkup }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{tattoo.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--accent-teal)', marginTop: '2px' }}>{tattoo.style} Style</div>
                    </div>
                    <div style={{
                      fontSize: '0.7rem', fontWeight: 700, color: 'var(--status-success)',
                      background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px'
                    }}>
                      {tattoo.matchPercentage}% visual match
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matching Artists */}
            <div className="glass-panel" style={{ padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Matching Studio Artists</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {searchResults.matchingArtists.map(artist => (
                  <div
                    key={artist.id}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '1rem 1.2rem', background: 'var(--bg-surface-elevated)',
                      border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{artist.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        📍 {artist.city} · Specializes in {artist.styles.join(', ')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                        <Star size={13} fill="#f59e0b" /> {artist.rating}
                      </div>
                      <button onClick={handleBookArtist} className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.78rem' }}>
                        <Calendar size={12} /> Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
