import React, { useState } from 'react';
import {
  X, MapPin, Calendar, Clock, DollarSign, Star, ShieldCheck,
  Award, Briefcase, ChevronRight, FileText, ToggleLeft, ToggleRight, Sparkles
} from 'lucide-react';

export default function ArtistPortfolioModal({ artist, onClose, onOpenBooking }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showHealed, setShowHealed] = useState(false);

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(5, 5, 8, 0.9)', backdropFilter: 'blur(10px)',
        zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'var(--shadow-xl)', borderRadius: '20px', position: 'relative',
          display: 'flex', flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '15px', right: '15px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,0,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
        >
          <X size={18} />
        </button>

        {/* HERO BANNER */}
        <div style={{ position: 'relative', height: '220px', flexShrink: 0 }}>
          <img
            src={artist.banner || 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1200&q=80'}
            alt="Studio Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 100%)'
          }} />
          
          {/* Avatar overlay */}
          <div style={{
            position: 'absolute', bottom: '-40px', left: '2rem', display: 'flex',
            alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap'
          }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              border: '4px solid var(--bg-surface)', overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)', background: 'var(--bg-base)'
            }}>
              <img
                src={artist.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={artist.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)' }} className="glow-text">
                {artist.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <span>📍 {artist.city}</span>
                <span>•</span>
                <span>⭐ {artist.rating} ({artist.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', padding: '3.5rem 2rem 2rem 2rem', alignItems: 'flex-start' }}>
          
          {/* LEFT PANEL: Metadata & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {/* Biography */}
            <div className="glass-panel" style={{ padding: '1.2rem' }}>
              <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Biography</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{artist.bio}</p>
            </div>

            {/* General Specs */}
            <div className="glass-panel" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  <Briefcase size={12} /> Experience
                </span>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>{artist.yearsExperience || '8 Years'}</div>
              </div>
              
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  <Clock size={12} /> Working Hours
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>{artist.workingHours}</div>
              </div>

              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  <DollarSign size={12} /> Pricing Base
                </span>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-teal)', marginTop: '2px' }}>{artist.priceRange}</div>
              </div>

              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  <MapPin size={12} /> Studio Address
                </span>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>{artist.location}</div>
              </div>
            </div>

            {/* Specializations & Certifications */}
            <div className="glass-panel" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={11} /> Specializations
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {artist.specializations?.map(s => (
                    <span key={s} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(173, 181, 189, 0.1)', color: 'var(--accent-teal)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={11} /> Certifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {artist.certifications?.map(c => (
                    <div key={c} style={{ display: 'flex', gap: '5px', alignItems: 'flex-start', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      <ShieldCheck size={12} style={{ color: 'var(--status-success)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Booking Trigger */}
            <button
              onClick={() => onOpenBooking(artist)}
              className="btn-primary"
              style={{ padding: '0.8rem', justifyContent: 'center', fontSize: '0.9rem' }}
            >
              <Calendar size={15} /> Book Consultation
            </button>

          </div>

          {/* RIGHT PANEL: Portfolio Gallery */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Portfolio Gallery</h3>
            
            {(!artist.portfolioItems || artist.portfolioItems.length === 0) ? (
              <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                No detailed portfolio uploads available yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {artist.portfolioItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => { setSelectedItem(item); setShowHealed(false); }}
                    style={{
                      borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.06)', position: 'relative',
                      paddingTop: '100%', background: 'var(--bg-surface-elevated)',
                      transition: 'border-color 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-teal)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    <img
                      src={item.image}
                      alt={item.description}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      padding: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-teal)' }}>{item.style}</span>
                      <span style={{ fontSize: '0.72rem', color: '#fff', opacity: 0.8 }}>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ── PORTFOLIO ITEM DETAILED VIEW OVERLAY ── */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 5, 8, 0.95)', zIndex: 1300,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%', maxWidth: '780px', background: 'var(--bg-surface)',
              border: '1px solid rgba(255,255,255,0.1)', display: 'grid',
              gridTemplateColumns: '1fr 1fr', borderRadius: '18px', overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Left: Image / Fresh vs Healed View */}
            <div style={{ position: 'relative', paddingTop: '100%', background: '#000' }}>
              <img
                src={showHealed ? selectedItem.healingPhoto : selectedItem.image}
                alt="Tattoo piece"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Slider Toggle Indicator */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.7)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.72rem', color: !showHealed ? 'var(--accent-teal)' : '#fff', fontWeight: 600 }}>Fresh Image</span>
                <button
                  onClick={() => setShowHealed(!showHealed)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-teal)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {showHealed ? <ToggleRight size={24} /> : <ToggleLeft size={24} style={{ color: 'var(--text-muted)' }} />}
                </button>
                <span style={{ fontSize: '0.72rem', color: showHealed ? 'var(--accent-teal)' : '#fff', fontWeight: 600 }}>Healed Photo</span>
              </div>
            </div>

            {/* Right: Item details */}
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1.2rem', overflowY: 'auto', maxHeight: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '10px', background: 'rgba(173, 181, 189, 0.1)', color: 'var(--accent-teal)', fontWeight: 700 }}>
                  {selectedItem.style}
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <h4 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Work Description</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {selectedItem.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Time Taken</span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedItem.hoursTaken}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Price</span>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-teal)', marginTop: '2px' }}>{selectedItem.price}</div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Tags</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.3rem' }}>
                  {selectedItem.tags.map(t => (
                    <span key={t} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ⭐ Customer Review
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.4rem', lineHeight: 1.4 }}>
                  "{selectedItem.customerReview}"
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
