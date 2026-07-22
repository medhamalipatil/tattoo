import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   TattooIcons.jsx — Traditional Flash Tattoo Line-Art Icons
   Hand-crafted SVG icons matching traditional flash tattoo flash art.
───────────────────────────────────────────────────────────────────────────── */

// 1. Tattoo Machine Icon
export const IconTattooMachine = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M12 24 H36 V36 H12 Z" />
    <path d="M20 16 V24" />
    <path d="M28 16 V24" />
    <path d="M16 16 H32" />
    <path d="M36 30 H48 L56 52 H46 L40 36" />
    <line x1="51" y1="46" x2="55" y2="58" strokeWidth="2" />
    <circle cx="20" cy="20" r="2" fill={color} />
    <circle cx="28" cy="20" r="2" fill={color} />
  </svg>
);

// 2. Swallow Bird Icon
export const IconSwallow = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M12 32 C20 20 36 12 56 16 C44 26 36 36 32 52 C28 38 18 36 12 32 Z" fill={color} fillOpacity="0.1" />
    <path d="M56 16 L40 28" />
    <path d="M32 52 L24 40" />
    <path d="M12 32 L8 44 L16 38 L20 48" />
    <circle cx="48" cy="20" r="2" fill={color} />
  </svg>
);

// 3. Sacred Heart with Dagger Icon
export const IconSacredHeart = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M32 56 C14 40 8 26 18 16 C24 10 32 14 32 20 C32 14 40 10 46 16 C56 26 50 40 32 56 Z" fill={color} fillOpacity="0.12" />
    <path d="M32 6 L32 20" />
    <path d="M26 12 L38 12" />
    <path d="M32 20 L26 30 L32 40 L38 30 Z" />
    <path d="M20 8 L14 4" />
    <path d="M44 8 L50 4" />
  </svg>
);

// 4. Diamond with Sparkles Icon
export const IconDiamondSparkle = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M32 54 L10 26 L20 10 H44 L54 26 Z" fill={color} fillOpacity="0.1" />
    <path d="M10 26 H54" />
    <path d="M20 10 L27 26 L32 54 L37 26 L44 10" />
    <path d="M32 6 V2" />
    <path d="M12 12 L8 8" />
    <path d="M52 12 L56 8" />
  </svg>
);

// 5. Traditional Tattoo Anchor Icon
export const IconAnchor = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <circle cx="32" cy="12" r="6" />
    <line x1="32" y1="18" x2="32" y2="54" />
    <line x1="18" y1="26" x2="46" y2="26" />
    <path d="M10 38 C10 52 22 56 32 56 C42 56 54 52 54 38" />
    <path d="M6 38 L14 38 L10 44 Z" fill={color} />
    <path d="M58 38 L50 38 L54 44 Z" fill={color} />
  </svg>
);

// 6. Skull with Dagger Icon
export const IconSkullDagger = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M20 28 C20 18 25 12 32 12 C39 12 44 18 44 28 C44 34 40 38 38 42 H26 C24 38 20 34 20 28 Z" fill={color} fillOpacity="0.1" />
    <circle cx="27" cy="26" r="3.5" fill={color} />
    <circle cx="37" cy="26" r="3.5" fill={color} />
    <path d="M32 30 L30 35 H34 Z" fill={color} />
    <line x1="28" y1="42" x2="28" y2="46" />
    <line x1="32" y1="42" x2="32" y2="46" />
    <line x1="36" y1="42" x2="36" y2="46" />
    {/* Dagger */}
    <line x1="32" y1="2" x2="32" y2="60" strokeWidth="3" />
    <line x1="22" y1="8" x2="42" y2="8" strokeWidth="3" />
  </svg>
);

// 7. All-Seeing Eye Icon
export const IconAllSeeingEye = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M8 32 C18 16 46 16 56 32 C46 48 18 48 8 32 Z" fill={color} fillOpacity="0.08" />
    <circle cx="32" cy="32" r="9" />
    <circle cx="32" cy="32" r="4" fill={color} />
    {/* Rays */}
    <line x1="32" y1="12" x2="32" y2="6" />
    <line x1="18" y1="18" x2="14" y2="12" />
    <line x1="46" y1="18" x2="50" y2="12" />
    <line x1="32" y1="52" x2="32" y2="58" />
    <line x1="18" y1="46" x2="14" y2="52" />
    <line x1="46" y1="46" x2="50" y2="52" />
  </svg>
);

// 8. Traditional Rose Icon
export const IconRose = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M32 20 C24 14 18 22 24 30 C16 34 22 46 32 42 C42 46 48 34 40 30 C46 22 40 14 32 20 Z" fill={color} fillOpacity="0.12" />
    <path d="M32 24 C28 22 28 28 32 28 C36 28 36 24 32 24" />
    <path d="M32 42 V58" />
    <path d="M32 48 C24 44 20 48 16 44" />
    <path d="M32 52 C40 48 44 52 48 48" />
  </svg>
);

// 9. Traditional Hourglass Icon
export const IconHourglass = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <line x1="14" y1="10" x2="50" y2="10" strokeWidth="3" />
    <line x1="14" y1="54" x2="50" y2="54" strokeWidth="3" />
    <path d="M18 10 L32 32 L18 54 H46 L32 32 L46 10 Z" fill={color} fillOpacity="0.08" />
    <path d="M24 46 H40 L32 36 Z" fill={color} opacity="0.6" />
  </svg>
);

// 10. Classic Horseshoe Icon
export const IconHorseshoe = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <path d="M16 12 V28 C16 42 24 50 32 50 C40 50 48 42 48 28 V12 H38 V28 C38 34 35 38 32 38 C29 38 26 34 26 28 V12 H16 Z" fill={color} fillOpacity="0.1" />
    <circle cx="21" cy="20" r="1.5" fill={color} />
    <circle cx="21" cy="30" r="1.5" fill={color} />
    <circle cx="21" cy="40" r="1.5" fill={color} />
    <circle cx="43" cy="20" r="1.5" fill={color} />
    <circle cx="43" cy="30" r="1.5" fill={color} />
    <circle cx="43" cy="40" r="1.5" fill={color} />
  </svg>
);

// 11. Gentleman Skull with Top Hat Icon
export const IconGentlemanSkull = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    {/* Top Hat */}
    <rect x="22" y="6" width="20" height="18" rx="2" fill={color} fillOpacity="0.2" />
    <line x1="12" y1="24" x2="52" y2="24" strokeWidth="3" />
    {/* Skull */}
    <path d="M20 32 C20 26 25 24 32 24 C39 24 44 26 44 32 C44 38 40 42 38 46 H26 C24 42 20 38 20 32 Z" fill={color} fillOpacity="0.1" />
    <circle cx="27" cy="34" r="3" fill={color} />
    <circle cx="37" cy="34" r="3" fill={color} />
    {/* Mustache */}
    <path d="M24 44 Q32 38 40 44 Q32 48 24 44 Z" fill={color} />
  </svg>
);

// 12. Compass Rose Icon
export const IconCompassRose = ({ size = 24, color = 'currentColor', style = {}, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
    <circle cx="32" cy="32" r="24" />
    <path d="M32 8 L37 27 L56 32 L37 37 L32 56 L27 37 L8 32 L27 27 Z" fill={color} fillOpacity="0.15" />
    <circle cx="32" cy="32" r="4" fill={color} />
  </svg>
);
