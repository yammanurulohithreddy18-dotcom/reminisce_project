import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BlueprintView from './components/BlueprintView';
import Phase1LifeArchive from './components/Phase1LifeArchive';
import Phase2EarlyDetection from './components/Phase2EarlyDetection';
import Phase3MemoryBridge from './components/Phase3MemoryBridge';
import Phase4CaregiverLayer from './components/Phase4CaregiverLayer';
import PitchAndResearchView from './components/PitchAndResearchView';
import SystemTourModal from './components/SystemTourModal';
import { INITIAL_KNOWLEDGE_GRAPH, PATIENT_PROFILE } from './data/initialData';
import { audioPlayer } from './utils/audioSynthesizer';
import { User, Activity, Heart, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [activePhase, setActivePhase] = useState('blueprint');
  const [patientProfile, setPatientProfile] = useState(PATIENT_PROFILE);
  const [graphData, setGraphData] = useState(INITIAL_KNOWLEDGE_GRAPH);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showTour, setShowTour] = useState(false);

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      audioPlayer.stop();
      setIsMusicPlaying(false);
    } else {
      audioPlayer.startMelody('kishore');
      setIsMusicPlaying(true);
    }
  };

  const handleAddNodeToGraph = (newNode, newLink) => {
    setGraphData(prev => ({
      nodes: [...prev.nodes, newNode],
      links: [...prev.links, newLink]
    }));
  };

  const handleUpdatePatientProfile = (updatedData) => {
    setPatientProfile(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <div className="reminisce-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F5F0', color: '#0F0F0F' }}>
      {/* Top Global Navigation */}
      <Navbar
        activePhase={activePhase}
        onSelectPhase={(phase) => {
          setActivePhase(phase);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenTour={() => setShowTour(true)}
      />

      {/* Patient Context Status Strip (Visible during Phases 1-4) */}
      {typeof activePhase === 'number' && (
        <div style={{
          background: '#EDEAE3',
          borderBottom: '1px solid #D5D0C6',
          padding: '8px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          flexWrap: 'wrap',
          gap: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#0F0F0F' }}>
              <User size={14} color="#0F6E56" /> {patientProfile.name} ({patientProfile.age} yrs)
            </span>
            <span style={{ color: '#6B6B6B' }}>|</span>
            <span style={{ color: '#3A3A3A' }}>Identity: <strong>{patientProfile.formerProfession}</strong></span>
            <span style={{ color: '#6B6B6B' }}>|</span>
            <span style={{ color: '#854F0B', background: '#FAEEDA', padding: '1px 8px', borderRadius: 10, fontWeight: 600 }}>
              {patientProfile.currentStage}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: '#6B6B6B' }}>Primary Contact: <strong>{patientProfile.familyContact.name} ({patientProfile.familyContact.relationship.split(' ')[0]})</strong></span>
            <span style={{ color: '#6B6B6B' }}>Consultant: <strong>Dr. Ramesh (NIMHANS)</strong></span>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main style={{ flex: 1, maxWidth: 1080, width: '100%', margin: '0 auto', padding: '0 32px' }}>
        {activePhase === 'blueprint' && (
          <BlueprintView onNavigatePhase={(p) => setActivePhase(p)} />
        )}
        {activePhase === 1 && (
          <Phase1LifeArchive
            graphData={graphData}
            onAddNode={handleAddNodeToGraph}
            patientProfile={patientProfile}
            onUpdatePatientProfile={handleUpdatePatientProfile}
          />
        )}
        {activePhase === 2 && (
          <Phase2EarlyDetection />
        )}
        {activePhase === 3 && (
          <Phase3MemoryBridge
            graphData={graphData}
            patientProfile={patientProfile}
          />
        )}
        {activePhase === 4 && (
          <Phase4CaregiverLayer />
        )}
        {activePhase === 'vault' && (
          <PitchAndResearchView />
        )}
      </main>

      {/* Global Walkthrough Tour Modal */}
      {showTour && (
        <SystemTourModal
          onClose={() => setShowTour(false)}
          onNavigatePhase={(p) => setActivePhase(p)}
        />
      )}

      {/* Footer */}
      <footer style={{ background: '#0F0F0F', color: 'rgba(247,245,240,0.6)', padding: '48px 32px', textAlign: 'center', fontSize: 13, borderTop: '1px solid #3A3A3A', marginTop: 64 }}>
        <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#1D9E75', marginBottom: 12 }}>
          REMINISCE · Memory Continuity AI
        </div>
        <p style={{ maxWidth: 580, margin: '0 auto 12px', lineHeight: 1.6, color: 'rgba(247,245,240,0.85)' }}>
          Built on the belief that every person deserves to be known — even when they can no longer know themselves.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(247,245,240,0.4)', margin: 0 }}>
          Complete 4-Phase System · Whisper ASR · Neo4j Knowledge Graph · FaceNet · LSTM Anomaly Detection · Graph RAG · Dignity Protocol · NIMHANS Format
        </p>
      </footer>
    </div>
  );
}
