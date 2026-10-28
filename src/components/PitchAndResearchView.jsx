import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Award, Heart, CheckCircle2, ChevronRight, FileText, Lock, Globe, Users } from 'lucide-react';
import { RESEARCH_PAPERS } from '../data/initialData';

export default function PitchAndResearchView() {
  const [activeTab, setActiveTab] = useState('science'); // 'science', 'ethics', 'pitch', 'business'
  const [selectedDeathProtocol, setSelectedDeathProtocol] = useState('family');

  return (
    <div className="phase-container" style={{ padding: '32px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: '#E1F5EE', color: '#0F6E56', padding: '3px 10px', borderRadius: 16, fontWeight: 600 }}>RESEARCH & STRATEGY FOUNDATION</span>
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>Peer-Reviewed Science, Ethical Vault & Pitch Architecture</span>
        </div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: '#0F0F0F', margin: '0 0 8px' }}>Science & Strategy Vault</h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 740, lineHeight: 1.6 }}>
          REMINISCE is not a tech demo looking for a medical use case. It is an evidence-based clinical intervention grounded in 30 years of neuroscience, backed by patient-held cryptographic privacy.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #D5D0C6', marginBottom: 24 }}>
        {[
          { id: 'science', label: '8 Peer-Reviewed Research Papers', icon: BookOpen },
          { id: 'ethics', label: 'Ethics & Privacy Architecture', icon: ShieldCheck },
          { id: 'pitch', label: 'Competition & Pitch Strategy', icon: Award },
          { id: 'business', label: 'Business Model & Scale', icon: Globe }
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
                transition: 'all 0.15s'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 8 RESEARCH PAPERS */}
      {activeTab === 'science' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>The Scientific Literature Base</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Every design choice in REMINISCE is directly validated by published peer-reviewed neuroscience.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {RESEARCH_PAPERS.map(paper => (
              <div key={paper.id} style={{ border: '1px solid #EDEAE3', borderRadius: 12, padding: 20, background: '#FAFAFA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0F6E56', fontWeight: 600 }}>[{paper.id}] {paper.year} · {paper.journal}</span>
                    <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', margin: '2px 0 4px' }}>{paper.title}</h4>
                    <div style={{ fontSize: 12, color: '#6B6B6B' }}>{paper.authors}</div>
                  </div>
                </div>

                <div style={{ margin: '12px 0 8px', fontSize: 13, color: '#3A3A3A', lineHeight: 1.6 }}>
                  <strong>Core Finding:</strong> {paper.keyFinding}
                </div>

                <div style={{ background: '#E1F5EE', padding: '10px 14px', borderRadius: 8, fontSize: 12, color: '#085041', borderLeft: '3px solid #1D9E75' }}>
                  <strong>How REMINISCE Implements It:</strong> {paper.implementation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ETHICS & PRIVACY */}
      {activeTab === 'ethics' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Architectural Privacy & Ethical Pillars</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>The most intimate data of a human life requires cryptographically enforced dignity.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { title: "On-Device Processing", desc: "Whisper ASR, FaceNet embeddings, and NLP parsing run locally. Raw audio, photographs, and journal text never leave the patient's device unencrypted." },
              { title: "Dignity-First Protocol", desc: "The AI never contradicts or argues with the patient. Agitation immediately triggers calming sensory anchors (Kishore Kumar, wedding photos) rather than correction." },
              { title: "Layered Annual Consent", desc: "Consent is reviewed yearly. Patients hold sovereign cryptographic control over their archive with 1-click irreversible deletion option." },
              { title: "Zero Commercial Exploitation", desc: "Strictly zero advertising, zero third-party monetization, and zero pharmaceutical data resale. Open-source auditability for security researchers." },
              { title: "Flag & Refer Mandate", desc: "REMINISCE never claims to make clinical diagnoses. It identifies longitudinal statistical drift and dispatches structured data packets to licensed neurologists." },
              { title: "Federated Learning Only", desc: "Biomarker models improve collaboratively across users using encrypted gradient updates without ever transferring raw patient data to central servers." }
            ].map((p, idx) => (
              <div key={idx} style={{ padding: 18, borderRadius: 12, border: '1px solid #EDEAE3', background: '#F7F5F0' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Death Protocol Pre-Selection */}
          <div style={{ background: '#FFFDF5', border: '1px solid #EFD49F', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#854F0B', textTransform: 'uppercase', marginBottom: 4 }}>End-of-Life Sovereign Choice</div>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: '0 0 10px' }}>The Death Protocol</h4>
            <p style={{ fontSize: 13, color: '#633806', margin: '0 0 16px', lineHeight: 1.5 }}>
              At onboarding (age 40), the user explicitly chooses what happens to their 25-year memory archive when their life reaches its conclusion:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { id: 'family', label: 'Option A: Family Private Heirloom', desc: 'Encrypted archive transfers to designated children (Priya) as an eternal family voice & story museum.' },
                { id: 'research', label: 'Option B: Anonymized Research Gift', desc: 'De-identified linguistic trajectory donated to NIMHANS & Alzheimer’s Association to train global cure models.' },
                { id: 'delete', label: 'Option C: Complete Cryptographic Eradication', desc: 'Zero traces retained. Master encryption keys shredded within 30 days of confirmed passing.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDeathProtocol(opt.id)}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    border: selectedDeathProtocol === opt.id ? '2px solid #0F6E56' : '1px solid #D5D0C6',
                    background: selectedDeathProtocol === opt.id ? '#E1F5EE' : '#FFFFFF',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F', marginBottom: 4 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.4 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PITCH STRATEGY */}
      {activeTab === 'pitch' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Winning Pitch Architecture</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Why REMINISCE creates an indelible emotional impression on judges and clinicians alike.</p>
          </div>

          <div style={{ background: '#F7F5F0', borderLeft: '4px solid #1D9E75', padding: 20, borderRadius: 8, fontStyle: 'italic', fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', marginBottom: 24 }}>
            "My grandmother forgot my mother's name last year. But when we played her wedding song, she looked up, smiled, and said 'Sunita.' That moment — reproducible, scalable, and available to every family — is what REMINISCE builds."
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { criteria: "Technical Depth", proof: "7 distinct AI systems harmonized: Whisper ASR, FaceNet, CLIP, spaCy syntax parsing, BERT embeddings, LSTM temporal drift, Neo4j RAG, XTTS voice synthesis, and SHAP explainability." },
              { criteria: "Social Impact", proof: "55 million patients worldwide. 10 million projected in India by 2050. 40% caregiver depression rate addressed directly by Phase 4." },
              { criteria: "Originality", proof: "Every competitor reacts post-diagnosis. REMINISCE is the only proactive, lifelong Alzheimer's AI built before the disease strikes." },
              { criteria: "Emotional Resonance", proof: "Transcends cold clinical charts to deliver real human moments: recognizing a daughter's wedding photo, listening to Kishore Kumar in one's own younger voice." }
            ].map((c, idx) => (
              <div key={idx} style={{ padding: 18, borderRadius: 12, border: '1px solid #EDEAE3', background: '#FFFFFF' }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#0F6E56', textTransform: 'uppercase' }}>Criterion #{idx + 1}</div>
                <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', margin: '4px 0 8px' }}>{c.criteria}</h4>
                <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>{c.proof}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BUSINESS MODEL */}
      {activeTab === 'business' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Sustainable Business & Healthcare Scale</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>4-tiered revenue model that serves everyday families while funding ongoing clinical trials.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { tier: "Consumer B2C", price: "₹499 / Month", target: "Families & Seniors", desc: "Full pre-disease archiving, daily voice journaling, and family caregiver app. 90-day free trial." },
              { tier: "Clinical B2B", price: "Per Ward Licensing", target: "Memory Care Clinics", desc: "Hospital tablets for NIMHANS, AIIMS, and Apollo Memory Centers with EHR integration." },
              { tier: "Research Data", price: "Academic Grants", target: "Pharma & Universities", desc: "Opt-in anonymized 25-year longitudinal linguistic biomarkers for neurodegenerative drug discovery." },
              { tier: "Public Health", price: "Govt Subsidized", target: "PM-JAY Integration", desc: "Ayushman Bharat coverage for rural and low-income elderly memory screening." }
            ].map((t, idx) => (
              <div key={idx} style={{ padding: 20, borderRadius: 12, border: '1px solid #D5D0C6', background: '#F7F5F0' }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#0F6E56', textTransform: 'uppercase' }}>{t.tier}</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#0F0F0F', margin: '6px 0 2px' }}>{t.price}</div>
                <div style={{ fontSize: 12, color: '#854F0B', fontWeight: 600, marginBottom: 8 }}>{t.target}</div>
                <div style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
