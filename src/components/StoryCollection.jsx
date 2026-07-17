import React, { useState, useEffect } from 'react';
import { BookOpen, ThumbsUp, MessageSquare, Send, Heart, Award, Eye } from 'lucide-react';
import { tattoosData } from '../data/tattoosData';

const initialStories = [
  {
    id: 1,
    userName: "Sarah Jenkins",
    userAvatar: "SJ",
    tattooId: "phoenix",
    tattooName: "The Phoenix",
    title: "Rising after burnout",
    content: "I got this design on my back after a severe emotional burnout last year. It serves as my daily reminder that no matter how completely I crumble under pressure, I have the capacity to heal, reform, and rise from the ashes stronger than before.",
    likes: 42,
    comments: [
      { id: 1, author: "David K.", text: "Beautiful story, Sarah. Totally resonates." },
      { id: 2, author: "Mia L.", text: "The watercolor style fits this perfectly!" }
    ],
    date: "July 12, 2026",
    hasLiked: false
  },
  {
    id: 2,
    userName: "Michael Chen",
    userAvatar: "MC",
    tattooId: "compass",
    tattooName: "The Geometric Compass",
    title: "Becoming independent at 23",
    content: "After graduating and moving to a completely new country alone without knowing anyone, I felt lost. This compass represents my commitment to finding my own directions and navigating life according to my core values, rather than following external pressure.",
    likes: 29,
    comments: [
      { id: 1, author: "Elena R.", text: "Congratulations on your journey!" }
    ],
    date: "June 28, 2026",
    hasLiked: false
  }
];

