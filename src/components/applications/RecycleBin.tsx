
import React from 'react';

interface RetiredProject {
  name: string;
  icon: string;
  reason: string;
  dateArchived: string;
  description: string;
}

export const RecycleBin: React.FC = () => {
  const retiredProjects: RetiredProject[] = [
    {
      name: 'Flash Game Collection',
      icon: '🎮',
      reason: 'Technology deprecated',
      dateArchived: '2020-12-31',
      description: 'Collection of mini-games built in Adobe Flash. RIP Flash Player.'
    },
    {
      name: 'jQuery Plugin Library',
      icon: '📚',
      reason: 'Modern frameworks preferred',
      dateArchived: '2019-06-15',
      description: 'Custom jQuery plugins for DOM manipulation and animations.'
    },
    {
      name: 'PHP Forum Software',
      icon: '💬',
      reason: 'Better alternatives available',
      dateArchived: '2018-03-20',
      description: 'Custom forum software built with PHP and MySQL.'
    },
    {
      name: 'CSS Framework "Retro95"',
      icon: '🎨',
      reason: 'Concept evolved into this portfolio',
      dateArchived: '2021-08-10',
      description: 'Early experiment with Windows 95 styling that became this project!'
    }
  ];

  const funFacts = [
    "Every developer has a graveyard of abandoned projects.",
    "Some of the best learning comes from projects that never see the light of day.",
    "Legacy code: It's not just code, it's archaeology.",
    "Deprecated doesn't mean forgotten – it means evolved."
  ];

  return (
    <div className="p-4 bg-gray-200 h-full">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">🗑️</span>
        <h2 className="text-lg font-bold">Recycle Bin - Retired Projects</h2>
      </div>

      <div className="mb-4 text-xs text-gray-600">
        Projects that have served their purpose or been superseded by better solutions.
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
                  <span className="text-xs text-red-600">({project.reason})</span>
                </div>
                <p className="text-xs mb-2 leading-relaxed">{project.description}</p>
                <div className="text-xs text-gray-600">
                  Archived: {project.dateArchived}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-gray-400 p-3" style={{ borderStyle: 'inset' }}>
        <h3 className="font-bold mb-2 text-sm">💭 Developer Wisdom</h3>
        <div className="space-y-2">
          {funFacts.map((fact, index) => (
            <div key={index} className="text-xs italic">
              "• {fact}"
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button 
          className="bg-gray-300 border-2 border-gray-400 px-3 py-1 text-xs hover:bg-gray-200"
          style={{ borderStyle: 'outset' }}
        >
          Empty Recycle Bin
        </button>
        <button 
          className="bg-gray-300 border-2 border-gray-400 px-3 py-1 text-xs hover:bg-gray-200"
          style={{ borderStyle: 'outset' }}
        >
          Properties
        </button>
      </div>
    </div>
  );
};
