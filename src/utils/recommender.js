import { tattoosData } from '../data/tattoosData';

/**
 * Calculates a match score between user profile and a tattoo design,
 * and generates a personalized "AI explanation" for the recommendation.
 * 
 * @param {Object} userProfile 
 * @returns {Array} List of tattoos with compatibility scores and explanations, sorted by score descending
 */
export function recommendTattoos(userProfile) {
  const {
    personality = { extroversion: 0.5, adventure: 0.5, logic: 0.5 },
    values = [],
    interests = [],
    experiences = [],
    preferences = { style: '', placement: '', size: '' },
    mood = 'Healing'
  } = userProfile;

  // Mood adjustments to weights/scores
  // e.g. 'Lost' boosts Guidance (Compass/Dragon), 'Healing' boosts Sakura/Lotus/Wave,
  // 'Broken' boosts Phoenix (rising from ashes), 'Confident' boosts Wolf/Dragon.
  const moodBoosts = {
    Lost: ['compass', 'dragon'],
    Healing: ['sakura', 'lotus', 'wave'],
    Broken: ['phoenix', 'mountain'],
    Confident: ['wolf', 'dragon'],
    Happy: ['sakura', 'wave'],
    Hopeful: ['phoenix', 'lotus']
  };

  const recommendedList = tattoosData.map(tattoo => {
    // 1. Personality Traits Match (distance-based, normalized)
    // Map user traits (extroversion, adventure, logic) to tattoo traits
    const userE = personality.extroversion; // 0.0 to 1.0
    const userA = personality.adventure;
    const userL = personality.logic;

    const tattooE = tattoo.traits.extrovert; // tattoo.traits.extrovert vs introvert
    const tattooA = tattoo.traits.adventurous;
    const tattooL = tattoo.traits.logical;

    const traitDiff = Math.abs(userE - tattooE) + Math.abs(userA - tattooA) + Math.abs(userL - tattooL);
    const personalityScore = Math.max(0, 1 - (traitDiff / 3.0));

    // 2. Values Match (Overlap / User choice size)
    let valuesScore = 0.5; // base score if user has no values selected
    const valueIntersection = tattoo.values.filter(v => values.includes(v));
    if (values.length > 0) {
      valuesScore = valueIntersection.length / values.length;
    }

    // 3. Interests Match
    let interestsScore = 0.5;
    const interestIntersection = tattoo.interests.filter(i => interests.includes(i));
    if (interests.length > 0) {
      interestsScore = interestIntersection.length / interests.length;
    }

    // 4. Life Experiences Match
    let experiencesScore = 0.5;
    const experienceIntersection = tattoo.experiences.filter(e => experiences.includes(e));
    if (experiences.length > 0) {
      experiencesScore = experienceIntersection.length / experiences.length;
    }

    // 5. Aesthetic Style Preference Match
    const styleScore = preferences.style && tattoo.style.toLowerCase() === preferences.style.toLowerCase() ? 1.0 : 0.3;

    // 6. Placement Match
    const placementScore = preferences.placement && tattoo.bestPlacements.includes(preferences.placement) ? 1.0 : 0.5;

    // 7. Mood Boost
    let moodBoost = 0;
    if (moodBoosts[mood] && moodBoosts[mood].includes(tattoo.id)) {
      moodBoost = 0.15; // 15% boost for mood compatibility
    }

    // Weighted aggregation
    // Weights sum to 1.0 (excluding mood boost)
    const wTraits = 0.25;
    const wValues = 0.20;
    const wInterests = 0.15;
    const wExperiences = 0.20;
    const wStyle = 0.12;
    const wPlacement = 0.08;

    let finalScore = 
      (personalityScore * wTraits) +
      (valuesScore * wValues) +
      (interestsScore * wInterests) +
      (experiencesScore * wExperiences) +
      (styleScore * wStyle) +
      (placementScore * wPlacement) +
      moodBoost;

    // Cap at 0.99 for realistic scoring (unless perfect match)
    finalScore = Math.min(0.99, finalScore);
    // Lower bound at 0.40
    finalScore = Math.max(0.40, finalScore);

    const matchPercentage = Math.round(finalScore * 100);

    // 8. Generate dynamic AI-style explanations
    const aiExplanation = generateExplanation({
      tattoo,
      userProfile,
      valueIntersection,
      experienceIntersection,
      interestIntersection,
      personalityScore,
      mood
    });

    return {
      ...tattoo,
      matchPercentage,
      aiExplanation,
      scoresDetails: {
        personality: Math.round(personalityScore * 100),
        values: Math.round(valuesScore * 100),
        interests: Math.round(interestsScore * 100),
        experiences: Math.round(experiencesScore * 100),
        style: Math.round(styleScore * 100),
        placement: Math.round(placementScore * 100)
      }
    };
  });

  // Sort by match percentage in descending order
  return recommendedList.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

/**
 * Generate a personalized explanation paragraph based on intersections and scores.
 */
function generateExplanation({ tattoo, userProfile, valueIntersection, experienceIntersection, interestIntersection, mood }) {
  const intro = `Based on our AI analysis, your core profile aligns exceptionally well with **${tattoo.name}**. `;
  
  let personalityClause = "";
  const e = userProfile.personality.extroversion;
  const a = userProfile.personality.adventure;
  const l = userProfile.personality.logic;

  const tempE = e > 0.6 ? "extroverted" : e < 0.4 ? "introspective" : "balanced";
  const tempA = a > 0.6 ? "adventurous" : a < 0.4 ? "peace-seeking" : "adaptable";
  const tempL = l > 0.6 ? "analytically-minded" : l < 0.4 ? "emotionally-guided" : "intuitive";

  personalityClause = `As an ${tempE}, ${tempA}, and ${tempL} person, you express a unique balance. `;

  let overlapClause = "";
  if (valueIntersection.length > 0 && experienceIntersection.length > 0) {
    overlapClause = `Your commitment to **${valueIntersection.slice(0, 2).join(' & ')}** and your journey through **${experienceIntersection[0].toLowerCase()}** directly mirror the core essence of this symbol. `;
  } else if (valueIntersection.length > 0) {
    overlapClause = `This recommendation is heavily guided by your core values of **${valueIntersection.join(' & ')}**, which align with the tattoo's ancient meaning of ${tattoo.meaning.toLowerCase()} `;
  } else if (experienceIntersection.length > 0) {
    overlapClause = `Having been shaped by **${experienceIntersection[0].toLowerCase()}**, this design acts as a visual badge of honor for that chapter of your life. `;
  }

  let moodClause = "";
  if (mood === 'Healing') {
    moodClause = `Currently, you are in a phase of **healing**, and the ${tattoo.name} provides a gentle daily reminder of restoration and inner peace. `;
  } else if (mood === 'Lost') {
    moodClause = `You expressed feeling somewhat **lost** recently; this design serves as a beacon of direction, reminding you of your true north. `;
  } else if (mood === 'Broken') {
    moodClause = `As you navigate feeling **broken**, this emblem channels resilience, reminding you that like the phoenix or the mountain, you will withstand and rise. `;
  } else if (mood === 'Confident') {
    moodClause = `With your current **confident** energy, this design amplifies your strengths and highlights your bold approach to life. `;
  } else {
    moodClause = `This design fits your current **${mood.toLowerCase()}** state of mind, adding a layer of contemporary relevance. `;
  }

  const placementClause = userProfile.preferences.placement 
    ? `We highly recommend placing this on your **${userProfile.preferences.placement}**, which is one of the optimal body positions for this layout, accommodating its ${tattoo.style} aesthetic.`
    : `Its ${tattoo.style} styling makes it extremely versatile, fitting perfectly on standard areas like the forearm or shoulder.`;

  return `${intro}${personalityClause}${overlapClause}${moodClause}${placementClause}`;
}
