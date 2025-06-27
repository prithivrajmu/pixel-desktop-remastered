import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1">
        <div className="flex text-xs">
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">File</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Edit</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">View</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Help</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1">
        <div className="flex items-center gap-1 mb-1">
          {/* Navigation Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Back"
          >
            ←
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Forward"
          >
            →
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Up"
          >
            ↑
          </button>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* Action Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Cut"
          >
            ✂
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Copy"
          >
            📋
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Paste"
          >
            📄
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <img src="/icons/Contact Card.ico" alt="Contact" className="w-4 h-4 mr-1" />
            <span>Contact Information</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-lg font-bold mb-6">Contact Information</h2>
          <div className="w-full max-w-xs space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/icons/Contact Card.ico" alt="Email" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
              <a href="mailto:prithivrajmu@gmail.com" className="text-blue-700 underline hover:text-blue-900">prithivrajmu@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/icons/Desktop.ico" alt="GitHub" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
              <a href="https://github.com/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">GitHub</a>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/icons/People.ico" alt="LinkedIn" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
              <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            3 contact methods available
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            Ready
          </div>
        </div>
      </div>
    </div>
  );
}; 