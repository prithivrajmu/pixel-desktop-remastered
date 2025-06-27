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
    <div className="p-4 bg-gray-200 h-full">
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
  );
};