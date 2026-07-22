import React, { useState, useEffect, useRef } from 'react';
import {
  User, ChevronRight, RotateCcw, Clock,
  Brain, Palette, MapPin, Star, Award, ChevronDown, ChevronUp
} from 'lucide-react';
import {
  generateConsultationReport,
  saveConsultationToHistory,
  loadConsultationHistory,
} from '../utils/aiConsultant';
import { IconAllSeeingEye, IconDiamondSparkle } from './ui/TattooIcons';

// ── Question Flow Definition ──────────────────────────────────────────────────
const QUESTIONS = [
  {
    key: 'personality',
    type: 'single',
    message: "Hello! 👋 I'm your personal AI Tattoo Consultant.\n\nI'm going to ask you 7 short questions to understand your soul — then I'll craft a fully personalized tattoo recommendation just for you.\n\nLet's begin. How would you describe your personality?",
    options: ['Introverted', 'Ambivert', 'Extroverted'],
  },
  {
    key: 'lifestyle',
    type: 'multi',
    message: "Interesting! Now tell me — what does your typical lifestyle look like?\n*(Select all that apply)*",
    options: ['Active & Adventurous', 'Creative & Artistic', 'Spiritual & Mindful', 'Social & Outgoing', 'Professional & Ambitious', 'Homebody & Cozy'],
  },
  {
    key: 'values',
    type: 'multi',
    message: "What values matter most to you in life?\n*(Select all that apply)*",
    options: ['Freedom', 'Family', 'Growth', 'Love', 'Success', 'Loyalty', 'Spirituality', 'Independence', 'Adventure'],
  },
  {
    key: 'experiences',
    type: 'multi',
    message: "Have any significant life experiences shaped who you are?\n*(Select all that apply)*",
    options: ['New beginning', 'Overcoming failure', 'Mental health journey', 'Self-discovery', 'Losing someone', 'Graduation', 'Becoming independent'],
  },
  {
    key: 'purpose',
    type: 'single',
    message: "What is the main purpose behind getting this tattoo?",
    options: ['A meaningful memory', 'Personal expression', 'Pure aesthetic', 'Healing & closure', 'Marking an identity', 'Celebrating a milestone'],
  },
  {
    key: 'interests',
    type: 'multi',
    message: "What are you most passionate about?\n*(Select all that apply)*",
    options: ['Nature & Outdoors', 'Music & Art', 'Travel & Exploration', 'Mythology & Stories', 'Fitness & Sport', 'Space & Universe', 'Anime & Pop Culture', 'Books & Literature'],
  },
  {
    key: 'styles',
    type: 'multi',
    message: "Last question! Do you have any preferred tattoo styles?\n*(Select all that apply — or choose any you're drawn to)*",
    options: ['Minimal', 'Geometric', 'Watercolor', 'Japanese', 'Traditional', 'Fine Line', 'Tribal', 'Blackwork', 'Realism'],
  },
];

// ── Typing Indicator Component ────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.2rem' }}>
      <div className="animate-pulse-glow" style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-purple))',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <IconAllSeeingEye size={20} color="#07070a" />
      </div>
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '18px 18px 18px 4px',
        padding: '0.8rem 1.2rem',
        display: 'flex', gap: '5px', alignItems: 'center'
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--accent-teal)',
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>
    </div>
  );
}

// ── AI Bubble Component ───────────────────────────────────────────────────────
function AIBubble({ text }) {
  const parts = text.split('\n').map((line, i) => (
    <span key={i}>
      {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={j} style={{ color: 'var(--accent-teal)' }}>{part.slice(2, -2)}</strong>
          : <span key={j}>{part}</span>
      )}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', maxWidth: '80%' }} className="animate-slide-up">
      <div className="animate-pulse-glow" style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-teal), var(--accent-purple))',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <IconAllSeeingEye size={20} color="#07070a" />
      </div>
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '4px 18px 18px 18px',
        padding: '0.9rem 1.2rem',
        fontSize: '0.9rem',
        lineHeight: 1.6,
        color: 'var(--text-primary)',
      }}>
        {parts}
      </div>
    </div>
  );
}

