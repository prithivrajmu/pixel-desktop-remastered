import React from 'react';

interface RetiredProject {
  name:string;
  icon: string;
  reason: string;
  dateArchived: string;
  description: string;
}

export const RecycleBin: React.FC = () => {
  const retiredProjects: RetiredProject[] = [
    {
      name: 'Mashey - Sr. Analytics Consultant',
      icon: '💻',
      reason: 'Contract role completed',
      dateArchived: 'June 2021 - Sept 2021',
      description: 'Developed e-commerce data stack. Migrated data pipelines from ETL to ELT (dbt) and from BigQuery to Snowflake, saving $345k annually.'
    },
    {
      name: 'NEXTOR II - Data Scientist',
      icon: '🛰️',
      reason: 'Project concluded',
      dateArchived: 'Aug 2016 - Jan 2019',
      description: 'Developed complex simulation models of US airspace and airport systems for a FAA and NASA consortium.'
    },
  ];

  const funFacts = [
    "Every career is built on the foundation of past experiences.",
    "Some of the best learning comes from projects with a defined end.",
    "Legacy roles aren't just history, they are chapters in a career story.",
  ];

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
            title="Restore"
          >
            ↶
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Delete"
          >
            ✖
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Empty Recycle Bin"
          >
            🗑
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <img src="/icons/Recycle Bin with folder and document.ico" alt="Recycle Bin" className="w-4 h-4 mr-1" />
            <span>Recycle Bin</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">🗑️</span>
          <h2 className="text-lg font-bold">Recycle Bin - Archived Roles</h2>
        </div>

        <div className="mb-4 text-xs text-gray-600">
          Past roles and projects that have been successfully concluded.
        </div>

        <div className="space-y-3 mb-6">
          {retiredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-300 border-2 border-gray-400 p-3"
              style={{ borderStyle: 'inset' }}
            >
              <div className="flex items-start space-x-3">
                <span className="text-xl opacity-50">{project.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-sm">{project.name}</h3>
                    <span className="text-xs text-gray-600">({project.reason})</span>
                  </div>
                  <p className="text-xs mb-2 leading-relaxed">{project.description}</p>
                  <div className="text-xs text-gray-600">
                    Concluded: {project.dateArchived}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
          <h3 className="font-bold mb-2 text-sm">💭 Career Reflections</h3>
          <div className="space-y-2">
            {funFacts.map((fact, index) => (
              <div key={index} className="text-xs italic">
                "• {fact}"
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            {retiredProjects.length} item(s) in Recycle Bin
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            Total archived experience: 4.5 years
          </div>
        </div>
      </div>
    </div>
  );
};