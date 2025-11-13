export interface PortfolioProject {
  name: string;
  icon: string;
  description: string;
  tech: string[];
  status: 'current' | 'completed';
  details?: {
    duration: string;
    achievements: string[];
    responsibilities: string[];
  };
  url?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    name: 'Headwind Labs - Technical Lead Engineer',
    icon: '🚀',
    description: 'Building AI-powered learning platform (Kattru), proprietary CRM (Zippy Bee), and custom inventory management system (Inventree Sync) to solve real-world business problems.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'OpenAI', 'Gemini', 'LangChain', 'RAG', 'Serverless'],
    status: 'current',
    details: {
      duration: 'March 2023 - Present',
      achievements: [
        'Built Kattru, AI-powered learning platform with RAG-based course generation, encrypted API key management, and serverless architecture supporting OpenAI/Gemini models',
        'Engineered and deployed Zippy Bee, a proprietary full-stack CRM (React, TypeScript, Supabase) to manage entire business pipeline from lead to close',
        'Designed system modules for lead/client management, project tracking, and agent analytics with role-based access and data security (RLS)',
        'Architected and built Inventree Sync, custom inventory and payroll management system replacing manual Google Sheets, significantly reducing waste and manual errors',
        'Engineered data-driven inventory control system, optimizing stock levels based on sales velocity and supplier lead times'
      ],
      responsibilities: [
        'Full-stack software architecture and development',
        'AI/ML integration and RAG implementation',
        'Database design with Row-Level Security policies',
        'Serverless Edge Functions development',
        'Business problem-solving through custom software solutions'
      ]
    }
  },
  {
    name: 'Volansi - Lead Data Analytics and Engineering',
    icon: '🚁',
    description: 'Hired and managed data team, implementing data-driven solutions for drone engineering, manufacturing, sales, and delivery operations.',
    tech: ['Python', 'SciPy', 'SimPy', 'SQL', 'ML', 'Survival Analysis', 'Team Leadership', 'Agile'],
    status: 'completed',
    details: {
      duration: 'Sept 2021 - Jan 2023',
      achievements: [
        'Hired and managed the data team, implementing data-driven solutions for drone engineering, manufacturing, sales, and delivery operations',
        'Led and executed high-stakes program to develop hub-and-spoke drone delivery network, survival analysis using ML, securing buy-in from multiple cross-functional leaders',
        'Managed project roadmaps and agile ceremonies (Kanban/Scrum) for data engineering and analytics teams',
        'Conducted ad-hoc operations analysis using SciPy, SimPy, and SQL, including GHG emissions modeling for drone networks',
        'Developed simulation and optimization tools for fleet allocation and healthcare supply chains to support Sales team in evaluating new markets'
      ],
      responsibilities: [
        'Data team leadership and management',
        'Cross-functional collaboration and stakeholder management',
        'Operations research and network optimization',
        'Agile project management and roadmapping',
        'Ad-hoc analysis and modeling for business decisions'
      ]
    }
  },
  {
    name: 'Mashey - Sr Analytics Consultant/Engineer',
    icon: '💻',
    description: 'Led development and migration of data stack (ETL to ELT) for e-commerce brand, moving from BigQuery to Snowflake and implementing dbt.',
    tech: ['dbt', 'Snowflake', 'BigQuery', 'ETL/ELT', 'SQL', 'GDPR', 'CCPA', 'Data Warehousing'],
    status: 'completed',
    details: {
      duration: 'June 2021 - Sept 2021',
      achievements: [
        'Led development and migration of data stack (ETL to ELT) for e-commerce brand, moving from BigQuery to Snowflake and implementing dbt',
        'Ensured data warehouse policies were compliant with GDPR and CCPA',
        'Analyzed user cohorts and trends to inform Go-To-Market strategies',
        'Contributed to $345,000 in quarterly savings by optimizing product and shipping costs'
      ],
      responsibilities: [
        'Data warehouse architecture and migration planning',
        'ETL to ELT pipeline transformation',
        'Compliance and data governance',
        'User analytics and cohort analysis',
        'Cost optimization through data insights'
      ]
    }
  },
  {
    name: 'Zipline International - Senior Data Analyst',
    icon: '✈️',
    description: 'Worked in Data and Operations Engineering teams, managing software and data projects to build internal tools for daily operations in US, Ghana, and Rwanda.',
    tech: ['Python', 'SQL', 'Sisense', 'Tableau', 'BI Tools', 'Microservices', 'Hypothesis Testing'],
    status: 'completed',
    details: {
      duration: 'June 2019 - May 2021',
      achievements: [
        'Worked in Data and Operations Engineering teams, managing software and data projects to build internal tools for daily operations in US, Ghana, and Rwanda',
        'Increased operational efficiency by 25% and site throughput by 33%',
        'Supported cross-functional teams with ad-hoc hypothesis testing, serving results via BI tools (Sisense, Tableau) and microservice apps',
        'Contributed to anomaly detection analysis that achieved a 15% reduction in per-unit aircraft manufacturing cost'
      ],
      responsibilities: [
        'Software and data project management',
        'Internal tool development for operations',
        'Cross-functional team support',
        'BI dashboard creation and maintenance',
        'Statistical analysis and hypothesis testing'
      ]
    }
  },
  {
    name: 'NEXTOR II (FAA Consortium) - Data Scientist',
    icon: '🛰️',
    description: 'Developed simulation model of US airspace to provide post-operations evaluation for airlines, the FAA, and airports.',
    tech: ['Python', 'Simulation', 'Queuing Theory', 'Operations Research', 'Aviation Analytics'],
    status: 'completed',
    details: {
      duration: 'Aug 2016 - Jan 2019',
      achievements: [
        'Developed simulation model of US airspace to provide post-operations evaluation for airlines, the FAA, and airports',
        'Implemented queuing theory simulation model to analyze and quantify operational capabilities for the Detroit Metro Airport expansion plan'
      ],
      responsibilities: [
        'Complex systems modeling and simulation development',
        'Queuing theory implementation',
        'Post-operations evaluation and analysis',
        'Collaboration with FAA, airlines, and airports',
        'Research and development in aviation operations'
      ]
    }
  }
];

