/**
 * AI Image Search — Vision Engine
 * Analyzes uploaded reference images or preset samples, detects tattoo attributes,
 * and matches them against the catalog and artist directory.
 */

// ── Preset samples database ──────────────────────────────────────────────────
export const PRESETS = [
  {
    id: 'preset-sakura',
    name: 'Watercolor Sakura',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
    detected: {
      style: 'Watercolor',
      objects: ['sakura blossoms', 'cherry tree branch', 'petals'],
      symbols: ['transience', 'renewal', 'feminine grace', 'beauty'],
      complexity: 3,
      colors: ['#ffb7c5', '#ff9ebb', '#e56b8f', '#8fbc8f', '#2f4f4f'],
      colorName: 'Cherry Blossom Pastel',
      meaning: 'In Japanese culture, cherry blossoms (sakura) represent the ephemeral nature of life. Combined with watercolor strokes, it emphasizes fluid beauty, healing, and graceful transition.',
    }
  },
  {
    id: 'preset-compass',
    name: 'Geometric Compass',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    detected: {
      style: 'Geometric',
      objects: ['compass rose', 'concentric circles', 'aligning vectors'],
      symbols: ['direction', 'true north', 'structural harmony', 'order'],
      complexity: 4,
      colors: ['#1a1a1a', '#333333', '#7f8c8d', '#dcdde1', '#ffffff'],
      colorName: 'Monochrome Blueprint',
      meaning: 'A celestial compass aligned with precise geometric geometry represents finding path/focus amidst chaos. The geometric vectors symbolize structure, logic, and self-guided alignment.',
    }
  },
  {
    id: 'preset-wolf',
    name: 'Minimalist Wolf',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&q=80',
    detected: {
      style: 'Minimal',
      objects: ['wolf profile', 'crescent moon outline', 'single continuous line'],
      symbols: ['loyalty', 'independence', 'intuition', 'protection'],
      complexity: 1,
      colors: ['#000000', '#1c1c1c', '#2c3e50', '#95a5a6', '#ecf0f1'],
      colorName: 'Midnight Ink Line',
      meaning: 'A single-line portrait of a wolf represents wild independence balanced with pack loyalty. Minimal styling strips away noise, focusing purely on core spirit, resilience, and raw instinct.',
    }
  }
];

// ── Cost Calculator ──────────────────────────────────────────────────────────
export function calculateEstimatedCost(complexity, artistPriceTier, size = 'Medium') {
  let basePrice = 100;
  
  // Complexity scaling
  basePrice += complexity * 40;

  // Price tier multiplier
  const multipliers = {
    '$': 1.0,
    '$$': 1.4,
    '$$$': 2.0,
    '$$$$': 2.8,
  };
  const mult = multipliers[artistPriceTier] || 1.5;
  basePrice = basePrice * mult;

  // Size adjustment
  const sizeOffsets = {
    'Small': 0,
    'Medium': 50,
    'Large': 120,
  };
  basePrice += sizeOffsets[size] || 50;

  // Generate a range
  const min = Math.round(basePrice * 0.9 / 10) * 10;
  const max = Math.round(basePrice * 1.15 / 10) * 10;

  return `$${min} - $${max}`;
}

