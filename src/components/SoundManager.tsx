import { useEffect } from 'react';
import * as Tone from 'tone';

class WindowsSounds {
  private static instance: WindowsSounds;
  private isInitialized = false;
  private masterVolume = 0.5; // Default 50%
  private isMuted = false; // Default not muted

  public static getInstance(): WindowsSounds {
    if (!WindowsSounds.instance) {
      WindowsSounds.instance = new WindowsSounds();
    }
    return WindowsSounds.instance;
  }

  async init() {
    if (this.isInitialized) return;
    
    try {
      await Tone.start();
      this.isInitialized = true;
      console.log('Windows sounds initialized');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume / 100));
    this.updateToneVolume();
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    this.updateToneVolume();
  }

  private updateToneVolume() {
    const effectiveVolume = this.isMuted ? 0 : this.masterVolume;
    Tone.Destination.volume.value = Tone.gainToDb(effectiveVolume);
  }

  private async createSynth(options: any) {
    await this.init();
    const synth = new Tone.Synth(options).toDestination();
    return synth;
  }

  private async createNoiseSynth() {
    await this.init();
    const noise = new Tone.Noise().toDestination();
    return noise;
  }

  private async createFilteredNoise(filterType: BiquadFilterType = 'highpass', frequency: number = 5000) {
    await this.init();
    const filter = new Tone.Filter(frequency, filterType);
    const noise = new Tone.Noise().connect(filter).toDestination();
    return { noise, filter };
  }

  // === SYSTEM SOUNDS ===
  async playStartup() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 1
      }
    });

    // Windows 95 startup sound approximation - The Microsoft Sound
    const melody = [
      { note: 'D4', duration: '4n', time: 0 },
      { note: 'A4', duration: '4n', time: 0.3 },
      { note: 'F#4', duration: '4n', time: 0.6 },
      { note: 'D5', duration: '2n', time: 0.9 }
    ];

    melody.forEach(({ note, duration, time }) => {
      synth.triggerAttackRelease(note, duration, Tone.now() + time);
    });

    setTimeout(() => synth.dispose(), 3000);
  }

  async playShutdown() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.2,
        release: 1.5
      }
    });

    // Windows 95 shutdown sound approximation
    const melody = [
      { note: 'D5', duration: '4n', time: 0 },
      { note: 'A4', duration: '4n', time: 0.4 },
      { note: 'F#4', duration: '4n', time: 0.8 },
      { note: 'D4', duration: '1n', time: 1.2 }
    ];

    melody.forEach(({ note, duration, time }) => {
      synth.triggerAttackRelease(note, duration, Tone.now() + time);
    });

    setTimeout(() => synth.dispose(), 4000);
  }

  // === WINDOW SOUNDS ===
  async playWindowOpen() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.1,
        release: 0.2
      }
    });

    // Rising tone for window opening
    synth.triggerAttackRelease('C4', '8n', Tone.now());
    synth.triggerAttackRelease('E4', '8n', Tone.now() + 0.05);
    synth.triggerAttackRelease('G4', '8n', Tone.now() + 0.1);
    
    setTimeout(() => synth.dispose(), 500);
  }

  async playWindowClose() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.1,
        release: 0.2
      }
    });

    // Descending tone for window closing
    synth.triggerAttackRelease('G4', '8n', Tone.now());
    synth.triggerAttackRelease('E4', '8n', Tone.now() + 0.05);
    synth.triggerAttackRelease('C4', '8n', Tone.now() + 0.1);
    
    setTimeout(() => synth.dispose(), 500);
  }

  async playWindowMinimize() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.1
      }
    });

    // Quick descending slide
    synth.triggerAttackRelease('A4', '16n', Tone.now());
    synth.triggerAttackRelease('F4', '16n', Tone.now() + 0.03);
    
    setTimeout(() => synth.dispose(), 300);
  }

  async playWindowMaximize() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        decay: 0.15,
        sustain: 0.1,
        release: 0.2
      }
    });

    // Quick ascending slide
    synth.triggerAttackRelease('F4', '16n', Tone.now());
    synth.triggerAttackRelease('A4', '8n', Tone.now() + 0.03);
    
    setTimeout(() => synth.dispose(), 400);
  }

  // === UI INTERACTION SOUNDS ===
  async playClick() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.001,
        decay: 0.03,
        sustain: 0,
        release: 0.02
      }
    });

    synth.triggerAttackRelease('C5', '64n');
    setTimeout(() => synth.dispose(), 100);
  }

  async playButtonDown() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.001,
        decay: 0.02,
        sustain: 0,
        release: 0.01
      }
    });

    synth.triggerAttackRelease('A4', '64n');
    setTimeout(() => synth.dispose(), 80);
  }

  async playMenuOpen() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        decay: 0.05,
        sustain: 0.2,
        release: 0.1
      }
    });

    synth.triggerAttackRelease('E5', '16n');
    setTimeout(() => synth.dispose(), 200);
  }

  async playMenuSelect() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.005,
        decay: 0.03,
        sustain: 0,
        release: 0.02
      }
    });

    synth.triggerAttackRelease('G5', '64n');
    setTimeout(() => synth.dispose(), 100);
  }

  // === ERROR AND NOTIFICATION SOUNDS ===
  async playError() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sawtooth'
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0,
        release: 0.1
      }
    });

    // Windows error beep - low harsh tone
    synth.triggerAttackRelease('F#3', '8n');
    setTimeout(() => synth.dispose(), 500);
  }

  async playWarning() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.1,
        release: 0.2
      }
    });

    // Warning sound - two tone beep
    synth.triggerAttackRelease('D4', '16n', Tone.now());
    synth.triggerAttackRelease('A4', '16n', Tone.now() + 0.1);
    
    setTimeout(() => synth.dispose(), 500);
  }

  async playNotification() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.2,
        release: 0.3
      }
    });

    // Friendly notification chime
    synth.triggerAttackRelease('C5', '8n', Tone.now());
    synth.triggerAttackRelease('E5', '8n', Tone.now() + 0.1);
    
    setTimeout(() => synth.dispose(), 600);
  }

  // === SPECIAL EFFECTS ===
  async playRecycleBinEmpty() {
    const { noise } = await this.createFilteredNoise('bandpass', 1000);
    
    // Trash sound effect
    noise.start();
    noise.stop(Tone.now() + 0.2);
    
    setTimeout(() => noise.dispose(), 500);
  }

  async playDiskActivity() {
    const { noise } = await this.createFilteredNoise('highpass', 8000);
    
    // Brief disk access sound
    noise.start();
    noise.stop(Tone.now() + 0.05);
    
    setTimeout(() => noise.dispose(), 200);
  }

  async playDialUpConnect() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'sawtooth'
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 0.5
      }
    });

    // Dial-up handshake approximation
    const tones = ['G3', 'B3', 'D4', 'F#4', 'A4', 'C5'];
    let time = Tone.now();
    
    tones.forEach((note, i) => {
      synth.triggerAttackRelease(note, '32n', time + i * 0.05);
    });
    
    setTimeout(() => synth.dispose(), 1000);
  }

  // === TYPING SIMULATION ===
  async playKeyPress() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.001,
        decay: 0.01,
        sustain: 0,
        release: 0.005
      }
    });

    // Random key press sounds
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4'];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    
    synth.triggerAttackRelease(randomNote, '128n');
    setTimeout(() => synth.dispose(), 50);
  }

  // === STARTUP SEQUENCE ===
  async playBootSequence() {
    // Play a series of initialization sounds
    await this.playDiskActivity();
    setTimeout(() => this.playNotification(), 200);
    setTimeout(() => this.playStartup(), 500);
  }
}

export const SoundManager: React.FC = () => {
  useEffect(() => {
    // Initialize sounds on first user interaction
    const handleFirstInteraction = () => {
      WindowsSounds.getInstance().init();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return null;
};

export const useSounds = () => {
  return WindowsSounds.getInstance();
};
