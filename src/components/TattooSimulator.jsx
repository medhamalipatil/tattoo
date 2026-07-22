import React, { useState, useRef, useEffect } from 'react';
import { Compass, Upload, RefreshCw, ZoomIn, ZoomOut, Move, RotateCw, Eye } from 'lucide-react';
import { tattoosData } from '../data/tattoosData';

export default function TattooSimulator({ preselectedTattoo }) {
  const [selectedTattooId, setSelectedTattooId] = useState(preselectedTattoo?.id || tattoosData[0].id);
  const [bodyPart, setBodyPart] = useState('Forearm');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0.8);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // center percentage
  const [customPhoto, setCustomPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const activeTattoo = tattoosData.find(t => t.id === selectedTattooId) || tattoosData[0];

  useEffect(() => {
    if (preselectedTattoo) {
      setSelectedTattooId(preselectedTattoo.id);
      // set placement if suitable
      if (preselectedTattoo.bestPlacements && preselectedTattoo.bestPlacements.length > 0) {
        setBodyPart(preselectedTattoo.bestPlacements[0]);
      }
    }
  }, [preselectedTattoo]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
      setBodyPart('Custom Upload');
    }
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setOpacity(0.85);
    setPosition({ x: 50, y: 50 });
    setCustomPhoto(null);
    setBodyPart('Forearm');
  };

  // Body Silhouette drawing helpers
  const getBodySilhouette = (part) => {
    switch (part) {
      case 'Forearm':
        return (
          <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ width: '100%', height: '100%', opacity: 0.25, color: '#E8EBF0' }}>
            {/* Outline of forearm */}
            <path d="M20,10 C25,30 30,80 35,140 C45,140 55,140 65,140 C70,80 75,30 80,10 Z" />
            <path d="M25,25 Q50,22 75,25" strokeDasharray="2 2" />
            <path d="M32,100 Q50,98 68,100" strokeDasharray="2 2" />
            <text x="40" y="145" fontSize="6" fill="currentColor" opacity="0.5">Wrist</text>
            <text x="38" y="18" fontSize="6" fill="currentColor" opacity="0.5">Elbow Joint</text>
          </svg>
        );
      case 'Wrist':
        return (
          <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ width: '100%', height: '100%', opacity: 0.25, color: '#E8EBF0' }}>
            {/* Hand and wrist */}
            <path d="M50,140 L50,100 C40,95 35,70 38,40 C40,20 48,10 50,15 C52,10 60,20 62,40 C65,70 60,95 50,100" />
            <path d="M30,130 Q50,125 70,130" />
            <circle cx="50" cy="115" r="10" strokeDasharray="2 2" />
            <text x="40" y="120" fontSize="5" fill="currentColor" opacity="0.5">Pulse Area</text>
          </svg>
        );
      case 'Back':
        return (
          <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ width: '100%', height: '100%', opacity: 0.25, color: '#E8EBF0' }}>
            {/* Upper torso back view */}
            <path d="M10,80 C10,50 20,20 30,15 C35,12 40,20 50,20 C60,20 65,12 70,15 C80,20 90,50 90,80 C88,110 82,140 82,150 C50,150 50,150 18,150 C18,140 12,110 10,80 Z" />
            <path d="M50,20 L50,150" strokeDasharray="3 3" opacity="0.4" /> {/* Spine line */}
            <path d="M22,35 Q50,42 78,35" strokeWidth="0.5" />
            <path d="M26,55 Q50,60 74,55" strokeWidth="0.5" />
            <text x="43" y="27" fontSize="5" fill="currentColor" opacity="0.5">Neck base</text>
          </svg>
        );
      case 'Shoulder':
        return (
          <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ width: '100%', height: '100%', opacity: 0.25, color: '#E8EBF0' }}>
            {/* Upper arm shoulder */}
            <path d="M15,10 C20,10 30,15 45,25 C65,40 75,55 80,75 C85,95 80,120 75,145 C65,145 55,145 45,145 C38,120 28,95 22,60 C18,35 12,15 15,10 Z" />
            <ellipse cx="60" cy="55" rx="15" ry="25" strokeDasharray="2 2" transform="rotate(-15 60 55)" />
            <text x="50" y="55" fontSize="5" fill="currentColor" opacity="0.5">Deltoid</text>
          </svg>
        );
      case 'Ankle':
        return (
          <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ width: '100%', height: '100%', opacity: 0.25, color: '#E8EBF0' }}>
            {/* Lower leg and ankle */}
            <path d="M35,10 C38,40 32,80 20,110 C18,115 15,120 25,125 C35,130 55,132 75,125 C82,118 80,105 72,90 C62,70 58,40 55,10 Z" />
            <circle cx="50" cy="100" r="12" strokeDasharray="2 2" />
            <text x="44" y="103" fontSize="5" fill="currentColor" opacity="0.5">Malleolus</text>
          </svg>
        );
      default:
        return null;
    }
  };

  // Mouse drag handlers on the visualizer canvas
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const canvas = e.currentTarget.getBoundingClientRect();
    // Calculate new percentage position relative to canvas container size
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    
    // Bounds clamping (keep within 10% - 90% boundary)
    const clampedX = Math.max(5, Math.min(95, newX));
    const clampedY = Math.max(5, Math.min(95, newY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
      
      {/* LEFT COLUMN: Visualizer Sandbox Canvas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass className="gradient-text" /> Visual Simulator
        </h3>

        {/* The Sandbox Area */}
        <div 
          style={{
            position: 'relative',
            height: '420px',
            backgroundColor: '#07070a',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Custom Upload Background or Default Silhouette */}
          {bodyPart === 'Custom Upload' && customPhoto ? (
            <img 
              src={customPhoto} 
              alt="Custom Canvas" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }} 
              draggable="false"
            />
          ) : (
            <div style={{ width: '220px', height: '330px' }}>
              {getBodySilhouette(bodyPart)}
            </div>
          )}

          {/* Draggable Tattoo Overlay SVG */}
          <div 
            style={{
              position: 'absolute',
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              width: '120px',
              height: '120px',
              opacity: opacity,
              color: 'var(--text-primary)',
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              pointerEvents: 'none', // passes clicks to the canvas for dragging
              zIndex: 10
            }}
            dangerouslySetInnerHTML={{ __html: activeTattoo.svgMarkup }}
          />

          {/* Grid Guideline Overlay */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.7rem', color: 'var(--text-muted)', pointerEvents: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            Placement: {bodyPart}
          </div>

          <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '0.65rem', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            Drag inside container to adjust coordinates
          </div>
        </div>

        {/* Upload Custom Skin Button */}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <label 
            id="lbl-upload"
            className="btn-secondary" 
            style={{ flex: 1, justifyContent: 'center', cursor: 'pointer', fontSize: '0.85rem', padding: '0.6rem' }}
          >
            <Upload size={16} /> Upload Custom Photo
            <input 
              id="file-upload"
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              style={{ display: 'none' }} 
            />
          </label>

          <button
            id="btn-reset-sim"
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            style={{ padding: '0.6rem 1.2rem' }}
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Controls Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem' }}>
        
        {/* Tattoo Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Design</label>
          <select 
            id="sim-tattoo-select"
            value={selectedTattooId} 
            onChange={(e) => setSelectedTattooId(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          >
            {tattoosData.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.style})</option>
            ))}
          </select>
        </div>

        {/* Body Placement Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Placement Silhouette</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {['Forearm', 'Wrist', 'Back', 'Shoulder', 'Ankle'].map((part) => {
              const active = bodyPart === part;
              return (
                <button
                  key={part}
                  id={`btn-placement-${part.toLowerCase()}`}
                  type="button"
                  onClick={() => setBodyPart(part)}
                  style={{
                    padding: '0.6rem 0.2rem',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: active ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.08)',
                    background: active ? 'rgba(173, 181, 189, 0.1)' : 'var(--bg-surface-elevated)',
                    color: active ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {part}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders for Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
          
          {/* Scale */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}><ZoomIn size={14} /> Size / Scale</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-teal)' }}>{Math.round(scale * 100)}%</span>
            </div>
            <input 
              id="slider-scale"
              type="range" 
              min="0.3" 
              max="2.5" 
              step="0.05" 
              value={scale} 
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </div>

          {/* Rotation */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}><RotateCw size={14} /> Rotation</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-teal)' }}>{rotation}°</span>
            </div>
            <input 
              id="slider-rotation"
              type="range" 
              min="0" 
              max="360" 
              step="1" 
              value={rotation} 
              onChange={(e) => setRotation(parseInt(e.target.value))}
            />
          </div>

          {/* Opacity */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}><Eye size={14} /> Ink Contrast (Settled look)</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-teal)' }}>{Math.round(opacity * 100)}%</span>
            </div>
            <input 
              id="slider-opacity"
              type="range" 
              min="0.1" 
              max="1" 
              step="0.05" 
              value={opacity} 
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
            />
          </div>

        </div>

        {/* Detailed Design Info */}
        <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-color)', marginTop: '0.5rem', fontSize: '0.8rem', lineHeight: '1.4' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{activeTattoo.name} Specifications:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '4px', color: 'var(--text-secondary)' }}>
            <span>Style:</span><span style={{ color: 'var(--text-primary)' }}>{activeTattoo.style}</span>
            <span>Pain Level:</span><span style={{ color: 'var(--text-primary)' }}>{activeTattoo.painLevel}</span>
            <span>Est. Cost:</span><span style={{ color: 'var(--text-primary)' }}>{activeTattoo.estimatedCost}</span>
            <span>Placements:</span><span style={{ color: 'var(--text-primary)' }}>{activeTattoo.bestPlacements.join(', ')}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