export const portfolioProjectsList: PortfolioProject[] = [
  {
    name: 'Kattru - AI-Powered Personalized Learning Platform',
    icon: '🎓',
    description: 'Full-stack web application with AI-driven course generation using LangChain, OpenAI, and Google Gemini APIs, implementing RAG with vector similarity search.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'LangChain', 'OpenAI', 'Gemini', 'RAG', 'Vector Search', 'Zod', 'Terser'],
    status: 'current',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Developed secure learning platform with AI-driven course generation using LangChain, OpenAI, and Google Gemini APIs',
        'Implemented RAG (Retrieval-Augmented Generation) with vector similarity search for personalized course recommendations',
        'Built comprehensive backend infrastructure with Snowflake including PostgreSQL database with Row Level Security policies',
        'Implemented serverless Edge Functions for API proxying and user authentication',
        'Implemented BYOK (Bring Your Own Key) architecture allowing users to use personal LLM API keys with encrypted storage',
        'Implemented critical security vulnerabilities including XSS prevention, input validation, secure API key management',
        'Architected using React 18, TypeScript, Tailwind CSS, shadcn/ui components, TanStack Query for state management, and Vite for optimized builds'
      ],
      responsibilities: [
        'Full-stack development and architecture',
        'AI/ML integration and RAG implementation',
        'Security and encryption implementation',
        'Database design with RLS policies',
        'Performance optimization and build hardening'
      ]
    }
  },
  {
    name: 'StoryWeaver - AI-Powered Interactive Storytelling',
    icon: '📚',
    description: 'Full-stack React/TypeScript application AI-powered interactive storytelling platform for parents to create personalized children\'s stories with AI-generated content, illustrations, and narration.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'OpenAI GPT-4', 'DALL-E', 'ElevenLabs', 'Redis', 'RLS', 'Zod'],
    status: 'completed',
    details: {
      duration: '2024',
      achievements: [
        'Built full-stack React/TypeScript application AI-powered interactive storytelling platform',
        'Implemented data governance and security with RLS policies, Zod validation',
        'Integrated Redis-based rate limiting (20 req/hour)',
        'Integrated OpenAI GPT-4, DALL-E, and ElevenLabs APIs for story generation, illustrations, and text-to-speech',
        'Architected cost-efficient AI pipeline with request throttling and secure credential management via Supabase Secrets'
      ],
      responsibilities: [
        'Full-stack development',
        'AI API integration',
        'Security and rate limiting implementation',
        'Cost optimization',
        'User experience design'
      ]
    }
  },
  {
    name: 'Infi Estates - Premium Real Estate Platform',
    icon: '🏘️',
    description: 'Full-stack real estate marketplace featuring multi-step property listing wizard with Google Maps API and PostGIS geospatial queries.',
    tech: ['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'PostGIS', 'Google Maps API', 'Tailwind CSS'],
    status: 'completed',
    details: {
      duration: '2024',
      achievements: [
        'Delivered full-stack real estate marketplace for a client',
        'Featured multi-step property listing wizard with Google Maps API and PostGIS geospatial queries',
        'Built secure, role-based authentication system (Owner, Broker, Seeker) using Supabase Auth and Next.js middleware'
      ],
      responsibilities: [
        'Full-stack development',
        'Geospatial query implementation',
        'Role-based authentication system',
        'Client project delivery'
      ]
    }
  },
  {
    name: 'The Urban Pinnal - Headless E-Commerce Platform',
    icon: '🛍️',
    description: 'Headless e-commerce platform integrating Shopify\'s Storefront API with custom React frontend, featuring programmatic SEO.',
    tech: ['React', 'TypeScript', 'Shopify Storefront API', 'Sanity CMS', 'Vite', 'Zustand', 'GraphQL'],
    status: 'completed',
    url: 'https://theurbanpinnal.com',
    details: {
      duration: '2024',
      achievements: [
        'Architected and built headless e-commerce platform for a client',
        'Integrated Shopify\'s Storefront API with custom React frontend',
        'Implemented programmatic SEO by generating dynamic landing pages from CMS and product data to improve search visibility'
      ],
      responsibilities: [
        'Headless e-commerce architecture',
        'Shopify API integration',
        'CMS integration',
        'SEO optimization'
      ]
    }
  },
  {
    name: 'Ledger Legends (The Ramen Index) - Expense Tracking PWA',
    icon: '💰',
    description: 'Full-featured expense tracker with real-time analytics, gamification, and full PWA/offline capabilities.',
    tech: ['React', 'TypeScript', 'Supabase', 'TanStack Query', 'PWA', 'Vercel'],
    status: 'current',
    url: 'https://ramen.prithivraj.xyz',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Built full-featured expense tracker (slated for future app launch)',
        'Implemented real-time analytics and gamification',
        'Full PWA/offline capabilities',
        'Used as hands-on project to master TanStack Query for server state, real-time subscriptions, and offline transaction queuing'
      ],
      responsibilities: [
        'Full-stack PWA development',
        'Real-time data synchronization',
        'Offline functionality',
        'State management with TanStack Query'
      ]
    }
  },
  {
    name: 'Zippy Bee - Proprietary CRM System',
    icon: '🐝',
    description: 'Proprietary full-stack CRM system to manage entire business pipeline from lead to close, featuring lead/client management, project tracking, and agent analytics.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'CRM', 'RLS', 'Role-Based Access'],
    status: 'current',
    url: 'https://zippybee.in',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Engineered and deployed proprietary full-stack CRM (React, TypeScript, Supabase) to manage entire business pipeline from lead to close',
        'Designed system modules for lead/client management, project tracking, and agent analytics with role-based access and data security (RLS)',
        'Built comprehensive business pipeline management system replacing manual tracking methods'
      ],
      responsibilities: [
        'Full-stack CRM development',
        'Business pipeline architecture',
        'Role-based access control implementation',
        'Data security with Row-Level Security policies',
        'Analytics and reporting features'
      ]
    }
  },
  {
    name: 'Inventree Sync - Inventory Management System',
    icon: '📦',
    description: 'Custom inventory and payroll management system replacing manual Google Sheets, significantly reducing waste and manual errors in food and FMCG industry.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Inventory Management'],
    status: 'current',
    url: 'https://inventreesync.com',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Architected and built custom inventory and payroll management system to replace manual Google Sheets',
        'Now the operational backbone, significantly reducing waste and manual errors in the food and FMCG industry',
        'Engineered data-driven inventory control system, optimizing stock levels based on sales velocity and supplier lead times'
      ],
      responsibilities: [
        'Full-stack development',
        'Inventory management system design',
        'Data-driven optimization',
        'Business operations improvement'
      ]
    }
  }
];

