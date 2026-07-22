import React, { useState, useEffect } from 'react';
import {
  Wand2, RefreshCw, Download, Heart, Calendar, Clock,
  ChevronDown, ChevronUp, Loader, AlertCircle, Sparkles,
  Image as ImageIcon, Sliders
} from 'lucide-react';
import { generateImageSet, saveGenerationToHistory, loadGenerationHistory, buildTattooPrompt, buildPollinationsUrl } from '../utils/promptBuilder';

// ── Input field styles ────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px',
  background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-primary)', outline: 'none', fontSize: '0.88rem',
  fontFamily: 'inherit', transition: 'border-color 0.2s ease',
};

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  color: 'var(--text-secondary)', marginBottom: '0.4rem',
  letterSpacing: '0.04em', textTransform: 'uppercase',
};

// ── Image Card ────────────────────────────────────────────────────────────────
function ImageCard({ image, onRegenerate, onSave, onDownload, onWishlist, onBookArtist, isSaved }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerate = () => {
    setLoaded(false);
    setError(false);
    setRegenerating(true);
    onRegenerate(image.id);
    setTimeout(() => setRegenerating(false), 200);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `soulink-tattoo-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fallback: open in new tab
      window.open(image.url, '_blank');
    }
    onDownload?.(image.id);
  };

  return (
    <div style={{
      background: 'var(--bg-surface-elevated)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'border-color 0.2s ease, transform 0.2s ease'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(173, 181, 189, 0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', paddingTop: '100%', background: 'var(--bg-base)' }}>
        {/* Loading skeleton */}
        {!loaded && !error && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
          }}>
            <div style={{ position: 'relative' }}>
              <Loader size={32} style={{ color: 'var(--accent-teal)', animation: 'spin 1s linear infinite' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generating with AI...</span>
          </div>
        )}

        {error && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.6rem'
          }}>
            <AlertCircle size={28} style={{ color: 'var(--status-error)', opacity: 0.6 }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generation failed</span>
            <button onClick={handleRegenerate} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'var(--text-secondary)', padding: '0.3rem 0.8rem', cursor: 'pointer', fontSize: '0.75rem' }}>
              Retry
            </button>
          </div>
        )}

        <img
          src={image.url}
          alt="AI generated tattoo"
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: loaded && !error ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
        />
      </div>

      {/* Action buttons */}
      <div style={{ padding: '0.8rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleRegenerate}
          title="Regenerate this image"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            padding: '0.45rem 0.6rem', borderRadius: '7px', border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
            fontSize: '0.72rem', fontWeight: 500, transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <RefreshCw size={11} /> Regenerate
        </button>

        <button
          onClick={handleDownload}
          title="Download"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.45rem 0.6rem', borderRadius: '7px', border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
            fontSize: '0.72rem', transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Download size={13} />
        </button>

        <button
          onClick={() => onWishlist(image)}
          title="Add to Wishlist"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.45rem 0.6rem', borderRadius: '7px', border: '1px solid',
            borderColor: isSaved ? 'rgba(173, 181, 189, 0.1)' : 'rgba(255,255,255,0.1)',
            background: isSaved ? 'rgba(173, 181, 189, 0.1)' : 'transparent',
            color: isSaved ? 'var(--accent-teal)' : 'var(--text-secondary)',
            cursor: 'pointer', fontSize: '0.72rem', transition: 'all 0.15s ease',
          }}
        >
          <Heart size={13} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={() => onBookArtist(image)}
          title="Book an Artist"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            padding: '0.45rem 0.7rem', borderRadius: '7px',
            background: 'var(--accent-gradient)', color: '#07070a',
            border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <Calendar size={11} /> Book
        </button>
      </div>
    </div>
  );
}

// ── Main TattooGenerator Component ────────────────────────────────────────────
export default function TattooGenerator({ artistsList, onAddBooking, userCredentials, setActiveTab }) {
  const [inputs, setInputs] = useState({
    meaning: '',
    style: 'Minimal',
    theme: 'Nature',
    placement: 'Forearm',
    complexity: 3,
    colour: 'Black & White',
    size: 'Medium',
  });

  const [imageSet, setImageSet] = useState([]);
  const [wishlisted, setWishlisted] = useState(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // CSS for spinner
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    setHistory(loadGenerationHistory());
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setHasGenerated(false);

    // Small delay to show generating state
    setTimeout(() => {
      const set = generateImageSet(inputs);
      setImageSet(set);
      setIsGenerating(false);
      setHasGenerated(true);

      // Save to history
      const historyEntry = { id: Date.now(), createdAt: new Date().toISOString(), inputs, images: set };
      saveGenerationToHistory(historyEntry);
      setHistory(prev => [historyEntry, ...prev].slice(0, 20));
    }, 500);
  };

  const handleRegenerate = (imageId) => {
    setImageSet(prev => prev.map(img => {
      if (img.id === imageId) {
        const prompt = buildTattooPrompt(inputs);
        const newSeed = Math.floor(Math.random() * 9999999);
        return {
          ...img,
          url: buildPollinationsUrl(prompt, newSeed),
          seed: newSeed,
          id: `${Date.now()}-regen`
        };
      }
      return img;
    }));
  };

  const handleWishlist = (image) => {
    setWishlisted(prev => {
      const next = new Set(prev);
      if (next.has(image.id)) {
        next.delete(image.id);
      } else {
        next.add(image.id);
      }
      return next;
    });
  };

  const handleBookArtist = (image) => {
    setActiveTab('Artists');
  };

  const setInput = (key, value) => setInputs(prev => ({ ...prev, [key]: value }));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Wand2 className="gradient-text" /> AI Tattoo Generator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Describe your idea and let AI generate unique tattoo concepts in seconds.
          </p>
        </div>
        <button
          onClick={() => setShowHistory(v => !v)}
          className="btn-secondary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          <Clock size={15} /> History ({history.length})
          {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>Generation History</h3>
          {history.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No generations yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {history.map(h => (
                <div
                  key={h.id}
                  onClick={() => { setImageSet(h.images); setInputs(h.inputs); setHasGenerated(true); setShowHistory(false); }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.8rem 1rem', borderRadius: '8px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(173, 181, 189, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                >
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                      {h.inputs.style} · {h.inputs.theme}
                      {h.inputs.meaning ? ` · "${h.inputs.meaning}"` : ''}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {new Date(h.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {h.images?.slice(0, 3).map((img, i) => (
                      <div key={i} style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'var(--bg-base)', overflow: 'hidden' }}>
                        <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content: Inputs + Results */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* LEFT: Input Panel */}
        <div className="glass-panel" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'sticky', top: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Sliders size={16} style={{ color: 'var(--accent-teal)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Configure Your Design</h3>
          </div>

          {/* Meaning */}
          <div>
            <label style={labelStyle}>Meaning / Concept</label>
            <input
              type="text"
              placeholder="e.g., rebirth, inner strength, freedom..."
              value={inputs.meaning}
              onChange={e => setInput('meaning', e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent-teal)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Style */}
          <div>
            <label style={labelStyle}>Tattoo Style</label>
            <select value={inputs.style} onChange={e => setInput('style', e.target.value)} style={inputStyle}>
              {['Minimal', 'Geometric', 'Watercolor', 'Japanese', 'Traditional', 'Fine Line', 'Tribal', 'Blackwork', 'Realism', 'Neo-Traditional'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Theme */}
          <div>
            <label style={labelStyle}>Theme</label>
            <select value={inputs.theme} onChange={e => setInput('theme', e.target.value)} style={inputStyle}>
              {['Nature', 'Mythology', 'Space', 'Spiritual', 'Animal', 'Abstract', 'Cultural', 'Floral', 'Geometric', 'Marine', 'Dark Arts', 'Any'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Body Placement */}
          <div>
            <label style={labelStyle}>Body Placement</label>
            <select value={inputs.placement} onChange={e => setInput('placement', e.target.value)} style={inputStyle}>
              {['Forearm', 'Back', 'Shoulder', 'Wrist', 'Ankle', 'Chest', 'Neck', 'Calf', 'Thigh', 'Ribcage', 'Any'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Complexity Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Complexity</label>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: 700 }}>
                {['', 'Minimal', 'Simple', 'Medium', 'Detailed', 'Intricate'][inputs.complexity]}
              </span>
            </div>
            <input
              type="range" min="1" max="5" value={inputs.complexity}
              onChange={e => setInput('complexity', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              <span>Simple</span><span>Intricate</span>
            </div>
          </div>

          {/* Colour */}
          <div>
            <label style={labelStyle}>Colour Preference</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Black & White', 'Coloured', 'Muted Tones', 'Vibrant'].map(c => (
                <button
                  key={c}
                  onClick={() => setInput('colour', c)}
                  style={{
                    padding: '0.4rem 0.8rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 600,
                    cursor: 'pointer', border: '1px solid',
                    borderColor: inputs.colour === c ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                    background: inputs.colour === c ? 'rgba(173, 181, 189, 0.1)' : 'var(--bg-surface-elevated)',
                    color: inputs.colour === c ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label style={labelStyle}>Size</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Small', 'Medium', 'Large'].map(s => (
                <button
                  key={s}
                  onClick={() => setInput('size', s)}
                  style={{
                    flex: 1, padding: '0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
                    cursor: 'pointer', border: '1px solid',
                    borderColor: inputs.size === s ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                    background: inputs.size === s ? 'rgba(173, 181, 189, 0.1)' : 'var(--bg-surface-elevated)',
                    color: inputs.size === s ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            {isGenerating
              ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Generating...</>
              : <><Wand2 size={18} /> Generate 4 Concepts</>
            }
          </button>
        </div>

        {/* RIGHT: Results Panel */}
        <div>
          {!hasGenerated && !isGenerating && (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <Sparkles size={56} style={{ color: 'var(--accent-teal)', opacity: 0.3, marginBottom: '1.5rem' }} className="animate-float" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>
                Your AI Tattoo Concepts Await
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
                Configure your design on the left and click "Generate" to create 4 unique AI tattoo concepts.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Minimal', 'Watercolor', 'Geometric', 'Japanese'].map(style => (
                  <span key={style} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', borderRadius: '12px', background: 'rgba(173, 181, 189, 0.1)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {style}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{
                    paddingTop: '100%', background: 'var(--bg-surface-elevated)',
                    borderRadius: '14px', position: 'relative',
                    animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite`
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '14px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(173, 181, 189, 0.1) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite'
                    }} />
                    <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sending prompt to AI...</p>
            </div>
          )}

          {hasGenerated && imageSet.length > 0 && (
            <div>
              {/* Prompt preview */}
              <div style={{ marginBottom: '1.2rem', padding: '0.8rem 1.2rem', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>AI Prompt: </span>
                {imageSet[0]?.prompt}
              </div>

              {/* Image grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {imageSet.map(img => (
                  <ImageCard
                    key={img.id + img.url}
                    image={img}
                    onRegenerate={handleRegenerate}
                    onDownload={() => {}}
                    onWishlist={handleWishlist}
                    onBookArtist={handleBookArtist}
                    isSaved={wishlisted.has(img.id)}
                  />
                ))}
              </div>

              {/* Regenerate all */}
              <button
                onClick={handleGenerate}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.8rem' }}
              >
                <RefreshCw size={15} /> Regenerate All 4 Concepts
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
