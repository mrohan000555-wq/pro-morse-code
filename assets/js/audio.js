class MorseAudio {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSequence = [];
    this.currentIndex = 0;
    this.wpm = 20;
    this.frequency = 600;
    this.volume = 0.5;
    this.onComplete = null;
    this.onProgress = null;
  }

  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  setWPM(wpm) {
    this.wpm = Math.max(5, Math.min(35, wpm));
  }

  setFrequency(freq) {
    this.frequency = Math.max(300, Math.min(1000, freq));
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  getDotDuration() {
    return 1200 / this.wpm;
  }

  getDashDuration() {
    return 3 * this.getDotDuration();
  }

  getSymbolGap() {
    return this.getDotDuration();
  }

  getCharacterGap() {
    return 3 * this.getDotDuration();
  }

  getWordGap() {
    return 7 * this.getDotDuration();
  }

  textToMorse(text) {
    const morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
      '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
      ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
      '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
      ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
      '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
    };

    return text.toUpperCase().split('').map(char => {
      return morseCode[char] || '';
    }).filter(morse => morse !== '').join(' ');
  }

  morseToSequence(morse) {
    const sequence = [];
    const symbols = morse.split(' ');

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      
      if (symbol === '/') {
        sequence.push({ type: 'gap', duration: this.getWordGap() });
        continue;
      }

      for (let j = 0; j < symbol.length; j++) {
        const dotOrDash = symbol[j];
        
        if (dotOrDash === '.') {
          sequence.push({ type: 'tone', duration: this.getDotDuration() });
        } else if (dotOrDash === '-') {
          sequence.push({ type: 'tone', duration: this.getDashDuration() });
        }

        if (j < symbol.length - 1) {
          sequence.push({ type: 'gap', duration: this.getSymbolGap() });
        }
      }

      if (i < symbols.length - 1) {
        sequence.push({ type: 'gap', duration: this.getCharacterGap() });
      }
    }

    return sequence;
  }

  playTone(duration) {
    return new Promise((resolve) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = this.frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration - 0.01);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);

      setTimeout(() => {
        resolve();
      }, duration * 1000);
    });
  }

  async playSequence(sequence) {
    this.currentSequence = sequence;
    this.currentIndex = 0;
    this.isPlaying = true;
    this.isPaused = false;

    for (let i = 0; i < sequence.length; i++) {
      if (!this.isPlaying) {
        break;
      }

      while (this.isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      this.currentIndex = i;
      
      if (this.onProgress) {
        this.onProgress(i, sequence.length);
      }

      const item = sequence[i];

      if (item.type === 'tone') {
        await this.playTone(item.duration);
      } else if (item.type === 'gap') {
        await new Promise(resolve => setTimeout(resolve, item.duration * 1000));
      }
    }

    this.isPlaying = false;
    this.currentIndex = 0;

    if (this.onComplete) {
      this.onComplete();
    }
  }

  play(text) {
    this.initAudioContext();
    this.stop();

    const morse = this.textToMorse(text);
    const sequence = this.morseToSequence(morse);
    
    this.playSequence(sequence);
  }

  playMorse(morse) {
    this.initAudioContext();
    this.stop();

    const sequence = this.morseToSequence(morse);
    this.playSequence(sequence);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSequence = [];
    this.currentIndex = 0;
  }

  isPlayingNow() {
    return this.isPlaying;
  }

  isPausedNow() {
    return this.isPaused;
  }
}

window.MorseAudio = MorseAudio;
