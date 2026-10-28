import React, { useState } from 'react';
import { Heart, Activity, Calendar, MessageSquare, Send, CheckCircle2, AlertTriangle, Sparkles, User, Shield, Share2 } from 'lucide-react';
import { CAREGIVER_DAILY_REPORTS, PATIENT_PROFILE } from '../data/initialData';

export default function Phase4CaregiverLayer() {
  const [activeTab, setActiveTab] = useState('reports'); // 'reports', 'analytics', 'sanctuary', 'coordination'
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Priya. I am your Caregiver Sanctuary companion. Taking care of your father as he navigates Alzheimer's is deeply loving, but it can also feel exhausting and emotionally heavy. How are you holding up today?",
      time: '9:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Suggested prompts for the Caregiver Sanctuary
  const SUGGESTED_QUESTIONS = [
    "He didn't recognize my name for a moment yesterday. How do I process this anticipatory grief?",
    "I feel guilty whenever I take an evening off for myself.",
    "What sensory items should I bring for my Sunday visit?"
  ];

  const handleSendMessage = (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Your devotion to your father is profound, Priya. ";
      const lower = textToSend.toLowerCase();

      if (lower.includes('recognize') || lower.includes('grief') || lower.includes('name')) {
        reply += "When your father looked past your name yesterday, it was not his heart forgetting you — it was the synaptic retrieval path misfiring for a brief moment. Notice that when 'Pal Pal Dil Ke Paas' played, his eyes softened immediately. The emotional bond in the amygdala is fully intact. You are grieving the person who was, while loving the person who is. That grief is normal and deserves gentle kindness, not self-reproach.";
      } else if (lower.includes('guilty') || lower.includes('rest') || lower.includes('myself')) {
        reply += "Caregiver guilt is one of the most common precursors to the 40% clinical depression rate we see in family caregivers. Remember Kitwood's golden rule: an exhausted, depleted caregiver cannot radiate the calm assurance a dementia patient needs. Taking time for your architecture work and your rest is not selfish — it is an active medical investment in your father's stability.";
      } else if (lower.includes('visit') || lower.includes('sunday') || lower.includes('bring')) {
        reply += "For Sunday's visit, leave complex questions at home. Instead, bring sensory anchors: a thermos of freshly brewed chicory filter coffee, the printed framed photo of the two of you dancing at your 2015 wedding, and wear a fragrance or shawl he has known for years. Let the atmosphere evoke warmth without asking him to 'remember'.";
      } else {
        reply += "I hear you deeply. Every day presents unexpected waves. Let's remember today's victory: Rajan had 42 minutes of serene joy this morning and spoke your name with pride. Take a slow, grounding breath. You are doing beautiful work.";
      }

      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        time: 'Just now'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="phase-container" style={{ padding: '32px 0' }}>
      {/* Phase Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: '#FAEEDA', color: '#854F0B', padding: '3px 10px', borderRadius: 16, fontWeight: 600 }}>PHASE 4 · CAREGIVER LAYER</span>
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>Logged in as Priya Sundaram (Daughter & Primary Caregiver)</span>
        </div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 32, color: '#0F0F0F', margin: '0 0 8px' }}>Family Connection & Caregiver Sanctuary</h2>
        <p style={{ fontSize: 14, color: '#6B6B6B', maxWidth: 740, lineHeight: 1.6 }}>
          40% of Alzheimer's caregivers develop clinical depression from ambiguous loss and invisible effort. 
          Phase 4 makes daily connection visible, quantifies moments of joy, and provides CBT-informed emotional support for the family.
        </p>
      </div>

      {/* Sub Navigation */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid #D5D0C6', marginBottom: 24 }}>
        {[
          { id: 'reports', label: 'Daily "Good Moment" Reports', icon: Heart },
          { id: 'analytics', label: 'Trigger Effectiveness Leaderboard', icon: Activity },
          { id: 'sanctuary', label: 'Caregiver Sanctuary (CBT Companion)', icon: MessageSquare },
          { id: 'coordination', label: 'Family & NIMHANS Clinical Notes', icon: Calendar }
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
                borderBottom: isActive ? '3px solid #854F0B' : '3px solid transparent',
                color: isActive ? '#854F0B' : '#6B6B6B',
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

      {/* TAB 1: DAILY GOOD MOMENT REPORTS */}
      {activeTab === 'reports' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          {/* Reports Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CAREGIVER_DAILY_REPORTS.map((rep, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#854F0B', fontWeight: 600 }}>{rep.date}</span>
                    <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, margin: '2px 0 0', color: '#0F0F0F' }}>Memory Session Debrief</h4>
                  </div>
                  <span style={{ background: '#E1F5EE', color: '#0F6E56', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>
                    Score: {rep.sessionScore}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: '#3A3A3A', lineHeight: 1.6, marginBottom: 16 }}>
                  {rep.summary}
                </p>

                {/* Metrics Pill Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: 10, background: '#F7F5F0', padding: 12, borderRadius: 8, fontSize: 11 }}>
                  <div>
                    <span style={{ color: '#6B6B6B' }}>Calm Duration:</span>
                    <div style={{ fontWeight: 600, color: '#0F6E56', fontSize: 13 }}>{rep.calmMinutes} Minutes</div>
                  </div>
                  <div>
                    <span style={{ color: '#6B6B6B' }}>Agitation Duration:</span>
                    <div style={{ fontWeight: 600, color: rep.agitationMinutes > 5 ? '#A32D2D' : '#0F6E56', fontSize: 13 }}>{rep.agitationMinutes} Minutes</div>
                  </div>
                  <div>
                    <span style={{ color: '#6B6B6B' }}>Highest Impact Trigger:</span>
                    <div style={{ fontWeight: 600, color: '#0F0F0F' }}>{rep.bestTrigger}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emotional State Weekly Summary */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: '0 0 14px' }}>Weekly Emotional Arc</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>Serene & Reminiscing</span>
                  <strong style={{ color: '#0F6E56' }}>74% (18.5 hrs)</strong>
                </div>
                <div style={{ height: 8, background: '#EDEAE3', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: '74%', height: '100%', background: '#0F6E56' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>Mild Confusion (Resolved via Dignity Protocol)</span>
                  <strong style={{ color: '#854F0B' }}>19% (4.8 hrs)</strong>
                </div>
                <div style={{ height: 8, background: '#EDEAE3', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: '19%', height: '100%', background: '#854F0B' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>Acute Agitation / Sundowning</span>
                  <strong style={{ color: '#A32D2D' }}>7% (1.7 hrs)</strong>
                </div>
                <div style={{ height: 8, background: '#EDEAE3', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: '7%', height: '100%', background: '#A32D2D' }} />
                </div>
              </div>
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 10, padding: 14, border: '1px solid #EDEAE3', fontSize: 12, color: '#6B6B6B', lineHeight: 1.5 }}>
              <strong>Caregiver Clinical Takeaway:</strong> Rajan remains calm 93% of the time when sessions occur before 4 PM. Agitation peaks only after 5:30 PM (classic sundowning), which the system successfully mitigates using the Kishore Kumar audio trigger.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRIGGER EFFECTIVENESS LEADERBOARD */}
      {activeTab === 'analytics' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Memory Trigger Effectiveness Matrix</h3>
            <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>
              Not all memories are equal. The system monitors neural response rates across 30 days to build an optimized playlist of triggers for family visits.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: "Kishore Kumar — 'Pal Pal Dil Ke Paas'", type: "Sensory / Music", successRate: 98, status: "Safe Anchor", note: "Brings instantaneous physical relaxation and smiling within 90 seconds." },
              { name: "Priya's 2015 Wedding Toast Photo", type: "Visual Photo", successRate: 95, status: "High Joy", note: "Reliably elicits name recognition for Priya and recollections of the Hyderabad banquet." },
              { name: "Deccan Monsoon Petrichor & Rain Ambience", type: "Sensory Soundscape", successRate: 91, status: "Deep Calm", note: "Soothes late afternoon restlessness; prompts memories of Chikkadpally childhood." },
              { name: "Osmania University Arts College Arches", type: "Visual & Narrative", successRate: 84, status: "Intellectual Pride", note: "Affirms his identity as a scholar of Keats; restores dignity and articulateness." },
              { name: "Recent Daily News / Current Politics", type: "Episodic Fact", successRate: 14, status: "Distress Risk (Avoid)", note: "Triggers disorientation and working memory anxiety. Filtered out of active sessions." }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 10, border: '1px solid #EDEAE3', background: idx === 4 ? '#FFF8F8' : '#FFFFFF' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0F0F0F' }}>{item.name}</span>
                    <span style={{ fontSize: 10, background: '#EDEAE3', color: '#6B6B6B', padding: '1px 6px', borderRadius: 4, fontFamily: 'JetBrains Mono' }}>{item.type}</span>
                    <span style={{ fontSize: 11, background: idx === 4 ? '#FCEBEB' : '#E1F5EE', color: idx === 4 ? '#A32D2D' : '#0F6E56', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 4 }}>{item.note}</div>
                </div>

                <div style={{ textAlign: 'right', marginLeft: 20 }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: idx === 4 ? '#A32D2D' : '#0F6E56' }}>
                    {item.successRate}%
                  </div>
                  <div style={{ fontSize: 10, color: '#9B9B9B' }}>Response Rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CAREGIVER SANCTUARY (CBT COMPANION) */}
      {activeTab === 'sanctuary' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
          {/* Chat Panel */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', display: 'flex', flexDirection: 'column', height: 520, boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #EDEAE3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#0F0F0F', margin: 0 }}>Caregiver Sanctuary</h4>
                <div style={{ fontSize: 11, color: '#854F0B' }}>CBT-Informed Anticipatory Grief & Burnout Support</div>
              </div>
              <span style={{ fontSize: 11, background: '#FAEEDA', color: '#854F0B', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Confidential Space</span>
            </div>

            {/* Messages Scroll Area */}
            <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    background: msg.sender === 'user' ? '#854F0B' : '#F7F5F0',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#0F0F0F',
                    borderRadius: 14,
                    padding: '12px 16px',
                    fontSize: 13,
                    lineHeight: 1.6,
                    border: msg.sender === 'user' ? 'none' : '1px solid #EDEAE3'
                  }}
                >
                  {msg.text}
                  <div style={{ fontSize: 9, opacity: 0.7, marginTop: 4, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                    {msg.time}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: '#F7F5F0', padding: '10px 14px', borderRadius: 14, fontSize: 12, color: '#6B6B6B' }}>
                  Sanctuary Companion is thinking...
                </div>
              )}
            </div>

            {/* Input Form */}
            <div style={{ padding: 16, borderTop: '1px solid #EDEAE3', background: '#FAFAFA' }}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                style={{ display: 'flex', gap: 10 }}
              >
                <input
                  type="text"
                  placeholder="Share what is on your heart today, Priya..."
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #D5D0C6', fontSize: 13, outline: 'none' }}
                />
                <button
                  type="submit"
                  style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: '#854F0B', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Caregiver Prompts & Emotional Grounding */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#854F0B', textTransform: 'uppercase', marginBottom: 10 }}>Frequent Reflections</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: '1px solid #EDEAE3', background: '#F7F5F0', fontSize: 12, color: '#3A3A3A', cursor: 'pointer', lineHeight: 1.4 }}
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: '#F0F9F5', borderRadius: 16, border: '1px solid #9FE1CB', padding: 20 }}>
              <div style={{ color: '#085041', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Caregiver Grounding Anchor</div>
              <p style={{ fontSize: 12, color: '#085041', lineHeight: 1.5, margin: 0 }}>
                "Remember: Alzheimer's may steal your father's ability to recall dates and titles, but it cannot undo the 40 years of love he poured into raising you. That love exists in the architecture of your soul."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FAMILY & CLINICAL NOTES COORDINATION */}
      {activeTab === 'coordination' && (
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #D5D0C6', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, color: '#0F0F0F', margin: '0 0 6px' }}>Care Coordination & Neurologist Sync</h3>
              <p style={{ fontSize: 13, color: '#6B6B6B', margin: 0 }}>Shared clinical portal for Priya, Meena, and Dr. Ramesh (NIMHANS Consultant).</p>
            </div>
            <button
              onClick={() => alert("Summary dispatched to Dr. Ramesh Natarajan's clinical portal at NIMHANS.")}
              style={{ padding: '8px 16px', borderRadius: 8, background: '#0F6E56', color: '#FFFFFF', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Share2 size={14} /> Sync Clinical Notes to Dr. Ramesh
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 18, border: '1px solid #EDEAE3' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase' }}>Next Family Visit</div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: '4px 0' }}>Sunday, Nov 01</div>
              <div style={{ fontSize: 12, color: '#3A3A3A' }}>Priya visiting from Bangalore with Kabir. Bring vintage photo album and filter coffee.</div>
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 18, border: '1px solid #EDEAE3' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase' }}>Neurologist Follow-Up</div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: '4px 0' }}>Thursday, Nov 12</div>
              <div style={{ fontSize: 12, color: '#3A3A3A' }}>Dr. Ramesh Natarajan · NIMHANS Cognitive Clinic. 90-day Level 3 PDF exported.</div>
            </div>

            <div style={{ background: '#F7F5F0', borderRadius: 12, padding: 18, border: '1px solid #EDEAE3' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase' }}>Primary Music Protocol</div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: '#0F0F0F', margin: '4px 0' }}>Kishore Kumar Playlist</div>
              <div style={{ fontSize: 12, color: '#3A3A3A' }}>Scheduled for daily 5:15 PM activation prior to evening sundowning period.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