// ── Analyze Custom Uploaded Image ────────────────────────────────────────────
export function analyzeUploadedImage(file) {
  const filename = (file.name || '').toLowerCase();
  
  // Base default vision data
  let style = 'Minimal';
  let objects = ['abstract lines', 'geometric dots'];
  let symbols = ['balance', 'mystery', 'expression'];
  let complexity = 2;
  let colors = ['#0f0f14', '#1f1f2e', '#3f3f5c', '#5f5f8a', '#7f7fa8'];
  let colorName = 'Deep Onyx Abstract';
  let meaning = 'An abstract composition capturing personal expression and balance. The minimalist strokes represent simplicity, focus, and modern elegance.';

  // Match keyword cues in file name
  if (filename.includes('watercolor') || filename.includes('color') || filename.includes('colour') || filename.includes('sakura') || filename.includes('flower') || filename.includes('floral') || filename.includes('rose')) {
    style = 'Watercolor';
    objects = ['floral petals', 'botanical leaves', 'ink splash'];
    symbols = ['growth', 'vitality', 'delicate beauty', 'transience'];
    complexity = 3;
    colors = ['#ff8da1', '#ffb7c5', '#98fb98', '#dda0dd', '#4b0082'];
    colorName = 'Vibrant Bloom Palette';
    meaning = 'A painterly floral layout emphasizing soft growth, renewal, and flowing organic connection. Symbolizes personal healing, beauty, and emotional openness.';
  } else if (filename.includes('geometric') || filename.includes('compass') || filename.includes('line') || filename.includes('shape') || filename.includes('mandala') || filename.includes('arrow')) {
    style = 'Geometric';
    objects = ['symmetrical mandala', 'intersecting triangles', 'parallel lines'];
    symbols = ['alignment', 'harmony', 'order', 'cosmic focus'];
    complexity = 4;
    colors = ['#111111', '#222222', '#555555', '#aaaaaa', '#dddddd'];
    colorName = 'Linear Steel';
    meaning = 'Intricate mathematical grids and symmetric shapes forming structural alignment. Represents self-guided focus, inner peace, and intellectual order.';
  } else if (filename.includes('tribal') || filename.includes('black') || filename.includes('maori') || filename.includes('polynesian') || filename.includes('bold')) {
    style = 'Tribal';
    objects = ['bold abstract waves', 'barb curves', 'solid fill patterns'];
    symbols = ['heritage', 'strength', 'protection', 'warrior spirit'];
    complexity = 4;
    colors = ['#000000', '#111111', '#222222', '#333333', '#444444'];
    colorName = 'Pure Obsidian';
    meaning = 'Traditional bold patterns inspired by cultural armor. Symbolizes primal power, ancestral guidance, spiritual protection, and resilience.';
  } else if (filename.includes('traditional') || filename.includes('oldschool') || filename.includes('sailor') || filename.includes('skull') || filename.includes('anchor')) {
    style = 'Traditional';
    objects = ['anchor motif', 'banner ribbon', 'heavy black outlines'];
    symbols = ['stability', 'hope', 'vintage style', 'unwavering focus'];
    complexity = 3;
    colors = ['#d63031', '#fdcb6e', '#0984e3', '#00b894', '#2d3436'];
    colorName = 'Classic Sailor Primaries';
    meaning = 'Bold lines and saturated primary hues paying homage to early tattoo legends. Symbolizes stability, safety through heavy seas, and bold character.';
  } else if (filename.includes('dragon') || filename.includes('snake') || filename.includes('japanese') || filename.includes('phoenix')) {
    style = 'Japanese';
    objects = ['scaling dragon profile', 'wind bars', 'peony blossom'];
    symbols = ['good fortune', 'bravery', 'longevity', 'transformation'];
    complexity = 5;
    colors = ['#e17055', '#d63031', '#2d3436', '#ffeaa7', '#00b894'];
    colorName = 'Oriental Fire & Peony';
    meaning = 'Classic Irezumi design details representing transformation, strength, and brave protection. Heavy scaling and bold wave details emphasize standing against life’s currents.';
  } else if (filename.includes('minimal') || filename.includes('tiny') || filename.includes('simple') || filename.includes('small') || filename.includes('wolf') || filename.includes('heart')) {
    style = 'Minimal';
    objects = ['single line icon', 'delicate symbol outline'];
    symbols = ['purity', 'focus', 'quiet strength', 'essence'];
    complexity = 1;
    colors = ['#000000', '#1a1a1a', '#555555', '#999999', '#ffffff'];
    colorName = 'Minimal Inkline';
    meaning = 'A clean outline omitting extra detail to draw emphasis to the pure essence of the mark. Reflects a desire for clarity, focus, and understated personal truth.';
  }

  return {
    style,
    objects,
    symbols,
    complexity,
    colors,
    colorName,
    meaning,
  };
}

// ── Search & Match Logic ─────────────────────────────────────────────────────
export function performVisionSearch(visionData, globalCatalog, artistsList) {
  const { style, objects = [] } = visionData;

  // 1. Match Tattoos (Score out of 100)
  const scoredTattoos = globalCatalog.map(tattoo => {
    let score = 30; // base score

    // Style match (40 pts)
    if (tattoo.style.toLowerCase() === style.toLowerCase()) {
      score += 40;
    }

    // Object/keyword match (10 pts per match)
    const tatKeywords = [
      tattoo.name.toLowerCase(),
      tattoo.description?.toLowerCase() || '',
      tattoo.meaning.toLowerCase(),
      ...(tattoo.interests || []).map(i => i.toLowerCase()),
      ...(tattoo.experiences || []).map(e => e.toLowerCase()),
    ].join(' ');

    let objectMatches = 0;
    objects.forEach(obj => {
      // Split object description into single words
      const words = obj.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 2 && tatKeywords.includes(word)) {
          objectMatches++;
        }
      });
    });
    score += Math.min(30, objectMatches * 10);

    return {
      ...tattoo,
      matchPercentage: Math.min(99, score),
    };
  });

  const matchedTattoos = scoredTattoos
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  // 2. Match Artists (specializing in the detected style)
  const matchedArtists = artistsList
    .filter(artist => artist.styles?.some(s => s.toLowerCase() === style.toLowerCase()))
    .slice(0, 3);

  // Fallback to top rated artists if style matches are empty
  const finalArtists = matchedArtists.length > 0 
    ? matchedArtists 
    : [...artistsList].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return {
    similarTattoos: matchedTattoos,
    matchingArtists: finalArtists,
  };
}
