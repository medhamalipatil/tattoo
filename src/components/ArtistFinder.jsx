import React, { useState } from 'react';
import { Search, MapPin, Award, Star, Compass, Calendar, Sparkles } from 'lucide-react';

const mockArtists = [
  {
    id: 1,
    name: "Aria Thorne",
    city: "New York",
    rating: 4.9,
    reviewsCount: 142,
    styles: ["Fine Line", "Minimal", "Watercolor"],
    price: "$$$",
    bio: "Specializes in delicate floral compositions, micro-realism, and light, flowing watercolor pieces. Over 8 years of custom canvas work.",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="50" r="30" stroke-dasharray="1 3"/><path d="M50,10 C45,30 35,45 50,90 C65,45 55,30 50,10" fill="currentColor" fill-opacity="0.1"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20,50 C35,20 65,80 80,50" stroke-width="1.5"/><circle cx="50" cy="50" r="15" stroke-dasharray="3 3"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="30" y="30" width="40" height="40" stroke-dasharray="2 2"/><circle cx="50" cy="50" r="28"/></svg>`
    ]
  },
  {
    id: 2,
    name: "Kenji Sato",
    city: "Tokyo",
    rating: 5.0,
    reviewsCount: 310,
    styles: ["Japanese", "Traditional", "Geometric"],
    price: "$$$$",
    bio: "Dedicated to modern interpretations of traditional Japanese irezumi and intricate geometric sleeves. Integrates clean bold lining.",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M50,10 C20,30 20,70 50,90 C80,70 80,30 50,10 Z" stroke-width="1.5"/><path d="M50,30 C35,45 35,55 50,70 C65,55 65,45 50,30 Z" fill="currentColor" fill-opacity="0.15"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10,90 L90,10 M10,10 L90,90 M50,10 L50,90 M10,50 L90,50"/><circle cx="50" cy="50" r="30"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 2"/><polygon points="50,20 76,65 24,65"/></svg>`
    ]
  },
  {
    id: 3,
    name: "Elena Rostova",
    city: "London",
    rating: 4.8,
    reviewsCount: 96,
    styles: ["Geometric", "Minimal", "Fine Line"],
    price: "$$",
    bio: "Architect-turned-tattooist. Focuses on hyper-precise mathematical structures, linework mandalas, and astronomical blueprints.",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1"><circle cx="50" cy="50" r="35"/><circle cx="50" cy="50" r="25"/><circle cx="50" cy="50" r="15"/><line x1="15" y1="50" x2="85" y2="50"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="50,10 90,80 10,80"/><circle cx="50" cy="55" r="15"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20,20 L80,20 L80,80 L20,80 Z" stroke-width="1.5"/><line x1="20" y1="20" x2="80" y2="80"/><line x1="80" y1="20" x2="20" y2="80"/></svg>`
    ]
  },
  {
    id: 4,
    name: "Marcus Vance",
    city: "London",
    rating: 4.7,
    reviewsCount: 88,
    styles: ["Tribal", "Traditional", "Realism"],
    price: "$$",
    bio: "Passionate about traditional Polynesian tribal work and realistic portraits. Draws inspiration from natural textures, wood, and stones.",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10,50 Q30,20 50,50 T90,50" stroke-width="2"/><path d="M10,60 Q30,30 50,60 T90,60" stroke-dasharray="1 2"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="45" r="20" fill="currentColor"/><circle cx="50" cy="70" r="10" stroke-width="1.5"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M30,30 L70,30 L50,70 Z" fill="currentColor" fill-opacity="0.2"/><circle cx="50" cy="40" r="5" fill="currentColor"/></svg>`
    ]
  }
];

export default function ArtistFinder({ artistsList, onAddBooking, userCredentials }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [bookingArtist, setBookingArtist] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    if (bookingDate && bookingArtist) {
      onAddBooking({
        artistId: bookingArtist.id,
        artistName: bookingArtist.name,
        date: bookingDate,
        customerName: userCredentials?.name || 'Guest User',
        customerEmail: userCredentials?.email || 'guest@example.com'
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingArtist(null);
        setBookingDate('');
      }, 3000);
    }
  };

  const filteredArtists = artistsList.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          artist.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = selectedStyle === 'All' || artist.styles.includes(selectedStyle);
    const matchesPrice = selectedPrice === 'All' || artist.price === selectedPrice;
    
    return matchesSearch && matchesStyle && matchesPrice;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Panel */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
            Studio Artist Directory
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Browse and connect with verified, professional tattoo studios specializing in your recommended styles.
          </p>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }} className="glow-border">
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            id="artist-search"
            type="text"
            placeholder="Search by artist name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 2.5rem',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Filter directory:</span>
        
        {/* Style Dropdown */}
        <div>
          <select
            id="filter-style"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          >
            <option value="All">All Styles</option>
            {['Minimal', 'Traditional', 'Fine Line', 'Geometric', 'Japanese', 'Watercolor', 'Realism'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Budget Dropdown */}
        <div>
          <select
            id="filter-price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.85rem'
            }}
          >
            <option value="All">All Budgets</option>
            <option value="$$">$$ (Moderate)</option>
            <option value="$$$">$$$ (Premium)</option>
            <option value="$$$$">$$$$ (Elite)</option>
          </select>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          Showing {filteredArtists.length} available partners
        </span>
      </div>

      {/* Grid of Artists */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredArtists.map(artist => (
          <div 
            key={artist.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.2rem',
              transition: 'border-color 0.2s ease'
            }}
          >
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{artist.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>
                    <MapPin size={12} />
                    <span>{artist.city}</span>
                  </div>
                </div>
                
                {/* Rating Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '0.2rem 0.5rem', borderRadius: '12px', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Star size={12} fill="#f59e0b" />
                  <span>{artist.rating}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0.8rem 0' }}>
                {artist.bio}
              </p>

              {/* Specialization Chips */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {artist.styles.map(sty => (
                  <span key={sty} style={{ fontSize: '0.7rem', background: 'var(--bg-surface-elevated)', color: 'var(--accent-teal)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    {sty}
                  </span>
                ))}
                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px', marginLeft: 'auto' }}>
                  Rate: {artist.price}
                </span>
              </div>
            </div>

            {/* Portfolio Miniatures */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 'bold' }}>PORTFOLIO EXAMPLES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {artist.portfolio.map((svg, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      height: '80px',
                      backgroundColor: '#07070a',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      color: 'var(--text-secondary)',
                      cursor: 'zoom-in'
                    }}
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button
                id={`btn-book-${artist.id}`}
                type="button"
                onClick={() => setBookingArtist(artist)}
                className="btn-primary"
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
              >
                <Calendar size={14} /> Request Booking
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Booking Dialogue Modal */}
      {bookingArtist && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 5, 8, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setBookingArtist(null)}
        >
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '2rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <Sparkles size={40} className="gradient-text animate-float" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}>Request Submitted!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  A simulation email has been dispatched to <strong>{bookingArtist.name}</strong>. Their studio coordinator will reach out to organize your canvas consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Consultation Request</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  Request an initial style design consultation with <strong>{bookingArtist.name}</strong> in {bookingArtist.city}.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Preferred Date</label>
                  <input 
                    id="booking-date"
                    type="date" 
                    required 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                  <button
                    id="btn-cancel-booking"
                    type="button"
                    onClick={() => setBookingArtist(null)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-submit-booking"
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
