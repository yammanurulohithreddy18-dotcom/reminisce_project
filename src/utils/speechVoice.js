// Web Speech API Voice and Audio Journaling Engine

class SpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isSpeaking = false;
    this.isListening = false;
    this.initRecognition();
  }

  initRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-IN';
      }
    }
  }

  speak(text, onEnd) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // gentle, steady cadence appropriate for memory retrieval
    utterance.pitch = 0.95; // warm, resonant pitch

    // Try finding an Indian English or natural male/soothing voice
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.includes('en-IN') || v.name.includes('Rishi') || v.name.includes('David') || v.name.includes('Natural')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  startListening(onTranscript, onError) {
    if (!this.recognition) {
      if (onError) onError("Speech recognition not supported in this browser; using simulated recording mode.");
      return false;
    }

    this.isListening = true;
    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript && onTranscript) {
        onTranscript(finalTranscript.trim());
      }
    };

    this.recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e);
      this.isListening = false;
      if (onError) onError(e.error);
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.warn("Start error:", e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechEngine = new SpeechEngine();
