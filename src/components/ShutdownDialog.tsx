import React, { useState } from 'react';
import { useSounds } from './SoundManager';

interface ShutdownDialogProps {
  isOpen: boolean;
  onConfirm: (action: 'shutdown' | 'restart' | 'msdos' | 'logoff') => void;
  onCancel: () => void;
}

export const ShutdownDialog: React.FC<ShutdownDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const [selectedAction, setSelectedAction] = useState<'shutdown' | 'restart' | 'msdos' | 'logoff'>('shutdown');
  const sounds = useSounds();

  if (!isOpen) return null;

  const handleRadioChange = (action: 'shutdown' | 'restart' | 'msdos' | 'logoff') => {
    sounds.playClick();
    setSelectedAction(action);
  };

  const handleConfirm = () => {
    sounds.playClick();
    onConfirm(selectedAction);
  };

  const handleCancel = () => {
    sounds.playClick();
    onCancel();
  };

  const handleHelp = () => {
    sounds.playWarning();
    // In real Windows 95, this would open help
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div 
        className="bg-[#c0c0c0] border-2 border-[#808080] shadow-lg"
        style={{ 
          borderStyle: 'outset',
          width: '400px',
          fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif'
        }}
      >
        {/* Title Bar */}
        <div className="bg-[#000080] h-6 px-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <img 
              src="/icons/Turn Off Computer (display only).ico" 
              alt="Shutdown" 
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-white text-xs font-bold">Shut Down Windows</span>
          </div>
          <button
            className="w-4 h-3 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center hover:bg-[#e0e0e0] text-xs font-bold"
            style={{ borderStyle: 'outset', fontSize: '8px' }}
            onClick={handleCancel}
          >
            ×
          </button>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <div className="flex items-start space-x-4 mb-6">
            {/* Shutdown Icon */}
            <div className="flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ imageRendering: 'pixelated' }}>
                {/* Computer Tower */}
                <rect x="2" y="16" width="14" height="24" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
                <rect x="4" y="18" width="10" height="2" fill="#000080"/>
                <rect x="4" y="22" width="10" height="1" fill="#404040"/>
                <rect x="4" y="25" width="10" height="1" fill="#404040"/>
                <rect x="6" y="28" width="6" height="4" fill="#404040" stroke="#808080" strokeWidth="0.5"/>
                <circle cx="12" cy="35" r="2" fill="#00ff00"/>
                
                {/* CRT Monitor */}
                <rect x="20" y="8" width="24" height="20" fill="#e0e0e0" stroke="#808080" strokeWidth="1"/>
                <rect x="22" y="10" width="20" height="14" fill="#000080"/>
                <rect x="24" y="12" width="16" height="10" fill="#0000ff"/>
                
                {/* Monitor text simulation */}
                <rect x="26" y="14" width="2" height="1" fill="#ffffff"/>
                <rect x="29" y="14" width="4" height="1" fill="#ffffff"/>
                <rect x="26" y="16" width="6" height="1" fill="#ffffff"/>
                <rect x="34" y="16" width="2" height="1" fill="#ffffff"/>
                <rect x="26" y="18" width="8" height="1" fill="#ffffff"/>
                
                {/* Monitor Stand */}
                <rect x="30" y="28" width="8" height="4" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
                <rect x="28" y="32" width="12" height="2" fill="#c0c0c0" stroke="#808080" strokeWidth="1"/>
              </svg>
            </div>

            {/* Right Content */}
            <div className="flex-1">
              <div className="text-sm mb-4">Are you sure you want to:</div>
              
              {/* Radio Button Options */}
              <div className="space-y-2">
                {/* Shutdown option with focus rectangle */}
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center"
                      style={{ borderStyle: 'inset' }}
                    >
                      {selectedAction === 'shutdown' && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span 
                    className={selectedAction === 'shutdown' ? 'relative' : ''}
                    onClick={() => handleRadioChange('shutdown')}
                  >
                    Shut down the computer?
                    {selectedAction === 'shutdown' && (
                      <div 
                        className="absolute inset-0 border border-black"
                        style={{ 
                          borderStyle: 'dotted',
                          borderWidth: '1px',
                          margin: '-1px'
                        }}
                      ></div>
                    )}
                  </span>
                </label>

                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center"
                      style={{ borderStyle: 'inset' }}
                    >
                      {selectedAction === 'restart' && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span onClick={() => handleRadioChange('restart')}>
                    Restart the computer?
                  </span>
                </label>

                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center"
                      style={{ borderStyle: 'inset' }}
                    >
                      {selectedAction === 'msdos' && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span onClick={() => handleRadioChange('msdos')}>
                    Restart the computer in MS-DOS mode?
                  </span>
                </label>

                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <div className="relative">
                    <div 
                      className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center"
                      style={{ borderStyle: 'inset' }}
                    >
                      {selectedAction === 'logoff' && (
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span onClick={() => handleRadioChange('logoff')}>
                    Close all programs and log on as a different user?
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            {/* Yes Button - Default with darker border */}
            <button
              className="px-4 py-1 bg-[#c0c0c0] border-2 text-sm hover:bg-[#e0e0e0]"
              style={{ 
                borderStyle: 'outset',
                borderColor: '#000000 #000000 #000000 #000000',
                borderWidth: '2px'
              }}
              onClick={handleConfirm}
            >
              <u>Y</u>es
            </button>
            
            {/* No Button */}
            <button
              className="px-4 py-1 bg-[#c0c0c0] border-2 border-[#808080] text-sm hover:bg-[#e0e0e0]"
              style={{ borderStyle: 'outset' }}
              onClick={handleCancel}
            >
              <u>N</u>o
            </button>
            
            {/* Help Button */}
            <button
              className="px-4 py-1 bg-[#c0c0c0] border-2 border-[#808080] text-sm hover:bg-[#e0e0e0]"
              style={{ borderStyle: 'outset' }}
              onClick={handleHelp}
            >
              <u>H</u>elp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
