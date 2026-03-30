import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProjectCaseStudy } from '@/data/caseStudies';
import { DynamicMetaTags } from '@/components/DynamicMetaTags';
import { SEOStructuredData } from '@/components/SEOStructuredData';
import { ProjectPreviewFrame } from '@/components/ProjectPreviewFrame';

const rootUrl = 'https://prithivraj.xyz';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectCaseStudy(slug) : null;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <DynamicMetaTags
        title={project.title}
        description={project.summary}
        image={`${rootUrl}${project.image}`}
        url={`${rootUrl}/projects/${project.slug}`}
        keywords={`Prithiv Raj, ${project.title}, ${project.stack.join(', ')}, software architecture, full-stack engineering`}
      />
      <SEOStructuredData
        type="project"
        project={{
          title: project.title,
          description: project.summary,
          slug: project.slug,
          image: project.image,
          tech: project.stack,
          url: project.links[0]?.href ?? `${rootUrl}/projects/${project.slug}`,
        }}
      />

      <main className="min-h-screen bg-stone-100 text-stone-900">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-stone-900 bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back To Site
            </Link>
          </div>

          <header className="mb-8 space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">{project.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-black uppercase leading-none sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-stone-700">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-stone-900 bg-[#c0c0c0] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-stone-900 bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
                >
                  {link.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </header>

          <div className="space-y-8">
            <ProjectPreviewFrame project={project} />

            <section className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
              <aside className="space-y-4 border-2 border-stone-900 bg-white p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Role</p>
                  <p className="mt-2 text-sm leading-7 text-stone-800">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Duration</p>
                  <p className="mt-2 text-sm leading-7 text-stone-800">{project.duration}</p>
                </div>
              </aside>

              <section className="grid gap-4 md:grid-cols-3">
                {project.metrics.map((metric) => (
                  <article key={metric.label} className="border-2 border-stone-900 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{metric.label}</p>
                    <p className="mt-3 text-sm leading-7 text-stone-800">{metric.value}</p>
                  </article>
                ))}
              </section>
            </section>

            <section className="grid gap-5 lg:grid-cols-2">
              {project.sections.map((section) => (
                <article key={section.title} className="border-2 border-stone-900 bg-white p-5">
                  <h2 className="text-xl font-black uppercase">{section.title}</h2>
                  <p className="mt-4 text-sm leading-8 text-stone-700">{section.body}</p>
                </article>
              ))}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectDetailPage;
