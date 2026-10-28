import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, Clock, Activity, FileText, CheckCircle2, ShieldAlert, ChevronRight, Info, Printer, Download, Sparkles, Send, Play } from 'lucide-react';
import { DETECTION_SIGNALS, SHAP_EXPLANATION, PATIENT_PROFILE } from '../data/initialData';
import { generateReportData, printClinicalReport } from '../utils/pdfGenerator';
import { analyzeLinguisticText } from '../utils/linguisticAnalyzer';

export default function Phase2EarlyDetection() {
  const [activeSubTab, setActiveSubTab] = useState('live_analyzer'); // 'live_analyzer', 'timeline', 'signals', 'alerts'
  const [timelineYear, setTimelineYear] = useState('2026');
  const [selectedSignal, setSelectedSignal] = useState(DETECTION_SIGNALS[0]);
  const [showClinicalModal, setShowClinicalModal] = useState(false);
  const [activeAlertTab, setActiveAlertTab] = useState(3);

  // Live Input State for Custom Speech / Text Analysis
  const [customSpeechInput, setCustomSpeechInput] = useState(
    "We walked to the... thing with leaves yesterday. The big place near my old room. Priya is coming soon. I sit here. The book is here."
  );
  const [liveAnalysisResult, setLiveAnalysisResult] = useState(() => analyzeLinguisticText(
    "We walked to the... thing with leaves yesterday. The big place near my old room. Priya is coming soon. I sit here. The book is here."
  ));

  const PRESET_SPEECH_INPUTS = [
    {
      title: "Healthy Baseline (Age 65)",
      text: "We walked across the botanical garden near the Arts College, observing the bougainvillea in full vibrant bloom. If Priya visits next month, I intend to finish the wooden bookstand so we can place Kabir's illustrated encyclopedias together.",
      expected: "Normal Baseline (Drift < 0.25)"
    },
    {
      title: "Mild Cognitive Impairment (Age 69)",
      text: "I went for a walk in the morning. The flowers were very nice near the university library. Priya called me. She will visit next week. We talked about her work and my books.",
      expected: "Level 1 / Level 2 Drift (~0.50 - 0.65)"
    },
    {
      title: "Marked Lexical Anomia (Age 71)",
      text: "We walked to the... thing with leaves yesterday. The big place near my old room. Priya is coming soon. I sit here. The book is here. The thing was very good.",
      expected: "Level 3 Clinical Alert (Drift > 0.72)"
    }
  ];

  const handleRunLiveAnalysis = () => {
    const result = analyzeLinguisticText(customSpeechInput);
    setLiveAnalysisResult(result);
  };

  const handleApplyPreset = (preset) => {
    setCustomSpeechInput(preset.text);
    const result = analyzeLinguisticText(preset.text);
    setLiveAnalysisResult(result);
  };

  const TIMELINE_DATA = {
    '2020': {
      yearLabel: '2020 (Healthy Baseline · Age 65)',
      score: 0.18,
      status: 'Normal Personal Baseline',
      statusColor: '#0F6E56',
      alertLevel: 0,
      ttr: 0.78,
      pauseMs: 185,
      parseDepth: 4.4,
      repetition: 0.2,
      note: 'Rajan is articulate, lecturing on British Romantic poetry. Fluent noun access and complex multi-clause sentence structures.'
    },
    '2022': {
      yearLabel: '2022 (Subtle Pre-Clinical Shift · Age 67)',
      score: 0.38,
      status: 'Sub-Threshold Variance',
      statusColor: '#185FA5',
      alertLevel: 0,
      ttr: 0.71,
      pauseMs: 220,
      parseDepth: 4.0,
      repetition: 0.6,
      note: 'Minor latency increases during conversational recall. Sub-threshold; filtered out to prevent false alarms from pandemic or retirement stress.'
    },
    '2024': {
      yearLabel: '2024 (Level 1 Alert · Age 69)',
      score: 0.54,
      status: 'Level 1: Watchful Monitoring',
      statusColor: '#854F0B',
      alertLevel: 1,
      ttr: 0.62,
      pauseMs: 295,
      parseDepth: 3.4,
      repetition: 1.4,
      note: 'Sustained 14-day drift in Type-Token Ratio and pre-noun pauses. Internal system watch triggered. No family notification yet.'
    },
    '2025': {
      yearLabel: '2025 (Level 2 Alert · Age 70)',
      score: 0.66,
      status: 'Level 2: Gentle Family Notice',
      statusColor: '#D35400',
      alertLevel: 2,
      ttr: 0.51,
      pauseMs: 360,
      parseDepth: 2.7,
      repetition: 2.3,
      note: 'Sustained 30+ day drift across 5 signals. Gentle compassionate notification dispatched to daughter Priya.'
    },
    '2026': {
      yearLabel: '2026 (Level 3 Alert · Current · Age 71)',
      score: 0.74,
      status: 'Level 3: Urgent Clinical Evaluation',
      statusColor: '#A32D2D',
      alertLevel: 3,
      ttr: 0.41,
      pauseMs: 440,
      parseDepth: 2.1,
      repetition: 3.4,
      note: 'Sustained 45+ day composite score > 0.72. Full clinical neurological report generated with annotated speech transcripts.'
    }
  };

  const currentScenario = TIMELINE_DATA[timelineYear];
  const clinicalReport = generateReportData(PATIENT_PROFILE, DETECTION_SIGNALS, SHAP_EXPLANATION);

  return (
    <div className="phase-container" style={{ padding: '32px 0' }}>
      {/* Phase Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: '#E6F1FB', color: '#185FA5', padding: '3px 10px', borderRadius: 16, fontWeight: 600 }}>PHASE 2 · EARLY STAGE (AGE 60+)</span>
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>Continuous Acoustic & Linguistic Biomarker Sentinel</span>
        </div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: '#0F0F0F', margin: '0 0 8px' }}>Early Detection Engine</h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 740, lineHeight: 1.6 }}>
          Standard cognitive tests compare patients to the average population norm. 
          REMINISCE compares the individual only against their personal baseline. Type or paste any speech text below to see live biomarker drift analysis.
        </p>
      </div>

      {/* Sub Navigation */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #D5D0C6', marginBottom: 24, overflowX: 'auto' }}>
        {[
          { id: 'live_analyzer', label: 'Live Speech / Text Biomarker Input', icon: Sparkles },
          { id: 'timeline', label: 'Longitudinal Timeline Scrub (2020–2026)', icon: Clock },
          { id: 'signals', label: '8 Biomarkers & SHAP Breakdown', icon: Activity },
          { id: 'alerts', label: '3-Level Alert Logic & Clinical PDF', icon: FileText }
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
                borderBottom: isActive ? '3px solid #185FA5' : '3px solid transparent',
                color: isActive ? '#185FA5' : '#6B6B6B',
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

      {/* TAB 1: LIVE SPEECH / TEXT BIOMARKER INPUT CONSOLE */}
      {activeSubTab === 'live_analyzer' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Input Box Panel */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Speech Input Console</span>
              <span style={{ fontSize: 11, background: '#E6F1FB', color: '#185FA5', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>TTR & Anomia Pipeline</span>
            </div>

            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3A3A3A', marginBottom: 6 }}>
              Type or Paste Patient Speech / Journal Text to Analyze:
            </label>
            <textarea
              rows={6}
              value={customSpeechInput}
              onChange={(e) => setCustomSpeechInput(e.target.value)}
              placeholder="Enter patient spoken transcript or journal entry (e.g., 'We walked to the place with leaves yesterday...')"
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <span style={{ fontSize: 11, color: '#6B6B6B' }}>
                {customSpeechInput.split(/\s+/).filter(Boolean).length} words entered
              </span>
              <button
                onClick={handleRunLiveAnalysis}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 8,
                  background: '#185FA5',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                <Activity size={14} /> Run Biomarker Analysis
              </button>
            </div>

            {/* Presets */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 8 }}>Or Populate With Benchmark Comparison Inputs:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PRESET_SPEECH_INPUTS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPreset(preset)}
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
                    <span><strong>{preset.title}</strong> — {preset.expected}</span>
                    <Play size={12} color="#185FA5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Live Results Card */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Computed Biomarkers</span>
              {liveAnalysisResult && (
                <span style={{ fontSize: 11, background: liveAnalysisResult.driftScore > 0.7 ? '#FCEBEB' : (liveAnalysisResult.driftScore > 0.5 ? '#FAEEDA' : '#E1F5EE'), color: liveAnalysisResult.alertColor, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                  Drift: {liveAnalysisResult.driftScore.toFixed(2)}
                </span>
              )}
            </div>

            {liveAnalysisResult ? (
              <div>
                {/* Composite Drift Score Banner */}
                <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 18, borderLeft: `4px solid ${liveAnalysisResult.alertColor}`, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 600 }}>Status Assessment</div>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: liveAnalysisResult.alertColor, margin: '2px 0 6px' }}>
                    {liveAnalysisResult.alertTitle}
                  </div>
                  <div style={{ fontSize: 12, color: '#3A3A3A' }}>
                    Composite Drift Score: <strong>{liveAnalysisResult.driftScore.toFixed(2)}</strong> / 1.00 (Healthy threshold &lt; 0.45)
                  </div>
                </div>

                {/* 4 Key Computed Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                  <div style={{ background: '#FAFAFA', border: '1px solid #EDEAE3', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>Type-Token Ratio (TTR):</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: liveAnalysisResult.ttr < 0.6 ? '#A32D2D' : '#0F6E56' }}>
                      {liveAnalysisResult.ttr} <small style={{ fontSize: 10, color: '#6B6B6B' }}>({liveAnalysisResult.uniqueWordsCount} unique words)</small>
                    </div>
                  </div>

                  <div style={{ background: '#FAFAFA', border: '1px solid #EDEAE3', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>Pre-Noun Pause Latency:</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: liveAnalysisResult.estimatedPreNounPause > 300 ? '#A32D2D' : '#0F6E56' }}>
                      ~{liveAnalysisResult.estimatedPreNounPause} ms
                    </div>
                  </div>

                  <div style={{ background: '#FAFAFA', border: '1px solid #EDEAE3', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>Clause Depth (spaCy):</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: liveAnalysisResult.clauseDepth < 3 ? '#A32D2D' : '#0F6E56' }}>
                      {liveAnalysisResult.clauseDepth} levels
                    </div>
                  </div>

                  <div style={{ background: '#FAFAFA', border: '1px solid #EDEAE3', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: '#6B6B6B' }}>Anomia Noun Substitutions:</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: liveAnalysisResult.vagueNounCount > 0 ? '#A32D2D' : '#0F6E56' }}>
                      {liveAnalysisResult.vagueNounCount} filler words
                    </div>
                  </div>
                </div>

                {/* Live SHAP Factors */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 6 }}>Attributed Risk Contributions:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {liveAnalysisResult.shapFactors.map((f, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, background: '#F7F5F0', padding: '6px 10px', borderRadius: 6 }}>
                        <span>{f.feature}:</span>
                        <strong style={{ color: f.contribution > 0.05 ? '#A32D2D' : '#0F6E56' }}>
                          {f.contribution > 0 ? `+${f.contribution}` : f.contribution}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowClinicalModal(true)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: '#A32D2D',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <FileText size={14} /> Generate Clinical Neurological Report PDF
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9B9B9B', fontStyle: 'italic' }}>
                Enter text in the left panel to calculate live biomarker indicators.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LONGITUDINAL TIMELINE SCRUB */}
      {activeSubTab === 'timeline' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Longitudinal Time Scrub</span>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F' }}>{currentScenario.yearLabel}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: '#6B6B6B' }}>Composite Drift Score</span>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 26, color: currentScenario.statusColor }}>
                {currentScenario.score.toFixed(2)} <span style={{ fontSize: 13, fontFamily: 'Inter', color: '#6B6B6B' }}>/ 1.00</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, margin: '14px 0 16px' }}>
            {['2020', '2022', '2024', '2025', '2026'].map(y => (
              <button
                key={y}
                onClick={() => setTimelineYear(y)}
                style={{
                  padding: '10px 8px',
                  borderRadius: 8,
                  border: timelineYear === y ? '2px solid #0F6E56' : '1px solid #D5D0C6',
                  background: timelineYear === y ? '#E1F5EE' : '#F7F5F0',
                  color: timelineYear === y ? '#0F6E56' : '#3A3A3A',
                  fontWeight: timelineYear === y ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ fontSize: 14 }}>{y}</div>
                <div style={{ fontSize: 10, color: '#6B6B6B' }}>{TIMELINE_DATA[y].status.split(':')[0]}</div>
              </button>
            ))}
          </div>

          <div style={{ background: '#F7F5F0', padding: '12px 16px', borderRadius: 8, fontSize: 13, color: '#3A3A3A', borderLeft: `4px solid ${currentScenario.statusColor}` }}>
            <strong>Clinical State:</strong> {currentScenario.note}
          </div>
        </div>
      )}

      {/* TAB 3: 8 BIOMARKERS & SHAP BREAKDOWN */}
      {activeSubTab === 'signals' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24 }}>
            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: 0 }}>8 Daily Linguistic Biomarkers</h3>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#185FA5', background: '#E6F1FB', padding: '2px 8px', borderRadius: 10 }}>Personal Baseline Variance</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DETECTION_SIGNALS.map(s => {
                  const isSelected = selectedSignal.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSignal(s)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 10,
                        border: isSelected ? '2px solid #185FA5' : '1px solid #EDEAE3',
                        background: isSelected ? '#F4F9FD' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>{s.name}</span>
                          <span style={{ fontSize: 10, background: '#EDEAE3', color: '#6B6B6B', padding: '1px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono' }}>{s.category}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 2 }}>{s.description.substring(0, 75)}...</div>
                      </div>

                      <div style={{ textAlign: 'right', marginLeft: 16 }}>
                        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 600, color: '#185FA5' }}>Weight: {s.weight.toFixed(2)}</div>
                        <div style={{ fontSize: 10, color: '#854F0B' }}>Lead: {s.clinicalLeadTime}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#185FA5', textTransform: 'uppercase', marginBottom: 4 }}>Signal Deep-Dive</div>
              <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#0F0F0F', margin: '0 0 12px' }}>{selectedSignal.name}</h4>
              <p style={{ fontSize: 13, color: '#3A3A3A', lineHeight: 1.6, marginBottom: 16 }}>{selectedSignal.description}</p>

              <div style={{ background: '#F7F5F0', borderRadius: 10, padding: 14, marginBottom: 16, border: '1px solid #EDEAE3' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: '#6B6B6B' }}>Personal 25-Yr Baseline:</span>
                  <strong style={{ color: '#0F6E56' }}>{selectedSignal.baselineValue}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: '#6B6B6B' }}>Current 90-Day Moving Avg:</span>
                  <strong style={{ color: '#A32D2D' }}>{selectedSignal.driftValue}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#6B6B6B' }}>Scientific Citation:</span>
                  <span style={{ fontStyle: 'italic', color: '#185FA5' }}>{selectedSignal.citation}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', marginBottom: 6 }}>Biomarker Sensitivity Threshold</div>
                <div style={{ height: 12, background: '#EDEAE3', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${selectedSignal.weight * 100}%`, background: 'linear-gradient(90deg, #185FA5, #A32D2D)', borderRadius: 6 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9B9B9B', marginTop: 4 }}>
                  <span>0.0 Low Weight</span>
                  <span>1.0 High Lead-Time Impact</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: 0 }}>SHAP Explainability Layer</h3>
                <p style={{ fontSize: 12, color: '#6B6B6B', margin: '2px 0 0' }}>Zero Black-Box: Every alert specifies the exact linguistic features contributing to the composite drift score.</p>
              </div>
              <span style={{ background: '#EEEDFE', color: '#534AB7', fontSize: 11, fontFamily: 'JetBrains Mono', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>SHAP Additive Attribution</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SHAP_EXPLANATION.map((item, idx) => (
                <div key={idx} style={{ background: '#F7F5F0', borderRadius: 10, padding: '12px 16px', border: '1px solid #EDEAE3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>{item.feature}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 600, color: '#A32D2D' }}>+{(item.shapValue).toFixed(2)} SHAP Risk Contribution</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#3A3A3A', fontStyle: 'italic', background: '#FFFFFF', padding: '6px 10px', borderRadius: 6, border: '1px solid #D5D0C6' }}>
                    Annotated Sample: {item.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 3-LEVEL ALERT LOGIC & CLINICAL PDF */}
      {activeSubTab === 'alerts' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 28 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#0F0F0F', margin: '0 0 6px' }}>Three Alert Levels — Compassion Over Panic</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Every alert is calibrated for the emotional reality of receiving it. Clinical precision with zero stigmatization.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            <button
              onClick={() => setActiveAlertTab(1)}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                border: activeAlertTab === 1 ? '2px solid #854F0B' : '1px solid #D5D0C6',
                background: activeAlertTab === 1 ? '#FAEEDA' : '#FFFFFF',
                color: '#854F0B',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                textAlign: 'left'
              }}
            >
              Level 1: Watchful Monitoring
              <div style={{ fontSize: 11, fontWeight: 400, color: '#6B6B6B' }}>Internal Flag · Score 0.45–0.60</div>
            </button>

            <button
              onClick={() => setActiveAlertTab(2)}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                border: activeAlertTab === 2 ? '2px solid #7A4208' : '1px solid #D5D0C6',
                background: activeAlertTab === 2 ? '#FFF8EE' : '#FFFFFF',
                color: '#7A4208',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                textAlign: 'left'
              }}
            >
              Level 2: Gentle Family Notice
              <div style={{ fontSize: 11, fontWeight: 400, color: '#6B6B6B' }}>Dispatched to Priya · Score 0.61–0.71</div>
            </button>

            <button
              onClick={() => setActiveAlertTab(3)}
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                border: activeAlertTab === 3 ? '2px solid #A32D2D' : '1px solid #D5D0C6',
                background: activeAlertTab === 3 ? '#FCEBEB' : '#FFFFFF',
                color: '#A32D2D',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                textAlign: 'left'
              }}
            >
              Level 3: Urgent Clinical Report
              <div style={{ fontSize: 11, fontWeight: 400, color: '#6B6B6B' }}>PDF Generated · Score &gt; 0.72</div>
            </button>
          </div>

          {activeAlertTab === 1 && (
            <div style={{ background: '#FFFDF5', border: '1px solid #EFD49F', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#854F0B', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Internal Protocol (No Family Disruption)</div>
              <p style={{ fontSize: 13, color: '#633806', lineHeight: 1.6, margin: '0 0 10px' }}>
                Drift score has crossed 0.54 for 7 consecutive days. Could represent transient bereavement, systemic illness, or sleep deprivation. 
                The system enters high-cadence 21-day observation without sending notifications to patient or family, preventing needless panic.
              </p>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#854F0B' }}>Action: Monitoring frequency doubled · Acoustic pause sampling enabled</div>
            </div>
          )}

          {activeAlertTab === 2 && (
            <div style={{ background: '#FFF8EE', border: '1px solid #FAC775', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#7A4208', fontWeight: 600, fontSize: 14 }}>Sample SMS / WhatsApp Dispatched to Priya (Daughter)</span>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', background: '#FAC775', color: '#633806', padding: '2px 8px', borderRadius: 10 }}>Sent Oct 15, 2026</span>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: 8, padding: 14, border: '1px solid #D5D0C6', fontSize: 13, color: '#3A3A3A', lineHeight: 1.6 }}>
                "Hi Priya. We have noticed some gradual changes in your father's speech and language patterns over the past few months — nothing alarming, and there can be many explanations. It may be worth scheduling a routine checkup with his doctor and perhaps spending a bit more time together soon. This is not a diagnosis — just a gentle nudge from the data."
              </div>
            </div>
          )}

          {activeAlertTab === 3 && (
            <div style={{ background: '#FCEBEB', border: '1px solid #F7C1C1', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ color: '#A32D2D', fontWeight: 600, fontSize: 14 }}>Level 3 Triggered: Urgent Clinical PDF Report Ready</div>
                  <div style={{ fontSize: 12, color: '#7A1C1C' }}>Drift score 0.74 sustained for 45+ days. Annotated 90-day neurological data packet generated.</div>
                </div>
                <button
                  onClick={() => setShowClinicalModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: '#A32D2D',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <FileText size={14} /> View & Print Neurological Clinical PDF
                </button>
              </div>
              <p style={{ fontSize: 13, color: '#7A1C1C', lineHeight: 1.6, margin: 0 }}>
                "We have observed a significant and sustained change in Rajan's cognitive language patterns over the past 4 months across multiple signals simultaneously. We strongly recommend a neurological evaluation as soon as possible. We have prepared a full signal report that you can share directly with his neurologist — containing daily data, trend graphs, and annotated speech examples. Time matters here."
              </p>
            </div>
          )}
        </div>
      )}

      {/* Clinical PDF Report Modal */}
      {showClinicalModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: 780, maxHeight: '90vh', borderRadius: 16, overflowY: 'auto', padding: 36, boxShadow: '0 24px 48px rgba(0,0,0,0.25)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0F0F0F', paddingBottom: 16, marginBottom: 24 }}>
              <div>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#0F6E56', textTransform: 'uppercase', letterSpacing: '0.1em' }}>REMINISCE Clinical Intelligence · NIMHANS Format</span>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, margin: '2px 0 0', color: '#0F0F0F' }}>Longitudinal Neurological Biomarker Report</h3>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={printClinicalReport}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: '#0F6E56', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                >
                  <Printer size={14} /> Print / Save PDF
                </button>
                <button
                  onClick={() => setShowClinicalModal(false)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #D5D0C6', background: '#FFFFFF', cursor: 'pointer', fontSize: 12 }}
                >
                  Close
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, background: '#F7F5F0', padding: 14, borderRadius: 8, marginBottom: 20, fontSize: 12 }}>
              <div><strong>Patient:</strong> {clinicalReport.patientName}</div>
              <div><strong>Age:</strong> {clinicalReport.patientAge} (DOB: 1955)</div>
              <div><strong>Report ID:</strong> {clinicalReport.reportId}</div>
              <div><strong>Date:</strong> {clinicalReport.generatedDate}</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#A32D2D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Executive Clinical Summary</div>
              <div style={{ background: '#FDF7F7', borderLeft: '4px solid #A32D2D', padding: 16, borderRadius: 6, fontSize: 13, lineHeight: 1.7, color: '#3A3A3A', whiteSpace: 'pre-line' }}>
                {clinicalReport.neurologistSummary}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>25-Year Baseline vs Current Moving Average</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#EDEAE3', textAlign: 'left' }}>
                    <th style={{ padding: '8px 10px' }}>Biomarker Signal</th>
                    <th style={{ padding: '8px 10px' }}>Weight</th>
                    <th style={{ padding: '8px 10px' }}>Personal Baseline</th>
                    <th style={{ padding: '8px 10px' }}>Current Value</th>
                    <th style={{ padding: '8px 10px' }}>Variance (SD)</th>
                  </tr>
                </thead>
                <tbody>
                  {clinicalReport.signalMetrics.slice(0, 5).map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #EDEAE3' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600 }}>{m.name}</td>
                      <td style={{ padding: '8px 10px', fontFamily: 'JetBrains Mono' }}>{m.weight}</td>
                      <td style={{ padding: '8px 10px', color: '#0F6E56' }}>{m.baselineValue.split('(')[0]}</td>
                      <td style={{ padding: '8px 10px', color: '#A32D2D', fontWeight: 600 }}>{m.driftValue.split('(')[0]}</td>
                      <td style={{ padding: '8px 10px', fontFamily: 'JetBrains Mono', color: '#A32D2D' }}>+2.8 SD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Annotated Speech Transcripts with Acoustic Pauses</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {clinicalReport.annotatedTranscripts.map((t, idx) => (
                  <div key={idx} style={{ border: '1px solid #D5D0C6', borderRadius: 8, padding: 12, background: '#FAFAFA' }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: '#0F0F0F', marginBottom: 4 }}>{t.date}</div>
                    <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 4 }}>Baseline: <span style={{ color: '#0F6E56' }}>{t.baselineSample}</span></div>
                    <div style={{ fontSize: 12, color: '#0F0F0F', marginBottom: 6 }}>Current: <span style={{ color: '#A32D2D', fontWeight: 500 }}>{t.currentSample}</span></div>
                    <div style={{ fontSize: 11, color: '#854F0B', background: '#FAEEDA', padding: '4px 8px', borderRadius: 4 }}>Clinician Note: {t.clinicianNote}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid #EDEAE3', fontSize: 11, color: '#9B9B9B' }}>
              Confidential Medical Data · REMINISCE Clinical Intelligence System v1.0 · Patient-Held Cryptographic Signature Verified
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
