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
    description:
      'Leading architecture and delivery across internal products, data-backed operating systems, and AI-assisted applications.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RAG', 'OpenAI', 'Gemini'],
    status: 'current',
    details: {
      duration: 'March 2023 - Present',
      achievements: [
        'Architected and built Kattru, a learning platform with retrieval-backed course generation, secure key handling, and serverless workflows.',
        'Delivered Zippy Bee, a proprietary CRM used to manage the full lead-to-close pipeline with role-based access and reporting.',
        'Built Inventree Sync, an inventory and payroll system that replaced spreadsheet-based operations for food and FMCG workflows.',
        'Designed operational data flows that connected day-to-day execution with reporting, forecasting, and decision support.'
      ],
      responsibilities: [
        'Own application and data architecture',
        'Translate business problems into internal software',
        'Lead full-stack delivery from schema to UI',
        'Improve data quality, access control, and operational visibility'
      ]
    }
  },
  {
    name: 'Volansi - Lead Data Analytics and Engineering',
    icon: '🚁',
    description:
      'Built and led a data function supporting drone engineering, manufacturing, network planning, and commercial analysis.',
    tech: ['Python', 'SQL', 'SciPy', 'SimPy', 'Machine Learning', 'Team Leadership'],
    status: 'completed',
    details: {
      duration: 'Sept 2021 - Jan 2023',
      achievements: [
        'Hired and managed the data team and set delivery direction across analytics and data engineering work.',
        'Led modeling programs for hub-and-spoke delivery design, survival analysis, and network feasibility.',
        'Built simulation and optimization tools used by engineering, operations, and sales teams to evaluate new markets.',
        'Ran agile planning and roadmaps across data engineering and analytics initiatives.'
      ],
      responsibilities: [
        'Team leadership and stakeholder management',
        'Operations research and simulation',
        'Decision support for network planning',
        'Roadmap ownership across analytics and engineering'
      ]
    }
  },
  {
    name: 'Mashey - Senior Analytics Consultant / Engineer',
    icon: '💻',
    description:
      'Led a warehouse modernization program for an e-commerce client, moving the stack from ETL to ELT and strengthening governance.',
    tech: ['dbt', 'Snowflake', 'BigQuery', 'SQL', 'ELT', 'Data Governance'],
    status: 'completed',
    details: {
      duration: 'June 2021 - Sept 2021',
      achievements: [
        'Led the migration from BigQuery to Snowflake and introduced dbt-based transformation workflows.',
        'Defined warehouse controls aligned to GDPR and CCPA requirements.',
        'Used cohort and commercial analysis to support go-to-market and margin decisions.',
        'Contributed to quarterly savings by identifying product and shipping cost opportunities.'
      ],
      responsibilities: [
        'Warehouse architecture and migration planning',
        'Transformation design with dbt',
        'Governance and compliance alignment',
        'Commercial analytics for decision making'
      ]
    }
  },
  {
    name: 'Zipline International - Senior Data Analyst',
    icon: '✈️',
    description:
      'Built internal tools and analysis workflows for operations teams running high-volume logistics across multiple countries.',
    tech: ['Python', 'SQL', 'Sisense', 'Tableau', 'Microservices', 'Experimentation'],
    status: 'completed',
    details: {
      duration: 'June 2019 - May 2021',
      achievements: [
        'Delivered software and data projects used by operations teams in the US, Ghana, and Rwanda.',
        'Helped drive measurable gains in operating efficiency and site throughput.',
        'Supported teams with ad hoc analysis, hypothesis testing, dashboards, and lightweight internal applications.',
        'Contributed to anomaly detection work that reduced aircraft manufacturing cost per unit.'
      ],
      responsibilities: [
        'Operational analytics and tooling',
        'Cross-functional project delivery',
        'Dashboarding and business reporting',
        'Statistical analysis for operational decisions'
      ]
    }
  },
  {
    name: 'NEXTOR II (FAA Consortium) - Data Scientist',
    icon: '🛰️',
    description:
      'Built simulation models for aviation operations research with applications for the FAA, airports, and airlines.',
    tech: ['Python', 'Simulation', 'Queuing Theory', 'Operations Research'],
    status: 'completed',
    details: {
      duration: 'Aug 2016 - Jan 2019',
      achievements: [
        'Developed simulation models of US airspace for post-operations evaluation.',
        'Built queuing models to quantify operational capacity for the Detroit Metro Airport expansion plan.'
      ],
      responsibilities: [
        'Simulation model development',
        'Operations research and queuing analysis',
        'Decision support for aviation stakeholders'
      ]
    }
  }
];

