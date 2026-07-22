import React, { useState, useEffect } from 'react';
import {
  Sparkles, Heart, Compass, BookOpen, Database, Award,
  User, LogIn, ChevronRight, RefreshCw, Layers,
  Store, Users, ShieldCheck, Wand2, Bot, Search
} from 'lucide-react';
import { recommendTattoos } from './utils/recommender';
import { tattoosData } from './data/tattoosData';
import {
  IconTattooMachine,
  IconSwallow,
  IconSacredHeart,
  IconDiamondSparkle,
  IconAnchor,
  IconSkullDagger,
  IconAllSeeingEye,
  IconRose,
  IconHourglass,
  IconHorseshoe,
  IconGentlemanSkull,
  IconCompassRose
} from './components/ui/TattooIcons';

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
import ExploreFeed from './components/ExploreFeed';
import LandingPage from './components/LandingPage';
import { DottedSurface } from './components/ui/DottedSurface';

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
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1200&q=80",
    yearsExperience: "8 Years",
    specializations: ["Micro-Realism", "Botanical Art", "Color Blending"],
    certifications: ["Bloodborne Pathogens Certified", "Licensed Tattoo Artist (DOH)", "First Aid certified"],
    location: "Studio 404, 25 Broadway, New York, NY 10004",
    workingHours: "Tuesday - Saturday: 11:00 AM - 7:00 PM",
    priceRange: "$150 - $250 / hour",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="50" r="30" stroke-dasharray="1 3"/><path d="M50,10 C45,30 35,45 50,90 C65,45 55,30 50,10" fill="currentColor" fill-opacity="0.1"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20,50 C35,20 65,80 80,50" stroke-width="1.5"/><circle cx="50" cy="50" r="15" stroke-dasharray="3 3"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="30" y="30" width="40" height="40" stroke-dasharray="2 2"/><circle cx="50" cy="50" r="28"/></svg>`
    ],
    portfolioItems: [
      {
        image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=500&q=80",
        style: "Watercolor",
        description: "Enchanted cherry blossom branch swirling around the inner arm.",
        hoursTaken: "3.5 hours",
        price: "$600",
        healingPhoto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80",
        customerReview: "Absolutely stellar work! The colors blended beautifully and the healing photo shows it retained all its magic.",
        tags: ["floral", "colorful", "watercolor", "delicate"]
      },
      {
        image: "https://images.unsplash.com/photo-1611501487429-c88f1766f7f6?auto=format&fit=crop&w=500&q=80",
        style: "Fine Line",
        description: "Minimalist constellation pattern along the collarbone.",
        hoursTaken: "1.5 hours",
        price: "$250",
        healingPhoto: "https://images.unsplash.com/photo-1611501487429-c88f1766f7f6?auto=format&fit=crop&w=500&q=80",
        customerReview: "So delicate and clean. Barely felt any pain.ARIA is the absolute queen of lines!",
        tags: ["constellation", "astronomy", "minimal", "fine line"]
      }
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
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80",
    yearsExperience: "12 Years",
    specializations: ["Irezumi Sleeves", "Symmetric Mandalas", "Bold Outlining"],
    certifications: ["Master of Traditional Art (Kyoto Guild)", "Hygiene Standard Certified (Japan)", "Bloodborne Pathogens Certified"],
    location: "Irezumi Lab, 3-Chrome Shibuya, Tokyo 150-0002",
    workingHours: "Monday - Friday: 12:00 PM - 8:00 PM",
    priceRange: "$250 - $400 / hour",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M50,10 C20,30 20,70 50,90 C80,70 80,30 50,10 Z" stroke-width="1.5"/><path d="M50,30 C35,45 35,55 50,70 C65,55 65,45 50,30 Z" fill="currentColor" fill-opacity="0.15"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10,90 L90,10 M10,10 L90,90 M50,10 L50,90 M10,50 L90,50"/><circle cx="50" cy="50" r="30"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 2"/><polygon points="50,20 76,65 24,65"/></svg>`
    ],
    portfolioItems: [
      {
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
        style: "Japanese",
        description: "Full backpiece scaling dragon with wind bars and water splash.",
        hoursTaken: "24 hours",
        price: "$6000",
        healingPhoto: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
        customerReview: "An honor to wear Kenji's art. His precision with irezumi history and shading is unparalleled.",
        tags: ["dragon", "backpiece", "irezumi", "traditional"]
      }
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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    yearsExperience: "6 Years",
    specializations: ["Sacred Geometry", "Mathematical Blueprints", "Dotwork Shading"],
    certifications: ["Alliance of Professional Tattooists", "UK Health & Safety Register", "First Aid Certified"],
    location: "Draft & Ink, 78 Shoreditch High St, London E1 6JJ",
    workingHours: "Wednesday - Sunday: 10:00 AM - 6:00 PM",
    priceRange: "$100 - $180 / hour",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1"><circle cx="50" cy="50" r="35"/><circle cx="50" cy="50" r="25"/><circle cx="50" cy="50" r="15"/><line x1="15" y1="50" x2="85" y2="50"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="50,10 90,80 10,80"/><circle cx="50" cy="55" r="15"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20,20 L80,20 L80,80 L20,80 Z" stroke-width="1.5"/><line x1="20" y1="20" x2="80" y2="80"/><line x1="80" y1="20" x2="20" y2="80"/></svg>`
    ],
    portfolioItems: [
      {
        image: "https://images.unsplash.com/photo-1611501487429-c88f1766f7f6?auto=format&fit=crop&w=500&q=80",
        style: "Geometric",
        description: "Metatron's cube sleeve with intricate dotwork gradient shading.",
        hoursTaken: "8 hours",
        price: "$1200",
        healingPhoto: "https://images.unsplash.com/photo-1611501487429-c88f1766f7f6?auto=format&fit=crop&w=500&q=80",
        customerReview: "Stunning geometry. The dots are completely uniform and healed up perfectly black.",
        tags: ["metatron", "sacred-geometry", "sleeve", "dotwork"]
      }
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
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    yearsExperience: "10 Years",
    specializations: ["Polynesian Tribal", "Realist Portraits", "Wood/Stone Texturing"],
    certifications: ["Licensed Tattooist UK", "Polynesian Cultural Art Council Certified", "Aseptic Technique Certified"],
    location: "Origins Studio, 12 Greenwich High Rd, London SE10 8NN",
    workingHours: "Tuesday - Saturday: 11:00 AM - 8:00 PM",
    priceRange: "$120 - $200 / hour",
    portfolio: [
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M10,50 Q30,20 50,50 T90,50" stroke-width="2"/><path d="M10,60 Q30,30 50,60 T90,60" stroke-dasharray="1 2"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="45" r="20" fill="currentColor"/><circle cx="50" cy="70" r="10" stroke-width="1.5"/></svg>`,
      `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M30,30 L70,30 L50,70 Z" fill="currentColor" fill-opacity="0.2"/><circle cx="50" cy="40" r="5" fill="currentColor"/></svg>`
    ],
    portfolioItems: [
      {
        image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=500&q=80",
        style: "Tribal",
        description: "Polynesian ocean waves shoulder strap wrapping into chest curves.",
        hoursTaken: "5 hours",
        price: "$800",
        healingPhoto: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=500&q=80",
        customerReview: "Strong lines and bold flow. Felt a genuine connection to the cultural history.",
        tags: ["tribal", "polynesian", "chest", "bold"]
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
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
  
  // ── Toast Notification State ──────────────────────────────────────────────
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };


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
    if (isGuest) {
      showToast('Login to save items');
      setShowAuthModal(true);
      return;
    }
    setSavedTattooIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('soulink_saved_tattoos', JSON.stringify(updated));
      return updated;
    });
  };

  const handleTryInSimulator = (tattoo) => {
    if (isGuest) {
      showToast('Login to use the Simulator');
      setShowAuthModal(true);
      return;
    }
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
    if (isGuest) {
      showToast('Login to book an appointment');
      setShowAuthModal(true);
      return;
    }
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
      { id: 'Dashboard', label: 'My Dashboard', icon: IconGentlemanSkull },
      { id: 'Consultant', label: 'AI Consultant', icon: IconAllSeeingEye },
      { id: 'Generator', label: 'AI Generator', icon: IconDiamondSparkle },
      { id: 'ImageSearch', label: 'AI Image Search', icon: IconCompassRose },
      { id: 'Assessment', label: 'Soul Assessment', icon: IconSacredHeart },
      { id: 'Simulator', label: 'Tattoo Simulator', icon: IconHourglass },
      { id: 'Artists', label: 'Artist Finder', icon: IconRose },
      { id: 'Stories', label: 'Community Stories', icon: IconSwallow },
      { id: 'Explore', label: 'Explore Feed', icon: IconAnchor },
    ],
    Shopkeeper: [
      { id: 'ShopDashboard', label: 'Studio Console', icon: IconHorseshoe },
      { id: 'Artists', label: 'Artist Directory', icon: IconRose },
      { id: 'Stories', label: 'Community Stories', icon: IconSwallow },
    ],
    Admin: [
      { id: 'Admin', label: 'Admin Console', icon: IconSkullDagger },
      { id: 'Artists', label: 'Artist Directory', icon: IconRose },
      { id: 'Stories', label: 'Community Stories', icon: IconSwallow },
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
    Customer: { color: '#C0C8D8', label: 'Customer', icon: IconGentlemanSkull },
    Shopkeeper: { color: '#ADB5BD', label: 'Shopkeeper', icon: IconHorseshoe },
    Admin: { color: '#ADB5BD', label: 'Admin', icon: IconSkullDagger },
  };
  const currentRole = roleColors[userRole];

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <DottedSurface>
      <div className="dashboard-grid">

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">

        {/* Brand Logo */}
        <div 
          onClick={() => setShowLanding(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
          title="Return to Home Page"
        >
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 4px 15px rgba(173, 181, 189, )'
          }}>
            <IconTattooMachine size={24} color="#07070a" />
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
          {/* Home / Landing Page Button */}
          <button
            id="tab-home"
            type="button"
            onClick={() => setShowLanding(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              padding: '0.85rem 1.2rem', borderRadius: '12px', border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem',
              fontWeight: 400,
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              borderLeft: '3px solid transparent',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '0.4rem',
              paddingBottom: '1.2rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(4px) scale(1.04)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateX(0) scale(1)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <ChevronRight size={16} style={{ rotate: '180deg' }} />
            <span>← Back to Home</span>
          </button>
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
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderLeft: active ? `3px solid ${currentRole.color}` : '3px solid transparent'
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.transform = 'translateX(4px) scale(1.04)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  e.currentTarget.style.background = active ? `${currentRole.color}12` : 'transparent';
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
                      background: active ? 'rgba(173, 181, 189, )' : 'var(--bg-surface-elevated)',
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

        <div key={activeTab} className="animate-slide-up" style={{ width: '100%', minHeight: '100%' }}>
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

        {activeTab === 'Explore' && (
          <ExploreFeed
            artistsList={artistsList}
            setActiveTab={setActiveTab}
            isGuest={isGuest}
            onRequireAuth={() => {
              showToast('Login to continue');
              setShowAuthModal(true);
            }}
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

        </div>
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

      {/* ── GLOBAL TOAST NOTIFICATION ── */}
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          background: 'var(--bg-surface-elevated)', border: '1px solid var(--accent-teal)',
          borderRadius: '12px', padding: '1rem 1.5rem', boxShadow: 'var(--shadow-glow)',
          zIndex: 2000, display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'fadeIn 0.3s ease forwards'
        }}>
          <Sparkles size={18} style={{ color: 'var(--accent-teal)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{toastMsg}</span>
        </div>
      )}

      </div>
    </DottedSurface>
  );
}
