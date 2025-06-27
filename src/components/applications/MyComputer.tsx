import React from 'react';

export const MyComputer: React.FC = () => {
  return (
    <div className="p-4 bg-gray-200 h-full font-mono text-sm">
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
  );
};