export const portfolioProjectsList: PortfolioProject[] = [
  {
    name: 'OpenPipe - Streaming Data Platform',
    icon: '🧪',
    description:
      'A local-first streaming platform that simulates device data, pushes it through Kafka and Flink, and stores time-series output in TimescaleDB.',
    tech: ['Python', 'Kafka', 'PyFlink', 'TimescaleDB', 'FastAPI', 'Docker'],
    status: 'current',
    url: 'https://github.com/prithivrajmu/openpipe',
    details: {
      duration: '2026',
      achievements: [
        'Built a virtual device simulator for wearable health data, restaurant orders, and GPS telemetry.',
        'Added a Kafka-backed ingestion layer, PyFlink stream processing jobs, and TimescaleDB persistence for time-series analysis.',
        'Delivered local dashboards for simulation monitoring, SQL querying, health checks, and Flink job visibility.',
        'Structured the project as a realistic playground for event streams, bad data injection, and operational observability.'
      ],
      responsibilities: [
        'Streaming system design',
        'Simulation and ingestion workflows',
        'Flink-based stream processing',
        'Local platform orchestration with Docker'
      ]
    }
  },
  {
    name: 'Inventree Sync - Inventory Operating System',
    icon: '📦',
    description:
      'An inventory and payroll platform built to bring discipline to purchasing, stock movement, and store operations.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    status: 'current',
    url: 'https://inventreesync.com',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Replaced spreadsheet-driven inventory operations with a purpose-built application.',
        'Added stock planning logic tied to sales velocity and supplier lead time.',
        'Created a cleaner operational data foundation for reporting and day-to-day execution.'
      ],
      responsibilities: [
        'Operational systems design',
        'Data modeling and workflow design',
        'Full-stack implementation'
      ]
    }
  },
  {
    name: 'Kattru - AI Learning Platform',
    icon: '🎓',
    description:
      'A full-stack learning product built around retrieval-backed content generation and practical AI workflows.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RAG', 'OpenAI', 'Gemini'],
    status: 'current',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Built a secure web application for AI-assisted course generation and delivery.',
        'Implemented retrieval-backed generation with vector search and guarded API access.',
        'Added BYOK support and server-side proxying to keep user keys out of the client.',
        'Used the product as a hands-on path into AI inference concerns such as latency, cost, and model-provider tradeoffs.'
      ],
      responsibilities: [
        'Product and system architecture',
        'Full-stack implementation',
        'Applied AI integration',
        'Security and runtime design'
      ]
    }
  },
  {
    name: 'Zippy Bee - Proprietary CRM',
    icon: '🐝',
    description:
      'An internal CRM that replaced fragmented tracking with a structured operating system for sales and delivery.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS'],
    status: 'current',
    details: {
      duration: '2024 - Present',
      achievements: [
        'Built lead, client, project, and agent workflows into a single system.',
        'Introduced role-based access and reporting views for better operating discipline.',
        'Reduced dependency on manual status tracking and spreadsheet coordination.'
      ],
      responsibilities: [
        'Business workflow design',
        'Schema and access-model design',
        'Full-stack product delivery'
      ]
    }
  },
  {
    name: 'PDF Miner - Document Extraction Platform',
    icon: '📄',
    description:
      'A document extraction tool with multiple backends, batch workflows, and packaging for reuse.',
    tech: ['Python', 'Streamlit', 'OCR', 'CI/CD'],
    status: 'completed',
    url: 'https://github.com/prithivrajmu/extract-data-from-pdf/',
    details: {
      duration: '2024',
      achievements: [
        'Built a unified service layer for multiple extraction backends.',
        'Delivered batch processing, structured field extraction, and export workflows.',
        'Improved local OCR performance through CPU/GPU-aware execution paths.',
        'Published the project as a reusable Python package with testing and CI.'
      ],
      responsibilities: [
        'Python application architecture',
        'Document-processing workflow design',
        'Packaging, testing, and release setup'
      ]
    }
  },
  {
    name: 'Chennai Urban Expansion Simulator',
    icon: '🏙️',
    description:
      'A full-stack simulation tool for visualizing and forecasting urban growth with a hybrid CA + ABM model.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Leaflet', 'Flask', 'NumPy'],
    status: 'completed',
    url: 'https://github.com/prithivrajmu/chennai_expansion_sim',
    details: {
      duration: '2025',
      achievements: [
        'Built a map-based interface for exploring projected urban, land price, and population overlays.',
        'Connected a React frontend to a Flask backend serving simulation output and time-based controls.',
        'Used the project to package simulation logic into a more explorable product surface.'
      ],
      responsibilities: [
        'Simulation product design',
        'Frontend and backend integration',
        'Spatial data visualization'
      ]
    }
  },
  {
    name: 'The Urban Pinnal - Headless Commerce Build',
    icon: '🛍️',
    description:
      'A client-facing headless commerce implementation with a custom storefront and content-driven landing pages.',
    tech: ['React', 'TypeScript', 'Shopify Storefront API', 'Sanity CMS'],
    status: 'completed',
    url: 'https://theurbanpinnal.com',
    details: {
      duration: '2024',
      achievements: [
        'Built a custom storefront on top of Shopify Storefront API.',
        'Integrated CMS-driven merchandising and landing pages.',
        'Used structured content and dynamic page generation to improve search visibility.'
      ],
      responsibilities: [
        'Client delivery',
        'Frontend and integration architecture',
        'Commerce workflow implementation'
      ]
    }
  }
];

export const getAllSkills = (): string[] => [
  'Python',
  'SQL',
  'dbt',
  'Snowflake',
  'BigQuery',
  'PostgreSQL',
  'React',
  'TypeScript',
  'Supabase',
  'Data Modeling',
  'Data Warehousing',
  'System Architecture',
  'Operations Research',
  'Simulation',
  'Applied AI'
];

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

export const summary =
  'Senior data engineer turned data architect with 9+ years across analytics, operations research, and software delivery. I have built warehouses, simulation models, decision-support systems, and internal platforms, and I now lead full-stack product work where data design and application architecture have to reinforce each other. More recently, I have been applying that background to practical AI products and learning the realities of inference, latency, reliability, and runtime tradeoffs in production systems.';
