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
      overflow: 'hidden',
    }}>
      {/* Full-screen background photo */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'url(/landing-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.55) saturate(0.85)',
      }} />

      {/* Dark cinematic gradient overlay — keeps text readable */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(10,10,18,0.62) 50%, rgba(0,0,0,0.80) 100%)',
      }} />

      {/* Subtle silver shimmer vignette */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(192,200,216,0.08) 0%, transparent 60%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 20, textAlign: 'center', maxWidth: '1050px' }}>

        {/* Hero */}
        <div className="animate-slide-up" style={{ marginBottom: '3rem' }}>
          <div className="stagger-1" style={{ textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Eyebrow badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(192, 200, 216, 0.08)',
              padding: '0.55rem 1.6rem',
              borderRadius: '50px',
              border: '1.5px solid rgba(192, 200, 216, 0.25)',
              marginBottom: '1.8rem',
              color: '#C0C8D8',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-groovy)',
              boxShadow: '0 4px 20px rgba(192, 200, 216, 0.1)'
            }}>
              <Sparkles size={18} color="#C0C8D8" />
              Discover Your Soul's Ink
              <Sparkles size={18} color="#C0C8D8" />
            </div>

            {/* Headline with shimmer */}
            <h1 className="glow-text" style={{
              fontSize: 'clamp(3.8rem, 10vw, 6.8rem)',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-groovy)',
              letterSpacing: '0.02em',
            }}>
              Welcome to SoulInk
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#9AA4B6',
              maxWidth: '620px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.65,
              fontWeight: 600
            }}>
              The premium AI-powered tattoo discovery platform. Match with world-class artists, visualize your next masterpiece, and explore ink that speaks to your soul.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <button
                onClick={onEnter}
                className="btn-primary hover-pop"
                style={{
                  padding: '1.1rem 3.2rem',
                  fontSize: '1.15rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-groovy)',
                }}
              >
                Enter SoulInk <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="stagger-2" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3.5rem'
        }}>
          <FeatureCard
            icon={<Bot size={36} color="#C0C8D8" />}
            iconBg="rgba(192, 200, 216, 0.1)"
            iconBorder="rgba(192, 200, 216, 0.25)"
            title="AI CONSULTANT"
            description="Our intelligent AI analyzes your personality, mood, and preferences to recommend the perfect custom tattoo designs."
            delay="0.2s"
          />
          <FeatureCard
            icon={<Compass size={36} color="#E8EBF0" />}
            iconBg="rgba(232, 235, 240, 0.08)"
            iconBorder="rgba(232, 235, 240, 0.2)"
            title="TATTOO SIMULATOR"
            description="Try before you commit. Visualize how any design looks on your own body with our state-of-the-art AR simulator."
            delay="0.4s"
          />
          <FeatureCard
            icon={<Award size={36} color="#C0C8D8" />}
            iconBg="rgba(192, 200, 216, 0.1)"
            iconBorder="rgba(192, 200, 216, 0.25)"
            title="ELITE ARTISTS"
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
          borderTop: '1px solid rgba(192, 200, 216, 0.12)',
          flexWrap: 'wrap'
        }}>
          <TrustBadge icon={<ShieldCheck size={20} />} text="VERIFIED STUDIOS" color="#C0C8D8" />
          <TrustBadge icon={<Star size={20} />} text="4.9/5 RATING" color="#E8EBF0" />
          <TrustBadge icon={<Sparkles size={20} />} text="10K+ INK MATCHES" color="#C0C8D8" />
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, iconBg, iconBorder, title, description, delay }) {
  return (
    <div className="glass-panel hover-lift silver-accent-top" style={{
      padding: '2.2rem 1.8rem',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      animationDelay: delay,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '22px',
    }}>
      <div style={{
        width: '64px', height: '64px',
        borderRadius: '18px',
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1.5px solid ${iconBorder}`,
        boxShadow: `0 4px 20px rgba(192, 200, 216, 0.15)`,
      }}>
        {icon}
      </div>
      <h3 className="gradient-text" style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        fontFamily: 'var(--font-groovy)',
        letterSpacing: '0.03em'
      }}>{title}</h3>
      <p style={{ color: '#9AA4B6', fontSize: '1rem', lineHeight: 1.55, fontWeight: 500 }}>
        {description}
      </p>
    </div>
  );
}

function TrustBadge({ icon, text, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      fontSize: '0.9rem', fontWeight: 800,
      color: color,
      fontFamily: 'var(--font-groovy)',
      letterSpacing: '0.05em',
      background: 'rgba(192, 200, 216, 0.06)',
      padding: '0.5rem 1.3rem',
      borderRadius: '50px',
      border: `1.5px solid rgba(192, 200, 216, 0.2)`
    }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}