export const getAllSkills = (): string[] => {
  const skillSet = new Set<string>();
  portfolioProjects.forEach(project => {
    project.tech.forEach(skill => skillSet.add(skill));
  });
  portfolioProjectsList.forEach(project => {
    project.tech.forEach(skill => skillSet.add(skill));
  });
  // Add additional skills from resume
  const additionalSkills = [
    'JavaScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS', 'GCP', 'Vercel',
    'Git', 'Docker', 'pandas', 'numpy', 'Spark', 'Looker', 'Operations Research',
    'Data Warehousing', 'E-commerce Analytics', 'Cost Optimization'
  ];
  additionalSkills.forEach(skill => skillSet.add(skill));
  return Array.from(skillSet).sort();
};

export const contactInfo = {
  email: 'prithivrajmu@gmail.com',
  github: 'https://github.com/prithivrajmu',
  linkedin: 'https://linkedin.com/in/prithivrajmu',
  website: 'https://prithivraj.xyz',
  phone: '+91 7200765498'
};

export const education = [
  {
    institution: 'University of Maryland, College Park',
    location: 'MD, USA',
    degree: 'Master of Science',
    field: 'Operations Research and Systems Engineering'
  },
  {
    institution: 'Vellore Institute of Technology (VIT)',
    location: 'Vellore, India',
    degree: 'Bachelor of Technology',
    field: 'Civil and Environmental Engineering'
  }
];

export const summary = 'Lead Engineer with 9+ years of experience in data, software, operations research, and managing technical teams. Currently a Technical Lead Engineer, applying my data-driven background to solve real-world business problems by personally architecting and building full-stack software solutions. I bridge the gap between executive strategy and hands-on engineering, using modern web technologies (React, TypeScript, Supabase) to build the custom tools I need to run and optimize my businesses.';

