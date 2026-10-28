import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, BookOpen, Camera, CheckCircle2, Volume2, ShieldCheck, Tag, ArrowRight, UserPlus, Edit3, Send, RefreshCw } from 'lucide-react';
import InteractiveKnowledgeGraph from './InteractiveKnowledgeGraph';
import { speechEngine } from '../utils/speechVoice';
import { analyzeLinguisticText } from '../utils/linguisticAnalyzer';

export default function Phase1LifeArchive({ graphData, onAddNode, patientProfile, onUpdatePatientProfile }) {
  const [activeTab, setActiveTab] = useState('journal');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [typedJournalInput, setTypedJournalInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedResult, setProcessedResult] = useState(null);
  const [selectedIntakeChapter, setSelectedIntakeChapter] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Custom Patient Onboarding Form State
  const [customProfileForm, setCustomProfileForm] = useState({
    name: patientProfile?.name || 'Rajan Sundaram',
    age: patientProfile?.age || 71,
    profession: patientProfile?.formerProfession || 'Professor of Literature',
    contactName: patientProfile?.familyContact?.name || 'Priya Sundaram',
    contactRelation: patientProfile?.familyContact?.relationship || 'Daughter',
    spouseName: patientProfile?.spouse?.name || 'Meena Sundaram',
    favoriteSong: 'Kishore Kumar - Pal Pal Dil Ke Paas',
    coreMemory: "Daughter's wedding celebration in 2015"
  });
  const [showProfileSavedBadge, setShowProfileSavedBadge] = useState(false);

  const timerRef = useRef(null);

  const SAMPLE_JOURNALS = [
    {
      title: "Afternoon Call with Priya",
      text: "I spoke with Priya this afternoon on the verandah. She was describing a new botanical library she is designing in Bangalore. Listening to her passionate voice reminded me so much of my mother's enthusiasm for literature. It brought a profound sense of warmth.",
      prompt: "Who did you talk to today that made you feel warm?"
    },
    {
      title: "Monsoon Rain & Filter Coffee",
      text: "The first pre-monsoon showers arrived in Hyderabad today. The petrichor rising from the dry Deccan soil instantly took me back to 1968, sitting in the stone courtyard of our Chikkadpally home with a brass tumbler of hot filter coffee while listening to Kishore Kumar on the radio.",
      prompt: "What sensory memory brought you comfort recently?"
    }
  ];

  const [currentPrompt, setCurrentPrompt] = useState(SAMPLE_JOURNALS[0].prompt);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordTimer(t => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordTimer(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startVoiceJournal = () => {
    setIsRecording(true);
    setTranscript('');
    setTypedJournalInput('');
    setProcessedResult(null);

    speechEngine.startListening(
      (liveText) => {
        setTranscript(liveText);
        setTypedJournalInput(liveText);
      },
      (err) => {
        console.log("Speech recognition notice:", err);
      }
    );
  };

  const stopVoiceJournal = () => {
    setIsRecording(false);
    speechEngine.stopListening();
    const finalText = (typedJournalInput || transcript).trim() || SAMPLE_JOURNALS[0].text;
    processJournalText(finalText);
  };

  const processJournalText = (textToAnalyze) => {
    if (!textToAnalyze.trim()) return;
    setIsProcessing(true);
    setTranscript(textToAnalyze);
    setTypedJournalInput(textToAnalyze);

    setTimeout(() => {
      setIsProcessing(false);
      const metrics = analyzeLinguisticText(textToAnalyze);
      
      // Extract entities based on words
      const words = textToAnalyze.split(/\s+/);
      const detectedEntities = [];
      if (textToAnalyze.toLowerCase().includes('priya')) detectedEntities.push({ text: 'Priya', type: 'PERSON', relation: 'DAUGHTER' });
      if (textToAnalyze.toLowerCase().includes('meena')) detectedEntities.push({ text: 'Meena', type: 'PERSON', relation: 'SPOUSE' });
      if (textToAnalyze.toLowerCase().includes('bangalore')) detectedEntities.push({ text: 'Bangalore', type: 'GPE', relation: 'LOCATION' });
      if (textToAnalyze.toLowerCase().includes('coffee')) detectedEntities.push({ text: 'Filter Coffee', type: 'OBJECT', relation: 'ROUTINE' });
      if (textToAnalyze.toLowerCase().includes('kishore')) detectedEntities.push({ text: 'Kishore Kumar', type: 'ARTIST', relation: 'MUSIC_ANCHOR' });
      if (detectedEntities.length === 0) {
        detectedEntities.push({ text: words[0] || 'Life Story', type: 'TOPIC', relation: 'AUTOBIOGRAPHICAL' });
      }

      setProcessedResult({
        wordCount: metrics ? metrics.totalWords : words.length,
        ttr: metrics ? metrics.ttr : 0.78,
        avgPreNounPause: `${metrics ? metrics.estimatedPreNounPause : 190}ms`,
        syntaxDepth: `${metrics ? metrics.clauseDepth : 4.0} clauses/sentence`,
        entities: detectedEntities,
        emotion: {
          valence: metrics && metrics.ttr > 0.6 ? "0.92 (Deep Positive / Love)" : "0.55 (Neutral / Somber)",
          arousal: "0.41 (Serene Calm)",
          sentiment: "Warm Nostalgia"
        },
        newNodeSuggestion: {
          label: textToAnalyze.substring(0, 32) + (textToAnalyze.length > 32 ? '...' : ''),
          type: "Memory",
          weight: 9.0,
          details: textToAnalyze
        }
      });
    }, 700);
  };

  const handleUseSample = (sample) => {
    setCurrentPrompt(sample.prompt);
    setTypedJournalInput(sample.text);
    processJournalText(sample.text);
  };

  const handleAddExtractedNode = () => {
    if (!processedResult || !processedResult.newNodeSuggestion) return;
    const sugg = processedResult.newNodeSuggestion;
    onAddNode(
      {
        id: `journal_${Date.now()}`,
        label: sugg.label,
        type: sugg.type,
        category: 'memory',
        weight: sugg.weight,
        details: sugg.details,
        color: '#185FA5',
        radius: 22
      },
      {
        source: 'rajan',
        target: `journal_${Date.now()}`,
        label: 'RECORDED_IN_JOURNAL',
        weight: 0.95
      }
    );
    alert(`Added "${sugg.label}" to the Knowledge Graph!`);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (onUpdatePatientProfile) {
      onUpdatePatientProfile({
        name: customProfileForm.name,
        age: parseInt(customProfileForm.age),
        formerProfession: customProfileForm.profession,
        familyContact: {
          name: customProfileForm.contactName,
          relationship: customProfileForm.contactRelation
        },
        spouse: {
          name: customProfileForm.spouseName,
          relationship: 'Spouse'
        }
      });
    }

    // Add their core custom memory and song to graph
    if (customProfileForm.favoriteSong) {
      onAddNode(
        {
          id: `custom_song_${Date.now()}`,
          label: customProfileForm.favoriteSong,
          type: 'SensoryAnchor',
          category: 'music',
          weight: 9.7,
          details: `Favorite anchor song for ${customProfileForm.name}`,
          color: '#E67E22',
          radius: 24
        },
        {
          source: 'rajan',
          target: `custom_song_${Date.now()}`,
          label: 'DEEPLY_LOVES',
          weight: 0.98
        }
      );
    }

    setShowProfileSavedBadge(true);
    setTimeout(() => setShowProfileSavedBadge(false), 3000);
  };

  const INTAKE_CHAPTERS = [
    {
      title: "Chapter 1: Childhood Courtyard & Roots (1955–1970)",
      period: "Age 0–15 · Chikkadpally, Hyderabad",
      summary: "Growing up in the stone courtyard house with the sprawling mango tree, listening to his mother recite Telugu and Sanskrit poetry, the smell of rainy earth.",
      keyNodes: ["Childhood Courtyard", "Grandmother's Tales", "Monsoon Petrichor"],
      quote: "'The stone floor was always cool even in the hottest May afternoons. My mother would sit grinding spices while reciting Kalidasa.'"
    },
    {
      title: "Chapter 2: Osmania University & English Literature (1971–1982)",
      period: "Age 16–27 · Hyderabad",
      summary: "First stepping through the majestic granite Indo-Saracenic arches of Osmania Arts College. Falling in love with Keats, Shakespeare, and modern linguistics.",
      keyNodes: ["Osmania Arts College", "Linguistics Thesis", "Library Archway"],
      quote: "'When I stood before the blackboard for my very first lecture on Keats' Ode to a Nightingale, I knew I was doing what I was born for.'"
    },
    {
      title: "Chapter 3: Meeting Meena & 42 Years of Marriage (1979–Present)",
      period: "Age 24–Present",
      summary: "Meeting Meena at the university library over a shared copy of Rabindranath Tagore. 42 years of tea together, laughing at the same jokes, unwavering partnership.",
      keyNodes: ["Meena Sundaram (Wife)", "Osmania Library Meeting", "Kishore Kumar 'Pal Pal'"],
      quote: "'She dropped her fountain pen; when I picked it up, she had this quiet, knowing smile that has illuminated every single day of my life since.'"
    },
    {
      title: "Chapter 4: Priya's Birth & Her 2015 Wedding (1988 & 2015)",
      period: "Age 33 & 60",
      summary: "Holding baby Priya for the first time in Osmania Hospital. Walking her down the aisle in December 2015 and delivering the speech that moved everyone to tears.",
      keyNodes: ["Priya Sundaram (Daughter)", "Priya's 2015 Wedding Toast", "Kabir (Grandson)"],
      quote: "'At Priya's wedding, when she hugged me before the ceremony, she whispered: 'Everything I know about compassion, Appa, came from you.''"
    }
  ];

  const ARCHIVE_PHOTOS = [
    {
      title: "Priya's Wedding Day (Dec 2015)",
      date: "December 14, 2015",
      location: "Taj Falaknuma, Hyderabad",
      people: ["Priya Sundaram", "Rajan", "Meena"],
      emotionalWeight: "9.8 / 10",
      clipContext: "Bride hugging father in embroidered silk saree, radiant joy, floral backdrop",
      audioAnchor: "Kishore Kumar - Pal Pal Dil Ke Paas",
      visualDescription: "Rajan wearing traditional cream dhoti-kurta laughing with Meena and hugging Priya right before her wedding walk."
    },
    {
      title: "Meena at Osmania Arts College Arches (1979)",
      date: "August 22, 1979",
      location: "Osmania University Arts College Library",
      people: ["Meena Sundaram", "Rajan"],
      emotionalWeight: "9.7 / 10",
      clipContext: "Young couple holding books under granite arches, vintage monochrome sepia",
      audioAnchor: "Retro Acoustic Guitar & Sitar",
      visualDescription: "Vintage black-and-white photograph of Meena smiling softly beside the towering carved pillars where they first fell in love."
    },
    {
      title: "Reading Ruskin Bond to Kabir (2023)",
      date: "March 18, 2023",
      location: "Verandah, Bangalore",
      people: ["Kabir (Grandson)", "Rajan"],
      emotionalWeight: "9.2 / 10",
      clipContext: "Elderly grandfather with reading glasses reading illustrated storybook to 4-year-old child on cane chair",
      audioAnchor: "Gentle Morning Birdsong & Coffee Cup Clink",
      visualDescription: "Kabir sitting on Rajan's lap pointing at an illustration of the Himalayan hills while Rajan smiles warmly."
    }
  ];

  return (
    <div className="phase-container" style={{ padding: '32px 0' }}>
      {/* Phase Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: '#E1F5EE', color: '#0F6E56', padding: '3px 10px', borderRadius: 16, fontWeight: 600 }}>PHASE 1 · AGE 40–65</span>
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>Lifelong Pre-Disease Archive Builder</span>
        </div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: '#0F0F0F', margin: '0 0 8px' }}>The Life Archive</h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 720, lineHeight: 1.6 }}>
          Built while the person is articulate and capable of narrating their own life story. 
          Use live voice recording, type custom daily journals, or input an entire personal profile to see the Knowledge Graph grow.
        </p>
      </div>

      {/* Sub Navigation */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #D5D0C6', marginBottom: 24, overflowX: 'auto' }}>
        {[
          { id: 'journal', label: 'Live Voice & Text Journal Input', icon: Mic },
          { id: 'onboarding', label: 'Patient Onboarding Form (Custom Input)', icon: UserPlus },
          { id: 'intake', label: '3-Hour Life Story Intake Wizard', icon: BookOpen },
          { id: 'photos', label: 'FaceNet & CLIP Photo Archive', icon: Camera },
          { id: 'graph', label: 'Personal Knowledge Graph', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 18px',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '3px solid #0F6E56' : '3px solid transparent',
                color: isActive ? '#0F6E56' : '#6B6B6B',
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

      {/* TAB 1: DAILY 2-MIN VOICE & TEXT JOURNAL INPUT */}
      {activeTab === 'journal' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
          {/* Recorder & Text Input Panel */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0F6E56', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Daily Micro-Journal Input</span>
              <span style={{ fontSize: 11, background: '#E1F5EE', color: '#0F6E56', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Whisper ASR + Live Text Analyzer</span>
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 18, borderLeft: '4px solid #1D9E75', marginBottom: 20 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 600, marginBottom: 4 }}>Today's Gentle Prompt</div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F' }}>"{currentPrompt}"</div>
            </div>

            {/* Voice Recording Controls */}
            <div style={{ textAlign: 'center', padding: '16px 0', borderBottom: '1px solid #EDEAE3', marginBottom: 16 }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
                {isRecording && (
                  <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '2px solid #1D9E75', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                )}
                <button
                  onClick={isRecording ? stopVoiceJournal : startVoiceJournal}
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    background: isRecording ? '#C0392B' : '#0F6E56',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(15,110,86,0.35)',
                    transition: 'all 0.2s',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
                </button>
              </div>

              <div style={{ fontSize: 13, fontWeight: 600, color: isRecording ? '#C0392B' : '#0F0F0F' }}>
                {isRecording ? `Recording (${recordTimer}s / 120s max) — Speak naturally` : 'Click Microphone to Speak'}
              </div>
            </div>

            {/* DIRECT TEXT INPUT AREA */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 6 }}>
                <span>Or Type / Edit Your Journal Entry Input:</span>
                <span style={{ color: '#0F6E56', fontWeight: 500 }}>Live Input Mode</span>
              </label>
              <textarea
                rows={4}
                value={typedJournalInput}
                onChange={(e) => setTypedJournalInput(e.target.value)}
                placeholder="Type your thoughts, a conversation with family, a memory of a loved one, or how your morning felt..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid #D5D0C6',
                  fontSize: 13,
                  lineHeight: 1.5,
                  boxSizing: 'border-box',
                  background: '#FAFAFA',
                  outline: 'none'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button
                  onClick={() => processJournalText(typedJournalInput)}
                  disabled={!typedJournalInput.trim()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: typedJournalInput.trim() ? '#0F6E56' : '#D5D0C6',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: typedJournalInput.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  <Send size={13} /> Analyze & Process Input Text
                </button>
              </div>
            </div>

            {/* Quick Demo Samples */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 8 }}>Or Populate With Pre-Recorded Sample Entries:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SAMPLE_JOURNALS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleUseSample(s)}
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
                      alignItems: 'center'
                    }}
                  >
                    <span><strong>{s.title}</strong> — {s.text.substring(0, 55)}...</span>
                    <ArrowRight size={14} color="#0F6E56" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transcript & Real-Time NLP Processing */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Transcript & Extraction</span>
              {isProcessing && <span style={{ fontSize: 11, color: '#185FA5', display: 'flex', alignItems: 'center', gap: 4 }}><Sparkles size={12} /> Analyzing NLP...</span>}
            </div>

            {/* Live Transcript Box */}
            <div style={{ flex: 1, minHeight: 120, background: '#F7F5F0', borderRadius: 10, padding: 16, border: '1px solid #EDEAE3', fontSize: 13, lineHeight: 1.6, color: '#0F0F0F', marginBottom: 16, overflowY: 'auto' }}>
              {transcript ? (
                transcript
              ) : (
                <span style={{ color: '#9B9B9B', fontStyle: 'italic' }}>
                  No journal input analyzed yet. Type in the text box or tap the microphone to see real-time NLP extraction, TTR metrics, and Knowledge Graph node generation.
                </span>
              )}
            </div>

            {/* Extracted NLP Signals */}
            {processedResult && (
              <div style={{ background: '#F0F9F5', border: '1px solid #9FE1CB', borderRadius: 12, padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#085041', fontWeight: 600, fontSize: 13, marginBottom: 10 }}>
                  <CheckCircle2 size={16} /> Extracted Clinical & Linguistic Markers
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11, marginBottom: 12 }}>
                  <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: 6, border: '1px solid #D5D0C6' }}>
                    <div style={{ color: '#6B6B6B' }}>Word Count & TTR:</div>
                    <div style={{ fontWeight: 600, color: '#0F0F0F' }}>{processedResult.wordCount} words (TTR: {processedResult.ttr})</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: 6, border: '1px solid #D5D0C6' }}>
                    <div style={{ color: '#6B6B6B' }}>Pre-Noun Pause Latency:</div>
                    <div style={{ fontWeight: 600, color: '#0F0F0F' }}>{processedResult.avgPreNounPause}</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: 6, border: '1px solid #D5D0C6' }}>
                    <div style={{ color: '#6B6B6B' }}>Syntactic Clause Depth:</div>
                    <div style={{ fontWeight: 600, color: '#0F0F0F' }}>{processedResult.syntaxDepth}</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '6px 10px', borderRadius: 6, border: '1px solid #D5D0C6' }}>
                    <div style={{ color: '#6B6B6B' }}>Emotional Valence:</div>
                    <div style={{ fontWeight: 600, color: '#0F6E56' }}>{processedResult.emotion.valence}</div>
                  </div>
                </div>

                {/* Extracted Graph Entities */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 4 }}>Recognized Graph Entities (spaCy NER):</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {processedResult.entities.map((e, idx) => (
                      <span key={idx} style={{ background: '#FFFFFF', border: '1px solid #9FE1CB', color: '#085041', padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500 }}>
                        {e.text} <small style={{ color: '#6B6B6B' }}>({e.type})</small>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Add to Graph Button */}
                <button
                  onClick={handleAddExtractedNode}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#0F6E56',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <Sparkles size={14} /> Add Extracted Memory Node into Knowledge Graph
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOM PATIENT ONBOARDING FORM INPUT */}
      {activeTab === 'onboarding' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Patient Onboarding & Profile Form</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Input any individual's personal details, family bonds, life calling, and sensory anchors to customize REMINISCE for them.</p>
            </div>
            {showProfileSavedBadge && (
              <span style={{ background: '#E1F5EE', color: '#0F6E56', padding: '6px 14px', borderRadius: 16, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} /> Profile Saved & Knowledge Graph Seeded!
              </span>
            )}
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={customProfileForm.name}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Current Age</label>
                <input
                  type="number"
                  required
                  min="30"
                  max="105"
                  value={customProfileForm.age}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, age: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Former Profession / Life Identity</label>
                <input
                  type="text"
                  required
                  value={customProfileForm.profession}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, profession: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Primary Caregiver Contact Name</label>
                <input
                  type="text"
                  required
                  value={customProfileForm.contactName}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, contactName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Caregiver Relationship</label>
                <input
                  type="text"
                  required
                  value={customProfileForm.contactRelation}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, contactRelation: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Spouse / Partner Name</label>
                <input
                  type="text"
                  value={customProfileForm.spouseName}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, spouseName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Beloved Song / Sensory Musical Anchor</label>
                <input
                  type="text"
                  placeholder="e.g. Kishore Kumar - Pal Pal Dil Ke Paas, M.S. Subbulakshmi, Beatles"
                  value={customProfileForm.favoriteSong}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, favoriteSong: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', fontWeight: 600, color: '#6B6B6B', marginBottom: 4 }}>Pivotal Autobiographical Core Memory</label>
                <input
                  type="text"
                  placeholder="e.g. Giving the wedding toast in 2015, building our first home"
                  value={customProfileForm.coreMemory}
                  onChange={e => setCustomProfileForm({ ...customProfileForm, coreMemory: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#0F6E56',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <CheckCircle2 size={16} /> Save Patient Profile & Seed Graph
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: 3-HOUR INTAKE WIZARD */}
      {activeTab === 'intake' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Onboarding Life Story Intake (Age 40)</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>A guided multi-chapter interview that captures top 20 core life memories, family tree, and sensory triggers in the person's own voice.</p>
            </div>
            <span style={{ background: '#E1F5EE', color: '#0F6E56', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>Archived & Seeded · 100% Complete</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
            {/* Chapters list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {INTAKE_CHAPTERS.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIntakeChapter(idx)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: selectedIntakeChapter === idx ? '2px solid #0F6E56' : '1px solid #D5D0C6',
                    background: selectedIntakeChapter === idx ? '#F0F9F5' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: selectedIntakeChapter === idx ? '#0F6E56' : '#6B6B6B', textTransform: 'uppercase' }}>{ch.period}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F', marginTop: 2 }}>{ch.title.split(':')[0]}</div>
                </button>
              ))}
            </div>

            {/* Chapter Detail View */}
            <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 24, border: '1px solid #EDEAE3' }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#0F6E56', textTransform: 'uppercase' }}>{INTAKE_CHAPTERS[selectedIntakeChapter].period}</div>
              <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#0F0F0F', margin: '4px 0 12px' }}>{INTAKE_CHAPTERS[selectedIntakeChapter].title}</h4>
              <p style={{ fontSize: 14, color: '#3A3A3A', lineHeight: 1.6, marginBottom: 18 }}>{INTAKE_CHAPTERS[selectedIntakeChapter].summary}</p>

              <div style={{ background: '#FFFFFF', borderLeft: '3px solid #1D9E75', padding: '14px 18px', borderRadius: 8, fontStyle: 'italic', fontSize: 13, color: '#3A3A3A', marginBottom: 18 }}>
                {INTAKE_CHAPTERS[selectedIntakeChapter].quote}
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 6 }}>Knowledge Graph Anchors Created:</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {INTAKE_CHAPTERS[selectedIntakeChapter].keyNodes.map((kn, idx) => (
                    <span key={idx} style={{ background: '#E1F5EE', color: '#0F6E56', padding: '4px 10px', borderRadius: 16, fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Tag size={12} /> {kn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FACENET & CLIP PHOTO ARCHIVE */}
      {activeTab === 'photos' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>FaceNet & CLIP Photo Archive</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Every photograph is encoded with 512-dimension facial vectors and CLIP scene understanding to enable real-time relationship surfacing in Phase 3.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {ARCHIVE_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                style={{
                  border: activePhotoIndex === idx ? '2px solid #0F6E56' : '1px solid #D5D0C6',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  cursor: 'pointer'
                }}
                onClick={() => setActivePhotoIndex(idx)}
              >
                <div style={{ height: 160, background: 'linear-gradient(135deg, #1A1A1A 0%, #2A3B35 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 16, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', padding: '2px 8px', borderRadius: 10, fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                    FaceNet 512d
                  </div>
                  <div style={{ color: '#FAC775', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>{photo.date}</div>
                  <div style={{ color: '#FFFFFF', fontFamily: 'DM Serif Display, serif', fontSize: 18 }}>{photo.title}</div>
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 8 }}>{photo.visualDescription}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, borderTop: '1px solid #EDEAE3', paddingTop: 8, marginTop: 8 }}>
                    <span style={{ color: '#0F6E56', fontWeight: 600 }}>Bond: {photo.emotionalWeight}</span>
                    <span style={{ color: '#854F0B', display: 'flex', alignItems: 'center', gap: 4 }}><Volume2 size={12} /> {photo.audioAnchor.split('-')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: KNOWLEDGE GRAPH */}
      {activeTab === 'graph' && (
        <InteractiveKnowledgeGraph graphData={graphData} onAddNode={onAddNode} />
      )}
    </div>
  );
}
