/**
 * Pinterest Inspiration Feed — Explore Data & Board Storage Helpers
 */

export const EXPLORE_PINS = [
  {
    id: 'pin-1',
    title: 'Minimalist Moon Cycle',
    style: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=400&h=600&q=80',
    artistId: 1,
    artistName: 'Aria Thorne',
    likesCount: 245,
    tags: ['crescent', 'lunar', 'minimalist', 'nature']
  },
  {
    id: 'pin-2',
    title: 'Cyberpunk Oni Mask',
    style: 'Anime',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&h=500&q=80',
    artistId: 2,
    artistName: 'Kenji Sato',
    likesCount: 512,
    tags: ['cyberpunk', 'oni', 'japanese', 'anime']
  },
  {
    id: 'pin-3',
    title: 'Hyper-Realistic Lion Portrait',
    style: 'Realism',
    imageUrl: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=400&h=550&q=80',
    artistId: 4,
    artistName: 'Marcus Vance',
    likesCount: 389,
    tags: ['lion', 'animal', 'realism', 'shading']
  },
  {
    id: 'pin-4',
    title: 'Classic Sailor Eagle',
    style: 'Traditional',
    imageUrl: 'https://images.unsplash.com/photo-1611501487429-c88f1766f7f6?auto=format&fit=crop&w=400&h=450&q=80',
    artistId: 4,
    artistName: 'Marcus Vance',
    likesCount: 184,
    tags: ['eagle', 'vintage', 'traditional', 'oldschool']
  },
  {
    id: 'pin-5',
    title: 'Flowing Watercolor Lotus',
    style: 'Watercolour',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&h=650&q=80',
    artistId: 1,
    artistName: 'Aria Thorne',
    likesCount: 423,
    tags: ['lotus', 'splash', 'colorful', 'watercolour']
  },
  {
    id: 'pin-6',
    title: 'Obsidian Geometric Mandala',
    style: 'Blackwork',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&h=500&q=80',
    artistId: 3,
    artistName: 'Elena Rostova',
    likesCount: 312,
    tags: ['mandala', 'sacred-geometry', 'blackwork']
  },
  {
    id: 'pin-7',
    title: 'Fine Line Floral Bouquet',
    style: 'Fine Line',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&h=600&q=80',
    artistId: 1,
    artistName: 'Aria Thorne',
    likesCount: 567,
    tags: ['wildflowers', 'botanical', 'fine-line', 'delicate']
  },
  {
    id: 'pin-8',
    title: 'Traditional Koi Splash',
    style: 'Japanese',
    imageUrl: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&h=520&q=80',
    artistId: 2,
    artistName: 'Kenji Sato',
    likesCount: 290,
    tags: ['koi', 'irezumi', 'japanese', 'water']
  },
  {
    id: 'pin-9',
    title: 'Neo-Traditional Forest Stag',
    style: 'Neo Traditional',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=400&h=580&q=80',
    artistId: 3,
    artistName: 'Elena Rostova',
    likesCount: 341,
    tags: ['stag', 'forest', 'neo-traditional', 'bold-color']
  },
  {
    id: 'pin-10',
    title: 'Spiritual Geometry Sphere',
    style: 'Geometric',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&h=540&q=80',
    artistId: 3,
    artistName: 'Elena Rostova',
    likesCount: 198,
    tags: ['spheres', 'math', 'lines', 'geometric']
  }
];

// ── Follow Board Storage helpers ─────────────────────────────────────────────

export function getBoards() {
  try {
    const raw = localStorage.getItem('soulink_user_boards');
    return raw ? JSON.parse(raw) : { 'All Saved': [], 'Inspiration': [] };
  } catch {
    return { 'All Saved': [], 'Inspiration': [] };
  }
}

export function savePinToBoard(pinId, boardName) {
  const boards = getBoards();
  if (!boards[boardName]) {
    boards[boardName] = [];
  }
  
  // Add to board if not exists
  if (!boards[boardName].includes(pinId)) {
    boards[boardName].push(pinId);
  }

  // Also maintain in default All Saved board
  if (boardName !== 'All Saved' && !boards['All Saved'].includes(pinId)) {
    boards['All Saved'].push(pinId);
  }

  localStorage.setItem('soulink_user_boards', JSON.stringify(boards));
  return boards;
}

export function createNewBoard(boardName) {
  const boards = getBoards();
  if (!boards[boardName]) {
    boards[boardName] = [];
  }
  localStorage.setItem('soulink_user_boards', JSON.stringify(boards));
  return boards;
}

export function getFollowedArtists() {
  try {
    const raw = localStorage.getItem('soulink_followed_artists');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFollowArtist(artistId) {
  const list = getFollowedArtists();
  const index = list.indexOf(artistId);
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(artistId);
  }
  localStorage.setItem('soulink_followed_artists', JSON.stringify(list));
  return list;
}

export function getLikedPins() {
  try {
    const raw = localStorage.getItem('soulink_liked_pins');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleLikePin(pinId) {
  const list = getLikedPins();
  const index = list.indexOf(pinId);
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(pinId);
  }
  localStorage.setItem('soulink_liked_pins', JSON.stringify(list));
  return list;
}
