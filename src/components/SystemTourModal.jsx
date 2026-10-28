import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Activity, Heart, Shield } from 'lucide-react';

export default function SystemTourModal({ onClose, onNavigatePhase }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#FFFFFF', borderRadius: 20, maxWidth: 640, width: '100%', padding: 32, boxShadow: '0 24px 48px rgba(0,0,0,0.25)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', cursor: 'pointer', color: '#6B6B6B' }}
        >
          <X size={20} />
        </button>

        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0F6E56', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
          Platform Walkthrough & Evaluation Guide
        </div>
        <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 12px' }}>
          Welcome to REMINISCE
        </h3>
        <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6, margin: '0 0 20px' }}>
          This application is a live interactive simulation of all 4 phases of REMINISCE for patient Rajan Sundaram (Age 71, former professor). Here is how to test every component:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#E1F5EE', color: '#0F6E56', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>01</span>
            <div style={{ fontSize: 13, color: '#3A3A3A' }}>
              <strong>Phase 1 (Life Archive):</strong> Try recording a 2-min journal or click a sample entry. Watch Whisper ASR transcribe words, spaCy extract entities, and add new memory nodes into the physics-simulated Knowledge Graph.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#E6F1FB', color: '#185FA5', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>02</span>
            <div style={{ fontSize: 13, color: '#3A3A3A' }}>
              <strong>Phase 2 (Early Detection):</strong> Scrub the 2020–2026 timeline slider to observe longitudinal drift across 8 biomarkers. Inspect the SHAP attribution waterfall and click "View & Print Clinical PDF" to see the official medical report.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>03</span>
            <div style={{ fontSize: 13, color: '#3A3A3A' }}>
              <strong>Phase 3 (Memory Bridge):</strong> Run a RAG memory session with cloned voice narration (XTTS). Test the real-time Face Recognition Camera HUD with Meena or Priya, and hear the Web Audio retro synthesizer play Kishore Kumar melodies.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ background: '#FAEEDA', color: '#854F0B', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>04</span>
            <div style={{ fontSize: 13, color: '#3A3A3A' }}>
              <strong>Phase 4 (Caregiver Layer):</strong> Review daily "Good Moment" reports, explore the trigger response leaderboard, and chat with the CBT-informed Caregiver Sanctuary for anticipatory grief support.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button
            onClick={() => {
              onClose();
              onNavigatePhase(1);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              background: '#0F6E56',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            Start with Phase 1: Life Archive <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
