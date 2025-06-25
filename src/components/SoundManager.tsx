
import { useEffect } from 'react';
import * as Tone from 'tone';

class WindowsSounds {
  private static instance: WindowsSounds;
  private isInitialized = false;

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

  async playStartup() {
    await this.init();
    
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();

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
    await this.init();
    
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.2,
        release: 1.5
      }
    }).toDestination();

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
    await this.init();
    
    const synth = new Tone.Synth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.01,
        decay: 0.05,
        sustain: 0,
        release: 0.05
      }
    }).toDestination();

    synth.triggerAttackRelease('C5', '32n');
    setTimeout(() => synth.dispose(), 200);
  }

  async playError() {
    await this.init();
    
    const synth = new Tone.Synth({
      oscillator: {
        type: 'sawtooth'
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0,
        release: 0.1
      }
    }).toDestination();

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
