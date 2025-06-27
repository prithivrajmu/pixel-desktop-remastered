import React from 'react';

interface Project {
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'current' | 'completed';
}

export const MyDocuments: React.FC = () => {
  const projects: Project[] = [
    {
      name: 'A M Foods - Director',
      icon: '🍲',
      description: 'Driving modernization and operational efficiency for a legacy restaurant brand (est. 1973). Architected custom inventory & payroll software.',
      tech: ['Business Leadership', 'Software Dev', 'Digital Transformation', 'Data-Driven Inventory'],
      status: 'current'
    },
    {
      name: 'Nalam Properties - Founder',
      icon: '🏠',
      description: 'Launched a real estate venture (nalamproperties.com). Built a proprietary website and lead management system from the ground up.',
      tech: ['Entrepreneurship', 'Full-Stack Dev', 'SEO', 'Agent-Based Simulation'],
      status: 'current'
    },
    {
      name: 'Zipline - Sr. Data Analyst',
      icon: '✈️',
      description: 'Managed software/data teams to build operational tools. Reduced aircraft manufacturing costs by 15% and improved efficiency by 25%.',
      tech: ['ETL', 'Docker', 'Sisense', 'Tableau', 'Hypothesis Testing', 'Process Improvement'],
      status: 'completed'
    },
    {
      name: 'Volansi - Lead Data Eng.',
      icon: '🚁',
      description: 'Led data team for drone manufacturing & delivery. Developed hub-and-spoke network models to optimize fleet operations.',
      tech: ['Python', 'Scipy', 'OpenCV', 'SQL', 'Team Leadership', 'Agile'],
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-700';
      case 'completed': return 'text-blue-700';
      default: return 'text-black';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1">
        <div className="flex text-xs">
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">File</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Edit</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">View</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Tools</div>
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
            title="Details"
          >
            ⋮
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <img src="/icons/Documents Folder.ico" alt="My Documents" className="w-4 h-4 mr-1" />
            <span>My Documents</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">My Experience</h2>
          <div className="text-xs text-gray-600">
            Double-click an item to view details
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-300 border-2 border-gray-400 p-3 cursor-pointer hover:bg-gray-250 transition-colors"
              style={{ borderStyle: 'outset' }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderStyle = 'inset';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderStyle = 'outset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderStyle = 'outset';
              }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{project.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{project.name}</h3>
                  <div className={`text-xs font-bold ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </div>
                </div>
              </div>
              <p className="text-xs mb-2 leading-relaxed">{project.description}</p>
              <div className="text-xs">
                <strong>Skills:</strong> {project.tech.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2">Quick Access</h3>
          <div className="flex space-x-4 text-xs">
            <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
              📄 Resume.pdf
            </button>
            <button className="bg-gray-300 border border-gray-400 px-3 py-1 hover:bg-gray-200" style={{ borderStyle: 'outset' }}>
              <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">🔗 LinkedIn</a>
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            {projects.length} project(s)
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            {projects.filter(p => p.status === 'current').length} active, {projects.filter(p => p.status === 'completed').length} completed
          </div>
        </div>
      </div>
    </div>
  );
};