import React from 'react';

/* ─────────────────────────────────────────────
   Doodles.jsx — Playful SVG Doodle Components
   Scatter these anywhere for hand-drawn flair!
───────────────────────────────────────────── */

// Individual doodle shapes
export const DoodleStar = ({ size = 40, color = '#CED4DA', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 4 L34 22 L52 22 L38 33 L43 52 L30 41 L17 52 L22 33 L8 22 L26 22 Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleStarOutline = ({ size = 40, color = '#ADB5BD', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 6 L34.5 21 L50 21 L37.5 30 L42 46 L30 37 L18 46 L22.5 30 L10 21 L25.5 21 Z"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleHeart = ({ size = 40, color = '#CED4DA', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 50 C10 35 5 20 15 12 C20 8 27 10 30 16 C33 10 40 8 45 12 C55 20 50 35 30 50 Z"
      fill={color}
      stroke={color}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleHeartOutline = ({ size = 40, color = '#DEE2E6', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 50 C10 35 5 20 15 12 C20 8 27 10 30 16 C33 10 40 8 45 12 C55 20 50 35 30 50 Z"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleSquiggle = ({ width = 80, color = '#ADB5BD', style = {}, className = '' }) => (
  <svg width={width} height={24} viewBox="0 0 120 24" fill="none" style={style} className={className}>
    <path
      d="M4 12 Q16 4 28 12 Q40 20 52 12 Q64 4 76 12 Q88 20 100 12 Q112 4 116 10"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const DoodleZigzag = ({ width = 100, color = '#CED4DA', style = {}, className = '' }) => (
  <svg width={width} height={24} viewBox="0 0 140 28" fill="none" style={style} className={className}>
    <polyline
      points="4,22 24,6 44,22 64,6 84,22 104,6 124,22 136,12"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const DoodleCircle = ({ size = 50, color = '#DEE2E6', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 8 C44 6 54 16 54 30 C54 44 44 54 30 54 C16 54 6 44 6 30 C6 18 14 8 26 7"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const DoodleArrow = ({ size = 50, color = '#ADB5BD', rotation = 0, style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none"
    style={{ transform: `rotate(${rotation}deg)`, ...style }} className={className}>
    <path
      d="M8 30 Q20 20 40 28"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M32 20 L42 28 L32 38"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const DoodleDots = ({ color = '#ADB5BD', style = {}, className = '' }) => (
  <svg width={60} height={40} viewBox="0 0 70 50" fill="none" style={style} className={className}>
    <circle cx="10" cy="10" r="4" fill={color} />
    <circle cx="30" cy="10" r="4" fill={color} />
    <circle cx="50" cy="10" r="4" fill={color} />
    <circle cx="20" cy="28" r="4" fill={color} opacity="0.6" />
    <circle cx="40" cy="28" r="4" fill={color} opacity="0.6" />
    <circle cx="10" cy="46" r="4" fill={color} opacity="0.3" />
    <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
    <circle cx="50" cy="46" r="4" fill={color} opacity="0.3" />
  </svg>
);

export const DoodleSpiral = ({ size = 50, color = '#CED4DA', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 30 C30 26 34 22 38 26 C44 32 40 44 30 44 C18 44 10 34 14 22 C18 10 32 8 42 14 C52 20 54 36 46 46"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const DoodleLightning = ({ size = 40, color = '#ADB5BD', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 50 60" fill="none" style={style} className={className}>
    <path
      d="M28 4 L12 30 L24 30 L18 56 L38 24 L26 24 Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleDiamond = ({ size = 40, color = '#DEE2E6', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <path
      d="M30 6 L54 30 L30 54 L6 30 Z"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M30 14 L46 30 L30 46 L14 30 Z"
      fill={color}
      opacity="0.25"
    />
  </svg>
);

export const DoodleCross = ({ size = 30, color = '#CED4DA', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style} className={className}>
    <line x1="8" y1="20" x2="32" y2="20" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="20" y1="8" x2="20" y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const DoodleFlower = ({ size = 50, color = '#ADB5BD', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style} className={className}>
    <ellipse cx="30" cy="16" rx="7" ry="12" fill={color} opacity="0.7" />
    <ellipse cx="30" cy="44" rx="7" ry="12" fill={color} opacity="0.7" />
    <ellipse cx="16" cy="30" rx="12" ry="7" fill={color} opacity="0.7" />
    <ellipse cx="44" cy="30" rx="12" ry="7" fill={color} opacity="0.7" />
    <ellipse cx="20" cy="20" rx="6" ry="10" fill={color} opacity="0.5" transform="rotate(-45 20 20)" />
    <ellipse cx="40" cy="20" rx="6" ry="10" fill={color} opacity="0.5" transform="rotate(45 40 20)" />
    <ellipse cx="20" cy="40" rx="6" ry="10" fill={color} opacity="0.5" transform="rotate(45 20 40)" />
    <ellipse cx="40" cy="40" rx="6" ry="10" fill={color} opacity="0.5" transform="rotate(-45 40 40)" />
    <circle cx="30" cy="30" r="8" fill="#ADB5BD" />
  </svg>
);

/* ─────────────────────────────────────────────
   DoodleBackground — Full-page scattered doodles
   Place at z-index 0 inside a relative container
───────────────────────────────────────────── */
export const DoodleBackground = () => (
  <div aria-hidden="true" style={{
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden'
  }}>
    {/* Top-left cluster */}
    <DoodleStar size={36} color="#CED4DA"
      style={{ position: 'absolute', top: '6%', left: '3%', opacity: 0.65, animation: 'doodleSpin 12s linear infinite' }} />
    <DoodleSquiggle width={90} color="#CED4DA"
      style={{ position: 'absolute', top: '13%', left: '1%', opacity: 0.5, transform: 'rotate(-15deg)' }} />
    <DoodleHeartOutline size={32} color="#ADB5BD"
      style={{ position: 'absolute', top: '22%', left: '5%', opacity: 0.55, animation: 'doodleBounce 3s ease-in-out infinite' }} />

    {/* Top-right cluster */}
    <DoodleStarOutline size={44} color="#CED4DA"
      style={{ position: 'absolute', top: '5%', right: '4%', opacity: 0.6, animation: 'doodleSpin 16s linear infinite reverse' }} />
    <DoodleDots color="#ADB5BD"
      style={{ position: 'absolute', top: '10%', right: '2%', opacity: 0.5 }} />
    <DoodleCircle size={42} color="#ADB5BD"
      style={{ position: 'absolute', top: '18%', right: '6%', opacity: 0.5, animation: 'doodleFloat 5s ease-in-out infinite' }} />

    {/* Mid-left */}
    <DoodleLightning size={38} color="#CED4DA"
      style={{ position: 'absolute', top: '40%', left: '2%', opacity: 0.6, animation: 'doodleBounce 4s ease-in-out infinite 0.5s' }} />
    <DoodleZigzag width={80} color="#ADB5BD"
      style={{ position: 'absolute', top: '50%', left: '0%', opacity: 0.45, transform: 'rotate(10deg)' }} />
    <DoodleSpiral size={44} color="#ADB5BD"
      style={{ position: 'absolute', top: '60%', left: '3%', opacity: 0.5, animation: 'doodleSpin 20s linear infinite' }} />

    {/* Mid-right */}
    <DoodleArrow size={44} color="#ADB5BD" rotation={30}
      style={{ position: 'absolute', top: '38%', right: '3%', opacity: 0.55, animation: 'doodleFloat 6s ease-in-out infinite 1s' }} />
    <DoodleDiamond size={36} color="#CED4DA"
      style={{ position: 'absolute', top: '52%', right: '2%', opacity: 0.5, animation: 'doodleSpin 14s linear infinite' }} />
    <DoodleFlower size={46} color="#ADB5BD"
      style={{ position: 'absolute', top: '64%', right: '4%', opacity: 0.5, animation: 'doodleFloat 7s ease-in-out infinite 0.5s' }} />

    {/* Bottom-left */}
    <DoodleHeart size={36} color="#CED4DA"
      style={{ position: 'absolute', bottom: '12%', left: '4%', opacity: 0.6, animation: 'doodleBounce 3.5s ease-in-out infinite 1s' }} />
    <DoodleCross size={28} color="#ADB5BD"
      style={{ position: 'absolute', bottom: '6%', left: '8%', opacity: 0.55, transform: 'rotate(20deg)' }} />
    <DoodleDots color="#ADB5BD"
      style={{ position: 'absolute', bottom: '18%', left: '1%', opacity: 0.45 }} />

    {/* Bottom-right */}
    <DoodleStarOutline size={40} color="#CED4DA"
      style={{ position: 'absolute', bottom: '14%', right: '5%', opacity: 0.6, animation: 'doodleSpin 10s linear infinite' }} />
    <DoodleSquiggle width={100} color="#ADB5BD"
      style={{ position: 'absolute', bottom: '8%', right: '2%', opacity: 0.5, transform: 'rotate(5deg)' }} />
    <DoodleCircle size={38} color="#CED4DA"
      style={{ position: 'absolute', bottom: '22%', right: '7%', opacity: 0.5, animation: 'doodleFloat 8s ease-in-out infinite 2s' }} />

    {/* Center accent doodles */}
    <DoodleStar size={22} color="#ADB5BD"
      style={{ position: 'absolute', top: '33%', left: '14%', opacity: 0.45, animation: 'doodleSpin 8s linear infinite' }} />
    <DoodleStar size={18} color="#CED4DA"
      style={{ position: 'absolute', top: '68%', right: '14%', opacity: 0.45, animation: 'doodleSpin 11s linear infinite reverse' }} />
    <DoodleCross size={22} color="#ADB5BD"
      style={{ position: 'absolute', top: '78%', left: '10%', opacity: 0.45, transform: 'rotate(45deg)' }} />
  </div>
);

/* ─────────────────────────────────────────────
   DoodleSection — Inline row of doodles
   Use between sections as a divider
───────────────────────────────────────────── */
export const DoodleDivider = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '0.5rem 0',
    opacity: 0.85,
    pointerEvents: 'none'
  }}>
    <DoodleSquiggle width={60} color="#CED4DA" />
    <DoodleStar size={22} color="#CED4DA" style={{ animation: 'doodleSpin 6s linear infinite' }} />
    <DoodleZigzag width={70} color="#ADB5BD" />
    <DoodleHeart size={22} color="#CED4DA" style={{ animation: 'doodleBounce 2.5s ease-in-out infinite' }} />
    <DoodleZigzag width={70} color="#ADB5BD" style={{ transform: 'scaleX(-1)' }} />
    <DoodleStarOutline size={22} color="#ADB5BD" style={{ animation: 'doodleSpin 9s linear infinite reverse' }} />
    <DoodleSquiggle width={60} color="#CED4DA" style={{ transform: 'scaleX(-1)' }} />
  </div>
);
