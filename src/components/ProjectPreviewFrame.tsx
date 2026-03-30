import React from 'react';
import type { ProjectCaseStudy } from '@/data/caseStudies';

interface ProjectPreviewFrameProps {
  project: ProjectCaseStudy;
  compact?: boolean;
}

export const ProjectPreviewFrame: React.FC<ProjectPreviewFrameProps> = ({ project, compact = false }) => {
  return (
    <div className="border-2 border-stone-900 bg-[#c0c0c0] p-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between bg-[#000080] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
        <span>{project.title}</span>
        <span>{project.eyebrow}</span>
      </div>
      <div className="grid gap-4 bg-stone-50 p-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden border-2 border-stone-900 bg-white">
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full object-cover ${compact ? 'max-h-48' : 'max-h-[320px]'}`}
          />
        </div>
        <div className="space-y-4">
          <p className={`font-bold uppercase tracking-[0.18em] text-stone-500 ${compact ? 'text-[11px]' : 'text-xs'}`}>
            {project.duration}
          </p>
          <p className={`${compact ? 'text-sm leading-6' : 'text-sm leading-7'} text-stone-700`}>
            {project.summary}
          </p>
          <div className="grid gap-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="border border-stone-900 bg-white px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">{metric.label}</p>
                <p className="mt-1 text-sm leading-6 text-stone-800">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
