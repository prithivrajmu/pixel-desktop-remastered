import React, { useState } from 'react';
import { useSounds } from './SoundManager';
import { useScreenSize } from '../hooks/use-mobile';

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
  const screenSize = useScreenSize();

  // Debug: Log screen size information
  console.log('🔌 ShutdownDialog Debug - Screen Info:', {
    width: screenSize.width,
    height: screenSize.height,
    isMobile: screenSize.isMobile,
    isLandscape: screenSize.isLandscape,
    isTouchDevice: screenSize.isTouchDevice,
    isOpen: isOpen
  });

  // Calculate responsive styles
  const dialogStyles = {
    width: screenSize.isMobile ? 
      (screenSize.isLandscape ? '400px' : 'min(90vw, 350px)') : 
      '400px',
    maxHeight: screenSize.isMobile && !screenSize.isLandscape ? 
      'min(90vh, 500px)' : 
      '90vh',
    minHeight: screenSize.isMobile && !screenSize.isLandscape ? '300px' : 'auto'
  };

  // Debug: Log calculated dialog styles
  console.log('💻 ShutdownDialog Debug - Calculated Styles:', dialogStyles);

  // Debug: Log mobile-specific conditions
  if (screenSize.isMobile && isOpen) {
    console.log('📱 ShutdownDialog Debug - Mobile Portrait Mode:', {
      isPortrait: !screenSize.isLandscape,
      calculatedWidth: dialogStyles.width,
      calculatedMaxHeight: dialogStyles.maxHeight,
      calculatedMinHeight: dialogStyles.minHeight,
      shouldUseMobileLayout: screenSize.isMobile && !screenSize.isLandscape
    });
  }

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div 
        className="bg-[#c0c0c0] border-2 border-[#808080] shadow-lg"
        style={{ 
          borderStyle: 'outset',
          width: dialogStyles.width,
          maxWidth: '95vw',
          maxHeight: dialogStyles.maxHeight,
          overflowY: 'auto',
          fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',
          minHeight: dialogStyles.minHeight,
          position: 'relative',
          zIndex: 10000
        }}
      >
        {/* Title Bar */}
        <div className="bg-[#000080] h-6 px-2 flex items-center justify-between" style={{ minHeight: screenSize.isMobile ? 28 : 24 }}>
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
            className="w-5 h-4 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center hover:bg-[#e0e0e0] text-xs font-bold"
            style={{ borderStyle: 'outset', fontSize: '10px' }}
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
              <img 
                src="/icons/Turn Off Computer (display only).ico"
                alt="Turn Off Computer"
                className="w-12 h-12"
                style={{ imageRendering: 'pixelated' }}
              />
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
                       className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center rounded-full"
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
                       className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center rounded-full"
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
                       className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center rounded-full"
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
                       className="w-3 h-3 border border-[#808080] bg-white flex items-center justify-center rounded-full"
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
