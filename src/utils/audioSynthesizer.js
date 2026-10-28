// Web Audio API Synthesizer for REMINISCE
// Generates soothing nostalgic melodies and ambient soundscapes without external audio dependencies

class NostalgicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrack = null;
    this.gainNode = null;
    this.intervalId = null;
    this.noiseNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a gentle, resonant musical note with soft harmonic envelope (rhodes/flute-like)
  playTone(freq, duration = 1.2, type = 'sine', gainMultiplier = 1.0) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.25 * gainMultiplier, now + 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(noteGain);
      oscHarmonic.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + duration + 0.1);
      oscHarmonic.stop(now + duration + 0.1);
    } catch (e) {
      console.warn("Audio note play failed:", e);
    }
  }

  // Melodic progressions inspired by Kishore Kumar classics & soothing ambient ragas
  // e.g. "Pal Pal Dil Ke Paas" melodic sequence: F4, G4, A4, C5, A4, G4, F4, D4...
  startMelody(trackName = "kishore") {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.currentTrack = trackName;

    // Frequencies (Hz)
    const notes = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
    };

    let sequence = [];
    let stepTime = 650;

    if (trackName === "kishore") {
      // Warm nostalgic ballad motif: reminiscent of 70s golden melody
      sequence = [
        { f: notes.F4, d: 1.4 }, { f: notes.A4, d: 1.2 }, { f: notes.C5, d: 1.6 },
        { f: notes.A4, d: 1.2 }, { f: notes.G4, d: 1.4 }, { f: notes.F4, d: 1.8 },
        { f: notes.D4, d: 1.2 }, { f: notes.F4, d: 1.5 }, { f: notes.G4, d: 2.2 },
        { f: notes.E4, d: 1.2 }, { f: notes.G4, d: 1.2 }, { f: notes.C5, d: 1.8 },
        { f: notes.Bb4, d: 1.4 }, { f: notes.A4, d: 1.4 }, { f: notes.F4, d: 2.5 }
      ];
      stepTime = 700;
    } else if (trackName === "wedding") {
      // Joyous gentle sitar / flute wedding acoustic arpeggio
      sequence = [
        { f: notes.C4, d: 1.5 }, { f: notes.E4, d: 1.2 }, { f: notes.G4, d: 1.2 }, { f: notes.C5, d: 2.0 },
        { f: notes.D5, d: 1.2 }, { f: notes.C5, d: 1.2 }, { f: notes.G4, d: 1.5 }, { f: notes.E4, d: 2.0 },
        { f: notes.F4, d: 1.2 }, { f: notes.A4, d: 1.2 }, { f: notes.C5, d: 2.0 }, { f: notes.G4, d: 2.5 }
      ];
      stepTime = 600;
    } else if (trackName === "petrichor") {
      // Monsoon meditative calm raga
      sequence = [
        { f: notes.D4, d: 2.2 }, { f: notes.F4, d: 1.8 }, { f: notes.A4, d: 2.5 },
        { f: notes.D5, d: 2.8 }, { f: notes.A4, d: 2.0 }, { f: notes.F4, d: 2.2 }, { f: notes.D4, d: 3.5 }
      ];
      stepTime = 950;
      this.startRainAmbience();
    } else {
      // Verandah Morning Coffee
      sequence = [
        { f: notes.G4, d: 1.8 }, { f: notes.C5, d: 1.5 }, { f: notes.E5, d: 2.2 },
        { f: notes.D5, d: 1.5 }, { f: notes.C5, d: 1.8 }, { f: notes.G4, d: 2.5 }
      ];
      stepTime = 800;
    }

    let index = 0;
    this.playTone(sequence[0].f, sequence[0].d);

    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      index = (index + 1) % sequence.length;
      const item = sequence[index];
      this.playTone(item.f, item.d);
    }, stepTime);
  }

  // Calming gentle rain noise for the petrichor soundscape
  startRainAmbience() {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.04;
      }
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Low pass filter for warm rain sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.noiseNode.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      this.noiseNode.start();
    } catch (e) {
      console.warn("Rain ambience failed:", e);
    }
  }

  // Subtle recognition chime
  playRecognitionChime() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.8, 'sine', 0.8);
      }, idx * 110);
    });
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch (e) {}
      this.noiseNode = null;
    }
    this.currentTrack = null;
  }

  setVolume(val) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }
}

export const audioPlayer = new NostalgicAudioEngine();
