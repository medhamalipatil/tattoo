import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Compass, BookOpen, Database, Award, User, LogIn, ChevronRight, RefreshCw, Layers } from 'lucide-react';
import { recommendTattoos } from './utils/recommender';
import { tattoosData } from './data/tattoosData';

// Component imports
import Assessment from './components/Assessment';
import TattooCard from './components/TattooCard';
import TattooDetailModal from './components/TattooDetailModal';
import TattooSimulator from './components/TattooSimulator';
import ArtistFinder from './components/ArtistFinder';
import StoryCollection from './components/StoryCollection';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('Assessment');
  const [userProfile, setUserProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [savedTattooIds, setSavedTattooIds] = useState([]);
  const [selectedTattooForSimulator, setSelectedTattooForSimulator] = useState(null);
  const [selectedTattooForModal, setSelectedTattooForModal] = useState(null);
  const [currentMood, setCurrentMood] = useState('Healing');
  const [isGuest, setIsGuest] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ name: 'Guest User', email: '' });

  // Recalculate recommendations when profile or mood changes
  useEffect(() => {
    if (userProfile) {
      const recs = recommendTattoos({
        ...userProfile,
        mood: currentMood
      });
      setRecommendations(recs);
    }
  }, [userProfile, currentMood]);

  // Handle assessment completion
  const handleAssessmentComplete = (profile) => {
    setUserProfile(profile);
  };

  // Bookmark toggling
  const handleToggleSave = (id) => {
    setSavedTattooIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      // Save to localStorage
      localStorage.setItem('soulink_saved_tattoos', JSON.stringify(updated));
      return updated;
    });
  };

  // Fetch bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem('soulink_saved_tattoos');
    if (saved) {
      setSavedTattooIds(JSON.parse(saved));
    }
  }, []);

  // Simulator navigation shortcut
  const handleTryInSimulator = (tattoo) => {
    setSelectedTattooForSimulator(tattoo);
    setActiveTab('Simulator');
  };

  // Auth Simulation
  const handleAuth = (e) => {
    e.preventDefault();
    if (userCredentials.email) {
      setIsGuest(false);
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    setIsGuest(true);
    setUserCredentials({ name: 'Guest User', email: '' });
  };

  const handleRetakeAssessment = () => {
    setUserProfile(null);
    setRecommendations([]);
  };

  return (
    <div className="dashboard-grid">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 242, 254, 0.4)'
          }}>
            <Sparkles size={20} style={{ color: '#07070a' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }} className="glow-text">
              SoulInk
            </h1>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-teal)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 'bold' }}>
              AI Recommender
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', flex: 1 }}>
          {[
            { id: 'Assessment', label: 'Soul Assessment', icon: Sparkles },
            { id: 'Simulator', label: 'Tattoo Simulator', icon: Compass },
            { id: 'Artists', label: 'Artist Finder', icon: Award },
            { id: 'Stories', label: 'Community Stories', icon: BookOpen },
            { id: 'Admin', label: 'Admin Console', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id.toLowerCase()}`}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'Simulator') setSelectedTattooForSimulator(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.9rem 1.2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: active ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                  color: active ? 'var(--accent-teal)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s ease',
                  borderLeft: active ? '3px solid var(--accent-teal)' : '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Account Section */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {isGuest ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Currently browsing as Guest</div>
              <button
                id="btn-login-trigger"
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
                style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', width: '100%', justifyContent: 'center' }}
              >
                <LogIn size={14} /> Log In / Sign Up
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)' }}>
                  <User size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{userCredentials.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Registered Member</div>
                </div>
              </div>
              <button
                id="btn-logout"
                type="button"
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <main className="main-content">
        
        {/* Top Floating Mood Panel (Only displays when recommendations exist) */}
        {activeTab === 'Assessment' && userProfile && (
          <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronRight size={14} style={{ color: 'var(--accent-teal)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>How is your soul feeling today?</span>
            </div>
            
            {/* Mood selector list */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Happy', 'Broken', 'Hopeful', 'Confident', 'Lost', 'Healing'].map(md => {
                const active = currentMood === md;
                return (
                  <button
                    key={md}
                    id={`mood-btn-${md.toLowerCase()}`}
                    type="button"
                    onClick={() => setCurrentMood(md)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: active ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.08)',
                      background: active ? 'rgba(0, 242, 254, 0.12)' : 'var(--bg-surface-elevated)',
                      color: active ? 'var(--accent-teal)' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {md}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Route/Tab Display */}
        {activeTab === 'Assessment' && (
          <div>
            {!userProfile ? (
              <Assessment onComplete={handleAssessmentComplete} />
            ) : (
              <div className="animate-fade-in">
                {/* Result header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Your Ink Matches</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                      Recommendations calculated using hybrid trait and value matching, adjusted for <strong>{currentMood}</strong> mood.
                    </p>
                  </div>

                  <button
                    id="btn-retake-quiz"
                    type="button"
                    onClick={handleRetakeAssessment}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    <RefreshCw size={14} /> Retake Quiz
                  </button>
                </div>

                {/* Grid of Results */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                  {recommendations.map(tattoo => (
                    <TattooCard 
                      key={tattoo.id} 
                      tattoo={tattoo} 
                      onSelect={setSelectedTattooForModal} 
                      isSaved={savedTattooIds.includes(tattoo.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>

                {/* Wishlist comparison panel */}
                {savedTattooIds.length > 0 && (
                  <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Heart size={16} fill="var(--accent-teal)" style={{ color: 'var(--accent-teal)' }} /> Saved Wishlist Collection ({savedTattooIds.length})
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                      You have bookmarked these designs. Tap any design to review matching parameters side-by-side or try them in the simulator.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {savedTattooIds.map(id => {
                        const tat = tattoosData.find(t => t.id === id);
                        if (!tat) return null;
                        return (
                          <div 
                            key={id}
                            id={`wishlist-item-${id}`}
                            onClick={() => setSelectedTattooForModal(tat)}
                            style={{
                              background: 'var(--bg-surface-elevated)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '8px',
                              padding: '0.8rem 1rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.8rem',
                              cursor: 'pointer',
                              transition: 'border-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-teal)'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                          >
                            <div style={{ width: '28px', height: '28px', color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: tat.svgMarkup }} />
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{tat.name}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tat.style}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Simulator' && (
          <TattooSimulator preselectedTattoo={selectedTattooForSimulator} />
        )}

        {activeTab === 'Artists' && (
          <ArtistFinder />
        )}

        {activeTab === 'Stories' && (
          <StoryCollection />
        )}

        {activeTab === 'Admin' && (
          <AdminPanel />
        )}

      </main>

      {/* 3. MODALS AND OVERLAYS */}
      
      {/* Detail Dialog Modal */}
      {selectedTattooForModal && (
        <TattooDetailModal 
          tattoo={selectedTattooForModal}
          onClose={() => setSelectedTattooForModal(null)}
          isSaved={savedTattooIds.includes(selectedTattooForModal.id)}
          onToggleSave={handleToggleSave}
          onTryInSimulator={handleTryInSimulator}
        />
      )}

      {/* Auth Authentication Simulation Dialog Modal */}
      {showAuthModal && (
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
          onClick={() => setShowAuthModal(false)}
        >
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '380px',
              padding: '2rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={18} className="gradient-text" /> Member Registration
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Simulate a secure JWT/OAuth authentication flow. Signing in permits syncing favorites to cloud tables.
              </p>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>User Nickname</label>
                <input 
                  id="auth-name"
                  type="text" 
                  required 
                  placeholder="e.g., Medha Malipatil"
                  value={userCredentials.name}
                  onChange={(e) => setUserCredentials({ ...userCredentials, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Email Address</label>
                <input 
                  id="auth-email"
                  type="email" 
                  required 
                  placeholder="name@university.edu"
                  value={userCredentials.email}
                  onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  id="btn-cancel-auth"
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-auth"
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  Authenticate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
