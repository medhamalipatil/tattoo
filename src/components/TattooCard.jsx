import React from 'react';
import { Shield, Sparkles, Heart } from 'lucide-react';

export default function TattooCard({ tattoo, onSelect, isSaved, onToggleSave }) {
  const getMatchColor = (pct) => {
    if (pct >= 90) return 'var(--accent-teal)';
    if (pct >= 75) return 'var(--accent-purple)';
    return '#ff9f1c';
  };

  const cardTransition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease';

  return (
    <div
      className="glass-panel-premium animate-scale-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        transition: cardTransition,
      }}
      onClick={() => onSelect(tattoo)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 20px 50px -12px rgba(173, 181, 189, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(173, 181, 189, 0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.borderColor = '';
      }}
    >
      {/* Saved Bookmark Button */}
      <button
        id={`btn-save-${tattoo.id}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(tattoo.id);
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(14, 14, 21, 0.8)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isSaved ? 'var(--accent-teal)' : 'var(--text-secondary)',
          zIndex: 10,
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.borderColor = 'var(--accent-teal)';
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        }}
      >
        <Heart size={16} fill={isSaved ? 'var(--accent-teal)' : 'none'} />
      </button>

      {/* SVG Image Preview Container */}
      <div
        className="img-zoom-container"
        style={{
          height: '200px',
          backgroundColor: '#0c0c12',
          borderBottom: '1px solid var(--border-color)',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          color: 'var(--text-primary)',
          position: 'relative'
        }}
      >
        {/* Glow behind SVG */}
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          background: getMatchColor(tattoo.matchPercentage),
          filter: 'blur(50px)',
          opacity: 0.1,
          zIndex: 1
        }}></div>

        <div
          style={{ width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          dangerouslySetInnerHTML={{ __html: tattoo.svgMarkup }}
        />
      </div>

      {/* Info Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{tattoo.name}</h4>
          <span
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: `1px solid ${getMatchColor(tattoo.matchPercentage)}`,
              color: getMatchColor(tattoo.matchPercentage),
              boxShadow: `0 0 10px ${getMatchColor(tattoo.matchPercentage)}20`,
              whiteSpace: 'nowrap'
            }}
          >
            {tattoo.matchPercentage}% Match
          </span>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '1rem', lineHeight: '1.4', flex: 1 }}>
          {tattoo.meaning}
        </p>

        {/* Foot Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <span style={{ background: 'var(--bg-surface-elevated)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            {tattoo.style}
          </span>
          <span style={{ background: 'var(--bg-surface-elevated)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            Pain: {tattoo.painLevel}
          </span>
          <span style={{ background: 'var(--bg-surface-elevated)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            {tattoo.estimatedCost.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
