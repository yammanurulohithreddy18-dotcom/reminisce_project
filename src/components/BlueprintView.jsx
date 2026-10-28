import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Activity, Heart, Shield, Award } from 'lucide-react';

export default function BlueprintView({ onNavigatePhase }) {
  return (
    <div className="blueprint-container" style={{ padding: '32px 0' }}>
      {/* Hero Eyebrow */}
      <div style={{ background: '#0F0F0F', borderRadius: 20, padding: '56px 48px', color: '#F7F5F0', position: 'relative', overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.12em', color: '#1D9E75', textTransform: 'uppercase', marginBottom: 14 }}>
          REMINISCE · Complete Project Document · v1.0
        </div>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
          Memory<br/><em style={{ fontStyle: 'italic', color: '#1D9E75' }}>Continuity</em><br/>AI
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(247,245,240,0.75)', maxWidth: 620, lineHeight: 1.6, marginBottom: 32 }}>
          A lifelong AI companion that builds your memory archive before Alzheimer's strikes — and becomes your gentle memory bridge when it does. Built for the 55 million people the world is currently failing.
        </p>

        {/* Global Impact Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24 }}>
          <div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: '#1D9E75' }}>55M</div>
            <div style={{ fontSize: 11, color: 'rgba(247,245,240,0.5)', textTransform: 'uppercase' }}>Patients Globally</div>
          </div>
          <div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: '#1D9E75' }}>7 yr</div>
            <div style={{ fontSize: 11, color: 'rgba(247,245,240,0.5)', textTransform: 'uppercase' }}>Detection Lag Closed</div>
          </div>
          <div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: '#1D9E75' }}>4</div>
            <div style={{ fontSize: 11, color: 'rgba(247,245,240,0.5)', textTransform: 'uppercase' }}>AI System Phases</div>
          </div>
          <div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: '#1D9E75' }}>₹0</div>
            <div style={{ fontSize: 11, color: 'rgba(247,245,240,0.5)', textTransform: 'uppercase' }}>Pre-Disease Tools Today</div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Phases Launchpad */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', color: '#6B6B6B', letterSpacing: '0.08em', marginBottom: 8 }}>Explore Working Systems</div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 30, color: '#0F0F0F', margin: '0 0 20px' }}>Four Phases Across a Lifetime</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {/* Phase 1 Card */}
          <div
            onClick={() => onNavigatePhase(1)}
            style={{
              background: '#E1F5EE',
              border: '1px solid #9FE1CB',
              borderRadius: 16,
              padding: 28,
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#085041', fontWeight: 600 }}>PHASE 1 · AGE 40–65</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#085041' }}>Launch Demo <ArrowRight size={14} /></span>
            </div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#085041', margin: '0 0 8px' }}>The Life Archive</h3>
            <p style={{ fontSize: 13, color: '#0C6B56', lineHeight: 1.6, margin: '0 0 16px' }}>
              Built while the person can narrate their own life with richness. 2-min daily voice journals, 3-hour intake wizard, FaceNet photo tagging, and 12,000+ node Neo4j knowledge graph.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#085041', padding: '3px 8px', borderRadius: 10 }}>Whisper ASR</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#085041', padding: '3px 8px', borderRadius: 10 }}>Neo4j Graph</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#085041', padding: '3px 8px', borderRadius: 10 }}>FaceNet 512d</span>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div
            onClick={() => onNavigatePhase(2)}
            style={{
              background: '#E6F1FB',
              border: '1px solid #B5D4F4',
              borderRadius: 16,
              padding: 28,
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0C447C', fontWeight: 600 }}>PHASE 2 · EARLY STAGE (AGE 60+)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#0C447C' }}>Launch Demo <ArrowRight size={14} /></span>
            </div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0C447C', margin: '0 0 8px' }}>Early Detection Engine</h3>
            <p style={{ fontSize: 13, color: '#13589B', lineHeight: 1.6, margin: '0 0 16px' }}>
              Continuous monitoring of 8 linguistic & acoustic signals against 25-yr personal baseline. SHAP explainability, 3-level alert logic, and clinical neurological PDF generation.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#0C447C', padding: '3px 8px', borderRadius: 10 }}>LSTM Drift</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#0C447C', padding: '3px 8px', borderRadius: 10 }}>8 Biomarkers</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#0C447C', padding: '3px 8px', borderRadius: 10 }}>SHAP Values</span>
            </div>
          </div>

          {/* Phase 3 Card */}
          <div
            onClick={() => onNavigatePhase(3)}
            style={{
              background: '#EEEDFE',
              border: '1px solid #CECBF6',
              borderRadius: 16,
              padding: 28,
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#3C3489', fontWeight: 600 }}>PHASE 3 · ALZHEIMER'S STAGE</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#3C3489' }}>Launch Demo <ArrowRight size={14} /></span>
            </div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#3C3489', margin: '0 0 8px' }}>The Memory Bridge</h3>
            <p style={{ fontSize: 13, color: '#4D43AB', lineHeight: 1.6, margin: '0 0 16px' }}>
              The therapeutic core. Daily RAG sessions, real-time Face Recognition camera HUD, Dignity Protocol (never corrects), and Web Audio Kishore Kumar retro music engine.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#3C3489', padding: '3px 8px', borderRadius: 10 }}>Graph RAG</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#3C3489', padding: '3px 8px', borderRadius: 10 }}>Camera HUD</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#3C3489', padding: '3px 8px', borderRadius: 10 }}>Retro Synthesizer</span>
            </div>
          </div>

          {/* Phase 4 Card */}
          <div
            onClick={() => onNavigatePhase(4)}
            style={{
              background: '#FAEEDA',
              border: '1px solid #FAC775',
              borderRadius: 16,
              padding: 28,
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#633806', fontWeight: 600 }}>PHASE 4 · CAREGIVER LAYER</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#633806' }}>Launch Demo <ArrowRight size={14} /></span>
            </div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#633806', margin: '0 0 8px' }}>Caregiver Sanctuary</h3>
            <p style={{ fontSize: 13, color: '#854F0B', lineHeight: 1.6, margin: '0 0 16px' }}>
              Built for Priya and family caregivers. Daily "Good Moment" reports, memory trigger effectiveness matrix, and CBT-informed grief & burnout conversational support.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#633806', padding: '3px 8px', borderRadius: 10 }}>Good Moments</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#633806', padding: '3px 8px', borderRadius: 10 }}>CBT Sanctuary</span>
              <span style={{ fontSize: 10, background: '#FFFFFF', color: '#633806', padding: '3px 8px', borderRadius: 10 }}>NIMHANS Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 7 Steps Journey */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 36, marginBottom: 40 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', color: '#6B6B6B', letterSpacing: '0.08em', marginBottom: 6 }}>Architecture Flow</div>
        <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: '#0F0F0F', margin: '0 0 24px' }}>Seven Steps from First Journal to Memory Bridge</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { num: "01", title: "User onboards at age 40 — 3-hour life story intake", desc: "Top 20 life memories captured in their own voice. Family tree mapped. Key faces photographed with emotional bonds. Whisper + FaceNet + CLIP + Neo4j." },
            { num: "02", title: "Daily 2-minute voice journals quietly build the archive", desc: "Every evening asks a gentle prompt. Voice transcribed, entities extracted, emotions scored, ~500 nodes added per year without feeling clinical." },
            { num: "03", title: "Phase 2 silently watches for linguistic and behavioral drift", desc: "Analyzed against 25-yr personal baseline. Tracks TTR, pre-noun pause ms, parse tree depth, and repetition cosine similarity." },
            { num: "04", title: "Family receives gentle notices with clinical data attached", desc: "Three-level alert logic. If Level 3 is reached, a comprehensive 90-day neurological clinical PDF is generated for the physician." },
            { num: "05", title: "Daily personalized memory sessions begin", desc: "Graph RAG queries top emotional anchors. Spaced retrieval therapy guides timing. Dignity Protocol ensures the AI never corrects the patient." },
            { num: "06", title: "Face recognition delivers relationship context in real time", desc: "Tablet camera detects incoming family members, instantly surfaces who they are, shows shared wedding photos, and plays favorite songs." },
            { num: "07", title: "Caregivers receive daily 'Good Moment' reports", desc: "Shows which memories landed, how long the patient was calm, and offers CBT-informed anticipatory grief counseling to family." }
          ].map((s, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F7F5F0', border: '1px solid #D5D0C6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 600, color: '#0F6E56', flexShrink: 0 }}>
                {s.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0F0F0F', marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
