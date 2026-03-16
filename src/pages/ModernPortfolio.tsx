import React from 'react';
import { Download, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { downloadResume } from '@/utils/downloadUtils';
import {
  contactInfo,
  education,
  getAllSkills,
  portfolioProjects,
  portfolioProjectsList,
  summary,
} from '@/data/portfolioData';

const ModernPortfolio: React.FC = () => {
  const coreSkills = getAllSkills();
  const selectedProjects = portfolioProjectsList.slice(0, 5);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 border-4 border-stone-900 bg-[#c0c0c0] p-1 shadow-[8px_8px_0_0_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between bg-[#000080] px-3 py-2 text-sm font-bold text-white">
            <span>Prithiv Raj.exe</span>
            <span>Resume Mode</span>
          </div>
          <div className="grid gap-8 bg-stone-50 p-5 lg:grid-cols-[1.4fr_0.8fr]">
            <section>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Senior Data Engineer to Data Architect
              </p>
              <h1 className="max-w-3xl text-4xl font-black uppercase leading-none sm:text-5xl">
                Building operational systems where data models, business workflows, and software delivery meet.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-stone-700">
                {summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={downloadResume}
                  className="inline-flex items-center gap-2 border-2 border-stone-900 bg-[#c0c0c0] px-4 py-2 text-sm font-bold shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </button>
                <a
                  href="/?mode=win95"
                  className="inline-flex items-center gap-2 border-2 border-stone-900 bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
                >
                  Open Win95 Site
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </section>

            <aside className="border-2 border-stone-900 bg-white p-4">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
                Contact
              </h2>
              <div className="space-y-3 text-sm">
                <a className="flex items-center gap-3 underline" href={`mailto:${contactInfo.email}`}>
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </a>
                <a className="flex items-center gap-3 underline" href={contactInfo.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a className="flex items-center gap-3 underline" href={contactInfo.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a className="block underline" href={contactInfo.website} target="_blank" rel="noreferrer">
                  {contactInfo.website.replace('https://', '')}
                </a>
                <p>{contactInfo.phone}</p>
                <p>Based in Chennai, with experience working across India and the US.</p>
              </div>
            </aside>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="border-2 border-stone-900 bg-white p-4">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Current Focus</h2>
            <p className="text-sm leading-6 text-stone-700">
              Designing data models and internal products together, rather than treating analytics and software as separate tracks.
            </p>
          </div>
          <div className="border-2 border-stone-900 bg-white p-4">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Working Style</h2>
            <p className="text-sm leading-6 text-stone-700">
              Hands-on with architecture and implementation, especially when a team needs someone who can move from warehouse design to product delivery.
            </p>
          </div>
          <div className="border-2 border-stone-900 bg-white p-4">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Learning Now</h2>
            <p className="text-sm leading-6 text-stone-700">
              AI inference patterns, runtime tradeoffs, and how to keep LLM-backed features practical under real latency and cost constraints.
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="border-2 border-stone-900 bg-white p-5">
            <div className="mb-5 flex items-center justify-between border-b border-stone-300 pb-3">
              <h2 className="text-xl font-black uppercase">Experience</h2>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">9+ Years</span>
            </div>
            <div className="space-y-6">
              {portfolioProjects.map((role) => (
                <article key={role.name} className="border-l-4 border-[#000080] pl-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{role.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-stone-700">{role.description}</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                      {role.details?.duration}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-800">
                    {role.details?.achievements.slice(0, 3).map((achievement) => (
                      <li key={achievement}>- {achievement}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <section className="border-2 border-stone-900 bg-white p-5">
              <h2 className="mb-4 text-xl font-black uppercase">Core Stack</h2>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-stone-900 bg-[#c0c0c0] px-2 py-1 text-xs font-bold uppercase tracking-[0.08em]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="border-2 border-stone-900 bg-white p-5">
              <h2 className="mb-4 text-xl font-black uppercase">Education</h2>
              <div className="space-y-4 text-sm leading-6">
                {education.map((item) => (
                  <div key={item.institution}>
                    <p className="font-bold">{item.institution}</p>
                    <p>{item.degree}, {item.field}</p>
                    <p className="text-stone-600">{item.location}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="border-2 border-stone-900 bg-white p-5">
          <div className="mb-5 flex items-center justify-between border-b border-stone-300 pb-3">
            <h2 className="text-xl font-black uppercase">Selected Builds</h2>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Full Stack + Data</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {selectedProjects.map((project) => (
              <article key={project.name} className="border-2 border-stone-900 bg-stone-50 p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                    {project.details?.duration}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-6 text-stone-700">{project.description}</p>
                <ul className="mb-4 space-y-2 text-sm leading-6 text-stone-800">
                  {project.details?.achievements.slice(0, 2).map((achievement) => (
                    <li key={achievement}>- {achievement}</li>
                  ))}
                </ul>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="border border-stone-900 px-2 py-1 text-[11px] font-bold uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noreferrer" className="text-sm font-bold underline">
                    View Project
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ModernPortfolio;
