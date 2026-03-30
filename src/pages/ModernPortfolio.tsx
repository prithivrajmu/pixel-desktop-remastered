import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { marked } from 'marked';
import { Link } from 'react-router-dom';
import {
  contactInfo,
  education,
  getAllSkills,
  portfolioProjects,
  portfolioProjectsList,
  summary,
} from '@/data/portfolioData';
import { loadBlogPosts, type BlogPost } from '@/data/blogPosts';
import { projectCaseStudies } from '@/data/caseStudies';
import { ProjectPreviewFrame } from '@/components/ProjectPreviewFrame';

type SectionKey = 'overview' | 'experience' | 'builds' | 'blog' | 'contact';

const sectionLabels: Record<SectionKey, string> = {
  overview: 'Overview',
  experience: 'Experience',
  builds: 'Builds',
  blog: 'Blog',
  contact: 'Contact',
};

const ModernPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const coreSkills = getAllSkills();
  const [leadStudy, ...supportingStudies] = projectCaseStudies;
  const operatingSystems = portfolioProjectsList.filter(
    (project) =>
      ![
        'OpenPipe - Streaming Data Platform',
        'Pixel Desktop Remastered - Retro Personal Site',
        'PDF Invoicer - Offline GST Invoice System',
      ].includes(project.name)
  ).slice(0, 4);
  const selectedBlogPost =
    blogPosts.find((post) => post.slug === selectedBlogSlug) ?? blogPosts[0] ?? null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await loadBlogPosts();
        setBlogPosts(posts);
        setSelectedBlogSlug((current) => current ?? posts[0]?.slug ?? null);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'fc00abdc-4ee6-4cab-8061-a3f17c14e6e7',
          ...formData,
          subject: `Contact from ${formData.name}: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 border-4 border-stone-900 bg-[#c0c0c0] p-1 shadow-[8px_8px_0_0_rgba(0,0,0,0.18)]">
          <div className="flex items-center bg-[#000080] px-3 py-2 text-sm font-bold text-white">
            <span>Prithiv Raj.exe</span>
          </div>
          <div className="grid gap-8 bg-stone-50 p-5 lg:grid-cols-[1.4fr_0.8fr]">
            <section>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Senior Data Engineer to Data Architect
              </p>
              <h1 className="max-w-3xl text-4xl font-black uppercase leading-none sm:text-5xl">
                Designing data platforms and full-stack systems for teams that need architecture, not just analysis.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-stone-700">
                {summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
                <p>Open to conversations around data architecture, internal platforms, and AI-enabled product work.</p>
                <p>Based in Chennai, with operating experience across India and the US.</p>
              </div>
            </aside>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="border-2 border-stone-900 bg-white p-4">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Sections</h2>
            <div className="space-y-3">
              {(Object.keys(sectionLabels) as SectionKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full border-2 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.08em] ${
                    activeSection === key
                      ? 'border-stone-900 bg-[#000080] text-white'
                      : 'border-stone-900 bg-[#c0c0c0] text-stone-900'
                  }`}
                >
                  {sectionLabels[key]}
                </button>
              ))}
            </div>
          </aside>

          <div className="border-2 border-stone-900 bg-white p-5">
            <div className="mb-5 flex items-center justify-between border-b border-stone-300 pb-3">
              <h2 className="text-xl font-black uppercase">{sectionLabels[activeSection]}</h2>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Choose A Section
              </span>
            </div>

            {activeSection === 'overview' && (
              <div className="space-y-8">
                <section className="grid gap-4 md:grid-cols-3">
                  <div className="border-2 border-stone-900 bg-stone-50 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Current Focus</h3>
                    <p className="text-sm leading-6 text-stone-700">
                      Building systems where the warehouse, the application layer, and the operating workflow are designed as one stack.
                    </p>
                  </div>
                  <div className="border-2 border-stone-900 bg-stone-50 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Working Style</h3>
                    <p className="text-sm leading-6 text-stone-700">
                      Hands-on from schema to UI, especially when a team needs someone who can move from warehouse design to shipped product.
                    </p>
                  </div>
                  <div className="border-2 border-stone-900 bg-stone-50 p-4">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Learning Now</h3>
                    <p className="text-sm leading-6 text-stone-700">
                      AI inference, provider tradeoffs, and how to make LLM-backed features hold up under latency, reliability, and cost pressure.
                    </p>
                  </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
                  <div className="border-2 border-stone-900 bg-stone-50 p-5">
                    <h3 className="mb-4 text-xl font-black uppercase">What I Do Now</h3>
                    <p className="text-sm leading-7 text-stone-700">
                      I work best in environments where analytics is no longer enough and the next step is architecture:
                      designing the warehouse, application workflows, and product surface together so teams can actually run on the system.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-stone-700">
                      That is the arc from my earlier data work into current full-stack delivery. The thread has stayed the same:
                      build the system that makes better decisions and cleaner execution possible.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <section className="border-2 border-stone-900 bg-stone-50 p-5">
                      <h3 className="mb-4 text-xl font-black uppercase">Core Stack</h3>
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

                    <section className="border-2 border-stone-900 bg-stone-50 p-5">
                      <h3 className="mb-4 text-xl font-black uppercase">Education</h3>
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
              </div>
            )}

            {activeSection === 'experience' && (
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
                      {role.details?.achievements.slice(0, 4).map((achievement) => (
                        <li key={achievement}>- {achievement}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}

            {activeSection === 'builds' && (
              <div className="space-y-6">
                {leadStudy && (
                  <article className="space-y-4">
                    <ProjectPreviewFrame project={leadStudy} />
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/projects/${leadStudy.slug}`}
                        className="inline-flex items-center gap-2 border-2 border-stone-900 bg-[#000080] px-4 py-2 text-sm font-bold text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
                      >
                        Read Build Notes
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      {leadStudy.links.map((link) => (
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
                  </article>
                )}

                <div className="grid gap-4 lg:grid-cols-2">
                  {supportingStudies.map((project) => (
                    <article key={project.slug} className="space-y-4 border-2 border-stone-900 bg-stone-50 p-4">
                      <ProjectPreviewFrame project={project} compact />
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-bold underline">
                          Read Build Notes
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        {project.links[0] && (
                          <a
                            href={project.links[0].href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold underline"
                          >
                            {project.links[0].label}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                <section className="space-y-4">
                  <div className="border-t border-stone-300 pt-4">
                    <h3 className="text-lg font-black uppercase">Operating Systems Delivered</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-700">
                      A few more systems that matter because they were used to run real work, not just to demo an interface.
                    </p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {operatingSystems.map((project) => (
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
                          <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold underline">
                            View Project
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeSection === 'blog' && (
              <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                <aside className="space-y-4">
                  <div className="border-2 border-stone-900 bg-stone-50 p-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Writing</p>
                    <p className="text-sm leading-6 text-stone-700">
                      Notes on systems, engineering, and work that benefits from a longer form than a project card.
                    </p>
                  </div>
                {blogLoading && <p className="text-sm text-stone-600">Loading posts...</p>}
                {!blogLoading && blogPosts.length === 0 && (
                  <p className="text-sm text-stone-600">No posts available right now.</p>
                )}
                {!blogLoading &&
                  blogPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedBlogSlug(post.slug)}
                      className={`block w-full border-2 p-4 text-left transition-colors ${
                        selectedBlogPost?.slug === post.slug
                          ? 'border-stone-900 bg-white'
                          : 'border-stone-300 bg-stone-50 hover:border-stone-900'
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold leading-6">{post.title}</h3>
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                          {post.date}
                        </span>
                      </div>
                      <p className="mb-3 text-sm leading-6 text-stone-700">{post.preview}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold underline">
                        Read Here
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  ))}
                </aside>

                <div className="border border-stone-200 bg-white">
                  {selectedBlogPost ? (
                    <article className="mx-auto max-w-3xl px-6 py-8 sm:px-10 sm:py-10">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500">
                        {new Date(selectedBlogPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <h3 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
                        {selectedBlogPost.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
                        {selectedBlogPost.preview}
                      </p>
                      <div className="my-8 border-t border-stone-200" />
                      <div
                        className="prose prose-stone max-w-none prose-headings:font-black prose-p:text-[17px] prose-p:leading-8 prose-li:text-[17px] prose-li:leading-8"
                        dangerouslySetInnerHTML={{ __html: marked.parse(selectedBlogPost.content) as string }}
                      />
                      <div className="mt-10">
                        <a
                          href={`/blog/${selectedBlogPost.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold underline"
                        >
                          Open In Win95 View
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  ) : (
                    <div className="px-6 py-8 text-sm text-stone-600">
                      Select an article to read it here.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
                <section className="border-2 border-stone-900 bg-stone-50 p-5">
                  <h3 className="mb-4 text-xl font-black uppercase">Reach Out</h3>
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
                    <p>{contactInfo.phone}</p>
                  </div>
                  <p className="mt-6 text-sm leading-6 text-stone-700">
                    Best fit: data architecture, internal platforms, analytics modernization, and AI-enabled product work.
                  </p>
                </section>

                <section className="border-2 border-stone-900 bg-stone-50 p-5">
                  <h3 className="mb-4 text-xl font-black uppercase">Start A Conversation</h3>

                  {submitStatus === 'success' && (
                    <div className="mb-4 border border-green-700 bg-green-50 p-3 text-sm text-green-800">
                      Message sent successfully. I will get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-4 border border-red-700 bg-red-50 p-3 text-sm text-red-800">
                      Message failed to send. Please try again or email me directly.
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-bold">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-stone-900 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-bold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-stone-900 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-bold">What are you working on?</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-stone-900 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-bold">Context</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        placeholder="A short note on the problem, scope, or role you want to discuss."
                        className="w-full resize-none border-2 border-stone-900 bg-white px-3 py-2 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 border-2 border-stone-900 bg-[#c0c0c0] px-4 py-2 text-sm font-bold shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ModernPortfolio;
