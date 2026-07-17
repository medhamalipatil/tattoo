import React, { useState } from 'react';
import { BarChart2, ShieldAlert, Layers, Plus, Database, Sparkles, Check, Trash, Users, Store } from 'lucide-react';

const mockLogs = [
  { id: 101, user: "Sarah J.", age: 24, traits: "Heart-Led, Thrill Seeker", matched: "The Phoenix", score: 96, date: "10 mins ago" },
  { id: 102, user: "Liam M.", age: 31, traits: "Zen Mind, Introspective", matched: "The Minimal Mountain", score: 91, date: "32 mins ago" },
  { id: 103, user: "Alex T.", age: 29, traits: "Mind-Led, Social Explorer", matched: "Geometric Compass", score: 88, date: "1 hour ago" },
  { id: 104, user: "Sophie C.", age: 22, traits: "Balanced, Zen Mind", matched: "The Cosmic Lotus", score: 95, date: "4 hours ago" }
];

export default function AdminPanel({ globalCatalog, setGlobalCatalog, bookings, artistsList, setArtistsList }) {
  const dbTattoos = globalCatalog;
  const setDbTattoos = setGlobalCatalog;
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStyle, setNewStyle] = useState('Minimal');
  const [newPain, setNewPain] = useState('Medium');
  const [newCost, setNewCost] = useState('$150 - $250');
  const [newMeaning, setNewMeaning] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleAddTattoo = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMeaning.trim()) return;

    const newDesign = {
      id: newName.toLowerCase().replace(/\s+/g, '-'),
      name: newName,
      meaning: newMeaning,
      description: "Added via Admin Panel console.",
      style: newStyle,
      category: "Custom",
      painLevel: newPain,
      difficultyLevel: "Easy",
      timeRequired: "1.5 Hours",
      estimatedCost: newCost,
      bestPlacements: ["Forearm", "Shoulder"],
      history: "Tattoo entered through live dashboard configuration.",
      culturalSignificance: "Symbolizes custom intent and user administration.",
      traits: {
        introvert: 0.5,
        extrovert: 0.5,
        peaceful: 0.5,
        adventurous: 0.5,
        emotional: 0.5,
        logical: 0.5
      },
      values: ["Growth"],
      interests: ["Nature"],
      experiences: ["Self-discovery"],
      svgMarkup: `
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="50" cy="50" r="30" stroke-dasharray="2 2"/>
          <polygon points="50,25 65,65 35,65" fill="none"/>
        </svg>
      `
    };

    setDbTattoos([...dbTattoos, newDesign]);
    setNewName('');
    setNewMeaning('');
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowAddForm(false);
    }, 2000);
  };

  const handleDeleteTattoo = (id) => {
    setDbTattoos(dbTattoos.filter(t => t.id !== id));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database className="gradient-text" /> InkMatch Control Console
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Monitor live recommendation logs, track metrics, manage the catalog database, and review stories.
        </p>
      </div>

      {/* Analytics widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
        
        {/* Metric 1 - Live Catalog Count */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>DESIGNS IN CATALOG</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }} className="glow-text">{dbTattoos.length}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--status-success)' }}>Live catalog — add or remove above</span>
        </div>

        {/* Metric 2 - Live Booking count */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>TOTAL BOOKINGS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }} className="glow-text">{(bookings || []).length}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Pending: {(bookings || []).filter(b => b.status === 'Pending').length} | Approved: {(bookings || []).filter(b => b.status === 'Approved').length}</span>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>REGISTERED STUDIOS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }} className="glow-text">{(artistsList || []).length}</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Active partner studios in directory</span>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>COMMUNITY NARRATIVES</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }} className="glow-text">18 stories</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--status-warning)' }}>3 pending moderation</span>
        </div>

      </div>

      {/* Main Grid: Database & Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: Database Manager */}
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Tattoo Catalog Database ({dbTattoos.length})</h3>
            {!showAddForm && (
              <button
                id="btn-trigger-add-tattoo"
                type="button"
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
              >
                <Plus size={14} /> Add Design
              </button>
            )}
          </div>

          {/* Add Tattoo Form Inline */}
          {showAddForm && (
            <form onSubmit={handleAddTattoo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-surface-elevated)', padding: '1.2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} className="animate-fade-in">
              {successMsg ? (
                <div style={{ textAlign: 'center', color: 'var(--status-success)', padding: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Check size={18} /> Catalog Updated Successfully!
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Design Name</label>
                      <input
                        id="new-tattoo-name"
                        type="text"
                        required
                        placeholder="e.g., Crescent Moon"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Style</label>
                      <select
                        id="new-tattoo-style"
                        value={newStyle}
                        onChange={(e) => setNewStyle(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                      >
                        {['Minimal', 'Geometric', 'Watercolor', 'Japanese', 'Traditional', 'Fine Line'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Pain Level</label>
                      <select
                        id="new-tattoo-pain"
                        value={newPain}
                        onChange={(e) => setNewPain(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Estimated Cost</label>
                      <input
                        id="new-tattoo-cost"
                        type="text"
                        placeholder="e.g., $150 - $250"
                        value={newCost}
                        onChange={(e) => setNewCost(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Symbolic Meaning</label>
                    <textarea
                      id="new-tattoo-meaning"
                      required
                      rows="2"
                      placeholder="Enter the primary symbolism explanation..."
                      value={newMeaning}
                      onChange={(e) => setNewMeaning(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-base)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                    <button
                      id="btn-cancel-new-tattoo"
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    >
                      Cancel
                    </button>
                    <button
                      id="btn-submit-new-tattoo"
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    >
                      Insert Record
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          {/* Database Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.8rem 0.5rem' }}>DESIGN</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>STYLE</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>PAIN</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>COST</th>
                  <th style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {dbTattoos.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '0.8rem 0.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-secondary)' }}>{t.style}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-secondary)' }}>{t.painLevel}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: 'var(--text-secondary)' }}>{t.estimatedCost.split(' ')[0]}</td>
                    <td style={{ padding: '0.8rem 0.5rem', textAlign: 'right' }}>
                      <button
                        id={`btn-delete-tattoo-${t.id}`}
                        type="button"
                        onClick={() => handleDeleteTattoo(t.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--status-error)', cursor: 'pointer', opacity: 0.7 }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                      >
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* RIGHT COLUMN: Live User Log Stream */}
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} style={{ color: 'var(--accent-teal)' }} /> Real-time Assessment Stream
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockLogs.map(log => (
              <div 
                key={log.id} 
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.04)', 
                  borderRadius: '8px', 
                  padding: '1rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span style={{ color: 'var(--text-primary)' }}>{log.user} (Age {log.age})</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '0.7rem' }}>{log.date}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  Traits: {log.traits}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ color: 'var(--accent-teal)' }}>Matched: {log.matched}</span>
                  <span style={{ color: 'var(--status-success)', fontWeight: 'bold' }}>{log.score}% compatibility</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            System listening on socket port 8000 (Simulated)
          </div>

        </div>

      </div>

    </div>
  );
}
