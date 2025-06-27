import React, { useState } from 'react';

export const MyComputer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Win98');

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
    console.log(`Opening ${itemId}`);
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
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Undo"
          >
            ↶
          </button>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* View Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Large Icons"
          >
            ⊞
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Small Icons"
          >
            ⊟
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="List"
          >
            ≡
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Details"
          >
            ⋮
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <img src="/icons/My Computer.ico" alt="My Computer" className="w-4 h-4 mr-1" />
            <span>My Computer</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-32 h-40 bg-gray-300 border-2 border-gray-400 flex items-center justify-center text-6xl" style={{ borderStyle: 'inset' }}>
            👨‍💻
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">System Properties</h2>
            <div className="space-y-1 text-xs">
              <p><strong>Name:</strong> Prithiv Raj M U</p>
              <p><strong>Profession:</strong> Founder & Tech Leader | Data & Operations Expert</p>
              <p><strong>Experience:</strong> 9+ Years</p>
              <p><strong>Location:</strong> Chennai, India</p>
            </div>
          </div>
        </div>
        
        <div className="border-2 border-gray-400 p-3 mb-4" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">Skills & Technologies</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p><strong>Languages & Databases:</strong></p>
              <p>• Python</p>
              <p>• SQL</p>
              <p>• C++/C</p>
              <p>• R</p>
              <p>• JavaScript / TypeScript</p>
              <p>• Snowflake</p>
              <p>• BigQuery</p>
              <p>• Postgres</p>
            </div>
            <div>
              <p><strong>Frameworks & Tools:</strong></p>
              <p>• React</p>
              <p>• Looker</p>
              <p>• dbt</p>
              <p>• Databricks</p>
              <p>• Sisense</p>
              <p>• Spark</p>
              <p>• Flask</p>
              <p>• Docker</p>
              <p>• AWS, GCP</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">About</h3>
          <p className="text-xs leading-relaxed">
            A results-driven leader with over 9 years of experience spanning high-growth startups and successful entrepreneurial ventures. Proven ability to build and lead high-performing teams, architect complex data solutions from the ground up, and drive business modernization. Combines deep expertise in data science, analytics, and agent-based simulation with a founder's mindset for product development, operational efficiency, and P&L responsibility.
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