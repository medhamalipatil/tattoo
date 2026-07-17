/**
 * AI Tattoo Consultant — Logic Engine
 * Generates personalized tattoo consultation reports from conversational answers.
 * Consultation history is persisted to localStorage.
 */

// ── Personality Archetype Mapper ──────────────────────────────────────────────
export function getPersonalitySummary(answers) {
  const { personality, lifestyle = [], values = [], purpose } = answers;

  const archetypeMap = {
    Introverted: {
      'Spiritual & Mindful': 'The Quiet Visionary',
      'Creative & Artistic': 'The Introspective Creator',
      'Homebody & Cozy': 'The Serene Philosopher',
      default: 'The Reflective Soul',
    },
    Extroverted: {
      'Social & Outgoing': 'The Vibrant Connector',
      'Active & Adventurous': 'The Bold Explorer',
      'Professional & Ambitious': 'The Driven Leader',
      default: 'The Expressive Trailblazer',
    },
    Ambivert: {
      'Creative & Artistic': 'The Balanced Artist',
      'Spiritual & Mindful': 'The Harmonious Seeker',
      default: 'The Adaptable Wanderer',
    },
  };

  const group = archetypeMap[personality] || archetypeMap.Ambivert;
  const primaryLifestyle = lifestyle[0] || 'default';
  const archetype = group[primaryLifestyle] || group.default;

  const personalityDesc = {
    Introverted: 'drawn inward, finding meaning in depth over breadth',
    Extroverted: 'energized by the world around you, expressive and unapologetically bold',
    Ambivert: 'beautifully balanced between reflection and self-expression',
  }[personality] || 'unique and wonderfully multidimensional';

  const valuesClause =
    values.length > 0
      ? `Your core values of **${values.slice(0, 2).join('** and **')}** are the quiet force that shapes every choice you make.`
      : 'Your values form the invisible backbone of your identity.';

  const purposeClause = {
    'A meaningful memory': 'You seek a tattoo that preserves a chapter of your story forever in ink.',
    'Personal expression': 'You want your body to speak without words — a living canvas of who you are.',
    'Pure aesthetic': 'You appreciate tattoo art for what it is — a beautiful addition to your world.',
    'Healing & closure': 'This tattoo will be a healing emblem — a permanent mark of transformation and resilience.',
    'Marking an identity': 'You are ready to anchor an aspect of your identity forever into your skin.',
    'Celebrating a milestone': 'This is a celebration — a permanent reminder of how far you have come.',
  }[purpose] || 'Your reason for this tattoo is deeply personal and entirely your own.';

  return {
    archetype,
    summary: `You are the **${archetype}** — ${personalityDesc}. ${valuesClause} ${purposeClause}`,
  };
}

// ── Colour Palette Recommender ────────────────────────────────────────────────
export function getColourPalette(answers) {
  const { personality, lifestyle = [], styles = [] } = answers;

  if (styles.includes('Blackwork') || styles.includes('Tribal')) {
    return {
      name: 'Classic Monochrome',
      description: 'Pure black ink with high contrast — bold, timeless, and striking on any skin tone.',
      colours: ['#000000', '#1a1a1a', '#333333', '#555555', '#888888'],
    };
  }
  if (styles.includes('Watercolor')) {
    return {
      name: 'Watercolor Bloom',
      description: 'Soft, flowing hues that bleed and blend like paint on canvas — expressive and alive.',
      colours: ['#ff6b9d', '#c084fc', '#67e8f9', '#86efac', '#fde68a'],
    };
  }
  if (personality === 'Introverted' || lifestyle.includes('Spiritual & Mindful')) {
    return {
      name: 'Mystic Deep Tones',
      description: 'Deep indigo, forest green, and charcoal — introspective, grounded, and richly soulful.',
      colours: ['#1e1b4b', '#14532d', '#374151', '#6d28d9', '#065f46'],
    };
  }
  if (personality === 'Extroverted' || lifestyle.includes('Active & Adventurous')) {
    return {
      name: 'Bold & Vivid',
      description: 'Rich, saturated tones — energetic, confident, and impossible to ignore.',
      colours: ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb'],
    };
  }
  if (lifestyle.includes('Creative & Artistic')) {
    return {
      name: 'Artistic Earth',
      description: 'Warm terracottas, dusty roses, and burnt umber — creative, organic, and deeply human.',
      colours: ['#92400e', '#b45309', '#be185d', '#7c3aed', '#1d4ed8'],
    };
  }
  return {
    name: 'Neutral Harmony',
    description: 'Warm greys, soft blacks, and subtle earth tones — balanced, versatile, and endlessly elegant.',
    colours: ['#292524', '#44403c', '#78716c', '#a8a29e', '#d6d3d1'],
  };
}

