
import React from 'react';
import { WindowData } from './Desktop';

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
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-300 border-t-2 border-gray-400 flex items-center px-1 z-50">
      {/* Start Button */}
      <button
        className={`h-8 px-4 bg-gray-300 border-2 border-gray-400 flex items-center space-x-2 font-bold text-sm hover:bg-gray-200 ${
          isStartMenuOpen ? 'pressed' : ''
        }`}
        style={{ borderStyle: isStartMenuOpen ? 'inset' : 'outset' }}
        onClick={onStartClick}
      >
        <span className="text-lg">🪟</span>
        <span>Start</span>
      </button>

      {/* Window Buttons */}
      <div className="flex-1 flex space-x-1 px-2">
        {windows.map(window => (
          <button
            key={window.id}
            className={`h-7 px-3 bg-gray-300 border border-gray-400 text-sm truncate max-w-48 ${
              activeWindowId === window.id 
                ? 'bg-gray-400 border-gray-500' 
                : 'hover:bg-gray-200'
            }`}
            style={{ 
              borderStyle: activeWindowId === window.id ? 'inset' : 'outset'
            }}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2 px-2">
        <button className="w-6 h-6 bg-gray-300 border border-gray-400 flex items-center justify-center hover:bg-gray-200">
          🔊
        </button>
        <div className="bg-gray-200 border border-gray-400 px-2 py-1 text-sm" style={{ borderStyle: 'inset' }}>
          {currentTime}
        </div>
      </div>
    </div>
  );
};