// ── User Bubble Component ─────────────────────────────────────────────────────
function UserBubble({ text }) {
  return (
    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', maxWidth: '70%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }} className="animate-slide-up">
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'rgba(173, 181, 189, 0.1)',
        border: '1px solid rgba(173, 181, 189, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <User size={16} style={{ color: 'var(--accent-teal)' }} />
      </div>
      <div style={{
        background: 'rgba(173, 181, 189, 0.1)',
        border: '1px solid rgba(173, 181, 189, 0.1)',
        borderRadius: '18px 4px 18px 18px',
        padding: '0.9rem 1.2rem',
        fontSize: '0.9rem',
        color: 'var(--accent-teal)',
        fontWeight: 500,
      }}>
        {text}
      </div>
    </div>
  );
}

// ── Consultation Report Component ─────────────────────────────────────────────
function ConsultationReport({ report, onRestart, artistsList }) {
  const { personalitySummary, archetype, recommendedSymbols, suggestedStyles, colourPalette, placementSuggestions, artistRecommendation, timestamp } = report;

  const formatText = (text) =>
    text.split(/(\*\*.*?\*\*)/).map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i} style={{ color: 'var(--accent-teal)' }}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(173, 181, 189, 0.1) 0%, rgba(157,78,221,0.05) 100%)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✨</div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.4rem' }}>
          Your Tattoo Soul Report
        </h2>
        <div style={{ display: 'inline-block', background: 'rgba(173, 181, 189, 0.1)', border: '1px solid rgba(173, 181, 189, 0.1)', borderRadius: '20px', padding: '0.3rem 1rem', color: 'var(--accent-teal)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>
          {archetype}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          Generated on {new Date(timestamp).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* 1. Personality Summary */}
      <div className="glass-panel" style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <Brain size={20} style={{ color: 'var(--accent-teal)' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Personality Summary</h3>
        </div>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {formatText(personalitySummary)}
        </p>
      </div>

      {/* 2. Recommended Symbols */}
      <div className="glass-panel" style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <IconDiamondSparkle size={20} color="var(--accent-teal)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recommended Symbols & Meaning</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recommendedSymbols.map((tattoo, i) => (
            <div key={tattoo.id} style={{
              display: 'flex', gap: '1.2rem', alignItems: 'center',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px', padding: '1.2rem',
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '56px', height: '56px', color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: tattoo.svgMarkup }} />
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: i === 0 ? 'var(--accent-teal)' : i === 1 ? 'var(--accent-purple)' : 'var(--accent-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 800, color: '#07070a'
                }}>
                  #{i + 1}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{tattoo.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--status-success)', fontWeight: 700 }}>{tattoo.matchScore}% match</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', marginBottom: '0.4rem' }}>{tattoo.style} · {tattoo.category}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tattoo.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tattoo Styles */}
      <div className="glass-panel" style={{ padding: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <Palette size={20} style={{ color: 'var(--accent-teal)' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recommended Tattoo Styles</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {suggestedStyles.map((s, i) => (
            <div key={s.name} style={{
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              padding: '1rem', borderRadius: '10px',
              background: i === 0 ? 'rgba(173, 181, 189, 0.1)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${i === 0 ? 'rgba(173, 181, 189, 0.1)' : 'rgba(255,255,255,0.04)'}`,
            }}>
              <div style={{ fontWeight: 800, fontSize: '1.3rem', color: i === 0 ? 'var(--accent-teal)' : 'var(--text-muted)', flexShrink: 0 }}>
                0{i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem', color: i === 0 ? 'var(--accent-teal)' : 'var(--text-primary)' }}>{s.name}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Colour Palette & Placement (side by side) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Colour Palette */}
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-gradient)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Colour Palette</h3>
          </div>
          <p style={{ fontWeight: 700, color: 'var(--accent-teal)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{colourPalette.name}</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>{colourPalette.description}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {colourPalette.colours.map((c, i) => (
              <div key={i} title={c} style={{
                flex: 1, height: '36px', borderRadius: '8px', background: c,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 4px 12px ${c}60`
              }} />
            ))}
          </div>
        </div>

        {/* Placement Suggestions */}
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <MapPin size={20} style={{ color: 'var(--accent-teal)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Placement Suggestions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {placementSuggestions.slice(0, 3).map((p, i) => (
              <div key={p.area} style={{ borderLeft: `2px solid ${i === 0 ? 'var(--accent-teal)' : 'rgba(255,255,255,0.1)'}`, paddingLeft: '0.8rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: i === 0 ? 'var(--accent-teal)' : 'var(--text-primary)' }}>{p.area}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{p.reason}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Artist Recommendation */}
      {artistRecommendation && (
        <div className="glass-panel" style={{ padding: '1.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Award size={20} style={{ color: 'var(--accent-teal)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Artist Recommendation</h3>
          </div>
          <div style={{
            display: 'flex', gap: '1.5rem', alignItems: 'center',
            background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(173, 181, 189, 0.1), rgba(157,78,221,0.2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              fontSize: '1.5rem'
            }}>
              🎨
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>{artistRecommendation.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>📍 {artistRecommendation.city} · {artistRecommendation.price}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {artistRecommendation.styles?.map(s => (
                  <span key={s} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(173, 181, 189, 0.1)', color: 'var(--accent-teal)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)', fontWeight: 700 }}>
              <Star size={14} fill="var(--accent-gold)" />
              <span>{artistRecommendation.rating}</span>
            </div>
          </div>
        </div>
      )}

      {/* Restart Button */}
      <button onClick={onRestart} className="btn-secondary" style={{ alignSelf: 'center', padding: '0.8rem 2rem', marginTop: '0.5rem' }}>
        <RotateCcw size={16} /> Start New Consultation
      </button>
    </div>
  );
}

// ── Main AIConsultant Component ───────────────────────────────────────────────
export default function AIConsultant({ globalCatalog, artistsList }) {
  const [phase, setPhase] = useState('chat'); // 'chat' | 'analyzing' | 'report'
  const [messages, setMessages] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelected, setMultiSelected] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [report, setReport] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedHistoryReport, setSelectedHistoryReport] = useState(null);

  const chatRef = useRef(null);

  // Load history on mount
  useEffect(() => {
    setHistory(loadConsultationHistory());
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initialize first message
  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{ type: 'ai', text: QUESTIONS[0].message }]);
      }, 1500);
    }, 300);
  }, []);

  const handleSingleAnswer = (option) => {
    const question = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [question.key]: option };
    setAnswers(newAnswers);

    setMessages(prev => [...prev, { type: 'user', text: option }]);
    advanceQuestion(newAnswers);
  };

  const handleMultiConfirm = () => {
    const question = QUESTIONS[currentQ];
    const selected = multiSelected.length > 0 ? multiSelected : [question.options[0]];
    const newAnswers = { ...answers, [question.key]: selected };
    setAnswers(newAnswers);

    setMessages(prev => [...prev, { type: 'user', text: selected.join(', ') }]);
    setMultiSelected([]);
    advanceQuestion(newAnswers);
  };

  const toggleMulti = (opt) => {
    setMultiSelected(prev =>
      prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
    );
  };

  const advanceQuestion = (currentAnswers) => {
    const nextQ = currentQ + 1;

    if (nextQ >= QUESTIONS.length) {
      // All questions done — start analysis
      setTimeout(() => startAnalysis(currentAnswers), 500);
    } else {
      setCurrentQ(nextQ);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { type: 'ai', text: QUESTIONS[nextQ].message }]);
      }, 1400);
    }
  };

  const startAnalysis = (finalAnswers) => {
    setPhase('analyzing');
    setAnalysisProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setTimeout(() => {
          const generatedReport = generateConsultationReport(finalAnswers, globalCatalog, artistsList);
          saveConsultationToHistory(generatedReport);
          setHistory(prev => [generatedReport, ...prev].slice(0, 10));
          setReport(generatedReport);
          setPhase('report');
        }, 600);
      }
      setAnalysisProgress(Math.min(100, Math.round(progress)));
    }, 180);
  };

  const handleRestart = () => {
    setPhase('chat');
    setMessages([]);
    setCurrentQ(0);
    setAnswers({});
    setMultiSelected([]);
    setReport(null);
    setIsTyping(false);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{ type: 'ai', text: QUESTIONS[0].message }]);
      }, 1500);
    }, 300);
  };

  const currentQuestion = QUESTIONS[currentQ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* CSS for typing animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bot className="gradient-text" /> AI Tattoo Consultant
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Answer 7 questions and receive a fully personalised tattoo recommendation report.
          </p>
        </div>
        <button
          onClick={() => setShowHistory(v => !v)}
          className="btn-secondary"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          <Clock size={15} /> Past Consultations ({history.length})
          {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>Consultation History</h3>
          {history.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No past consultations yet. Complete your first one below!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {history.map(h => (
                <div
                  key={h.id}
                  onClick={() => { setSelectedHistoryReport(h); setShowHistory(false); setPhase('report'); setReport(h); }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.9rem 1.2rem', borderRadius: '10px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'border-color 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(173, 181, 189, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{h.archetype}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {new Date(h.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ANALYZING PHASE ── */}
      {phase === 'analyzing' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <Sparkles size={48} className="gradient-text animate-float" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem' }}>Analysing Your Soul Profile...</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Cross-referencing your answers with our tattoo symbolism database
          </p>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ height: '6px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.8rem' }}>
              <div style={{
                height: '100%', width: `${analysisProgress}%`,
                background: 'var(--accent-gradient)',
                borderRadius: '3px',
                transition: 'width 0.2s ease'
              }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {analysisProgress < 30 && 'Mapping personality traits...'}
              {analysisProgress >= 30 && analysisProgress < 60 && 'Scoring tattoo symbol matches...'}
              {analysisProgress >= 60 && analysisProgress < 85 && 'Generating colour & placement analysis...'}
              {analysisProgress >= 85 && 'Finalising your personal report...'}
            </div>
          </div>
        </div>
      )}

      {/* ── REPORT PHASE ── */}
      {phase === 'report' && report && (
        <ConsultationReport
          report={report}
          onRestart={handleRestart}
          artistsList={artistsList}
        />
      )}

      {/* ── CHAT PHASE ── */}
      {phase === 'chat' && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '600px' }}>

          {/* Progress bar */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              <span>Question {Math.min(currentQ + 1, QUESTIONS.length)} of {QUESTIONS.length}</span>
              <span>{Math.round((currentQ / QUESTIONS.length) * 100)}% complete</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <div style={{
                height: '100%',
                width: `${(currentQ / QUESTIONS.length) * 100}%`,
                background: 'var(--accent-gradient)',
                borderRadius: '2px',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          {/* Messages scroll area */}
          <div ref={chatRef} style={{
            flex: 1, overflowY: 'auto', padding: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
            minHeight: '320px', maxHeight: '420px'
          }}>
            {messages.map((msg, i) => (
              msg.type === 'ai'
                ? <AIBubble key={i} text={msg.text} />
                : <UserBubble key={i} text={msg.text} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Answer Input Area */}
          {!isTyping && messages.length > 0 && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="animate-fade-in">
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: currentQuestion?.type === 'multi' ? '1rem' : 0 }}>
                {currentQuestion?.options.map(opt => {
                  const isSelected = currentQuestion.type === 'multi'
                    ? multiSelected.includes(opt)
                    : false;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (currentQuestion.type === 'single') {
                          handleSingleAnswer(opt);
                        } else {
                          toggleMulti(opt);
                        }
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--accent-teal)' : 'rgba(255,255,255,0.12)',
                        background: isSelected ? 'rgba(173, 181, 189, 0.1)' : 'var(--bg-surface-elevated)',
                        color: isSelected ? 'var(--accent-teal)' : 'var(--text-secondary)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isSelected && '✓ '}{opt}
                    </button>
                  );
                })}
              </div>

              {currentQuestion?.type === 'multi' && (
                <button
                  onClick={handleMultiConfirm}
                  className="btn-primary"
                  style={{ padding: '0.7rem 1.8rem', fontSize: '0.9rem' }}
                >
                  <ChevronRight size={16} />
                  Continue {multiSelected.length > 0 ? `(${multiSelected.length} selected)` : '(skip)'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