// ── Placement Recommender ─────────────────────────────────────────────────────
export function getPlacementSuggestions(answers) {
  const { lifestyle = [], purpose, styles = [] } = answers;

  const suggestions = [];

  if (lifestyle.includes('Active & Adventurous') || lifestyle.includes('Social & Outgoing')) {
    suggestions.push({ area: 'Forearm', reason: 'Highly visible during activity — a natural showcase for your boldest designs.' });
    suggestions.push({ area: 'Calf', reason: 'Endures movement beautifully and offers an excellent medium-to-large canvas.' });
  }
  if (lifestyle.includes('Spiritual & Mindful') || purpose === 'Healing & closure') {
    suggestions.push({ area: 'Sternum / Chest', reason: 'Close to the heart — the perfect intimate location for deeply personal symbols.' });
    suggestions.push({ area: 'Spine / Upper Back', reason: 'A sacred placement for spiritual, transformative, or flowing vertical designs.' });
  }
  if (lifestyle.includes('Social & Outgoing') || purpose === 'Personal expression') {
    suggestions.push({ area: 'Wrist', reason: 'Always visible — a quiet but powerful conversation starter.' });
    suggestions.push({ area: 'Behind the Ear / Neck', reason: 'Subtle yet expressive — a statement for those who look closely.' });
  }
  if (purpose === 'A meaningful memory' || purpose === 'Marking an identity') {
    suggestions.push({ area: 'Shoulder', reason: 'Classic and versatile — ages beautifully and never loses its impact.' });
  }
  if (styles.includes('Minimal') || styles.includes('Fine Line')) {
    suggestions.push({ area: 'Ankle / Inner Wrist', reason: 'Delicate designs are most powerful in intimate, subtle placements.' });
  }

  const defaults = [
    { area: 'Forearm', reason: 'One of the most versatile placements for almost any style and size.' },
    { area: 'Shoulder', reason: 'Classic placement that ages beautifully across all styles.' },
    { area: 'Upper Back', reason: 'The largest canvas — ideal for detailed or complex compositions.' },
  ];

  const unique = [...suggestions];
  for (const d of defaults) {
    if (unique.length >= 4) break;
    if (!unique.find(s => s.area === d.area)) unique.push(d);
  }

  return unique.slice(0, 4);
}

// ── Main Report Generator ─────────────────────────────────────────────────────
export function generateConsultationReport(answers, globalCatalog = [], artistsList = []) {
  const { archetype, summary } = getPersonalitySummary(answers);
  const colourPalette = getColourPalette(answers);
  const placementSuggestions = getPlacementSuggestions(answers);

  // Interest mapping from consultation labels to catalog labels
  const interestMap = {
    'Nature & Outdoors': 'Nature',
    'Music & Art': 'Music',
    'Travel & Exploration': 'Travel',
    'Mythology & Stories': 'Mythology',
    'Fitness & Sport': 'Fitness',
    'Space & Universe': 'Space',
    'Anime & Pop Culture': 'Anime',
    'Books & Literature': 'Books',
  };
  const mappedInterests = (answers.interests || []).map(i => interestMap[i] || i);

  // Score each design
  const scoredDesigns = globalCatalog.map(tattoo => {
    let score = 40; // base

    // Values match (20 pts each)
    const valueMatch = (tattoo.values || []).filter(v => (answers.values || []).includes(v)).length;
    score += valueMatch * 20;

    // Interest match (15 pts each)
    const interestMatch = (tattoo.interests || []).filter(i => mappedInterests.includes(i)).length;
    score += interestMatch * 15;

    // Experience match (20 pts each)
    const expMatch = (tattoo.experiences || []).filter(e => (answers.experiences || []).includes(e)).length;
    score += expMatch * 20;

    // Style match (25 pts)
    if ((answers.styles || []).includes(tattoo.style)) score += 25;

    return { ...tattoo, matchScore: Math.min(99, score) };
  });

  const topDesigns = scoredDesigns.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

  // Match artist by specialization
  const matchedArtist =
    artistsList.find(a => a.styles?.some(s => (answers.styles || []).includes(s))) || artistsList[0];

  // Compile style descriptions
  const styleDescriptions = {
    Minimal: 'Clean, single-line simplicity with powerful negative space — timeless and understated.',
    Geometric: 'Precise shapes and mathematical patterns — structure that carries deep symbolic weight.',
    Watercolor: 'Painterly washes of colour that bleed and blend — expressive, soft, and truly alive.',
    Japanese: 'Bold outlines with rich cultural narratives — dramatic, historic, and eternally relevant.',
    Traditional: 'Classic bold lines and solid fills — iconic, long-lasting, and universally respected.',
    'Fine Line': 'Delicate, hair-thin precision — intricate, sophisticated, and quietly powerful.',
    Tribal: 'Bold geometric patterns rooted in ancient tradition — primal, protective, and culturally deep.',
    Blackwork: 'High-contrast solid black ink — architectural, striking, and supremely confident.',
    Realism: 'Photographic detail in ink — emotionally raw and technically breathtaking.',
  };

  const suggestedStyles = (answers.styles || []).slice(0, 3).map(s => ({
    name: s,
    description: styleDescriptions[s] || `${s} — a strong stylistic match for your profile.`,
  }));

  return {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    answers,
    archetype,
    personalitySummary: summary,
    recommendedSymbols: topDesigns,
    suggestedStyles,
    colourPalette,
    placementSuggestions,
    artistRecommendation: matchedArtist,
  };
}

// ── localStorage Persistence ──────────────────────────────────────────────────
export function saveConsultationToHistory(report) {
  const existing = loadConsultationHistory();
  const updated = [report, ...existing].slice(0, 10); // keep last 10
  localStorage.setItem('soulink_consultations', JSON.stringify(updated));
}

export function loadConsultationHistory() {
  try {
    const raw = localStorage.getItem('soulink_consultations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
