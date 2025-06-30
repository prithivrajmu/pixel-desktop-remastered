import React from 'react';
import { useScreenSize } from '../../hooks/use-mobile';

interface WelcomeProps {
  onClose?: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onClose }) => {
  const screenSize = useScreenSize();
  
  return (
    <div className="bg-gray-300 h-full p-0 overflow-hidden" style={{ fontFamily: '"MS Sans Serif", sans-serif' }}>
      {/* Welcome Content */}
      <div className="flex h-full">
        {/* Left section with "Did you know..." */}
        <div className="flex-1 p-4 bg-yellow-50 border-r-2 border-gray-400" style={{ borderStyle: 'inset' }}>
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
              ?
            </div>
            <div>
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
          
          {/* Windows 95 Style Computer illustration */}
          <div className="flex justify-center">
            <div className="relative">
              {/* CRT Monitor */}
              <div 
                className="w-36 h-28 bg-[#c0c0c0] border-2 border-gray-600 rounded-sm relative"
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
                      <div className="text-[8px] text-center leading-tight">
                        <div>Windows 95</div>
                        <div>Portfolio</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Power indicator LED */}
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-green-400 rounded-full"></div>
                
                {/* Brand label */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[6px] text-gray-600">
                  MONITOR
                </div>
              </div>
              
              {/* Monitor stand/neck */}
              <div className="w-3 h-4 bg-[#c0c0c0] mx-auto border border-gray-500 rounded-sm" style={{ borderStyle: 'outset' }}></div>
              
              {/* Monitor base */}
              <div className="w-24 h-3 bg-[#c0c0c0] mx-auto rounded-sm border border-gray-500" style={{ borderStyle: 'outset' }}>
                <div className="w-16 h-1 bg-gray-400 mx-auto mt-1 rounded-sm"></div>
              </div>
              
              {/* Keyboard */}
              <div className="w-32 h-6 bg-[#c0c0c0] mx-auto mt-2 border border-gray-500 rounded-sm" style={{ borderStyle: 'outset' }}>
                {/* Keyboard keys representation */}
                <div className="flex justify-center items-center h-full">
                  <div className="grid grid-cols-8 gap-0.5 px-2">
                    {Array.from({ length: 24 }).map((_, i) => (
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
              <div className="absolute bottom-0 right-4 w-4 h-6 bg-[#c0c0c0] border border-gray-500 rounded-t-lg" style={{ borderStyle: 'outset' }}>
                <div className="w-2 h-3 bg-gray-400 mx-auto mt-1 border border-gray-500 rounded-sm" style={{ borderStyle: 'inset' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section with buttons */}
        <div className="w-36 p-4 flex flex-col space-y-2">
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