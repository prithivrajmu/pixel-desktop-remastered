import React from 'react';

interface WelcomeProps {
  onClose?: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onClose }) => {
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
          
          {/* Computer illustration */}
          <div className="flex justify-center">
            <div className="relative">
              <div 
                className="w-32 h-24 bg-teal-500 border-2 border-gray-600 rounded-sm relative"
                style={{ 
                  background: 'linear-gradient(135deg, #008080 0%, #20b2aa 100%)',
                  borderStyle: 'outset'
                }}
              >
                {/* Screen content with arrow */}
                <div className="absolute inset-2 bg-teal-600 flex items-center justify-center">
                  <div className="text-white text-2xl transform rotate-45">↗</div>
                </div>
                
                {/* Screen bezel */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-600 rounded-b"></div>
              </div>
              
              {/* Monitor base */}
              <div className="w-20 h-3 bg-gray-400 mx-auto mt-1 rounded-sm border border-gray-500"></div>
              <div className="w-16 h-2 bg-gray-500 mx-auto rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Right section with buttons */}
        <div className="w-32 p-4 flex flex-col space-y-2">
          <button 
            className="w-full py-2 px-3 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
          >
            Windows Tour
          </button>
          <button 
            className="w-full py-2 px-3 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
          >
            What's New
          </button>
          <button 
            className="w-full py-2 px-3 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
          >
            Online Registration
          </button>
          <div className="flex-1"></div>
          <button 
            className="w-full py-2 px-3 bg-gray-300 border-2 border-gray-400 text-xs hover:bg-gray-200"
            style={{ borderStyle: 'outset' }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};