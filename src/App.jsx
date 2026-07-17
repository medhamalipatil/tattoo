import React, { useState, useEffect } from 'react';
import {
  Sparkles, Heart, Compass, BookOpen, Database, Award,
  User, LogIn, ChevronRight, RefreshCw, Layers,
  Store, Users, ShieldCheck, Wand2, Bot, Search
} from 'lucide-react';
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
import ShopkeeperDashboard from './components/ShopkeeperDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import AIConsultant from './components/AIConsultant';
import TattooGenerator from './components/TattooGenerator';
import ImageSearch from './components/ImageSearch';

// ── Initial mock artists list (shared state) ──────────────────────────────────
const initialArtists = [
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

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  // ── Role System ───────────────────────────────────────────────────────────
  const [userRole, setUserRole] = useState('Customer'); // 'Customer' | 'Shopkeeper' | 'Admin'

  // ── Shared / Lifted State ─────────────────────────────────────────────────
  const [globalCatalog, setGlobalCatalog] = useState(tattoosData);
  const [artistsList, setArtistsList] = useState(initialArtists);
  const [bookings, setBookings] = useState([]);

  // ── Customer State ────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [savedTattooIds, setSavedTattooIds] = useState([]);
  const [selectedTattooForSimulator, setSelectedTattooForSimulator] = useState(null);
  const [selectedTattooForModal, setSelectedTattooForModal] = useState(null);
  const [currentMood, setCurrentMood] = useState('Healing');

  // ── Auth State ────────────────────────────────────────────────────────────
  const [isGuest, setIsGuest] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ name: 'Guest User', email: '' });

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (userProfile) {
      const recs = recommendTattoos({ ...userProfile, mood: currentMood });
      setRecommendations(recs);
    }
  }, [userProfile, currentMood, globalCatalog]);

  useEffect(() => {
    const saved = localStorage.getItem('soulink_saved_tattoos');
    if (saved) setSavedTattooIds(JSON.parse(saved));
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAssessmentComplete = (profile) => setUserProfile(profile);

  const handleToggleSave = (id) => {
    setSavedTattooIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('soulink_saved_tattoos', JSON.stringify(updated));
      return updated;
    });
  };

  const handleTryInSimulator = (tattoo) => {
    setSelectedTattooForSimulator(tattoo);
    setActiveTab('Simulator');
  };

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

  const handleAddBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'Pending',
    };
    setBookings(prev => [...prev, newBooking]);
  };

  // ── Role-based Navigation ─────────────────────────────────────────────────
  const roleNavConfig = {
    Customer: [
      { id: 'Dashboard', label: 'My Dashboard', icon: User },
      { id: 'Consultant', label: 'AI Consultant', icon: Bot },
      { id: 'Generator', label: 'AI Generator', icon: Wand2 },
      { id: 'ImageSearch', label: 'AI Image Search', icon: Search },
      { id: 'Assessment', label: 'Soul Assessment', icon: Sparkles },
      { id: 'Simulator', label: 'Tattoo Simulator', icon: Compass },
      { id: 'Artists', label: 'Artist Finder', icon: Award },
      { id: 'Stories', label: 'Community Stories', icon: BookOpen },
    ],
    Shopkeeper: [
      { id: 'ShopDashboard', label: 'Studio Console', icon: Store },
      { id: 'Artists', label: 'Artist Directory', icon: Award },
      { id: 'Stories', label: 'Community Stories', icon: BookOpen },
    ],
    Admin: [
      { id: 'Admin', label: 'Admin Console', icon: Database },
      { id: 'Artists', label: 'Artist Directory', icon: Award },
      { id: 'Stories', label: 'Community Stories', icon: BookOpen },
    ],
  };

  // When switching roles, reset to default tab for that role
  const handleRoleSwitch = (role) => {
    setUserRole(role);
    const defaultTabs = { Customer: 'Dashboard', Shopkeeper: 'ShopDashboard', Admin: 'Admin' };
    setActiveTab(defaultTabs[role]);
  };

  const tabs = roleNavConfig[userRole];

  const roleColors = {
    Customer: { color: '#00f2fe', label: 'Customer', icon: User },
    Shopkeeper: { color: '#f59e0b', label: 'Shopkeeper', icon: Store },
    Admin: { color: '#9d4edd', label: 'Admin', icon: ShieldCheck },
  };
  const currentRole = roleColors[userRole];

  return (
    <div className="dashboard-grid">

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">

        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 4px 15px rgba(0, 242, 254, 0.4)'
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

        {/* ── ROLE SWITCHER ── */}
        <div style={{
          background: 'var(--bg-surface-elevated)',
          borderRadius: '14px',
          padding: '0.6rem',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.4rem' }}>
            Active Role
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {Object.entries(roleColors).map(([role, cfg]) => {
              const RoleIcon = cfg.icon;
              const isActive = userRole === role;
              return (
                <button
                  key={role}
                  id={`role-btn-${role.toLowerCase()}`}
                  type="button"
                  onClick={() => handleRoleSwitch(role)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.7rem',
                    padding: '0.6rem 0.8rem', borderRadius: '10px', border: 'none',
                    background: isActive ? `${cfg.color}18` : 'transparent',
                    color: isActive ? cfg.color : 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: '0.85rem', fontWeight: isActive ? 700 : 400,
                    transition: 'all 0.2s ease',
                    borderLeft: isActive ? `3px solid ${cfg.color}` : '3px solid transparent'
                  }}
                >
                  <RoleIcon size={15} />
                  <span>{cfg.label}</span>
                  {isActive && (
                    <span style={{
                      marginLeft: 'auto', fontSize: '0.6rem', padding: '0.1rem 0.4rem',
                      borderRadius: '6px', background: `${cfg.color}28`, color: cfg.color, fontWeight: 'bold'
                    }}>
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          {tabs.map((tab) => {
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
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  padding: '0.85rem 1.2rem', borderRadius: '12px', border: 'none',
                  background: active ? `${currentRole.color}12` : 'transparent',
                  color: active ? currentRole.color : 'var(--text-secondary)',
                  cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem',
                  fontWeight: active ? 600 : 400, transition: 'all 0.2s ease',
                  borderLeft: active ? `3px solid ${currentRole.color}` : '3px solid transparent'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Account Section */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem' }}>
          {isGuest ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Browsing as Guest</div>
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
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: `${currentRole.color}1a`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentRole.color
                }}>
                  <User size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{userCredentials.name}</div>
                  <div style={{ fontSize: '0.68rem', color: currentRole.color }}>{userRole} Account</div>
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

      {/* ── MAIN CONTENT ── */}
      <main className="main-content">

        {/* Mood panel (Customer Assessment only) */}
        {activeTab === 'Assessment' && userProfile && (
          <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronRight size={14} style={{ color: 'var(--accent-teal)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>How is your soul feeling today?</span>
            </div>
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
                      padding: '0.4rem 0.8rem', borderRadius: '15px', fontSize: '0.75rem',
                      fontWeight: 600, cursor: 'pointer', border: '1px solid',
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

        {/* ── CUSTOMER ROLE TABS ── */}
        {activeTab === 'Dashboard' && (
          <CustomerDashboard
            bookings={bookings}
            userCredentials={userCredentials}
            globalCatalog={globalCatalog}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'Consultant' && (
          <AIConsultant
            globalCatalog={globalCatalog}
            artistsList={artistsList}
          />
        )}

        {activeTab === 'Generator' && (
          <TattooGenerator
            artistsList={artistsList}
            onAddBooking={handleAddBooking}
            userCredentials={userCredentials}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'ImageSearch' && (
          <ImageSearch
            globalCatalog={globalCatalog}
            artistsList={artistsList}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'Assessment' && (
          <div>
            {!userProfile ? (
              <Assessment onComplete={handleAssessmentComplete} />
            ) : (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Your Ink Matches</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                      Recommendations adjusted for <strong>{currentMood}</strong> mood.
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
                {savedTattooIds.length > 0 && (
                  <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Heart size={16} fill="var(--accent-teal)" style={{ color: 'var(--accent-teal)' }} /> Saved Wishlist ({savedTattooIds.length})
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {savedTattooIds.map(id => {
                        const tat = globalCatalog.find(t => t.id === id);
                        if (!tat) return null;
                        return (
                          <div
                            key={id}
                            id={`wishlist-item-${id}`}
                            onClick={() => setSelectedTattooForModal(tat)}
                            style={{
                              background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '8px', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center',
                              gap: '0.8rem', cursor: 'pointer', transition: 'border-color 0.2s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-teal)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                          >
                            <div style={{ width: '28px', height: '28px' }} dangerouslySetInnerHTML={{ __html: tat.svgMarkup }} />
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
          <ArtistFinder
            artistsList={artistsList}
            onAddBooking={handleAddBooking}
            userCredentials={userCredentials}
          />
        )}

        {activeTab === 'Stories' && <StoryCollection />}

        {/* ── SHOPKEEPER ROLE TABS ── */}
        {activeTab === 'ShopDashboard' && (
          <ShopkeeperDashboard
            artistsList={artistsList}
            setArtistsList={setArtistsList}
            bookings={bookings}
            setBookings={setBookings}
            globalCatalog={globalCatalog}
          />
        )}

        {/* ── ADMIN ROLE TABS ── */}
        {activeTab === 'Admin' && (
          <AdminPanel
            globalCatalog={globalCatalog}
            setGlobalCatalog={setGlobalCatalog}
            bookings={bookings}
            artistsList={artistsList}
            setArtistsList={setArtistsList}
          />
        )}

      </main>

      {/* ── DETAIL MODAL ── */}
      {selectedTattooForModal && (
        <TattooDetailModal
          tattoo={selectedTattooForModal}
          onClose={() => setSelectedTattooForModal(null)}
          isSaved={savedTattooIds.includes(selectedTattooForModal.id)}
          onToggleSave={handleToggleSave}
          onTryInSimulator={handleTryInSimulator}
        />
      )}

      {/* ── AUTH MODAL ── */}
      {showAuthModal && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 5, 8, 0.85)', backdropFilter: 'blur(8px)',
            zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
          }}
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="glass-panel"
            style={{ width: '100%', maxWidth: '380px', padding: '2rem', backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'var(--shadow-lg)' }}
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={18} className="gradient-text" /> Member Registration
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Sign in to sync your bookings and favorites across your account.
              </p>

              {/* Role selection inside auth */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Login as Role</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {Object.entries(roleColors)
                    .filter(([role]) => role !== 'Admin')
                    .map(([role, cfg]) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleSwitch(role)}
                      style={{
                        flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid',
                        borderColor: userRole === role ? cfg.color : 'rgba(255,255,255,0.08)',
                        background: userRole === role ? `${cfg.color}18` : 'transparent',
                        color: userRole === role ? cfg.color : 'var(--text-muted)',
                        cursor: 'pointer', fontSize: '0.75rem', fontWeight: userRole === role ? 700 : 400
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>User Nickname</label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  placeholder="e.g., Medha Malipatil"
                  value={userCredentials.name}
                  onChange={e => setUserCredentials({ ...userCredentials, name: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Email Address</label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={userCredentials.email}
                  onChange={e => setUserCredentials({ ...userCredentials, email: e.target.value })}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button id="btn-cancel-auth" type="button" onClick={() => setShowAuthModal(false)} className="btn-secondary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}>
                  Cancel
                </button>
                <button id="btn-submit-auth" type="submit" className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}>
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
