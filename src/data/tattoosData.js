// Tattoo Database
// Contains details, personality weights, and SVG representations for high-fidelity rendering

export const tattoosData = [
  {
    id: "phoenix",
    name: "The Phoenix",
    meaning: "Rebirth, renewal, growth, and rising stronger from ashes of adversity.",
    description: "A legendary bird that cyclicly regenerates or is otherwise born again. Associated with the sun, a phoenix obtains new life by arising from the ashes of its predecessor.",
    style: "Watercolor",
    category: "Mythology",
    painLevel: "High",
    difficultyLevel: "Intermediate",
    timeRequired: "3-5 Hours",
    estimatedCost: "$350 - $600",
    bestPlacements: ["Back", "Forearm", "Shoulder"],
    history: "Rooted in ancient Greek and Egyptian mythology, later adopted in Christian art as a symbol of resurrection.",
    culturalSignificance: "Stands for resilience across diverse global cultures, particularly in East Asian folklore (Fenghuang) and Western classical mythology.",
    
    // Recommendation dimensions
    traits: {
      introvert: 0.3,
      extrovert: 0.7,
      peaceful: 0.4,
      adventurous: 0.8,
      emotional: 0.9,
      logical: 0.2
    },
    values: ["Growth", "Spirituality", "Freedom"],
    interests: ["Mythology", "Space", "Travel"],
    experiences: ["Overcoming failure", "New beginning", "Mental health journey", "Self-discovery"],
    
    // SVG representation for simulator and previews
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sun disk background -->
        <circle cx="50" cy="45" r="22" stroke-dasharray="2 4" opacity="0.3" />
        <!-- Phoenix Body and Head -->
        <path d="M50,25 C52,22 55,20 53,16 C51,14 47,16 48,20 C48.5,22 49,24 50,25 Z" fill="currentColor" />
        <path d="M50,25 C47,28 46,33 47,38 C48,45 52,48 50,56 C49,60 46,65 47,70 C48,73 52,73 53,70" />
        <!-- Wings Left -->
        <path d="M47,38 C35,32 20,38 15,50 C12,58 20,62 25,58 C32,52 38,44 42,40" />
        <path d="M44,42 C33,40 23,47 20,56 C18,62 25,64 30,60 C36,54 41,47 43,44" />
        <path d="M42,46 C32,48 26,56 24,63 C23,67 29,68 33,64 C37,59 40,54 41,48" />
        <!-- Wings Right -->
        <path d="M53,38 C65,32 80,38 85,50 C88,58 80,62 75,58 C68,52 62,44 58,40" />
        <path d="M56,42 C67,40 77,47 80,56 C82,62 75,64 70,60 C64,54 59,47 57,44" />
        <path d="M58,46 C68,48 74,56 76,63 C77,67 71,68 67,64 C63,59 60,54 59,48" />
        <!-- Tail Feathers -->
        <path d="M49,60 C42,67 36,78 37,85 C37.5,88 41,86 42,82 C44,74 48,67 49,62" />
        <path d="M50,62 C50,70 50,82 50,88 C50,91 52,91 52,88 C52,82 51,70 50,62" />
        <path d="M51,60 C58,67 64,78 63,85 C62.5,88 59,86 58,82 C56,74 52,67 51,62" />
        <!-- Flame Sparks -->
        <circle cx="50" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="46" r="0.8" fill="currentColor" />
        <circle cx="88" cy="46" r="0.8" fill="currentColor" />
        <path d="M48,8 C49,6 51,6 52,8" />
      </svg>
    `
  },
  {
    id: "compass",
    name: "The Geometric Compass",
    meaning: "Guidance, exploration, focus, and finding your path in life.",
    description: "A nautical instrument for finding directions, combined with clean geometric elements representing stability, logic, and self-navigation.",
    style: "Geometric",
    category: "Travel",
    painLevel: "Medium",
    difficultyLevel: "Easy",
    timeRequired: "1.5 - 2.5 Hours",
    estimatedCost: "$150 - $250",
    bestPlacements: ["Forearm", "Wrist", "Ankle"],
    history: "Historically worn by sailors as a protective talisman to ensure a safe journey home.",
    culturalSignificance: "Symbolizes internal guidance, purpose, and the human drive to explore the unknown while staying anchored to one's values.",
    
    traits: {
      introvert: 0.4,
      extrovert: 0.6,
      peaceful: 0.5,
      adventurous: 0.9,
      emotional: 0.3,
      logical: 0.8
    },
    values: ["Freedom", "Success", "Growth"],
    interests: ["Travel", "Nature", "Space", "Mountains"],
    experiences: ["New beginning", "Becoming independent", "Self-discovery"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer circles -->
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="34" stroke-dasharray="1 3" />
        <!-- Crosshairs / Axes -->
        <line x1="50" y1="6" x2="50" y2="94" />
        <line x1="6" y1="50" x2="94" y2="50" />
        <!-- Diagonal geometric guidelines -->
        <line x1="20" y1="20" x2="80" y2="80" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6" />
        <line x1="20" y1="80" x2="80" y2="20" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6" />
        <!-- Compass points (needle) -->
        <!-- North -->
        <polygon points="50,15 54,46 50,50" fill="currentColor" stroke="currentColor" />
        <polygon points="50,15 46,46 50,50" stroke="currentColor" />
        <!-- South -->
        <polygon points="50,85 46,54 50,50" fill="currentColor" stroke="currentColor" />
        <polygon points="50,85 54,54 50,50" stroke="currentColor" />
        <!-- East -->
        <polygon points="85,50 54,46 50,50" fill="currentColor" stroke="currentColor" />
        <polygon points="85,50 54,54 50,50" stroke="currentColor" />
        <!-- West -->
        <polygon points="15,50 46,54 50,50" fill="currentColor" stroke="currentColor" />
        <polygon points="15,50 46,46 50,50" stroke="currentColor" />
        <!-- Center core -->
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <!-- Small compass marks -->
        <text x="47.5" y="12" font-size="6" font-family="sans-serif" font-weight="bold" fill="currentColor">N</text>
      </svg>
    `
  },
  {
    id: "mountain",
    name: "The Minimal Mountain Range",
    meaning: "Strength, stability, overcoming obstacles, and quiet perseverance.",
    description: "Clean, fine lines depicting towering peaks and a rising sun. Represents the heights one can reach through resilience and focus.",
    style: "Minimal",
    category: "Nature",
    painLevel: "Low",
    difficultyLevel: "Easy",
    timeRequired: "1 Hour",
    estimatedCost: "$100 - $180",
    bestPlacements: ["Wrist", "Ankle", "Neck", "Forearm"],
    history: "Nature symbolism has existed since prehistoric art; mountain peaks are traditionally considered sacred places closer to heaven.",
    culturalSignificance: "In Japanese culture, Mount Fuji represents immortality and strength. Globally, climbing a mountain is a metaphor for overcoming struggle.",
    
    traits: {
      introvert: 0.8,
      extrovert: 0.2,
      peaceful: 0.9,
      adventurous: 0.6,
      emotional: 0.4,
      logical: 0.7
    },
    values: ["Growth", "Loyalty", "Spirituality"],
    interests: ["Mountains", "Nature", "Books", "Travel"],
    experiences: ["Overcoming failure", "Graduation", "Mental health journey"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sun backdrop -->
        <circle cx="50" cy="40" r="12" stroke-dasharray="1.5 3" opacity="0.6" />
        <!-- Large Center Mountain -->
        <polygon points="50,25 22,75 78,75" fill="none" stroke="currentColor" />
        <!-- Ridge lines for large mountain -->
        <path d="M50,25 C50,40 54,55 52,75" />
        <path d="M50,25 L45,40 L48,55 L42,75" stroke-width="0.8" opacity="0.7" />
        <!-- Left Peak -->
        <polygon points="32,45 10,75 54,75" fill="none" stroke="currentColor" />
        <path d="M32,45 C32,55 35,65 34,75" />
        <!-- Right Peak -->
        <polygon points="68,40 44,75 88,75" fill="none" stroke="currentColor" />
        <path d="M68,40 C67,50 71,62 69,75" />
        <!-- Reflection/Water line at bottom -->
        <line x1="15" y1="80" x2="85" y2="80" stroke-width="1" />
        <line x1="25" y1="84" x2="75" y2="84" stroke-width="0.8" stroke-dasharray="4 4" />
        <!-- Birds flying in distance -->
        <path d="M22,30 Q25,28 28,30 Q30,27 33,29" stroke-width="0.8" />
        <path d="M72,25 Q74,23 76,25 Q78,22 80,24" stroke-width="0.8" />
      </svg>
    `
  },
  {
    id: "wave",
    name: "The Minimal Wave",
    meaning: "Adaptability, emotional fluidity, peace, and the ability to go with the flow.",
    description: "A continuous, flowing wave representing water's gentle strength, purification, and the natural cycles of ups and downs in life.",
    style: "Fine Line",
    category: "Nature",
    painLevel: "Low",
    difficultyLevel: "Easy",
    timeRequired: "1 Hour",
    estimatedCost: "$90 - $150",
    bestPlacements: ["Wrist", "Ankle", "Behind Ear", "Collarbone"],
    history: "Inspired by traditional maritime symbols and classic Japanese print arts representing the powerful flows of life.",
    culturalSignificance: "Commonly represents purity, change, and rebirth. Reflects the ancient Greek philosophy of 'Panta Rhei' (Everything Flows).",
    
    traits: {
      introvert: 0.7,
      extrovert: 0.3,
      peaceful: 0.9,
      adventurous: 0.5,
      emotional: 0.8,
      logical: 0.4
    },
    values: ["Freedom", "Spirituality", "Growth"],
    interests: ["Ocean", "Nature", "Music", "Travel"],
    experiences: ["New beginning", "Mental health journey", "Self-discovery"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sun/Moon circle behind wave -->
        <circle cx="68" cy="38" r="10" stroke-dasharray="2 3" opacity="0.4" />
        <!-- Main Cresting Wave -->
        <path d="M10,72 C25,72 32,58 45,58 C58,58 60,35 75,35 C88,35 88,48 76,48 C68,48 64,68 88,68 C92,68 95,67 98,66" />
        <!-- Secondary wave underneath -->
        <path d="M8,79 C22,79 28,68 40,68 C52,68 56,48 70,48 C80,48 82,56 74,56 C66,56 60,75 80,75 C85,75 88,74 91,73" stroke-width="1.2" opacity="0.8" />
        <!-- Minor ripples -->
        <path d="M25,84 C35,84 40,80 50,80 C60,80 62,84 75,84" stroke-width="0.8" opacity="0.5" stroke-dasharray="3 3" />
        <!-- Sparkles/Droplets -->
        <circle cx="73" cy="28" r="0.8" fill="currentColor" />
        <circle cx="78" cy="31" r="0.6" fill="currentColor" />
        <circle cx="66" cy="32" r="0.6" fill="currentColor" />
      </svg>
    `
  },
  {
    id: "wolf",
    name: "The Origami Wolf",
    meaning: "Loyalty, instincts, family protection, and independent wild nature.",
    description: "A combination of dynamic geometric polygons shaping a howling wolf. Expresses a fusion of intelligence, structure, and primal instincts.",
    style: "Geometric",
    category: "Nature",
    painLevel: "Medium",
    difficultyLevel: "Intermediate",
    timeRequired: "2 - 3 Hours",
    estimatedCost: "$220 - $400",
    bestPlacements: ["Forearm", "Shoulder", "Calf", "Back"],
    history: "Wolves hold legendary status in Native American cultures, Norse myths, and Roman foundation folklore.",
    culturalSignificance: "Represents the ultimate balance of loyalty to the pack (family) and the strength of the lone wolf (independence).",
    
    traits: {
      introvert: 0.5,
      extrovert: 0.5,
      peaceful: 0.3,
      adventurous: 0.8,
      emotional: 0.4,
      logical: 0.8
    },
    values: ["Family", "Loyalty", "Freedom"],
    interests: ["Nature", "Mountains", "Mythology", "Fitness"],
    experiences: ["Becoming independent", "Self-discovery", "Overcoming failure"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wolf head silhouette constructed with triangles -->
        <!-- Outer Frame -->
        <polygon points="50,15 28,32 30,52 50,90 70,52 72,32" stroke-dasharray="2 3" opacity="0.3" stroke-width="0.8" />
        
        <!-- Forehead and Nose -->
        <polygon points="50,15 50,42 45,35" fill="none" />
        <polygon points="50,15 50,42 55,35" fill="none" />
        <polygon points="50,42 45,62 50,68" fill="none" />
        <polygon points="50,42 55,62 50,68" fill="none" />
        <polygon points="50,68 47,82 50,86" fill="currentColor" fill-opacity="0.3" />
        <polygon points="50,68 53,82 50,86" fill="currentColor" fill-opacity="0.3" />
        
        <!-- Ears -->
        <polygon points="50,15 38,10 42,28" fill="none" />
        <polygon points="50,15 62,10 58,28" fill="none" />
        
        <!-- Eyes / Cheeks -->
        <polygon points="42,28 30,32 45,42" fill="none" />
        <polygon points="58,28 70,32 55,42" fill="none" />
        <polygon points="30,32 32,52 45,42" fill="none" />
        <polygon points="70,32 68,52 55,42" fill="none" />
        
        <!-- Eyes highlights (filled geometric bits) -->
        <polygon points="43,36 46,38 42,39" fill="currentColor" />
        <polygon points="57,36 54,38 58,39" fill="currentColor" />
        
        <!-- Lower Cheeks and Jaw -->
        <polygon points="45,42 32,52 45,62" fill="none" />
        <polygon points="55,42 68,52 55,62" fill="none" />
        <polygon points="45,62 38,58 35,72 47,82" fill="none" />
        <polygon points="55,62 62,58 65,72 53,82" fill="none" />
        <polygon points="45,62 47,82 50,68" fill="none" />
        <polygon points="55,62 53,82 50,68" fill="none" />
      </svg>
    `
  },
  {
    id: "lotus",
    name: "The Cosmic Lotus",
    meaning: "Purity, spiritual awakening, healing, and beauty arising from mud.",
    description: "An elegant, symmetrical Lotus blossom surrounded by celestial orbits and sacred geometry, emphasizing connection to the cosmos and inner peace.",
    style: "Fine Line",
    category: "Spirituality",
    painLevel: "Medium",
    difficultyLevel: "Intermediate",
    timeRequired: "2 Hours",
    estimatedCost: "$180 - $300",
    bestPlacements: ["Back", "Sternum", "Wrist", "Shoulder"],
    history: "Venerated in Hindu and Buddhist traditions as a sacred seat of deities, representing pure detachment and enlightenment.",
    culturalSignificance: "Symbolizes how human consciousness can rise above worldly struggles (the mud) to blossom in spiritual purity (the flower).",
    
    traits: {
      introvert: 0.8,
      extrovert: 0.2,
      peaceful: 0.95,
      adventurous: 0.3,
      emotional: 0.8,
      logical: 0.4
    },
    values: ["Spirituality", "Growth", "Love"],
    interests: ["Mythology", "Space", "Books", "Nature"],
    experiences: ["Mental health journey", "Overcoming failure", "Self-discovery", "Losing someone"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Celestial Orbit Rings -->
        <ellipse cx="50" cy="55" rx="30" ry="12" transform="rotate(-15 50 55)" stroke-dasharray="2 3" opacity="0.5" />
        <ellipse cx="50" cy="55" rx="35" ry="6" transform="rotate(20 50 55)" stroke-dasharray="1 3" opacity="0.4" />
        <!-- Vertical energy axis -->
        <line x1="50" y1="12" x2="50" y2="88" stroke-dasharray="3 3" opacity="0.6" />
        <circle cx="50" cy="18" r="1.5" fill="currentColor" />
        <circle cx="50" cy="82" r="1.5" fill="currentColor" />
        
        <!-- Lotus Center Petals -->
        <path d="M50,38 C46,48 46,58 50,68 C54,58 54,48 50,38 Z" fill="currentColor" fill-opacity="0.1" />
        
        <!-- Inner Petals Left -->
        <path d="M50,42 C40,48 42,60 48,66 C44,56 46,48 50,42" />
        <!-- Inner Petals Right -->
        <path d="M50,42 C60,48 58,60 52,66 C56,56 54,48 50,42" />
        
        <!-- Mid Petals Left -->
        <path d="M48,46 C34,50 36,64 45,67 C38,58 43,51 48,46" />
        <!-- Mid Petals Right -->
        <path d="M52,46 C66,50 64,64 55,67 C62,58 57,51 52,46" />
        
        <!-- Outer Petals Bottom Left -->
        <path d="M46,55 C28,58 32,71 44,70 C35,66 40,60 46,55" />
        <!-- Outer Petals Bottom Right -->
        <path d="M54,55 C72,58 68,71 56,70 C65,66 60,60 54,55" />
        
        <!-- Small dots detailing -->
        <circle cx="50" cy="30" r="1" fill="currentColor" />
        <circle cx="50" cy="24" r="0.8" fill="currentColor" />
        <circle cx="50" cy="74" r="1" fill="currentColor" />
      </svg>
    `
  },
  {
    id: "sakura",
    name: "The Watercolor Sakura",
    meaning: "New beginnings, mindfulness, transience, and appreciating the present moment.",
    description: "Soft, flowing cherry blossom petals drifting in the wind, blended with watercolor gradients that reflect life's delicate and fleeting nature.",
    style: "Watercolor",
    category: "Nature",
    painLevel: "Medium",
    difficultyLevel: "Hard",
    timeRequired: "2.5 - 4 Hours",
    estimatedCost: "$300 - $500",
    bestPlacements: ["Shoulder", "Back", "Wrist", "Collarbone"],
    history: "A fundamental motif in traditional Japanese art (irezumi), capturing the warrior's spirit of living intensely but briefly.",
    culturalSignificance: "In Japan, 'Hanami' (blossom viewing) is a celebration of spring, symbolizing hope, healing, renewal, and the beauty of change.",
    
    traits: {
      introvert: 0.6,
      extrovert: 0.4,
      peaceful: 0.85,
      adventurous: 0.5,
      emotional: 0.9,
      logical: 0.2
    },
    values: ["Love", "Growth", "Spirituality"],
    interests: ["Nature", "Anime", "Travel", "Music"],
    experiences: ["New beginning", "Losing someone", "Mental health journey", "Self-discovery"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Curved Branch -->
        <path d="M12,82 C30,78 40,65 52,58 C62,52 78,54 88,48" stroke="currentColor" stroke-width="2" />
        <path d="M52,58 C50,45 42,38 32,38" stroke-width="1.2" opacity="0.8" />
        <path d="M68,51 C72,40 68,34 74,24" stroke-width="1" opacity="0.8" />
        
        <!-- Central Blossom (Main) -->
        <!-- Center core -->
        <circle cx="54" cy="52" r="2" fill="currentColor" />
        <!-- Petals -->
        <path d="M54,50 Q60,38 64,48 Q68,52 56,53" fill="currentColor" fill-opacity="0.15" />
        <path d="M55,53 Q66,58 60,67 Q54,72 53,55" fill="currentColor" fill-opacity="0.15" />
        <path d="M52,53 Q42,62 38,54 Q34,46 51,51" fill="currentColor" fill-opacity="0.15" />
        <path d="M52,51 Q42,40 48,34 Q54,28 53,49" fill="currentColor" fill-opacity="0.15" />
        <path d="M54,51 Q64,45 54,51" stroke="currentColor" stroke-width="0.8" />
        
        <!-- Second Blossom (Top Right Branch) -->
        <circle cx="73" cy="28" r="1.5" fill="currentColor" />
        <path d="M73,28 Q78,18 80,24 Q82,30 74.5,29.5" fill="currentColor" fill-opacity="0.1" />
        <path d="M72,28 Q64,22 66,28 Q68,34 71.5,29.5" fill="currentColor" fill-opacity="0.1" />
        <path d="M73,29 Q77,37 73.5,29" fill="currentColor" fill-opacity="0.1" />
        
        <!-- Falling Petals (Drifting in the wind) -->
        <path d="M25,24 C23,20 18,22 20,26 C22,30 27,28 25,24 Z" fill="currentColor" fill-opacity="0.2" />
        <path d="M40,16 C38,13 34,15 36,18 C38,21 42,19 40,16 Z" fill="currentColor" fill-opacity="0.2" />
        <path d="M78,74 C76,71 72,73 74,76 C76,79 80,77 78,74 Z" fill="currentColor" fill-opacity="0.2" />
        
        <!-- Wind drafts -->
        <path d="M22,20 Q35,16 48,22" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.4" />
        <path d="M55,75 Q68,72 82,78" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.4" />
      </svg>
    `
  },
  {
    id: "dragon",
    name: "The Minimalist Ryu (Dragon)",
    meaning: "Wisdom, strength, raw energy, and freedom from standard boundaries.",
    description: "A continuous fluid spiral forming a stylized Japanese dragon. It merges ancient mythical majesty with modern clean aesthetics.",
    style: "Japanese",
    category: "Mythology",
    painLevel: "High",
    difficultyLevel: "Hard",
    timeRequired: "4 - 6 Hours",
    estimatedCost: "$450 - $800",
    bestPlacements: ["Forearm", "Back", "Shoulder", "Thigh"],
    history: "In traditional East Asian mythology, dragons are benevolent water deities bringing rain, wisdom, good fortune, and cosmic energy.",
    culturalSignificance: "Unlike Western fire-breathing monsters, the Eastern dragon represents ultimate spiritual power, royalty, and the flow of natural energy (Qi).",
    
    traits: {
      introvert: 0.3,
      extrovert: 0.7,
      peaceful: 0.4,
      adventurous: 0.9,
      emotional: 0.5,
      logical: 0.7
    },
    values: ["Freedom", "Success", "Growth"],
    interests: ["Mythology", "Anime", "Travel", "Fitness"],
    experiences: ["Overcoming failure", "Graduation", "Becoming independent"],
    
    svgMarkup: `
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <!-- Dragon Body spiral -->
        <path d="M50,50 C40,40 30,55 35,68 C40,80 60,82 72,70 C84,58 84,35 68,22 C52,9 25,12 18,34 C12,56 22,78 45,86 C65,92 88,82 92,58" stroke-dasharray="0.5 0.5" stroke-width="3" opacity="0.2" />
        <path d="M50,50 C40,40 30,55 35,68 C40,80 60,82 72,70 C84,58 84,35 68,22 C52,9 25,12 18,34 C12,56 22,78 45,86 C62,90 85,82 90,62" />
        
        <!-- Dragon Head details at center -->
        <path d="M50,50 C52,48 54,42 50,38 C46,34 45,36 47,40" />
        <!-- Horns/Whiskers -->
        <path d="M52,38 C56,34 60,30 58,26" stroke-width="1" />
        <path d="M48,38 C42,34 38,30 36,28" stroke-width="1" />
        <!-- Mouth -->
        <path d="M50,44 L54,46 L50,48 L48,46 Z" fill="currentColor" />
        <!-- Fire/Mist tail at the end -->
        <path d="M90,62 C92,54 96,52 94,48 C92,44 88,48 89,52" />
        
        <!-- Claws on sides -->
        <!-- Upper claw -->
        <path d="M68,22 C72,20 75,18 73,15 M71,15 L73,15 L73,17" stroke-width="1.2" />
        <!-- Lower claw -->
        <path d="M35,68 C28,70 24,72 26,76 M28,76 L26,76 L26,74" stroke-width="1.2" />
      </svg>
    `
  }
];
