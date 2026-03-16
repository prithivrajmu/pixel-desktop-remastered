import React, { useState } from 'react';
import { useScreenSize } from '../../hooks/use-mobile';

export const MyComputer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Win98');
  const screenSize = useScreenSize();

  const driveIcons = [
    { 
      id: 'floppy', 
      name: '3½ Floppy (A:)', 
      icon: '💾',
      type: 'floppy' 
    },
    { 
      id: 'Win98', 
      name: 'Win98 (C:)', 
      icon: '💻',
      type: 'harddisk',
      selected: true
    },
    { 
      id: 'Storage', 
      name: 'Storage (D:)', 
      icon: '💻',
      type: 'harddisk' 
    },
    { 
      id: 'Wintest', 
      name: 'Wintest (E:)', 
      icon: '💻',
      type: 'harddisk' 
    },
    { 
      id: 'MP3', 
      name: 'MP3 (F:)', 
      icon: '🎵',
      type: 'mp3' 
    },
    { 
      id: 'CDROM1', 
      name: 'CD-ROM (G:)', 
      icon: '💿',
      type: 'cdrom' 
    },
    { 
      id: 'CDROM2', 
      name: 'CD-ROM (H:)', 
      icon: '💿',
      type: 'cdrom' 
    },
  ];

  const systemFolders = [
    { 
      id: 'control', 
      name: 'Control Panel', 
      icon: '⚙️',
      type: 'folder' 
    },
    { 
      id: 'printers', 
      name: 'Printers', 
      icon: '🖨️',
      type: 'folder' 
    },
    { 
      id: 'dialup', 
      name: 'Dial-Up Networking', 
      icon: '📞',
      type: 'folder' 
    },
  ];

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const handleItemDoubleClick = (itemId: string) => {
    // console.log(`Opening ${itemId}`);
  };

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
        <div className="flex items-center gap-1 mb-1 overflow-x-auto">
          {/* Navigation Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Back"
          >
            ←
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Forward"
          >
            →
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Up"
          >
            ↑
          </button>
          
          <div className={`bg-[#808080] mx-1 ${
            screenSize.isMobile ? 'w-px h-8' : 'w-px h-6'
          }`}></div>
          
          {/* Action Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Cut"
          >
            ✂
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Copy"
          >
            📋
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Paste"
          >
            📄
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '12px' : '10px'
            }}
            title="Undo"
          >
            ↶
          </button>
          
          <div className={`bg-[#808080] mx-1 ${
            screenSize.isMobile ? 'w-px h-8' : 'w-px h-6'
          }`}></div>
          
          {/* View Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Large Icons"
          >
            ⊞
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Small Icons"
          >
            ⊟
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="List"
          >
            ≡
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Details"
          >
            ⋮
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className={screenSize.isMobile ? 'text-xs' : 'text-xs'}>Address:</span>
          <div className={`flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 ${
            screenSize.isMobile ? 'text-xs' : 'text-xs'
          }`} style={{ borderStyle: 'inset' }}>
            <img 
              src="/icons/My Computer.ico" 
              alt="My Computer" 
              className={screenSize.isMobile ? 'w-4 h-4 mr-1' : 'w-4 h-4 mr-1'} 
            />
            <span>My Computer</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-32 h-40 bg-white border-2 border-gray-400 flex items-center justify-center overflow-hidden p-1" style={{ borderStyle: 'inset' }}>
            <img 
              src="/icons/profile_prithiv.png"
              alt="Prithiv Raj M U"
              className="w-full h-full object-contain rounded-sm"
              style={{ 
                imageRendering: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              onError={(e) => {
                // Fallback to a default icon if image fails to load
                e.currentTarget.src = "/icons/People.ico";
                e.currentTarget.style.imageRendering = 'pixelated';
              }}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">System Profile</h2>
            <div className="space-y-1 text-xs">
              <p><strong>Name:</strong> Prithiv Raj M U</p>
              <p><strong>Profession:</strong> Senior Data Engineer turned Data Architect</p>
              <p><strong>Experience:</strong> 9+ Years</p>
              <p><strong>Location:</strong> Chennai, India | San Francisco, USA</p>
              <p><strong>Current Direction:</strong> Full-stack systems with practical AI features</p>
            </div>
          </div>
        </div>
        

        
        <div className="border-2 border-gray-400 p-3 mb-4" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">Core Capabilities</h3>
          <div className="grid grid-cols-2 gap-2 text-xs ">
            <div>
              <p><strong>Data:</strong></p>
              <p>• Python, SQL, dbt</p>
              <p>• Snowflake, BigQuery, PostgreSQL</p>
              <p>• Warehousing, ELT, data modeling</p>
            </div>
            <div>
              <p><strong>Applications:</strong></p>
              <p>• JavaScript/TypeScript</p>
              <p>• React, Next.js, Supabase</p>
              <p>• Product-minded internal tools</p>
            </div>
            <div>
              <p><strong>Architecture:</strong></p>
              <p>• Analytics systems to operational software</p>
              <p>• Access control, reporting, workflow design</p>
              <p>• Cross-functional delivery</p>
            </div>
            <div>
              <p><strong>Current Learning:</strong></p>
              <p>• RAG and LLM-backed application patterns</p>
              <p>• AI inference tradeoffs in production</p>
              <p>• Runtime cost and latency constraints</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">About</h3>
          <p className="text-xs leading-relaxed">
            I started in analytics, simulation, and operations research, then moved into data engineering and warehouse design, and now spend most of my time at the architecture layer where data systems and software products have to work together.
            <br />
            <br />
            I have led data teams, built internal tools for operating businesses, and shipped full-stack products when the right answer was not another dashboard but a better system.
            <br />
            <br />
            Right now I am applying that background to practical AI products and learning inference patterns the same way I learned data architecture: by building.
          </p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            1 object(s) selected
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            Free Space: 6.04GB, Capacity: 6.99GB
          </div>
        </div>
      </div>
    </div>
  );
};
