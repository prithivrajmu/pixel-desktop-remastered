import React from 'react';
import { WindowData } from './Desktop';
import { VolumeControl } from './VolumeControl';
import { Clock } from './Clock';
import { useSounds } from './SoundManager';

interface TaskbarProps {
  windows: WindowData[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  isStartMenuOpen,
}) => {
  const sounds = useSounds();
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-gray-300 border-t-2 border-gray-400 flex items-center z-50"
      data-taskbar
      style={{ 
        height: '28px',
        borderStyle: 'outset',
        fontFamily: '"MS Sans Serif", sans-serif'
      }}
    >
      {/* Start Button */}
      <button
        className={`h-6 px-2 mx-1 bg-gray-300 border border-gray-400 flex items-center space-x-1 font-bold text-xs hover:bg-gray-200 flex-shrink-0 ${
          isStartMenuOpen ? 'pressed' : ''
        }`}
        style={{ 
          borderStyle: isStartMenuOpen ? 'inset' : 'outset',
          fontSize: '11px',
          height: '24px',
          minWidth: '60px',
        }}
        onClick={onStartClick}
      >
        <img
          src="/icons/Windows logo (without text).ico"
          alt="Start"
          width={18}
          height={18}
          style={{ imageRendering: 'pixelated', marginRight: 4 }}
        />
        <span>Start</span>
      </button>

      {/* Separator */}
      <div 
        className="w-px h-5 bg-gray-500 mx-1"
        style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff' }}
      />

      {/* Window Buttons - Show ALL windows including minimized */}
      <div className="flex-1 flex space-x-px px-1 overflow-hidden min-w-0">
        {windows.map(window => (
          <button
            key={window.id}
            className={`h-5 px-2 bg-gray-300 border border-gray-400 text-xs truncate flex-shrink-0 transition-all duration-150 flex items-center space-x-1 ${
              activeWindowId === window.id && !window.isMinimized
                ? 'bg-gray-400 border-gray-500 shadow-inner' 
                : 'hover:bg-gray-200 shadow-sm'
            }`}
            style={{ 
              borderStyle: (activeWindowId === window.id && !window.isMinimized) ? 'inset' : 'outset',
              fontWeight: (activeWindowId === window.id && !window.isMinimized) ? 'bold' : 'normal',
              maxWidth: '150px',
              minWidth: '80px',
              fontSize: '10px',
              opacity: window.isMinimized ? 0.7 : 1
            }}
            onClick={() => {
              sounds.playClick();
              onWindowClick(window.id);
            }}
            title={window.title}
          >
            {window.icon && (
              <img src={window.icon} alt="icon" width={16} height={16} style={{ marginRight: 4, imageRendering: 'pixelated' }} />
            )}
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div 
        className="flex items-center space-x-1 bg-gray-300"
        style={{ 
          borderStyle: 'inset',
          height: '24px',
          minHeight: '24px',
          maxHeight: '24px',
          marginRight: '2px',
          alignItems: 'center',
        }}
      >
        <VolumeControl />
        <Clock />
      </div>
    </div>
  );
};
