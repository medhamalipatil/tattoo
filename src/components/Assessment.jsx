import React, { useState } from 'react';
import { Compass, Sparkles, Heart, HelpCircle, ArrowRight, ArrowLeft, RefreshCw, BarChart2 } from 'lucide-react';

export default function Assessment({ onComplete }) {
  const [step, setStep] = useState(0);
  const [personality, setPersonality] = useState({
    extroversion: 0.5,
    adventure: 0.5,
    logic: 0.5
  });
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [preferences, setPreferences] = useState({
    style: 'Minimal',
    placement: 'Forearm',
    size: 'Medium'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const totalSteps = 5;

  const toggleItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(x => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Trigger AI Analysis animation
      setIsAnalyzing(true);
      setAnalysisProgress(10);
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete({
                personality,
                values: selectedValues,
                interests: selectedInterests,
                experiences: selectedExperiences,
                preferences
              });
            }, 600);
            return 100;
          }
          return prev + 15;
        });
      }, 200);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '4rem auto' }}>
        <RefreshCw size={48} className="gradient-text animate-float" style={{ animation: 'spin 3s linear infinite', marginBottom: '2rem' }} />
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Analyzing Soul Profile...</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Mapping personality scores, cross-referencing archetypes, and fetching cultural symbolism connections...
        </p>
        
        <div style={{ background: 'var(--bg-surface-elevated)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ 
            height: '100%', 
            width: `${analysisProgress}%`, 
            background: 'var(--accent-gradient)',
            transition: 'width 0.2s ease-in-out'
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{analysisProgress < 40 ? 'Analyzing traits...' : analysisProgress < 80 ? 'Calculating Jaccard overlaps...' : 'Structuring explanations...'}</span>
          <span>{analysisProgress}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '700px', margin: '2rem auto', padding: '2.5rem', position: 'relative' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass className="gradient-text" size={24} />
          <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>Soul Assessment</h2>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Step {step + 1} of {totalSteps + 1}
        </div>
      </div>

      {/* Progress indicators */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '2rem' }}>
        {Array.from({ length: totalSteps + 1 }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: '4px',
            borderRadius: '2px',
            backgroundColor: i <= step ? 'var(--accent-teal)' : 'var(--bg-surface-elevated)',
            opacity: i <= step ? 1 : 0.4,
            transition: 'all 0.3s ease'
          }}></div>
        ))}
      </div>

      {/* Step Content */}
      <div style={{ minHeight: '320px' }}>
        {step === 0 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontWeight: 600 }}>Let's find the ink that mirrors your soul.</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Unlike generic collections of trending photos, SoulInk designs recommendations based on who you are. This interactive assessment calculates your values, traits, and life journey to match you with deep tattoo history and symbols.
            </p>
            <div style={{ padding: '1.2rem', background: 'rgba(0, 242, 254, 0.05)', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.1)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Sparkles size={20} className="gradient-text" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                <strong>How it works:</strong> We use a hybrid content-filtering recommendation engine to balance your personal traits, desired size, style, and core emotional memories, matching them against curated cultural histories.
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Takes approximately 2 minutes. You can reset or re-take this assessment at any time.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Personality Dimensions</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Drag the sliders to reflect where you sit on these core psychological spectrums.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Slider 1: Introvert / Extrovert */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span>Introvert</span>
                  <span style={{ color: 'var(--accent-teal)' }}>
                    {personality.extroversion < 0.4 ? 'Introspective' : personality.extroversion > 0.6 ? 'Social Explorer' : 'Balanced'}
                  </span>
                  <span>Extrovert</span>
                </div>
                <input 
                  id="slider-extrovert"
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={personality.extroversion}
                  onChange={(e) => setPersonality({ ...personality, extroversion: parseFloat(e.target.value) })}
                />
              </div>

              {/* Slider 2: Peaceful / Adventurous */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span>Peaceful / Calm</span>
                  <span style={{ color: 'var(--accent-teal)' }}>
                    {personality.adventure < 0.4 ? 'Zen Mind' : personality.adventure > 0.6 ? 'Thrill Seeker' : 'Flexible'}
                  </span>
                  <span>Adventurous</span>
                </div>
                <input 
                  id="slider-adventure"
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={personality.adventure}
                  onChange={(e) => setPersonality({ ...personality, adventure: parseFloat(e.target.value) })}
                />
              </div>

              {/* Slider 3: Emotional / Logical */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                  <span>Emotional / Intuitive</span>
                  <span style={{ color: 'var(--accent-teal)' }}>
                    {personality.logic < 0.4 ? 'Heart-Led' : personality.logic > 0.6 ? 'Mind-Led' : 'Intuitive Thinker'}
                  </span>
                  <span>Logical / Analytical</span>
                </div>
                <input 
                  id="slider-logic"
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={personality.logic}
                  onChange={(e) => setPersonality({ ...personality, logic: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Core Life Values</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Select the principles that guide your decisions and matter the most to you (Choose 1 to 4).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {['Freedom', 'Family', 'Success', 'Love', 'Spirituality', 'Growth', 'Loyalty'].map((val) => {
                const active = selectedValues.includes(val);
                return (
                  <button
                    key={val}
                    id={`value-${val.toLowerCase()}`}
                    type="button"
                    onClick={() => toggleItem(val, selectedValues, setSelectedValues)}
                    style={{
                      padding: '0.8rem 1.2rem',
                      borderRadius: '30px',
                      border: '1px solid',
                      borderColor: active ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.1)',
                      background: active ? 'rgba(0, 242, 254, 0.12)' : 'var(--bg-surface-elevated)',
                      color: active ? 'var(--accent-teal)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      boxShadow: active ? '0 0 10px rgba(0, 242, 254, 0.1)' : 'none'
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Personal Interests</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Which fields of interest inspire you in your free time? (Select all that apply)
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.8rem' }}>
              {['Nature', 'Music', 'Anime', 'Books', 'Mountains', 'Ocean', 'Space', 'Mythology', 'Travel', 'Fitness'].map((interest) => {
                const active = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    id={`interest-${interest.toLowerCase()}`}
                    type="button"
                    onClick={() => toggleItem(interest, selectedInterests, setSelectedInterests)}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: active ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.08)',
                      background: active ? 'rgba(0, 242, 254, 0.08)' : 'var(--bg-surface-elevated)',
                      color: active ? 'var(--accent-teal)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Influential Life Experiences</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Select chapters of your life that have heavily shaped your character.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                'Overcoming failure', 
                'Losing someone', 
                'New beginning', 
                'Self-discovery', 
                'Mental health journey', 
                'Graduation', 
                'Becoming independent'
              ].map((exp) => {
                const active = selectedExperiences.includes(exp);
                return (
                  <button
                    key={exp}
                    id={`exp-${exp.replace(/\s+/g, '-').toLowerCase()}`}
                    type="button"
                    onClick={() => toggleItem(exp, selectedExperiences, setSelectedExperiences)}
                    style={{
                      padding: '0.9rem 1.2rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: active ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.08)',
                      background: active ? 'rgba(0, 242, 254, 0.08)' : 'var(--bg-surface-elevated)',
                      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{exp}</span>
                    {active && <span style={{ color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: 'bold' }}>Active</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Design & Placement Preferences</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Finalize the aesthetic preferences of the canvas you are planning.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Tattoo Style</label>
                <select 
                  id="pref-style"
                  value={preferences.style}
                  onChange={(e) => setPreferences({ ...preferences, style: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  {['Minimal', 'Traditional', 'Fine Line', 'Geometric', 'Tribal', 'Japanese', 'Watercolor', 'Realism'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Desired Placement</label>
                <select 
                  id="pref-placement"
                  value={preferences.placement}
                  onChange={(e) => setPreferences({ ...preferences, placement: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  {['Wrist', 'Forearm', 'Back', 'Shoulder', 'Neck', 'Ankle'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Approximate Size</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['Small', 'Medium', 'Large'].map((sz) => {
                    const active = preferences.size === sz;
                    return (
                      <button
                        key={sz}
                        id={`pref-size-${sz.toLowerCase()}`}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, size: sz })}
                        style={{
                          flex: 1,
                          padding: '0.8rem',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: active ? 'var(--accent-teal)' : 'rgba(255, 255, 255, 0.08)',
                          background: active ? 'rgba(0, 242, 254, 0.08)' : 'var(--bg-surface-elevated)',
                          color: active ? 'var(--accent-teal)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          id="btn-back"
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="btn-secondary"
          style={{ opacity: step === 0 ? 0.3 : 1 }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          id="btn-next"
          type="button"
          onClick={handleNext}
          className="btn-primary"
        >
          {step === totalSteps ? 'Run Matching AI' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
