import React from 'react';
import { useScreenSize } from '../../hooks/use-mobile';

interface WelcomeProps {
  onClose?: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onClose }) => {
  const screenSize = useScreenSize();
  
  return (
    <div className="bg-gray-300 h-full p-0 overflow-auto" style={{ fontFamily: '"MS Sans Serif", sans-serif' }}>
      {/* Welcome Content */}
      <div className={`flex h-full ${screenSize.isMobile && !screenSize.isLandscape ? 'flex-col' : 'flex-row'}`}>
        {/* Left section with "Did you know..." */}
        <div className={`bg-yellow-50 border-r-2 border-gray-400 p-4 ${
          screenSize.isMobile && !screenSize.isLandscape 
            ? 'w-full border-r-0 border-b-2' 
            : 'flex-1'
        }`} style={{ borderStyle: 'inset' }}>
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
              ?
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm mb-2">Welcome!</h3>
              <p className="text-xs leading-relaxed mb-4">
                This is a Windows 95-inspired portfolio website build by Prithiv Raj M U.
              </p>            
              <h4 className="font-bold text-sm mb-2">Did you know...</h4>
              <p className="text-xs leading-relaxed mb-4">
                You can leverage data analytics and simulation to modernize a 50-year-old business, driving efficiency and reducing waste. That's the power of combining tech with tradition!
              </p>
            </div>
          </div>
          
          {/* 3D Computer Icon */}
          <div className="flex justify-center mt-1 px-2 mb-2">
            <div className="relative max-w-full flex justify-center" style={{ 
              maxWidth: '100%',
              maxHeight: '60px',
              transform: screenSize.isMobile && screenSize.isLandscape ? 'scale(0.7)' : 'scale(0.9)',
              transformOrigin: 'center center'
            }}>
              <img 
                src="/icons/3D computer.ico"
                alt="3D Computer"
                className={`max-w-full max-h-full object-contain ${
                  screenSize.isMobile 
                    ? (screenSize.isLandscape ? 'w-10 h-10' : 'w-12 h-12') 
                    : 'w-16 h-16'
                }`}
                style={{ 
                  imageRendering: 'pixelated',
                  filter: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Right section with buttons */}
        <div className={`p-4 flex flex-col space-y-2 ${
          screenSize.isMobile && !screenSize.isLandscape 
            ? 'w-full' 
            : 'w-36'
        }`}>
          <button 
            className={`w-full py-2 px-2 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              minHeight: screenSize.isMobile ? '44px' : 'auto',
              touchAction: 'manipulation'
            }}
          >
            Windows Tour
          </button>
          <button 
            className={`w-full py-2 px-2 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              minHeight: screenSize.isMobile ? '44px' : 'auto',
              touchAction: 'manipulation'
            }}
          >
            What's New
          </button>
          <button 
            className={`w-full py-2 px-2 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              minHeight: screenSize.isMobile ? '44px' : 'auto',
              touchAction: 'manipulation'
            }}
            title="Online Registration"
          >
            Online Registration
          </button>
          <div className="flex-1"></div>
          <button 
            className={`w-full py-2 px-2 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              minHeight: screenSize.isMobile ? '44px' : 'auto',
              touchAction: 'manipulation'
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};