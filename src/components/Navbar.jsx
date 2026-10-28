import React from 'react';
import { Sparkles, Brain, Volume2, VolumeX, BookOpen, Activity, Heart, Shield, Award, HelpCircle } from 'lucide-react';

export default function Navbar({ activePhase, onSelectPhase, isMusicPlaying, onToggleMusic, onOpenTour }) {
  const NAV_ITEMS = [
    { id: 'blueprint', label: 'Blueprint Document', phaseNumber: 'Doc', icon: BookOpen },
    { id: 1, label: 'Phase 1: Life Archive', phaseNumber: '01', icon: Sparkles },
    { id: 2, label: 'Phase 2: Early Detection', phaseNumber: '02', icon: Activity },
    { id: 3, label: 'Phase 3: Memory Bridge', phaseNumber: '03', icon: Heart },
    { id: 4, label: 'Phase 4: Caregiver Layer', phaseNumber: '04', icon: Heart },
    { id: 'vault', label: 'Research & Strategy Vault', phaseNumber: 'Vault', icon: Award }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(247, 245, 240, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #D5D0C6',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64
    }}>
      {/* Brand */}
      <div
        onClick={() => onSelectPhase('blueprint')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#0F0F0F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid #1D9E75'
        }}>
          <Brain size={18} color="#1D9E75" />
        </div>
        <div>
          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, letterSpacing: '-0.02em', color: '#0F0F0F', lineHeight: 1 }}>
            REMINISCE
          </div>
          <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: '#0F6E56', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Memory Continuity AI
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const isActive = activePhase === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPhase(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 20,
                border: 'none',
                background: isActive ? '#0F0F0F' : 'transparent',
                color: isActive ? '#F7F5F0' : '#6B6B6B',
                fontSize: 12,
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{
                fontSize: 9,
                fontFamily: 'JetBrains Mono',
                background: isActive ? '#1D9E75' : '#EDEAE3',
                color: isActive ? '#FFFFFF' : '#3A3A3A',
                padding: '1px 5px',
                borderRadius: 4
              }}>
                {item.phaseNumber}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Patient indicator & Music Synth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={onToggleMusic}
          title={isMusicPlaying ? 'Mute Retro Music' : 'Play Nostalgic Retro Melody'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 16,
            border: isMusicPlaying ? '1px solid #1D9E75' : '1px solid #D5D0C6',
            background: isMusicPlaying ? '#E1F5EE' : '#FFFFFF',
            color: isMusicPlaying ? '#0F6E56' : '#6B6B6B',
            fontSize: 11,
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          {isMusicPlaying ? <Volume2 size={14} color="#0F6E56" /> : <VolumeX size={14} />}
          <span>{isMusicPlaying ? 'Kishore Melodies' : 'Retro Audio'}</span>
        </button>

        <button
          onClick={onOpenTour}
          title="System Architecture Guide"
          style={{
            background: '#FFFFFF',
            border: '1px solid #D5D0C6',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#3A3A3A'
          }}
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}
