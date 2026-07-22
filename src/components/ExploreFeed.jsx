import React, { useState, useEffect } from 'react';
import {
  Heart, Bookmark, UserPlus, UserMinus, Plus, Search,
  FolderHeart, Star, ChevronDown, Check, Users, Sparkles
} from 'lucide-react';
import {
  EXPLORE_PINS, getBoards, savePinToBoard, createNewBoard,
  getFollowedArtists, toggleFollowArtist, getLikedPins, toggleLikePin
} from '../utils/exploreData';
import { IconDiamondSparkle } from './ui/TattooIcons';

export default function ExploreFeed({ artistsList, setActiveTab, isGuest, onRequireAuth }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [boards, setBoards] = useState({});
  const [followedArtists, setFollowedArtists] = useState([]);
  const [likedPins, setLikedPins] = useState([]);
  
  // Board states
  const [showSaveDropdown, setShowSaveDropdown] = useState(null); // holds pinId
  const [newBoardName, setNewBoardName] = useState('');
  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  const [activeBoardFilter, setActiveBoardFilter] = useState('All'); // 'All' or specific board name

  useEffect(() => {
    setBoards(getBoards());
    setFollowedArtists(getFollowedArtists());
    setLikedPins(getLikedPins());
  }, []);

  const handleLike = (pinId) => {
    if (isGuest && onRequireAuth) {
      onRequireAuth();
      return;
    }
    const list = toggleLikePin(pinId);
    setLikedPins(list);
  };

  const handleFollow = (artistId) => {
    if (isGuest && onRequireAuth) {
      onRequireAuth();
      return;
    }
    const list = toggleFollowArtist(artistId);
    setFollowedArtists(list);
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (isGuest && onRequireAuth) {
      onRequireAuth();
      return;
    }
    if (newBoardName.trim()) {
      const updated = createNewBoard(newBoardName.trim());
      setBoards(updated);
      setNewBoardName('');
      setShowNewBoardInput(false);
    }
  };

  const handleSaveToBoard = (pinId, boardName) => {
    if (isGuest && onRequireAuth) {
      onRequireAuth();
      return;
    }
    const updated = savePinToBoard(pinId, boardName);
    setBoards(updated);
    setShowSaveDropdown(null);
  };

  // Filter logic
  const filteredPins = EXPLORE_PINS.filter(pin => {
    // Search match
    const matchesSearch = pin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pin.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pin.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    // Style match
    const matchesStyle = selectedStyle === 'All' || pin.style.toLowerCase() === selectedStyle.toLowerCase();

    // Board filter match
    let matchesBoard = true;
    if (activeBoardFilter !== 'All') {
      const savedIds = boards[activeBoardFilter] || [];
      matchesBoard = savedIds.includes(pin.id);
    }

    return matchesSearch && matchesStyle && matchesBoard;
  });

  const stylesList = [
    'All', 'Minimal', 'Anime', 'Realism', 'Traditional',
    'Watercolour', 'Blackwork', 'Fine Line', 'Japanese', 'Neo Traditional'
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Dynamic CSS for Masonry column grid */}
      <style>{`
        .pinterest-grid {
          column-count: 3;
          column-gap: 1.2rem;
          width: 100%;
        }
        .pinterest-card {
          break-inside: avoid;
          margin-bottom: 1.2rem;
          background: var(--bg-surface-elevated);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .pinterest-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-teal);
        }
        .pinterest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0.1) 60%, rgba(5,5,8,0.7) 100%);
          opacity: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
          transition: opacity 0.2s ease;
          z-index: 2;
        }
        .pinterest-card:hover .pinterest-overlay {
          opacity: 1;
        }
        @media (max-width: 900px) {
          .pinterest-grid {
            column-count: 2;
          }
        }
        @media (max-width: 600px) {
          .pinterest-grid {
            column-count: 1;
          }
        }
      `}</style>

      {/* Header & Search */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <IconDiamondSparkle size={32} color="var(--accent-orange)" /> Inspiration Explore Feed
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Discover catalog designs, follow creators, and curate custom inspiration boards.
          </p>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }} className="glow-border">
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search tags or styles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '0.68rem 1rem 0.68rem 2.5rem', borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)', background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {/* FOLLOWED ARTISTS & MY BOARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        
        {/* Followed Artists */}
        <div className="glass-panel" style={{ padding: '1.2rem' }}>
          <h3 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={13} style={{ color: 'var(--accent-teal)' }} /> Followed Creators ({followedArtists.length})
          </h3>
          {followedArtists.length === 0 ? (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '0.4rem 0' }}>No followed artists yet. Follow creators directly from inspiration cards below!</p>
          ) : (
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {followedArtists.map(id => {
                const artist = artistsList.find(a => a.id === id);
                if (!artist) return null;
                return (
                  <div
                    key={id}
                    onClick={() => setActiveTab('Artists')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '0.4rem 0.8rem', borderRadius: '20px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer', transition: 'border-color 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(173, 181, 189, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                  >
                    <img src={artist.avatar} alt={artist.name} style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{artist.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Board Selection */}
        <div className="glass-panel" style={{ padding: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <h3 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FolderHeart size={13} style={{ color: 'var(--accent-teal)' }} /> Inspiration Boards
            </h3>
            
            {/* Create Board Toggle */}
            {!showNewBoardInput ? (
              <button
                onClick={() => setShowNewBoardInput(true)}
                style={{ background: 'none', border: 'none', color: 'var(--accent-teal)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                <Plus size={12} /> New Board
              </button>
            ) : (
              <form onSubmit={handleCreateBoard} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="Board Name..."
                  value={newBoardName}
                  onChange={e => setNewBoardName(e.target.value)}
                  style={{
                    padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)',
                    background: 'var(--bg-surface-elevated)', color: '#fff', fontSize: '0.72rem', outline: 'none'
                  }}
                />
                <button type="submit" style={{ padding: '0.2rem 0.5rem', border: 'none', borderRadius: '4px', background: 'var(--accent-teal)', color: '#07070a', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}>
                  Create
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveBoardFilter('All')}
              style={{
                padding: '0.3rem 0.7rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 600,
                border: '1px solid', cursor: 'pointer',
                borderColor: activeBoardFilter === 'All' ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                background: activeBoardFilter === 'All' ? 'rgba(173, 181, 189, 0.1)' : 'transparent',
                color: activeBoardFilter === 'All' ? 'var(--accent-teal)' : 'var(--text-secondary)'
              }}
            >
              All Pins
            </button>
            {Object.keys(boards).map(bName => (
              <button
                key={bName}
                onClick={() => setActiveBoardFilter(bName)}
                style={{
                  padding: '0.3rem 0.7rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 600,
                  border: '1px solid', cursor: 'pointer',
                  borderColor: activeBoardFilter === bName ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
                  background: activeBoardFilter === bName ? 'rgba(173, 181, 189, 0.1)' : 'transparent',
                  color: activeBoardFilter === bName ? 'var(--accent-teal)' : 'var(--text-secondary)'
                }}
              >
                {bName} ({boards[bName]?.length || 0})
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* STYLE FILTER CHIPS */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '0.4rem', whiteSpace: 'nowrap' }}>
        {stylesList.map(style => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            style={{
              padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600,
              cursor: 'pointer', border: '1px solid',
              borderColor: selectedStyle === style ? 'var(--accent-teal)' : 'rgba(255,255,255,0.08)',
              background: selectedStyle === style ? 'rgba(173, 181, 189, 0.1)' : 'var(--bg-surface-elevated)',
              color: selectedStyle === style ? 'var(--accent-teal)' : 'var(--text-secondary)',
              transition: 'all 0.15s ease'
            }}
          >
            {style}
          </button>
        ))}
      </div>

      {/* MASONRY FEED GRID */}
      {filteredPins.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Bookmark size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
          <h3>No designs matching filter criteria.</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Try clearing filters or searching for other style keywords.</p>
        </div>
      ) : (
        <div className="pinterest-grid">
          {filteredPins.map(pin => {
            const isLiked = likedPins.includes(pin.id);
            const isFollowing = followedArtists.includes(pin.artistId);

            return (
              <div key={pin.id} className="pinterest-card">
                
                {/* Overlay actions on hover */}
                <div className="pinterest-overlay">
                  
                  {/* Top Bar: Follow & Style */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(173, 181, 189, 0.1)', color: 'var(--accent-teal)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                      {pin.style}
                    </span>
                    <button
                      onClick={() => handleFollow(pin.artistId)}
                      style={{
                        background: isFollowing ? 'rgba(255,255,255,0.15)' : 'var(--accent-teal)',
                        color: isFollowing ? '#fff' : '#07070a',
                        border: 'none', padding: '0.3rem 0.6rem', borderRadius: '15px',
                        fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '3px'
                      }}
                    >
                      {isFollowing ? <><UserMinus size={11} /> Unfollow</> : <><UserPlus size={11} /> Follow</>}
                    </button>
                  </div>

                  {/* Bottom Bar: Title, Like, Save */}
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.6rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                      {pin.title}
                    </h4>
                    
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      
                      {/* Like button */}
                      <button
                        onClick={() => handleLike(pin.id)}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                          padding: '0.45rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                          background: isLiked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0,0,0,0.5)',
                          color: isLiked ? 'rgb(239, 68, 68)' : '#fff', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600
                        }}
                      >
                        <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
                        <span>{pin.likesCount + (isLiked ? 1 : 0)}</span>
                      </button>

                      {/* Save to board button */}
                      <div style={{ relative: 'true', flex: 1 }}>
                        <button
                          onClick={() => setShowSaveDropdown(showSaveDropdown === pin.id ? null : pin.id)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                            padding: '0.45rem', borderRadius: '8px', border: 'none',
                            background: 'var(--accent-gradient)', color: '#07070a', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700
                          }}
                        >
                          <Bookmark size={12} />
                          <span>Save</span>
                        </button>

                        {/* Save to board Dropdown overlay inside the card hover */}
                        {showSaveDropdown === pin.id && (
                          <div style={{
                            position: 'absolute', bottom: '2.8rem', right: '1rem', left: '1rem',
                            background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '8px', padding: '0.5rem', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px',
                            boxShadow: 'var(--shadow-lg)'
                          }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, paddingLeft: '4px', textTransform: 'uppercase' }}>Select Board</span>
                            {Object.keys(boards).map(bName => (
                              <button
                                key={bName}
                                onClick={() => handleSaveToBoard(pin.id, bName)}
                                style={{
                                  textAlign: 'left', padding: '0.35rem 0.5rem', borderRadius: '4px',
                                  background: 'transparent', border: 'none', color: '#fff', fontSize: '0.72rem',
                                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                              >
                                <span>{bName}</span>
                                {boards[bName]?.includes(pin.id) && <Check size={10} style={{ color: 'var(--accent-teal)' }} />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>

                <img
                  src={pin.imageUrl}
                  alt={pin.title}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
