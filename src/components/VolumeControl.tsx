import React, { useState, useRef, useEffect } from 'react';
import { useSounds } from './SoundManager';
import { VolumeDialog } from './VolumeDialog';
import { useGlobalDialog } from '../hooks/useGlobalDialog';
import { useScreenSize } from '../hooks/use-mobile';

interface VolumeControlProps {
  className?: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ className }) => {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(50);
  const volumeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dialogPos, setDialogPos] = useState<{ left: number; top: number; bottom: number } | null>(null);
  const sounds = useSounds();
  const { activeDialog, openDialog, closeDialog } = useGlobalDialog();
  const screenSize = useScreenSize();

  useEffect(() => {
    sounds.setVolume(volume);
    sounds.setMuted(isMuted);
  }, []);

  const handleIconClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDialogPos({
        left: rect.left + rect.width / 2,
        top: rect.top,
        bottom: rect.bottom
      });
    }
    openDialog('volume');
  };

  const handleDialogClose = () => {
    closeDialog();
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    const shouldBeMuted = newVolume === 0;
    setIsMuted(shouldBeMuted);
    sounds.setVolume(newVolume);
    sounds.setMuted(shouldBeMuted);
    if (newVolume > 0) setLastVolume(newVolume);
  };

  const handleMuteChange = (muted: boolean) => {
    setIsMuted(muted);
    sounds.setMuted(muted);
    if (muted) {
      setLastVolume(volume);
      setVolume(0);
    } else {
      setVolume(lastVolume);
      sounds.setVolume(lastVolume);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        closeDialog();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDialog]);

  return (
    <div ref={volumeRef} className={`relative ${className}`} style={{ display: 'inline-block' }}>
      <button
        ref={buttonRef}
        className={`bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200 text-xs ${
          screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
        }`}
        style={{ 
          borderStyle: 'outset', 
          padding: 0,
          width: screenSize.isMobile ? '28px' : '24px',
          height: screenSize.isMobile ? '28px' : '22px',
          minWidth: screenSize.isMobile ? '28px' : 'auto',
          minHeight: screenSize.isMobile ? '28px' : 'auto',
          touchAction: 'manipulation'
        }}
        onClick={handleIconClick}
      >
        <img
          src={isMuted || volume === 0 ? '/icons/Mute volume.ico' : '/icons/Volume.ico'}
          alt={isMuted || volume === 0 ? 'Muted' : 'Volume'}
          width={screenSize.isMobile ? 20 : 16}
          height={screenSize.isMobile ? 20 : 16}
          style={{ imageRendering: 'pixelated' }}
        />
      </button>
      {activeDialog === 'volume' && dialogPos && (
        <VolumeDialog
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={handleVolumeChange}
          onMuteChange={handleMuteChange}
          onClose={handleDialogClose}
          position={dialogPos}
        />
      )}
    </div>
  );
};
