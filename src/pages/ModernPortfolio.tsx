import React, { useState, useRef, useEffect, useMemo } from 'react';
import { downloadResume } from '@/utils/downloadUtils';
import { portfolioProjects, portfolioProjectsList, getAllSkills, contactInfo } from '@/data/portfolioData';
import { loadBlogPosts, type BlogPost } from '@/data/blogPosts';
import { Menu, X, Download, Mail, Github, Linkedin, ExternalLink, ChevronDown, BookOpen } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
// import { SEOStructuredData } from '@/components/SEOStructuredData';

const ModernPortfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const skills = getAllSkills();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  // Build skill to projects/experience mapping
  const skillToItems = useMemo(() => {
    const items = [...portfolioProjects, ...portfolioProjectsList].map(p => ({
      name: p.name,
      icon: p.icon,
      url: p.url,
      tech: p.tech
    }));
    const map = new Map<string, { name: string; icon: string; url?: string }[]>();
    skills.forEach((skill) => {
      const relatedItems = items.filter(item => item.tech.includes(skill));
      if (relatedItems.length > 0) {
        map.set(skill, relatedItems);
      }
    });
    return map;
  }, [skills]);

  // Intersection observers for animations
  const heroRef = useInView<HTMLDivElement>();
  const aboutSectionRef = useInView<HTMLDivElement>();
  const skillsSectionRef = useInView<HTMLDivElement>();
  const experienceSectionRef = useInView<HTMLDivElement>();
  const projectsSectionRef = useInView<HTMLDivElement>();
  const blogSectionRef = useInView<HTMLDivElement>();
  const contactSectionRef = useInView<HTMLDivElement>();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    };
    loadPosts();
  }, []);


  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const headerHeight = 64; // Height of sticky header (h-16 = 64px)
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Header */}
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors" aria-label="Prithiv Raj - Home">
              Prithiv Raj
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <button onClick={() => scrollToSection(aboutRef)} className="text-gray-700 hover:text-gray-900 transition-colors" aria-label="Navigate to About section">
              About
            </button>
            <button onClick={() => scrollToSection(skillsRef)} className="text-gray-700 hover:text-gray-900 transition-colors" aria-label="Navigate to Skills section">
              Skills
            </button>
            <button onClick={() => scrollToSection(experienceRef)} className="text-gray-700 hover:text-gray-900 transition-colors" aria-label="Navigate to Experience section">
              Experience
            </button>
            <button onClick={() => scrollToSection(projectsRef)} className="text-gray-700 hover:text-gray-900 transition-colors" aria-label="Navigate to Projects section">
              Projects
            </button>
            <button onClick={() => scrollToSection(blogRef)} className="text-gray-700 hover:text-gray-900 transition-colors" aria-label="Navigate to Blog section">
              Blog
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="text-gray-700 hover:text-gray-900 transition-colors" aria-label="Navigate to Contact section">
              Contact
            </button>
            <button
              onClick={downloadResume}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover-lift text-xs sm:text-sm md:text-base"
              aria-label="Download resume PDF"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" aria-hidden="true" />
              Resume
            </button>
            <button
              onClick={() => window.location.href = '/?mode=win95'}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors hover-lift text-xs sm:text-sm md:text-base"
              title="Experience Windows 95 Style Portfolio"
              aria-label="Switch to Windows 95 style portfolio"
            >
              <img 
                src="/favicon.ico" 
                alt="Windows 95" 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" 
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Win95 Mode</span>
              <span className="sm:hidden">Win95</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <button onClick={() => scrollToSection(aboutRef)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              About
            </button>
            <button onClick={() => scrollToSection(skillsRef)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Skills
            </button>
            <button onClick={() => scrollToSection(experienceRef)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Experience
            </button>
            <button onClick={() => scrollToSection(projectsRef)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Projects
            </button>
            <button onClick={() => scrollToSection(blogRef)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Blog
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Contact
            </button>
            <button
              onClick={downloadResume}
              className="flex items-center justify-center gap-2 w-full mx-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium min-h-[44px]"
            >
              <Download className="w-5 h-5 flex-shrink-0" />
              Download Resume
            </button>
            <button
              onClick={() => window.location.href = '/?mode=win95'}
              className="flex items-center justify-center gap-2 w-full mx-4 px-4 py-3 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors text-base font-medium min-h-[44px]"
              title="Experience Windows 95 Style Portfolio"
            >
              <img 
                src="/favicon.ico" 
                alt="Windows 95" 
                className="w-5 h-5 flex-shrink-0" 
                aria-hidden="true"
              />
              Win95 Mode
            </button>
          </div>
        )}
      </nav>
    </header>

    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32" itemScope itemType="https://schema.org/Person">
      <div ref={heroRef.ref} className={`text-center ${heroRef.inView ? 'is-inview' : 'reveal-base reveal-up'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4" itemProp="name">
          Prithiv Raj
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Technical Lead Engineer | Full-Stack Developer | Data Engineer
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          Lead Engineer with 9+ years of experience in data, software, operations research, and managing technical teams. 
          Applying my data-driven background to solve real-world business problems by personally architecting and building 
          full-stack software solutions using modern web technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection(contactRef)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover-lift"
          >
            Get In Touch
          </button>
          <button
            onClick={downloadResume}
            className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2 hover-lift"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </button>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section ref={aboutRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white" itemScope itemType="https://schema.org/AboutPage">
      <div ref={aboutSectionRef.ref} className={aboutSectionRef.inView ? 'is-inview' : 'reveal-left'}>
        <h2 className={`text-3xl font-bold text-gray-900 mb-8 text-center ${aboutSectionRef.inView ? 'is-inview' : 'reveal-scale'}`}>About Me</h2>
        <div className="max-w-4xl mx-auto">
        <p className={`text-gray-700 leading-relaxed mb-4 ${aboutSectionRef.inView ? 'is-inview' : 'reveal-left'}`} style={{ transitionDelay: '100ms' }}>
          I'm a Technical Lead Engineer with 9+ years of experience in data, software, operations research, and managing technical teams. 
          Currently at Headwind Labs, I bridge the gap between executive strategy and hands-on engineering, using modern web technologies 
          (React, TypeScript, Supabase) to build custom tools that solve real-world business problems.
        </p>
        <p className={`text-gray-700 leading-relaxed mb-4 ${aboutSectionRef.inView ? 'is-inview' : 'reveal-right'}`} style={{ transitionDelay: '200ms' }}>
          My experience spans from data science research at NEXTOR II (FAA Consortium) developing simulation models of US airspace, 
          to leading data teams at companies like Volansi and Zipline, where I built operational tools that increased efficiency by 25-33% 
          and reduced manufacturing costs by 15%.
        </p>
        <p className={`text-gray-700 leading-relaxed ${aboutSectionRef.inView ? 'is-inview' : 'reveal-left'}`} style={{ transitionDelay: '300ms' }}>
          Currently, I'm building Kattru (AI-powered learning platform), Zippy Bee (proprietary CRM), and Inventree Sync (inventory management system). 
          My approach combines deep technical knowledge with strategic thinking, enabling me to deliver solutions that not only solve 
          technical challenges but also drive measurable business impact.
        </p>
      </div>
      </div>
    </section>

    {/* Skills Section */}
    <section ref={skillsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div ref={skillsSectionRef.ref} className={skillsSectionRef.inView ? 'is-inview' : 'reveal-bounce'}>
        <h2 className={`text-3xl font-bold text-gray-900 mb-8 text-center ${skillsSectionRef.inView ? 'is-inview' : 'reveal-scale'}`}>Skills</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {skills.map((skill, index) => {
            const relatedItems = skillToItems.get(skill) || [];
            return (
              <div key={index} className="relative group inline-block">
                <span
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover-lift cursor-default"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {skill}
                </span>
                {relatedItems.length > 0 && (
                  <div 
                    className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-2 opacity-0 translate-y-1 motion-safe group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-20"
                    role="list"
                    aria-label={`Projects using ${skill}`}
                  >
                    <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-gray-200 rounded-xl shadow-xl max-w-xs">
                      {relatedItems.slice(0, 6).map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          role="listitem"
                          title={item.name}
                          className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-lg select-none opacity-0 scale-95 motion-safe group-hover:opacity-100 group-hover:scale-100 transition duration-200"
                          style={{ transitionDelay: `${itemIndex * 30}ms` }}
                          aria-label={item.name}
                        >
                          <span aria-hidden="true">{item.icon}</span>
                        </div>
                      ))}
                      {relatedItems.length > 6 && (
                        <div 
                          className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium flex items-center justify-center"
                          title={`${relatedItems.length - 6} more projects`}
                          aria-label={`${relatedItems.length - 6} more projects`}
                        >
                          +{relatedItems.length - 6}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Experience Section */}
    <section ref={experienceRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div ref={experienceSectionRef.ref} className={experienceSectionRef.inView ? 'is-inview' : 'reveal-scale'}>
        <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center ${experienceSectionRef.inView ? 'is-inview' : 'reveal-bounce'}`}>Work Experience</h2>
        <div className="space-y-8" itemScope itemType="https://schema.org/ItemList">
          {portfolioProjects.map((project, index) => {
            const animationType = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
            return (
            <article
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow hover-lift ${experienceSectionRef.inView ? 'is-inview' : animationType}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              itemScope
              itemType="https://schema.org/Occupation"
            >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <span className="text-4xl" aria-label={`${project.name} icon`}>{project.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1" itemProp="name">{project.name}</h3>
                    {project.details && (
                      <p className="text-sm text-gray-500">{project.details.duration}</p>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'current' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status === 'current' ? 'Current' : 'Completed'}
                </span>
              </div>
              <p className="text-gray-700 mb-4" itemProp="description">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.details && (
                <button
                  onClick={() => toggleProject(index)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {expandedProject === index ? 'Hide' : 'Show'} Details
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedProject === index ? 'rotate-180' : ''}`} />
                </button>
              )}
              {expandedProject === index && project.details && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {project.details.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {project.details.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </article>
            );
          })}
      </div>
      </div>
    </section>

    {/* Projects Section */}
    <section ref={projectsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div ref={projectsSectionRef.ref} className={projectsSectionRef.inView ? 'is-inview' : 'reveal-scale'}>
        <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center ${projectsSectionRef.inView ? 'is-inview' : 'reveal-bounce'}`}>Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" itemScope itemType="https://schema.org/ItemList">
          {portfolioProjectsList.map((project, index) => {
            const animationType = index % 3 === 0 ? 'reveal-scale' : index % 3 === 1 ? 'reveal-left' : 'reveal-right';
            return (
            <article
              key={index}
              className={`bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200 flex flex-col h-full hover-lift ${projectsSectionRef.inView ? 'is-inview' : animationType}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
            <div className="text-4xl mb-4 flex-shrink-0" aria-label={`${project.name} icon`}>{project.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex-shrink-0" itemProp="name">{project.name}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3 min-h-[3.75rem]" itemProp="description">{project.description}</p>
            <div className="mt-auto pt-2">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  aria-label={`Visit ${project.name} project website`}
                  itemProp="url"
                >
                  Visit Project <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-gray-400 font-medium text-sm">
                  Coming Soon
                </span>
              )}
            </div>
          </article>
            );
          })}
      </div>
      </div>
    </section>

    {/* Blog Section */}
    <section ref={blogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div ref={blogSectionRef.ref} className={blogSectionRef.inView ? 'is-inview' : 'reveal-rotate'}>
        <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center ${blogSectionRef.inView ? 'is-inview' : 'reveal-scale'}`}>Blog</h2>
        {blogLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogPosts.map((post, index) => {
              const blogUrl = `/blog/${post.slug}`;
              const animationType = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
              
              return (
                <article
                  key={post.id}
                  className={`bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200 hover-lift ${blogSectionRef.inView ? 'is-inview' : animationType}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                <header>
                  <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="headline">
                  <a
                    href={blogUrl}
                    className="hover:text-blue-600 transition-colors"
                    itemProp="url"
                    aria-label={`Read blog post: ${post.title}`}
                  >
                    {post.title}
                  </a>
                  </h3>
                  <time
                    className="text-sm text-gray-500"
                    dateTime={post.date}
                    itemProp="datePublished"
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </header>
                <p className="text-gray-700 mt-3 mb-4 line-clamp-2" itemProp="description">
                  {post.preview}
                </p>
                <a
                  href={blogUrl}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <meta itemProp="author" content="Prithiv Raj" />
              </article>
            );
          })}
        </div>
      )}
      </div>
    </section>

    {/* Contact Section */}
    <section ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div ref={contactSectionRef.ref} className={contactSectionRef.inView ? 'is-inview' : 'reveal-bounce'}>
        <h2 className={`text-3xl font-bold text-gray-900 mb-12 text-center ${contactSectionRef.inView ? 'is-inview' : 'reveal-scale'}`}>Get In Touch</h2>
        <div className={`bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto ${contactSectionRef.inView ? 'is-inview' : 'reveal-scale'}`} style={{ transitionDelay: '100ms' }}>
        <p className="text-center text-gray-700 mb-8">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        
        {/* Contact Form */}
        <form onSubmit={handleFormSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
              aria-label="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
              aria-label="Your email address"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What's this about?"
              aria-label="Message subject"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell me about your project or idea..."
              aria-label="Your message"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              Thank you! Your message has been sent successfully. I'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              Sorry, there was an error sending your message. Please try again or email me directly.
            </div>
          )}
        </form>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium hover-lift"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium hover-lift"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium hover-lift"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
          <div className="text-center">
            <button
              onClick={downloadResume}
              className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium hover-lift"
            >
              <Download className="w-5 h-5" />
              Download Resume PDF
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Prithiv Raj. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

export default ModernPortfolio;

