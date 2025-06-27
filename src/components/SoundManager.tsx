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

    // Windows 95 startup sound approximation
    const melody = [
      { note: 'C4', duration: '8n' },
      { note: 'E4', duration: '8n' },
      { note: 'G4', duration: '8n' },
      { note: 'C5', duration: '4n' }
    ];

    let time = Tone.now();
    melody.forEach(({ note, duration }) => {
      synth.triggerAttackRelease(note, duration, time);
      time += Tone.Time(duration).toSeconds();
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
      { note: 'C5', duration: '4n' },
      { note: 'G4', duration: '4n' },
      { note: 'E4', duration: '4n' },
      { note: 'C4', duration: '2n' }
    ];

    let time = Tone.now();
    melody.forEach(({ note, duration }) => {
      synth.triggerAttackRelease(note, duration, time);
      time += Tone.Time(duration).toSeconds();
    });

    setTimeout(() => synth.dispose(), 4000);
  }

  async playClick() {
    const synth = await this.createSynth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.01,
        decay: 0.05,
        sustain: 0,
        release: 0.05
      }
    });

    synth.triggerAttackRelease('C5', '32n');
    setTimeout(() => synth.dispose(), 200);
  }

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

    synth.triggerAttackRelease('F3', '8n');
    setTimeout(() => synth.dispose(), 500);
  }
}

export const SoundManager: React.FC = () => {
  useEffect(() => {
    // Initialize sounds on first user interaction
    const handleFirstInteraction = () => {
      WindowsSounds.getInstance().init();
      document.removeEventListener('click', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return null;
};

export const useSounds = () => {
  return WindowsSounds.getInstance();
};
