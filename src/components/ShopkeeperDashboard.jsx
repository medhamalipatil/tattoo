import React, { useState } from 'react';
import { Store, Calendar, UserCheck, DollarSign, Star, Settings, Plus, Trash, Check, X, Briefcase, Clock, Tag, Edit3 } from 'lucide-react';

// Pop helpers
const T = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s ease';

const popIn  = (e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 16px 40px -10px rgba(0,242,254,0.3)'; e.currentTarget.style.borderColor = 'rgba(0,242,254,0.4)'; };
const popOut = (e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; };

export default function ShopkeeperDashboard({ artistsList, setArtistsList, bookings, setBookings, globalCatalog }) {
  const myArtistId = 1;
  const currentStudio = artistsList.find(a => a.id === myArtistId) || artistsList[0];

  const [activeSubTab, setActiveSubTab] = useState('bookings');
  const [studioName, setStudioName]     = useState(currentStudio?.name || '');
  const [studioCity, setStudioCity]     = useState(currentStudio?.city || '');
  const [studioPrice, setStudioPrice]   = useState(currentStudio?.price || '$$$');
  const [studioBio, setStudioBio]       = useState(currentStudio?.bio || '');
  const [selectedStyles, setSelectedStyles] = useState(currentStudio?.styles || []);
  const [saveSuccess, setSaveSuccess]   = useState(false);
  const [rosterArtists, setRosterArtists] = useState([
    { name: 'Julian Gray',  specialty: 'Blackwork',              experience: '5 years' },
    { name: 'Chloe Pierce', specialty: 'Fine Line / Botanicals', experience: '3 years' }
  ]);
  const [newArtistName, setNewArtistName]           = useState('');
  const [newArtistSpecialty, setNewArtistSpecialty] = useState('Fine Line');
  const [rescheduleId, setRescheduleId] = useState(null);
  const [newDate, setNewDate]           = useState('');

  const handleBookingAction = (bookingId, action) =>
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: action } : b));

  const handleRescheduleSubmit = (e, bookingId) => {
    e.preventDefault();
    if (!newDate) return;
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, date: newDate, status: 'Rescheduled' } : b));
    setRescheduleId(null);
    setNewDate('');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setArtistsList(prev => prev.map(a => a.id === myArtistId ? { ...a, name: studioName, city: studioCity, price: studioPrice, bio: studioBio, styles: selectedStyles } : a));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleStyleToggle = (style) =>
    setSelectedStyles(s => s.includes(style) ? s.filter(x => x !== style) : [...s, style]);

  const handleAddRosterArtist = (e) => {
    e.preventDefault();
    if (!newArtistName.trim()) return;
    setRosterArtists(r => [...r, { name: newArtistName, specialty: newArtistSpecialty, experience: '1 year' }]);
    setNewArtistName('');
  };

  const handleRemoveRosterArtist = (name) =>
    setRosterArtists(r => r.filter(a => a.name !== name));

  const myBookings      = bookings.filter(b => b.artistId === myArtistId);
  const pendingCount    = myBookings.filter(b => b.status === 'Pending').length;
  const approvedCount   = myBookings.filter(b => b.status === 'Approved').length;
  const estimatedRevenue = approvedCount * 250;

  const inputStyle = {
    width: '100%', padding: '0.8rem', borderRadius: '8px',
    background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem'
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Title */}
      <div
        className="glass-panel"
        style={{ padding: '2rem', transition: T }}
        onMouseEnter={popIn} onMouseLeave={popOut}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Store className="gradient-text" /> Shopkeeper Studio Console
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Manage your tattoo studio presence, review booking requests, configure services, and manage your artist roster.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
        {[
          { label: 'PENDING CONSULTATIONS', value: pendingCount,         color: 'var(--text-primary)',   sub: pendingCount > 0 ? '⚠️ Requires response' : 'No action required', subColor: pendingCount > 0 ? 'var(--status-warning)' : 'var(--text-muted)' },
          { label: 'APPROVED BOOKINGS',     value: approvedCount,        color: 'var(--status-success)', sub: 'Ready for consultation',     subColor: 'var(--text-secondary)' },
          { label: 'ESTIMATED SALES VALUE', value: `$${estimatedRevenue}`, color: 'var(--text-primary)', sub: 'Based on flat $250 avg/session', subColor: 'var(--text-muted)' },
          { label: 'STUDIO RATING',         value: currentStudio?.rating || '4.9', color: 'var(--accent-gold)', star: true, sub: `Based on ${currentStudio?.reviewsCount || '142'} reviews`, subColor: 'var(--text-secondary)' },
        ].map((m, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: T, cursor: 'default' }}
            onMouseEnter={popIn} onMouseLeave={popOut}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>{m.label}</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: m.color, display: 'flex', alignItems: 'center', gap: '4px' }} className="glow-text">
              {m.star && <Star size={24} fill="var(--accent-gold)" />} {m.value}
            </div>
            <span style={{ fontSize: '0.7rem', color: m.subColor }}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Sub-navigation */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {[
          { id: 'bookings', label: 'Consultation Inquiries', count: pendingCount },
          { id: 'profile',  label: 'Studio Profile Manager' },
          { id: 'roster',   label: 'Staff Roster & Specialization' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              padding: '0.6rem 1.2rem',
              background: activeSubTab === tab.id ? 'rgba(0,242,254,0.06)' : 'transparent',
              color: activeSubTab === tab.id ? 'var(--accent-teal)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeSubTab === tab.id ? '2px solid var(--accent-teal)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeSubTab === tab.id ? 600 : 400,
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span style={{ background: 'var(--status-warning)', color: '#000', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="glass-panel" style={{ padding: '2rem' }}>

        {/* TAB 1: Booking Inquiries */}
        {activeSubTab === 'bookings' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Active Customer Consultations</h3>
            {myBookings.length === 0 ? (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Calendar size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>No booking inquiries yet from customers.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>Switch to "Customer" role to request a booking from Aria Thorne in "Artist Finder".</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {myBookings.map(b => (
                  <div
                    key={b.id}
                    style={{
                      border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)',
                      borderRadius: '12px', padding: '1.5rem',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                      transition: T, cursor: 'default'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.015)'; e.currentTarget.style.boxShadow = '0 14px 40px -10px rgba(0,242,254,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,242,254,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>{b.customerName}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({b.customerEmail})</span>
                        <span style={{
                          fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '12px', fontWeight: 600,
                          backgroundColor: b.status === 'Approved' ? 'rgba(16,185,129,0.12)' : b.status === 'Declined' ? 'rgba(239,68,68,0.12)' : b.status === 'Rescheduled' ? 'rgba(157,78,221,0.12)' : 'rgba(245,158,11,0.12)',
                          color: b.status === 'Approved' ? 'var(--status-success)' : b.status === 'Declined' ? 'var(--status-error)' : b.status === 'Rescheduled' ? 'var(--accent-purple)' : 'var(--status-warning)'
                        }}>{b.status}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <div><strong>Requested Date:</strong> {b.date}</div>
                        {b.tattooId && <div><strong>Selected Design:</strong> {globalCatalog.find(t => t.id === b.tattooId)?.name || b.tattooId}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      {rescheduleId === b.id ? (
                        <form onSubmit={(e) => handleRescheduleSubmit(e, b.id)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input type="date" required value={newDate} onChange={(e) => setNewDate(e.target.value)}
                            style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none' }} />
                          <button type="submit" className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px', boxShadow: 'none' }}>Save</button>
                          <button type="button" onClick={() => setRescheduleId(null)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}><X size={12} /></button>
                        </form>
                      ) : (
                        <>
                          {b.status === 'Pending' && (
                            <>
                              <button onClick={() => handleBookingAction(b.id, 'Approved')} className="btn-primary"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '8px', boxShadow: 'none', background: 'var(--status-success)', color: '#fff' }}>
                                <Check size={14} /> Accept
                              </button>
                              <button onClick={() => setRescheduleId(b.id)} className="btn-secondary"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}>
                                <Calendar size={14} /> Reschedule
                              </button>
                              <button onClick={() => handleBookingAction(b.id, 'Declined')}
                                style={{ background: 'none', border: 'none', color: 'var(--status-error)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem',
                                  transition: 'transform 0.2s ease' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <X size={14} /> Decline
                              </button>
                            </>
                          )}
                          {(b.status === 'Approved' || b.status === 'Rescheduled') && (
                            <button onClick={() => handleBookingAction(b.id, 'Declined')} className="btn-secondary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '8px', borderColor: 'rgba(239,68,68,0.4)', color: 'var(--status-error)' }}>
                              Cancel Booking
                            </button>
                          )}
                          {b.status === 'Declined' && (
                            <button onClick={() => handleBookingAction(b.id, 'Pending')} className="btn-secondary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}>
                              Re-evaluate
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Studio Profile Manager */}
        {activeSubTab === 'profile' && (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Studio Setup & Preferences</h3>
            {saveSuccess && (
              <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--status-success)', color: 'var(--status-success)', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={18} /> Studio Profile successfully updated! Changes are live for Customers in the Directory.
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Studio / Artist Display Name</label>
                <input type="text" required value={studioName} onChange={e => setStudioName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>City / Operating Region</label>
                  <input type="text" required value={studioCity} onChange={e => setStudioCity(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Pricing Scale</label>
                  <select value={studioPrice} onChange={e => setStudioPrice(e.target.value)} style={inputStyle}>
                    <option value="$$">$$ (Moderate)</option>
                    <option value="$$$">$$$ (Premium)</option>
                    <option value="$$$$">$$$$ (Elite)</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Studio Philosophy / Bio</label>
              <textarea rows="4" value={studioBio} onChange={e => setStudioBio(e.target.value)} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>Tattoo Art Specialties (Check all that apply)</label>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {['Fine Line','Minimal','Watercolor','Geometric','Japanese','Traditional','Realism','Tribal'].map(style => {
                  const checked = selectedStyles.includes(style);
                  return (
                    <button key={style} type="button" onClick={() => handleStyleToggle(style)}
                      style={{
                        padding: '0.4rem 0.8rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                        border: '1px solid', borderColor: checked ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                        background: checked ? 'rgba(0,242,254,0.1)' : 'var(--bg-surface-elevated)',
                        color: checked ? 'var(--accent-teal)' : 'var(--text-secondary)',
                        transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >{style}</button>
                  );
                })}
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
              <Settings size={16} /> Save Studio Profile
            </button>
          </form>
        )}

        {/* TAB 3: Staff Roster */}
        {activeSubTab === 'roster' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Manage Resident Tattoo Artists</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Associate your resident artists with your studio to make them available for client allocation.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {rosterArtists.map(artist => (
                  <div
                    key={artist.name}
                    style={{
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '10px', padding: '1.2rem',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: T, cursor: 'default'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(0,242,254,0.25)'; e.currentTarget.style.borderColor = 'rgba(0,242,254,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{artist.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', marginTop: '0.2rem' }}>Specialty: {artist.specialty}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Tenure: {artist.experience}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveRosterArtist(artist.name)}
                      style={{ background: 'none', border: 'none', color: 'var(--status-error)', cursor: 'pointer', opacity: 0.7, transition: 'all 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.2)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Register New Artist</h4>
              <form onSubmit={handleAddRosterArtist} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr', gap: '1rem', alignItems: 'flex-end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Artist Full Name</label>
                  <input type="text" required placeholder="e.g., Brandon Stark" value={newArtistName} onChange={e => setNewArtistName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '8px', background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Primary Style Specialization</label>
                  <select value={newArtistSpecialty} onChange={e => setNewArtistSpecialty(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '8px', background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }}>
                    {['Fine Line','Watercolor','Minimal','Geometric','Japanese','Traditional','Realism','Blackwork'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem', width: '100%', justifyContent: 'center', height: '38px', borderRadius: '8px' }}>
                  <Plus size={14} /> Add Resident
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
