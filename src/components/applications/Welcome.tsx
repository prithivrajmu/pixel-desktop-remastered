import React from 'react';
import { useScreenSize } from '../../hooks/use-mobile';

interface WelcomeProps {
  onClose?: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onClose }) => {
  const screenSize = useScreenSize();
  
  const shouldShowLandscapeBanner = screenSize.isMobile && !screenSize.isLandscape;
  
  return (
    <div className="bg-gray-300 h-full p-0 overflow-auto" style={{ fontFamily: '"MS Sans Serif", sans-serif' }}>
      {/* Landscape Mode Suggestion Banner for Mobile Portrait Users */}
      {shouldShowLandscapeBanner && (
        <div className="bg-yellow-100 border-2 border-yellow-400 mx-2 mt-2 p-3 text-center" style={{ borderStyle: 'inset' }}>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-xl">📱➡️🖥️</span>
            <strong className="text-sm">Tip!</strong>
          </div>
          <p className="text-xs leading-relaxed">
            This website is optimized for <strong>landscape mode</strong>. 
            For the best Windows 95 experience, please rotate your device or use a desktop computer.
          </p>
        </div>
      )}
      
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
          
          {/* Windows 95 Style Computer illustration - Hide on small mobile portrait */}
          {!(screenSize.isMobile && !screenSize.isLandscape && screenSize.height < 600) && (
            <div className="flex justify-center mt-2">
              <div className="relative" style={{ 
                maxWidth: '100%',
                transform: screenSize.isMobile && screenSize.isLandscape ? 'scale(0.8)' : 'scale(1)',
                transformOrigin: 'center'
              }}>
                {/* CRT Monitor */}
                <div 
                  className={`bg-[#c0c0c0] border-2 border-gray-600 rounded-sm relative ${
                    screenSize.isMobile 
                      ? (screenSize.isLandscape ? 'w-24 h-16' : 'w-28 h-20') 
                      : 'w-36 h-28'
                  }`}
                  style={{ 
                    borderStyle: 'outset',
                    background: 'linear-gradient(135deg, #c0c0c0 0%, #808080 100%)'
                  }}
                >
                  {/* Screen bezel - outer */}
                  <div className="absolute inset-1 bg-gray-800 border border-gray-500" style={{ borderStyle: 'inset' }}>
                    {/* Screen bezel - inner */}
                    <div className="absolute inset-1 bg-black border border-gray-600" style={{ borderStyle: 'inset' }}>
                      {/* Actual screen content */}
                      <div className="absolute inset-2 bg-[#008080] flex flex-col items-center justify-center text-white text-xs">
                        <div className="text-white text-lg mb-1">🖥️</div>
                        <div className={`text-center leading-tight ${
                          screenSize.isMobile 
                            ? (screenSize.isLandscape ? 'text-[5px]' : 'text-[6px]') 
                            : 'text-[8px]'
                        }`}>
                          <div>Windows 95</div>
                          <div>Portfolio</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Power indicator LED */}
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-green-400 rounded-full"></div>
                  
                  {/* Brand label */}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-600 ${
                    screenSize.isMobile 
                      ? (screenSize.isLandscape ? 'text-[4px]' : 'text-[5px]') 
                      : 'text-[6px]'
                  }`}>
                    MONITOR
                  </div>
                </div>
                
                {/* Monitor stand/neck */}
                <div className={`bg-[#c0c0c0] mx-auto border border-gray-500 rounded-sm ${
                  screenSize.isMobile 
                    ? (screenSize.isLandscape ? 'w-1.5 h-2' : 'w-2 h-3') 
                    : 'w-3 h-4'
                }`} style={{ borderStyle: 'outset' }}></div>
                
                {/* Monitor base */}
                <div className={`bg-[#c0c0c0] mx-auto rounded-sm border border-gray-500 ${
                  screenSize.isMobile 
                    ? (screenSize.isLandscape ? 'w-12 h-1.5' : 'w-16 h-2') 
                    : 'w-24 h-3'
                }`} style={{ borderStyle: 'outset' }}>
                  <div className={`bg-gray-400 mx-auto mt-1 rounded-sm ${
                    screenSize.isMobile 
                      ? (screenSize.isLandscape ? 'w-8 h-0.5' : 'w-10 h-0.5') 
                      : 'w-16 h-1'
                  }`}></div>
                </div>
                
                {/* Keyboard */}
                <div className={`bg-[#c0c0c0] mx-auto mt-2 border border-gray-500 rounded-sm ${
                  screenSize.isMobile 
                    ? (screenSize.isLandscape ? 'w-16 h-3' : 'w-20 h-4') 
                    : 'w-32 h-6'
                }`} style={{ borderStyle: 'outset' }}>
                  {/* Keyboard keys representation */}
                  <div className="flex justify-center items-center h-full">
                    <div className={`grid gap-0.5 px-2 ${
                      screenSize.isMobile 
                        ? (screenSize.isLandscape ? 'grid-cols-4' : 'grid-cols-6') 
                        : 'grid-cols-8'
                    }`}>
                      {Array.from({ 
                        length: screenSize.isMobile 
                          ? (screenSize.isLandscape ? 12 : 18) 
                          : 24 
                      }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 h-1 bg-gray-400 border border-gray-500 rounded-[1px]" 
                          style={{ borderStyle: 'outset', fontSize: '1px' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mouse */}
                <div className={`absolute bottom-0 right-4 bg-[#c0c0c0] border border-gray-500 rounded-t-lg ${
                  screenSize.isMobile 
                    ? (screenSize.isLandscape ? 'w-2 h-3' : 'w-3 h-4') 
                    : 'w-4 h-6'
                }`} style={{ borderStyle: 'outset' }}>
                  <div className={`bg-gray-400 mx-auto mt-1 border border-gray-500 rounded-sm ${
                    screenSize.isMobile 
                      ? (screenSize.isLandscape ? 'w-1 h-1.5' : 'w-1.5 h-2') 
                      : 'w-2 h-3'
                  }`} style={{ borderStyle: 'inset' }}></div>
                </div>
              </div>
            </div>
          )}
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