import React from 'react';
import { X, Sparkles, Heart, Activity, DollarSign, Clock, MapPin, Compass, HelpCircle } from 'lucide-react';

export default function TattooDetailModal({ tattoo, onClose, isSaved, onToggleSave, onTryInSimulator }) {
  if (!tattoo) return null;

  const getMatchColor = (pct) => {
    if (pct >= 90) return 'var(--accent-teal)';
    if (pct >= 75) return '#9d4edd';
    return '#ff9f1c';
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      {/* Modal Card */}
      <div 
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(0, 242, 254, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-modal"
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            zIndex: 100,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <X size={18} />
        </button>

        {/* LEFT COLUMN: Visuals & Primary Actions */}
        <div 
          style={{
            borderRight: '1px solid var(--border-color)',
            backgroundColor: '#0a0a0f',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem',
            position: 'relative'
          }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '260px' }}>
            <div 
              style={{
                width: '80%',
                maxHeight: '300px',
                color: 'var(--text-primary)',
                filter: 'drop-shadow(0 4px 12px rgba(0, 242, 254, 0.15))'
              }}
              dangerouslySetInnerHTML={{ __html: tattoo.svgMarkup }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '2rem' }}>
            <button
              id="btn-try-simulator"
              type="button"
              onClick={() => {
                onTryInSimulator(tattoo);
                onClose();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Compass size={18} /> Try in Visual Simulator
            </button>
            
            <button
              id="btn-save-wishlist"
              type="button"
              onClick={() => onToggleSave(tattoo.id)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', borderColor: isSaved ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.15)' }}
            >
              <Heart size={16} fill={isSaved ? 'var(--accent-teal)' : 'none'} style={{ color: isSaved ? 'var(--accent-teal)' : 'inherit' }} /> 
              {isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Meaning, Explanations, Algorithm Scoring */}
        <div style={{ padding: '2.5rem' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {tattoo.style} Style
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>•</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tattoo.category}</span>
          </div>
          
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
            {tattoo.name}
          </h3>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.15)', padding: '0.3rem 0.8rem', borderRadius: '20px', color: getMatchColor(tattoo.matchPercentage), fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <Sparkles size={14} />
            <span>Compatibility Score: {tattoo.matchPercentage}% Match</span>
          </div>

          {/* AI Explanation Box */}
          <div 
            style={{ 
              background: 'rgba(157, 78, 221, 0.05)', 
              borderLeft: '3px solid var(--accent-purple)', 
              padding: '1.2rem', 
              borderRadius: '0 8px 8px 0',
              marginBottom: '1.5rem'
            }}
          >
            <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-purple)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
              <Sparkles size={14} /> DYNAMIC AI INSIGHT
            </h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontStyle: 'italic' }}>
              "{tattoo.aiExplanation}"
            </p>
          </div>

          {/* Tattoo Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-surface-elevated)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Activity size={16} style={{ color: 'var(--accent-teal)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PAIN LEVEL</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tattoo.painLevel}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <DollarSign size={16} style={{ color: 'var(--accent-teal)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>EST. PRICE RANGE</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tattoo.estimatedCost}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Clock size={16} style={{ color: 'var(--accent-teal)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>EST. SESSION TIME</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tattoo.timeRequired}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={16} style={{ color: 'var(--accent-teal)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BEST PLACEMENTS</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {tattoo.bestPlacements.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Symbolism & History */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.85rem', lineHeight: '1.5' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>Symbolic Meanings</h4>
              <p style={{ color: 'var(--text-secondary)' }}>{tattoo.meaning}</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.3rem' }}>History & Cultural Significance</h4>
              <p style={{ color: 'var(--text-secondary)' }}>{tattoo.history} {tattoo.culturalSignificance}</p>
            </div>
          </div>

          {/* Scoring Algorithm Breakdown */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <HelpCircle size={14} style={{ color: 'var(--accent-teal)' }} /> Engine Logic Match Parameters
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.75rem' }}>
              {/* Row 1: Personality */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                  <span>Psychological Profile Match</span>
                  <span style={{ fontWeight: 600 }}>{tattoo.scoresDetails.personality}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-surface-elevated)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${tattoo.scoresDetails.personality}%`, background: 'var(--accent-teal)', borderRadius: '2px' }}></div>
                </div>
              </div>
              {/* Row 2: Values */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                  <span>Core Values Compatibility</span>
                  <span style={{ fontWeight: 600 }}>{tattoo.scoresDetails.values}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-surface-elevated)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${tattoo.scoresDetails.values}%`, background: 'var(--accent-teal)', borderRadius: '2px' }}></div>
                </div>
              </div>
              {/* Row 3: Life Experiences */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: 'var(--text-secondary)' }}>
                  <span>Life Narrative Alignment</span>
                  <span style={{ fontWeight: 600 }}>{tattoo.scoresDetails.experiences}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-surface-elevated)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${tattoo.scoresDetails.experiences}%`, background: 'var(--accent-teal)', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