export default function StoryCollection() {
  const [stories, setStories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTattooId, setNewTattooId] = useState(tattoosData[0].id);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('soulink_stories');
    if (saved) {
      setStories(JSON.parse(saved));
    } else {
      setStories(initialStories);
      localStorage.setItem('soulink_stories', JSON.stringify(initialStories));
    }
  }, []);

  const saveStories = (updatedStories) => {
    setStories(updatedStories);
    localStorage.setItem('soulink_stories', JSON.stringify(updatedStories));
  };

  const handleLike = (storyId) => {
    const updated = stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          likes: story.hasLiked ? story.likes - 1 : story.likes + 1,
          hasLiked: !story.hasLiked
        };
      }
      return story;
    });
    saveStories(updated);
  };

  const handleAddComment = (storyId, e) => {
    e.preventDefault();
    const commentVal = newCommentText[storyId];
    if (!commentVal || !commentVal.trim()) return;

    const updated = stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          comments: [
            ...story.comments,
            { id: Date.now(), author: "Guest User", text: commentVal }
          ]
        };
      }
      return story;
    });

    saveStories(updated);
    setNewCommentText({
      ...newCommentText,
      [storyId]: ''
    });
  };

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    const selectedTattoo = tattoosData.find(t => t.id === newTattooId);

    const newStory = {
      id: Date.now(),
      userName: newAuthor,
      userAvatar: newAuthor.substring(0, 2).toUpperCase(),
      tattooId: newTattooId,
      tattooName: selectedTattoo ? selectedTattoo.name : "Custom Design",
      title: newTitle,
      content: newContent,
      likes: 0,
      comments: [],
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      hasLiked: false
    };

    const updated = [newStory, ...stories];
    saveStories(updated);

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setShowAddForm(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
      
      {/* LEFT PANEL: Story Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
              Ink Story Collection
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Read the struggles, achievements, and emotional breakthroughs that inspired others to get their tattoos.
            </p>
          </div>
          
          {!showAddForm && (
            <button
              id="btn-trigger-add-story"
              type="button"
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Share Your Story
            </button>
          )}
        </div>

        {/* Stories Listing */}
        {stories.map(story => {
          const correspondingTattoo = tattoosData.find(t => t.id === story.tattooId);
          return (
            <div key={story.id} className="glass-panel" style={{ padding: '1.8rem' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', color: '#07070a', display: 'flex', alignItems: 'center', justifyContext: 'center', fontWeight: 'bold', fontSize: '0.9rem', justifyContent: 'center' }}>
                    {story.userAvatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{story.userName}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{story.date}</div>
                  </div>
                </div>

                {/* Badge showing corresponding design */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', background: 'var(--bg-surface-elevated)', padding: '0.4rem 0.8rem', borderRadius: '15px', color: 'var(--accent-teal)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span>Ink: {story.tattooName}</span>
                </div>
              </div>

              {/* Title & Story */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', fontWeight: 600 }}>"{story.title}"</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                {story.content}
              </p>

              {/* Vector design preview inside the story */}
              {correspondingTattoo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                  <div style={{ width: '40px', height: '40px', color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: correspondingTattoo.svgMarkup }} />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Tattoo symbolism details</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{correspondingTattoo.meaning.substring(0, 80)}...</div>
                  </div>
                </div>
              )}

              {/* Likes & Comments Counter bar */}
              <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '0.6rem 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <button
                  id={`btn-like-story-${story.id}`}
                  type="button"
                  onClick={() => handleLike(story.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: story.hasLiked ? 'var(--accent-teal)' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <ThumbsUp size={14} fill={story.hasLiked ? 'var(--accent-teal)' : 'none'} />
                  <span>{story.likes} Likes</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MessageSquare size={14} />
                  <span>{story.comments.length} Comments</span>
                </div>
              </div>

              {/* Comments Section */}
              {story.comments.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem', background: 'rgba(255,255,255,0.01)', padding: '0.8rem', borderRadius: '8px' }}>
                  {story.comments.map(c => (
                    <div key={c.id} style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{c.author}</strong>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Write a comment form */}
              <form 
                onSubmit={(e) => handleAddComment(story.id, e)}
                style={{ position: 'relative', marginTop: '1rem' }}
              >
                <input
                  id={`input-comment-${story.id}`}
                  type="text"
                  placeholder="Write a comment..."
                  value={newCommentText[story.id] || ''}
                  onChange={(e) => setNewCommentText({ ...newCommentText, [story.id]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.6rem 2.5rem 0.6rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'var(--bg-surface-elevated)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.8rem'
                  }}
                />
                <button
                  id={`btn-submit-comment-${story.id}`}
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-teal)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Send size={12} />
                </button>
              </form>

            </div>
          );
        })}
      </div>

      {/* RIGHT PANEL: Add Story Form */}
      <div>
        {showAddForm ? (
          <div className="glass-panel animate-fade-in" style={{ padding: '1.8rem', position: 'sticky', top: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Share Your Ink Story</h3>
            
            <form onSubmit={handleAddStory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Your Name</label>
                <input
                  id="form-story-author"
                  type="text"
                  required
                  placeholder="e.g., Alex Carter"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Select Design Symbol</label>
                <select
                  id="form-story-tattoo"
                  value={newTattooId}
                  onChange={(e) => setNewTattooId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                >
                  {tattoosData.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Story Title</label>
                <input
                  id="form-story-title"
                  type="text"
                  required
                  placeholder="e.g., A symbol of recovery and fresh starts"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Your Story & Meaning</label>
                <textarea
                  id="form-story-content"
                  required
                  rows="6"
                  placeholder="Describe why you chose this design, what life event influenced you, and what the tattoo signifies to you..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    lineHeight: '1.4',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  id="btn-cancel-story"
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-story"
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  Publish Story
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '1.8rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '2rem' }}>
            <BookOpen size={36} className="gradient-text animate-float" style={{ margin: '0 auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Tattoo Narratives</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
              Tattoos are visual stories written in skin. Share your narrative to inspire other people who are seeking meaning in their choice of designs.
            </p>
            <button
              id="btn-trigger-add-story-sidebar"
              type="button"
              onClick={() => setShowAddForm(true)}
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.85rem' }}
            >
              Write Narrative
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
