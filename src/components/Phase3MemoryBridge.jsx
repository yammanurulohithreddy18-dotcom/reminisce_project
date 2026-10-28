import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Camera, UserCheck, Heart, Sparkles, MessageCircle, AlertCircle, RefreshCw, Music, CheckCircle2, Send, CornerDownRight } from 'lucide-react';
import { audioPlayer } from '../utils/audioSynthesizer';
import { speechEngine } from '../utils/speechVoice';
import { generateDignityResponse } from '../utils/dignityGenerator';
import confetti from 'canvas-confetti';

export default function Phase3MemoryBridge({ graphData, patientProfile }) {
  const [activeSubTab, setActiveSubTab] = useState('dignity'); // 'dignity', 'session', 'camera', 'music'
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('kishore');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [agitationLevel, setAgitationLevel] = useState(15);
  const [activeSessionStep, setActiveSessionStep] = useState(0);

  // Live Patient Statement Input State for Dignity Protocol Simulator
  const [customPatientInput, setCustomPatientInput] = useState(
    "Where is my lecture hall? My students at Osmania are waiting for me right now!"
  );
  const [dignityResult, setDignityResult] = useState(() => 
    generateDignityResponse("Where is my lecture hall? My students at Osmania are waiting for me right now!", patientProfile)
  );

  const PRESET_DIGNITY_INPUTS = [
    "Where is my lecture hall? My students at Osmania are waiting for me right now!",
    "Who is that lady who just brought this water? Where is my mother?",
    "Someone stole my wallet and watch from my room!",
    "Why am I in this strange house? Take me home right now!",
    "I need to catch the 9 AM bus to school."
  ];

  const handleRunDignitySimulation = () => {
    if (!customPatientInput.trim()) return;
    const res = generateDignityResponse(customPatientInput, patientProfile);
    setDignityResult(res);
  };

  const handleApplyDignityPreset = (text) => {
    setCustomPatientInput(text);
    const res = generateDignityResponse(text, patientProfile);
    setDignityResult(res);
  };

  const VISITORS = [
    {
      id: 'meena',
      name: patientProfile?.spouse?.name || 'Meena Sundaram',
      relation: 'Wife of 42 years',
      confidence: 99.2,
      contextTitle: `This is ${patientProfile?.spouse?.name || 'Meena'} — your wife of 42 years`,
      contextBody: 'You met at Osmania University Arts College Library in 1979 over a shared copy of Rabindranath Tagore. Her laughter brings instant calm.',
      recommendedMusic: 'kishore',
      musicName: "Kishore Kumar — 'Pal Pal Dil Ke Paas'",
      photoNote: 'Shared photo from Priya’s wedding in Dec 2015 loaded',
      bondScore: '9.8 / 10'
    },
    {
      id: 'priya',
      name: patientProfile?.familyContact?.name || 'Priya Sundaram',
      relation: 'Daughter (Architect)',
      confidence: 98.7,
      contextTitle: `This is ${patientProfile?.familyContact?.name?.split(' ')[0] || 'Priya'} — your beloved daughter`,
      contextBody: 'She traveled from Bangalore to visit you today. You gave an emotional 8-minute toast at her wedding that had everyone crying and laughing.',
      recommendedMusic: 'wedding',
      musicName: 'Acoustic Wedding Sitar & Flute',
      photoNote: 'Father-daughter wedding toast photograph loaded',
      bondScore: '9.5 / 10'
    },
    {
      id: 'kabir',
      name: 'Kabir',
      relation: 'Grandson (Age 7)',
      confidence: 97.4,
      contextTitle: 'This is Kabir — your 7-year-old grandson',
      contextBody: 'He loves when you tell him stories about the friendly monkeys of the Deccan plateau and read Ruskin Bond on the cane chair.',
      recommendedMusic: 'coffee',
      musicName: 'Morning Verandah Melody',
      photoNote: 'Reading illustrated books photograph loaded',
      bondScore: '9.1 / 10'
    }
  ];

  const [selectedVisitor, setSelectedVisitor] = useState(VISITORS[0]);
  const [recognitionAlert, setRecognitionAlert] = useState(true);

  const SESSION_STEPS = [
    {
      id: 'identity',
      title: 'Step 1: Identity & Dignity Anchor',
      prompt: `Good morning, Professor ${patientProfile?.name?.split(' ')[0] || 'Rajan'}. It is a peaceful morning. You are ${patientProfile?.name || 'Rajan Sundaram'} — scholar of literature, beloved husband of ${patientProfile?.spouse?.name || 'Meena'}, and father of ${patientProfile?.familyContact?.name || 'Priya'}.`,
      anchor: 'Identity Narrative',
      weight: 10
    },
    {
      id: 'memory_priya',
      title: "Step 2: Priya's 2015 Wedding Toast",
      prompt: 'Here is a photo of Priya hugging you in her wedding saree. You gave a toast that had 300 guests laughing and crying together. Would you like to hear a few words of what you said?',
      anchor: 'Autobiographical High-Resilience Memory',
      weight: 9.7
    },
    {
      id: 'music_kishore',
      title: 'Step 3: Musical Retro Activation',
      prompt: "Meena is smiling beside you. Listening to your favorite Kishore Kumar song, 'Pal Pal Dil Ke Paas', together on the verandah.",
      anchor: 'Preserved Musical Pathway',
      weight: 9.6
    }
  ];

  const toggleMusic = (track = currentTrack) => {
    if (isPlayingMusic && track === currentTrack) {
      audioPlayer.stop();
      setIsPlayingMusic(false);
    } else {
      audioPlayer.startMelody(track);
      setCurrentTrack(track);
      setIsPlayingMusic(true);
    }
  };

  const handleSpeakText = (text) => {
    if (isSpeaking) {
      speechEngine.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechEngine.speak(text, () => {
        setIsSpeaking(false);
      });
    }
  };

  useEffect(() => {
    if (agitationLevel > 60 && !isPlayingMusic) {
      toggleMusic('kishore');
    }
  }, [agitationLevel]);

  const triggerFaceRecognition = (visitor) => {
    setSelectedVisitor(visitor);
    setRecognitionAlert(true);
    audioPlayer.playRecognitionChime();

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    if (!isPlayingMusic) {
      toggleMusic(visitor.recommendedMusic);
    }
  };

  return (
    <div className="phase-container" style={{ padding: '32px 0' }}>
      {/* Phase Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: '#EEEDFE', color: '#534AB7', padding: '3px 10px', borderRadius: 16, fontWeight: 600 }}>PHASE 3 · ALZHEIMER'S STAGE</span>
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>Gentle Memory Bridge & Preserved Neural Pathways</span>
        </div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: '#0F0F0F', margin: '0 0 8px' }}>The Memory Bridge</h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 740, lineHeight: 1.6 }}>
          Alzheimer's does not destroy memories — it destroys the access pathways. 
          Phase 3 exploits preserved memory pathways: emotional memory, procedural routines, and caudal cingulate musical memory.
          Test custom patient statements in the Dignity Protocol input simulator below.
        </p>
      </div>

      {/* Sub Navigation */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #D5D0C6', marginBottom: 24, overflowX: 'auto' }}>
        {[
          { id: 'dignity', label: 'Dignity Protocol Simulator (Patient Input)', icon: Heart },
          { id: 'session', label: '15-Min Daily Memory Session (RAG)', icon: Sparkles },
          { id: 'camera', label: 'Real-Time Face Recognition HUD', icon: Camera },
          { id: 'music', label: 'Emotion-Adaptive Music Console', icon: Music }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 18px',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '3px solid #534AB7' : '3px solid transparent',
                color: isActive ? '#534AB7' : '#6B6B6B',
                fontWeight: isActive ? 600 : 500,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DIGNITY PROTOCOL LIVE PATIENT STATEMENT INPUT SIMULATOR */}
      {activeSubTab === 'dignity' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          {/* Input Box Panel */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#534AB7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Patient Statement Input</span>
              <span style={{ fontSize: 11, background: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Kitwood Dignity Engine</span>
            </div>

            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3A3A3A', marginBottom: 6 }}>
              Type Any Confused, Anxious, or Disoriented Statement from the Patient:
            </label>
            <textarea
              rows={4}
              value={customPatientInput}
              onChange={(e) => setCustomPatientInput(e.target.value)}
              placeholder="e.g. 'Where is my lecture hall? My students are waiting!' or 'Who is that woman who brought water?'"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #D5D0C6',
                fontSize: 13,
                lineHeight: 1.5,
                boxSizing: 'border-box',
                background: '#FAFAFA',
                outline: 'none',
                marginBottom: 12
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button
                onClick={handleRunDignitySimulation}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 8,
                  background: '#534AB7',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                <Heart size={14} /> Run Dignity Protocol Engine
              </button>
            </div>

            {/* Presets */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 8 }}>Or Populate With Frequent Clinical Utterance Presets:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PRESET_DIGNITY_INPUTS.map((statement, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyDignityPreset(statement)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      background: '#F7F5F0',
                      border: '1px solid #D5D0C6',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      lineHeight: 1.4
                    }}
                  >
                    <span>"{statement}"</span>
                    <CornerDownRight size={14} color="#534AB7" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Dignity Response vs Harmful Instinct */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#534AB7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Comparative Response Analysis</span>
              <span style={{ fontSize: 11, background: '#E1F5EE', color: '#0F6E56', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Never Corrects</span>
            </div>

            {dignityResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Harmful Conventional Correction */}
                <div style={{ background: '#FCEBEB', border: '1px solid #F7C1C1', borderRadius: 10, padding: 14 }}>
                  <div style={{ color: '#A32D2D', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>
                    ❌ Harmful Clinical Instinct (Reality Orientation / Correction)
                  </div>
                  <div style={{ fontSize: 12, color: '#7A1C1C', lineHeight: 1.5 }}>
                    {dignityResult.harmfulCorrection}
                  </div>
                </div>

                {/* REMINISCE Dignity-First Response */}
                <div style={{ background: '#E1F5EE', border: '1px solid #9FE1CB', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ color: '#085041', fontWeight: 600, fontSize: 13 }}>
                      ✅ REMINISCE Dignity-First Response
                    </div>
                    <button
                      onClick={() => handleSpeakText(dignityResult.dignityResponse.replace('✓', '').trim())}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: 'none',
                        background: isSpeaking ? '#C0392B' : '#0F6E56',
                        color: '#FFFFFF',
                        fontSize: 11,
                        cursor: 'pointer'
                      }}
                    >
                      <Volume2 size={12} /> {isSpeaking ? 'Stop Voice' : 'Speak Aloud'}
                    </button>
                  </div>
                  <div style={{ fontSize: 13, color: '#085041', lineHeight: 1.6, fontWeight: 500 }}>
                    {dignityResult.dignityResponse}
                  </div>
                </div>

                {/* Applied Kitwood Principle */}
                <div style={{ background: '#F7F5F0', borderRadius: 8, padding: 12, border: '1px solid #EDEAE3', fontSize: 11, color: '#6B6B6B', lineHeight: 1.5 }}>
                  <strong>Applied Neuro-Dignity Rule:</strong> {dignityResult.dignityRule}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9B9B9B', fontStyle: 'italic' }}>
                Type a patient statement in the left box to generate dignity protocol guidance.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 15-MIN DAILY MEMORY SESSION (RAG) */}
      {activeSubTab === 'session' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#534AB7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Knowledge Graph RAG Session</span>
              <span style={{ fontSize: 11, background: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Spaced Retrieval Algorithm</span>
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #534AB7' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 600, marginBottom: 4 }}>
                {SESSION_STEPS[activeSessionStep].title}
              </div>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', lineHeight: 1.5, margin: '8px 0 16px' }}>
                "{SESSION_STEPS[activeSessionStep].prompt}"
              </p>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button
                  onClick={() => handleSpeakText(SESSION_STEPS[activeSessionStep].prompt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 18px',
                    borderRadius: 8,
                    background: isSpeaking ? '#C0392B' : '#534AB7',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  <Volume2 size={16} /> {isSpeaking ? 'Pause Narration' : "Listen in Cloned Voice (XTTS)"}
                </button>

                <button
                  onClick={() => toggleMusic('kishore')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: isPlayingMusic ? '#E1F5EE' : '#FFFFFF',
                    color: isPlayingMusic ? '#0F6E56' : '#3A3A3A',
                    border: '1px solid #D5D0C6',
                    fontSize: 12,
                    cursor: 'pointer'
                  }}
                >
                  <Music size={14} /> {isPlayingMusic ? 'Mute Kishore Melody' : 'Play Background Music'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EDEAE3', paddingTop: 16 }}>
              <div style={{ fontSize: 12, color: '#6B6B6B' }}>
                Step {activeSessionStep + 1} of {SESSION_STEPS.length} · <strong>{SESSION_STEPS[activeSessionStep].anchor}</strong>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  disabled={activeSessionStep === 0}
                  onClick={() => setActiveSessionStep(s => s - 1)}
                  style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #D5D0C6', background: '#FFFFFF', cursor: activeSessionStep === 0 ? 'not-allowed' : 'pointer', fontSize: 12 }}
                >
                  Previous
                </button>
                <button
                  disabled={activeSessionStep === SESSION_STEPS.length - 1}
                  onClick={() => setActiveSessionStep(s => s + 1)}
                  style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#534AB7', color: '#FFFFFF', cursor: activeSessionStep === SESSION_STEPS.length - 1 ? 'not-allowed' : 'pointer', fontSize: 12, fontWeight: 600 }}
                >
                  Next Anchor
                </button>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#534AB7', textTransform: 'uppercase', marginBottom: 4 }}>Neo4j RAG Query Execution</div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', margin: '0 0 12px' }}>Graph Traversal Pipeline</h4>

            <div style={{ background: '#1A1A1A', borderRadius: 10, padding: 14, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#E0E0E0', lineHeight: 1.7, marginBottom: 16, overflowX: 'auto' }}>
              <span style={{ color: '#6B8A6B' }}>// Cypher query for current session</span><br/>
              <span style={{ color: '#85B7EB' }}>MATCH</span> (p:Person &#123;id: 'rajan'&#125;)-[r:MARRIED_TO|PARENT_OF]-&gt;(target)<br/>
              <span style={{ color: '#85B7EB' }}>OPTIONAL MATCH</span> (target)-[:INVOLVED_IN]-&gt;(e:Event)<br/>
              <span style={{ color: '#85B7EB' }}>WHERE</span> e.emotional_weight &gt;= <span style={{ color: '#98CC98' }}>9.5</span><br/>
              <span style={{ color: '#85B7EB' }}>RETURN</span> target.name, e.description, e.audio_anchor<br/>
              <span style={{ color: '#85B7EB' }}>ORDER BY</span> e.emotional_weight <span style={{ color: '#85B7EB' }}>DESC</span>
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 8, padding: 14, border: '1px solid #EDEAE3', fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: '#0F0F0F', marginBottom: 4 }}>Preserved Pathway Science</div>
              <p style={{ margin: 0, color: '#6B6B6B', lineHeight: 1.5 }}>
                Amygdala autobiographical memory survives hippocampal decay. 
                By anchoring on Priya's wedding (score 9.7) and Kishore Kumar melodies (score 9.6), the system rebuilds synaptic access without taxing working memory.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-TIME FACE RECOGNITION CAMERA HUD */}
      {activeSubTab === 'camera' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div style={{ background: '#0F0F0F', borderRadius: 16, overflow: 'hidden', position: 'relative', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E74C3C', animation: 'pulse 1s infinite' }} />
                <span style={{ color: '#FFFFFF', fontSize: 11, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Tablet Ambient Sentinel · 30 FPS</span>
              </div>
              <span style={{ background: 'rgba(29, 158, 117, 0.3)', border: '1px solid #1D9E75', color: '#1D9E75', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                FaceNet 512d Matched ({selectedVisitor.confidence}%)
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 180,
                height: 220,
                border: '2px solid #1D9E75',
                borderRadius: 16,
                position: 'relative',
                boxShadow: '0 0 24px rgba(29, 158, 117, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 10
              }}>
                <div style={{ position: 'absolute', top: -4, left: -4, width: 14, height: 14, borderTop: '3px solid #1D9E75', borderLeft: '3px solid #1D9E75' }} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderTop: '3px solid #1D9E75', borderRight: '3px solid #1D9E75' }} />
                <div style={{ position: 'absolute', bottom: -4, left: -4, width: 14, height: 14, borderBottom: '3px solid #1D9E75', borderLeft: '3px solid #1D9E75' }} />
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 14, height: 14, borderBottom: '3px solid #1D9E75', borderRight: '3px solid #1D9E75' }} />

                <div style={{ background: '#1D9E75', color: '#FFFFFF', fontSize: 10, fontFamily: 'JetBrains Mono', padding: '2px 6px', borderRadius: 4, alignSelf: 'flex-start' }}>
                  {selectedVisitor.name}
                </div>

                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                  [Face Mesh Locked]
                </div>

                <div style={{ background: 'rgba(0,0,0,0.6)', color: '#FAC775', fontSize: 10, fontFamily: 'JetBrains Mono', padding: '2px 6px', borderRadius: 4, alignSelf: 'center' }}>
                  Bond: {selectedVisitor.bondScore}
                </div>
              </div>
            </div>

            {recognitionAlert && (
              <div style={{ background: 'rgba(247, 245, 240, 0.96)', borderRadius: 12, padding: 16, color: '#0F0F0F', border: '2px solid #1D9E75', zIndex: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F6E56' }}>
                    {selectedVisitor.contextTitle}
                  </div>
                  <span style={{ fontSize: 10, background: '#E1F5EE', color: '#0F6E56', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
                    {selectedVisitor.relation}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#3A3A3A', margin: '4px 0 8px', lineHeight: 1.5 }}>
                  {selectedVisitor.contextBody}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#854F0B', borderTop: '1px solid #D5D0C6', paddingTop: 6 }}>
                  <span>🎵 Autoplaying: <strong>{selectedVisitor.musicName}</strong></span>
                  <span style={{ color: '#0F6E56', fontWeight: 600 }}>{selectedVisitor.photoNote}</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24 }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#0F6E56', textTransform: 'uppercase', marginBottom: 4 }}>Simulate Doorway Visitor</div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', margin: '0 0 14px' }}>Test Real-Time Recognition</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {VISITORS.map(v => (
                <button
                  key={v.id}
                  onClick={() => triggerFaceRecognition(v)}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    border: selectedVisitor.id === v.id ? '2px solid #0F6E56' : '1px solid #EDEAE3',
                    background: selectedVisitor.id === v.id ? '#F0F9F5' : '#FFFFFF',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F0F0F' }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: '#6B6B6B' }}>{v.relation}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#0F6E56', fontWeight: 600 }}>{v.confidence}% match</div>
                    <div style={{ fontSize: 10, color: '#854F0B' }}>Bond: {v.bondScore}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 8, padding: 14, marginTop: 16, fontSize: 12, color: '#6B6B6B', lineHeight: 1.5 }}>
              <strong>Clinical Purpose:</strong> When a family member walks in, Alzheimer's patients often look at them with anxious confusion. The tablet camera instantly delivers gentle relationship context, relieving fear before it sparks agitation.
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EMOTION-ADAPTIVE MUSIC ENGINE */}
      {activeSubTab === 'music' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Emotion-Adaptive Music Console</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
                Synthesized retro melodies directly targeting preserved anterior cingulate cortex pathways (Jacobsen et al., Brain 2015).
              </p>
            </div>
            <button
              onClick={() => toggleMusic(currentTrack)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 8,
                background: isPlayingMusic ? '#A32D2D' : '#0F6E56',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {isPlayingMusic ? <Pause size={16} /> : <Play size={16} />}
              {isPlayingMusic ? 'Stop Nostalgic Music' : 'Start Music Synthesizer'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            {[
              { id: 'kishore', name: "Kishore Kumar Retro Ballad", theme: "'Pal Pal Dil Ke Paas'", desc: 'Gentle ballad chords evocative of 1970s romantic nostalgia.' },
              { id: 'wedding', name: 'Wedding Sitar & Flute', theme: "Priya's Wedding 2015", desc: 'Acoustic warm arpeggios that elicit joyous family pride.' },
              { id: 'petrichor', name: 'Monsoon Rain & Petrichor', theme: 'Chikkadpally 1968', desc: 'Meditative raga with subtle warm summer rain soundscape.' },
              { id: 'coffee', name: 'Morning Verandah Coffee', theme: 'Brass Tumbler Ritual', desc: 'Gentle morning cadence evoking peaceful 6:30 AM reading.' }
            ].map(t => {
              const isCurrent = currentTrack === t.id && isPlayingMusic;
              return (
                <div
                  key={t.id}
                  onClick={() => toggleMusic(t.id)}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: isCurrent ? '2px solid #0F6E56' : '1px solid #D5D0C6',
                    background: isCurrent ? '#E1F5EE' : '#F7F5F0',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', fontFamily: 'JetBrains Mono', color: '#6B6B6B' }}>{t.theme}</span>
                    {isCurrent && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0F6E56', animation: 'ping 1s infinite' }} />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F0F0F', marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.4 }}>{t.desc}</div>
                </div>
              );
            })}
          </div>

          <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 24, border: '1px solid #EDEAE3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', color: '#A32D2D', fontWeight: 600 }}>Sundowning & Agitation Sensor</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0F0F0F' }}>Simulate Patient Agitation Level ({agitationLevel}%)</div>
              </div>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 12,
                background: agitationLevel > 60 ? '#FCEBEB' : '#E1F5EE',
                color: agitationLevel > 60 ? '#A32D2D' : '#0F6E56'
              }}>
                {agitationLevel > 60 ? 'High Agitation · Music Auto-Activated' : 'Calm State'}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={agitationLevel}
              onChange={e => setAgitationLevel(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: agitationLevel > 60 ? '#A32D2D' : '#0F6E56', margin: '10px 0' }}
            />

            <div style={{ fontSize: 12, color: '#6B6B6B' }}>
              Drag to simulate sundowning agitation. When agitation exceeds 60%, REMINISCE immediately activates Kishore Kumar's soothing melodies and dampens vocal stimulation to prevent behavioral distress.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
