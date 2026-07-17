/**
 * AI Tattoo Generator — Prompt Builder
 * Constructs high-quality Stable Diffusion style prompts for Pollinations.ai
 */

// ── Complexity descriptions ───────────────────────────────────────────────────
const complexityDescriptions = {
  1: 'ultra minimalist, single line, very simple',
  2: 'simple, clean, minimal detail',
  3: 'moderately detailed, balanced complexity',
  4: 'highly detailed, intricate linework',
  5: 'extremely intricate, highly complex, ornate detail',
};

// ── Colour descriptions ───────────────────────────────────────────────────────
const colourDescriptions = {
  'Black & White': 'black and white, monochrome ink, no color',
  Coloured: 'full color, vibrant colors, rich saturation',
  'Muted Tones': 'muted desaturated colors, soft tones, subtle palette',
  Vibrant: 'vibrant saturated colors, bold hues, striking color palette',
};

// ── Build full prompt string ──────────────────────────────────────────────────
export function buildTattooPrompt(inputs) {
  const { meaning, style, theme, placement, complexity, colour, size } = inputs;

  const parts = [
    // Core subject
    style ? `${style.toLowerCase()} style tattoo design` : 'professional tattoo design',

    // Meaning / concept
    meaning ? `representing ${meaning}` : '',

    // Theme
    theme && theme !== 'Any' ? `${theme.toLowerCase()} theme` : '',

    // Complexity
    complexityDescriptions[complexity] || 'detailed',

    // Color
    colourDescriptions[colour] || 'black and white',

    // Size
    size ? `${size.toLowerCase()} size` : '',

    // Placement context
    placement && placement !== 'Any' ? `designed for ${placement.toLowerCase()} placement` : '',

    // Quality modifiers (Stable Diffusion style)
    'professional tattoo flash art',
    'clean crisp lines',
    'white background',
    'high resolution',
    'symmetrical',
    'centered composition',
  ];

  return parts.filter(Boolean).join(', ');
}

// ── Build Pollinations.ai image URL ──────────────────────────────────────────
export function buildPollinationsUrl(prompt, seed = null) {
  const encodedPrompt = encodeURIComponent(prompt);
  const usedSeed = seed !== null ? seed : Math.floor(Math.random() * 9999999);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&nologo=true&seed=${usedSeed}&model=flux`;
}

// ── Generate 4 varied image URLs for a single prompt ─────────────────────────
export function generateImageSet(inputs) {
  const prompt = buildTattooPrompt(inputs);
  return [0, 1, 2, 3].map(i => ({
    id: `${Date.now()}-${i}`,
    url: buildPollinationsUrl(prompt, Math.floor(Math.random() * 9999999)),
    prompt,
    seed: Math.floor(Math.random() * 9999999),
    inputs,
    createdAt: new Date().toISOString(),
  }));
}

// ── localStorage Persistence ──────────────────────────────────────────────────
export function saveGenerationToHistory(entry) {
  const existing = loadGenerationHistory();
  const updated = [entry, ...existing].slice(0, 20); // keep last 20 sets
  localStorage.setItem('soulink_generations', JSON.stringify(updated));
}

export function loadGenerationHistory() {
  try {
    const raw = localStorage.getItem('soulink_generations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
