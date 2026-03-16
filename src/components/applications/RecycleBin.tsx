import React, { useState } from 'react';
import { useSounds } from '../SoundManager';

interface RetiredProject {
  name: string;
  icon: string;
  reason: string;
  dateArchived: string;
  description: string;
  details?: {
    duration: string;
    achievements: string[];
    responsibilities: string[];
    skills: string[];
  };
}

export const RecycleBin: React.FC = () => {
  const sounds = useSounds();
  const [selectedProject, setSelectedProject] = useState<RetiredProject | null>(null);
  
  const retiredProjects: RetiredProject[] = [
    {
      name: 'Mashey - Sr. Analytics Consultant',
      icon: '💻',
      reason: 'Contract role completed',
      dateArchived: 'June 2021 - Sept 2021',
      description: 'Warehouse modernization work for an e-commerce client, moving pipelines from ETL to ELT and the platform from BigQuery to Snowflake.',
      details: {
        duration: 'June 2021 - September 2021',
        achievements: [
          'Led the BigQuery to Snowflake migration and introduced dbt-based transformation workflows.',
          'Defined cleaner warehouse structure and transformation ownership.',
          'Supported commercial analysis tied to product and shipping economics.',
          'Delivered the program in a short consulting engagement.'
        ],
        responsibilities: [
          'Warehouse architecture and migration planning',
          'ETL to ELT transition design',
          'Platform evaluation and cost analysis',
          'Analytics support for e-commerce decision making'
        ],
        skills: ['dbt', 'Snowflake', 'BigQuery', 'ELT', 'Data Warehousing']
      }
    },
    {
      name: 'NEXTOR II - Data Scientist',
      icon: '🛰️',
      reason: 'Project concluded',
      dateArchived: 'Aug 2016 - Jan 2019',
      description: 'Simulation and operations research work focused on US airspace and airport capacity analysis.',
      details: {
        duration: 'August 2016 - January 2019',
        achievements: [
          'Built simulation models of the US National Airspace System.',
          'Developed queuing and capacity analysis for airport operations.',
          'Supported FAA and airport stakeholders with post-operations evaluation.',
          'Turned research methods into practical decision-support tools.'
        ],
        responsibilities: [
          'Simulation model development',
          'Operations research and queuing analysis',
          'Stakeholder collaboration with aviation research teams',
          'Technical communication of findings'
        ],
        skills: ['Simulation', 'Operations Research', 'Python', 'Queuing Theory', 'Aviation Analytics']
      }
    },
  ];

  const funFacts = [
    "Finished roles still shape current judgment.",
    "Archived work is often where architectural instincts were formed.",
    "Good systems thinking usually comes from solving the same class of problem more than once.",
  ];

  const handleProjectClick = (project: RetiredProject) => {
    setSelectedProject(project);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  // Project Details View
  if (selectedProject) {
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
          <div className="flex items-center gap-1">
            <button 
              onClick={handleBackClick}
              className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
              style={{ borderStyle: 'outset' }}
              title="Back to Recycle Bin"
            >
              ←
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 overflow-auto">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4 opacity-75">{selectedProject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold mb-2">{selectedProject.name}</h1>
              <div className="text-sm font-bold text-gray-600 mb-2">
                ARCHIVED • {selectedProject.details?.duration}
              </div>
              <p className="text-sm text-gray-700 mb-2">{selectedProject.description}</p>
              <div className="text-xs text-red-600 font-semibold">
                Reason: {selectedProject.reason}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
              <h3 className="font-bold mb-3 text-lg">Key Achievements</h3>
              <ul className="text-sm space-y-2">
                {selectedProject.details?.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
              <h3 className="font-bold mb-3 text-lg">Responsibilities</h3>
              <ul className="text-sm space-y-2">
                {selectedProject.details?.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 border-2 border-gray-400 p-4" style={{ borderStyle: 'inset' }}>
            <h3 className="font-bold mb-3 text-lg">Core Tools</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.details?.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-[#c0c0c0] border border-gray-400 px-3 py-1 text-xs opacity-75"
                  style={{ borderStyle: 'outset' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 border-2 border-red-300 bg-red-50 p-4" style={{ borderStyle: 'inset' }}>
            <h3 className="font-bold mb-2 text-sm text-red-700">📁 Archived Project</h3>
            <p className="text-xs text-red-600">
              This chapter is complete, but the judgment and patterns from it still show up in current architecture and delivery work.
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 text-xs">
          Archived Project Details - {selectedProject.name}
        </div>
      </div>
    );
  }

  // Main Recycle Bin View
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
            onClick={() => sounds.playRecycleBinEmpty()}
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
          Click on any archived role to view detailed information about past projects.
        </div>

        <div className="space-y-3 mb-6">
          {retiredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-300 border-2 border-gray-400 p-3 cursor-pointer hover:bg-gray-250 transition-colors"
              style={{ borderStyle: 'inset' }}
              onClick={() => handleProjectClick(project)}
              onMouseDown={(e) => {
                e.currentTarget.style.borderStyle = 'outset';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderStyle = 'inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderStyle = 'inset';
              }}
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
