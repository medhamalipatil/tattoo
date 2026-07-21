import React from 'react';
import { Sparkles, Bot, Compass, Award, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Particles } from './ui/Particles';

export default function LandingPage({ onEnter }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Particles
        color="#ffffff"
        particleCount={25000}
        particleSize={5}
        animate={true}
        className="z-0"
      />
      {/* Ambient background glows removed in favor of Particles */}

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '1000px' }}>
        
        {/* Hero Section */}
        <div className="animate-slide-up" style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(212, 175, 55, 0.1)', padding: '0.5rem 1.2rem',
            borderRadius: '30px', border: '1px solid rgba(212, 175, 55, 0.2)',
            marginBottom: '1.5rem', color: 'var(--accent-gold)', fontSize: '0.85rem',
            fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
          }}>
            <Sparkles size={16} /> Discover Your Soul's Ink
          </div>
          
          <h1 className="glow-text" style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-display)'
          }}>
            Welcome to <span className="gradient-text">SoulInk</span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            The premium AI-powered tattoo discovery platform. Match with world-class artists, visualize your next masterpiece, and explore ink that speaks to your soul.
          </p>

          <button 
            onClick={onEnter} 
            className="btn-primary hover-lift"
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}
          >
            Enter SoulInk <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="stagger-2" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem'
        }}>
          
          <FeatureCard 
            icon={<Bot size={32} color="var(--accent-teal)" />}
            title="AI Consultant"
            description="Our intelligent AI analyzes your personality, mood, and preferences to recommend the perfect tattoo designs."
            delay="0.2s"
          />
          
          <FeatureCard 
            icon={<Compass size={32} color="var(--accent-gold)" />}
            title="Tattoo Simulator"
            description="Try before you commit. Visualize how any design looks on your own body with our state-of-the-art AR simulator."
            delay="0.4s"
          />
          
          <FeatureCard 
            icon={<Award size={32} color="var(--accent-purple)" />}
            title="Elite Artists"
            description="Connect with a curated directory of top-tier, certified tattoo artists from around the globe."
            delay="0.6s"
          />

        </div>

        {/* Trust Indicators */}
        <div className="stagger-4" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          color: 'var(--text-muted)',
          flexWrap: 'wrap'
        }}>
          <TrustBadge icon={<ShieldCheck size={18} />} text="Verified Studios" />
          <TrustBadge icon={<Star size={18} />} text="4.9/5 Average Rating" />
          <TrustBadge icon={<Sparkles size={18} />} text="10k+ Ink Matches" />
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <div className="glass-panel hover-lift" style={{
      padding: '2rem 1.5rem',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      animationDelay: delay
    }}>
      <div style={{
        width: '60px', height: '60px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
