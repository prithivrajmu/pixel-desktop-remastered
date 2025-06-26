
import React from 'react';
import { WindowData } from './Desktop';
import { VolumeControl } from './VolumeControl';
import { Clock } from './Clock';

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
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-gray-300 border-t-2 border-gray-400 flex items-center z-50"
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
          fontSize: '11px'
        }}
        onClick={onStartClick}
      >
        <div 
          className="w-4 h-4 flex items-center justify-center text-white text-xs font-bold"
          style={{
            background: 'linear-gradient(45deg, #ff0000 0%, #ffff00 25%, #00ff00 50%, #00ffff 75%, #0000ff 100%)',
            borderRadius: '1px'
          }}
        >
          ⊞
        </div>
        <span>Start</span>
      </button>

      {/* Separator */}
      <div 
        className="w-px h-5 bg-gray-500 mx-1"
        style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff' }}
      />

      {/* Window Buttons */}
      <div className="flex-1 flex space-x-px px-1 overflow-hidden min-w-0">
        {windows.filter(w => !w.isMinimized).map(window => (
          <button
            key={window.id}
            className={`h-5 px-2 bg-gray-300 border border-gray-400 text-xs truncate flex-shrink-0 transition-all duration-150 ${
              activeWindowId === window.id 
                ? 'bg-gray-400 border-gray-500 shadow-inner' 
                : 'hover:bg-gray-200 shadow-sm'
            }`}
            style={{ 
              borderStyle: activeWindowId === window.id ? 'inset' : 'outset',
              fontWeight: activeWindowId === window.id ? 'bold' : 'normal',
              maxWidth: '150px',
              minWidth: '80px',
              fontSize: '10px'
            }}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div 
        className="flex items-center space-x-1 px-1 border border-gray-400 bg-gray-300 flex-shrink-0"
        style={{ 
          borderStyle: 'inset',
          height: '22px',
          marginRight: '2px'
        }}
      >
        <VolumeControl />
        <Clock />
      </div>
    </div>
  );
};
