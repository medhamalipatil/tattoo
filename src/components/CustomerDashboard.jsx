import React, { useState } from 'react';
import { Heart, Clock, CheckCircle, XCircle, RefreshCcw, Calendar, Sparkles, User, Star } from 'lucide-react';
import { tattoosData } from '../data/tattoosData';

// Reusable pop handler helpers
const popIn = (e) => {
  e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
  e.currentTarget.style.boxShadow = '0 16px 48px -12px rgba(0, 242, 254, 0.35)';
  e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.4)';
};
const popOut = (e) => {
  e.currentTarget.style.transform = 'translateY(0) scale(1)';
  e.currentTarget.style.boxShadow = '';
  e.currentTarget.style.borderColor = '';
};

export default function CustomerDashboard({ bookings, userCredentials, globalCatalog, setActiveTab }) {
  const [filterStatus, setFilterStatus] = useState('All');

  const myBookings = bookings.filter(b =>
    b.customerEmail === (userCredentials?.email || 'guest@example.com') ||
    b.customerName === (userCredentials?.name || 'Guest User')
  );

  const filtered = filterStatus === 'All' ? myBookings : myBookings.filter(b => b.status === filterStatus);

  const statusColors = {
    Pending:     { bg: 'rgba(245, 158, 11, 0.1)',  color: 'var(--status-warning)', icon: Clock },
    Approved:    { bg: 'rgba(16, 185, 129, 0.1)',  color: 'var(--status-success)', icon: CheckCircle },
    Declined:    { bg: 'rgba(239, 68, 68, 0.1)',   color: 'var(--status-error)',   icon: XCircle },
    Rescheduled: { bg: 'rgba(157, 78, 221, 0.1)',  color: 'var(--accent-purple)',  icon: Calendar },
  };

  const totalBookings  = myBookings.length;
  const approvedCount  = myBookings.filter(b => b.status === 'Approved').length;
  const pendingCount   = myBookings.filter(b => b.status === 'Pending').length;

  // shared card transition
  const cardTransition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Welcome Header */}
      <div
        className="glass-panel stagger-1"
        style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', transition: cardTransition }}
        onMouseEnter={popIn}
        onMouseLeave={popOut}
      >
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <User className="gradient-text" />
            Welcome back, {userCredentials?.name || 'Guest'}!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Track your consultation requests, explore recommended designs, and manage your tattoo journey here.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('Assessment')}
          className="btn-primary"
          style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
        >
          <Sparkles size={16} /> Start Soul Assessment
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>

        <div
          className="glass-panel stagger-2"
          style={{ padding: '1.5rem', cursor: 'default', transition: cardTransition }}
          onMouseEnter={popIn}
          onMouseLeave={popOut}
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>TOTAL BOOKINGS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.3rem' }} className="glow-text">{totalBookings}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Consultation requests sent</span>
        </div>

        <div
          className="glass-panel stagger-3"
          style={{ padding: '1.5rem', cursor: 'default', transition: cardTransition }}
          onMouseEnter={popIn}
          onMouseLeave={popOut}
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>CONFIRMED</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--status-success)' }}>{approvedCount}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Approved by studios</span>
        </div>

        <div
          className="glass-panel stagger-4"
          style={{ padding: '1.5rem', cursor: 'default', transition: cardTransition }}
          onMouseEnter={popIn}
          onMouseLeave={popOut}
        >
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>AWAITING REPLY</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--status-warning)' }}>{pendingCount}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pending studio response</span>
        </div>

      </div>

      {/* My Bookings */}
      <div className="glass-panel stagger-5" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>My Consultation Requests</h3>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', 'Pending', 'Approved', 'Declined', 'Rescheduled'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterStatus === s ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                  background: filterStatus === s ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                  color: filterStatus === s ? 'var(--accent-teal)' : 'var(--text-secondary)',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Heart size={48} style={{ opacity: 0.2, marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }} />
            <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>No bookings yet!</p>
            <p style={{ fontSize: '0.85rem' }}>
              Go to <strong style={{ color: 'var(--accent-teal)' }}>Artist Finder</strong> tab to browse studios and request a consultation.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {filtered.map(b => {
              const statusInfo = statusColors[b.status] || statusColors['Pending'];
              const StatusIcon = statusInfo.icon;
              const design = globalCatalog.find(t => t.id === b.tattooId);

              return (
                <div
                  key={b.id}
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.01)',
                    borderRadius: '12px',
                    padding: '1.4rem 1.6rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    transition: cardTransition,
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.015)';
                    e.currentTarget.style.boxShadow = '0 14px 40px -10px rgba(0, 242, 254, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.35)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      Consultation with <span style={{ color: 'var(--accent-teal)' }}>{b.artistName}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                      <span><Calendar size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        {b.date}
                      </span>
                      {design && (
                        <span><Star size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--status-warning)' }} />
                          Design: {design.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    background: statusInfo.bg,
                    color: statusInfo.color,
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    <StatusIcon size={15} />
                    {b.status}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Design Preview */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.4rem' }}>Featured Designs</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Take the Soul Assessment to get personalized recommendations, or browse our top designs below.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
          {globalCatalog.slice(0, 6).map(tattoo => (
            <div
              key={tattoo.id}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '10px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                transition: cardTransition,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.06)';
                e.currentTarget.style.boxShadow = '0 12px 30px -8px rgba(0, 242, 254, 0.3)';
                e.currentTarget.style.borderColor = 'var(--accent-teal)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div style={{ width: '60px', height: '60px', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: tattoo.svgMarkup }} />
              <div style={{ fontSize: '0.72rem', fontWeight: 600, textAlign: 'center', color: 'var(--text-secondary)' }}>{tattoo.name}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--accent-teal)' }}>{tattoo.style}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
