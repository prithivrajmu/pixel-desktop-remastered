export interface CaseStudyLink {
  label: string;
  href: string;
}

export interface CaseStudySection {
  title: string;
  body: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  duration: string;
  role: string;
  stack: string[];
  links: CaseStudyLink[];
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: 'openpipe',
    title: 'OpenPipe',
    eyebrow: 'Streaming Data Platform',
    summary:
      'A local-first event streaming playground for simulating device telemetry, processing it with Kafka and Flink, and storing analytical output in TimescaleDB.',
    image: '/projects/openpipe-card.jpg',
    duration: '2026',
    role: 'System design, simulation workflows, stream processing, local platform orchestration',
    stack: ['Python', 'Kafka', 'PyFlink', 'TimescaleDB', 'FastAPI', 'Docker'],
    links: [
      { label: 'View Repo', href: 'https://github.com/prithivrajmu/openpipe' },
    ],
    metrics: [
      { label: 'Use case', value: 'Wearables, restaurant orders, and GPS telemetry' },
      { label: 'Processing', value: 'Kafka ingestion with Flink windows and alerting' },
      { label: 'Surface area', value: 'Simulator UI, SQL viewer, health checks, and Flink UI' },
    ],
    sections: [
      {
        title: 'What I Built',
        body:
          'OpenPipe was built as a serious local platform for event-driven systems rather than a toy demo. It simulates multiple device classes, injects bad data on purpose, pushes events through Kafka, runs windowed stream jobs in PyFlink, and persists results into TimescaleDB for querying and inspection.',
      },
      {
        title: 'Why It Matters',
        body:
          'The point was to have one place where ingestion, stream processing, observability, and time-series persistence could be tested together. That made it useful both as a learning environment for real-time systems and as a proving ground for how operational data breaks in practice.',
      },
      {
        title: 'Architecture Notes',
        body:
          'The platform separates simulation, pipeline handling, and stream processing into distinct services. Kafka acts as the event spine, Flink handles windowed aggregation and alert generation, and FastAPI surfaces monitoring and query workflows so the pipeline is observable end to end.',
      },
      {
        title: 'What It Proves',
        body:
          'This is the strongest public example of data-platform work that goes beyond dashboards. It shows system design across message transport, processing semantics, operational monitoring, and developer usability.',
      },
    ],
  },
  {
    slug: 'pixel-desktop-remastered',
    title: 'Pixel Desktop Remastered',
    eyebrow: 'Retro Personal Site',
    summary:
      'A dual-mode personal site that keeps a Windows 95 shell while also presenting a cleaner reading view for experience, builds, and long-form writing.',
    image: '/projects/pixel-desktop-remastered-card.jpg',
    duration: '2025 - 2026',
    role: 'Product direction, interface design, frontend implementation, content architecture',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SEO'],
    links: [
      { label: 'Open Site', href: 'https://prithivraj.xyz' },
      { label: 'View Repo', href: 'https://github.com/prithivrajmu/pixel-desktop-remastered' },
    ],
    metrics: [
      { label: 'Modes', value: 'Win95 shell plus clean reading surface' },
      { label: 'Content', value: 'Experience, selected builds, article view, and contact flows' },
      { label: 'Search', value: 'Canonical tags, article metadata, sitemap, and feed generation' },
    ],
    sections: [
      {
        title: 'What I Built',
        body:
          'This site deliberately avoids a generic personal-site template. The Windows 95 layer is kept intact as the core interaction model, while the alternate reading view makes the experience usable for people who just want a fast understanding of the work and writing.',
      },
      {
        title: 'Why It Matters',
        body:
          'It is a good example of turning a strong interface idea into something that still respects clarity, discoverability, and search. The design has personality, but it is now paired with cleaner architecture, route-aware metadata, and more defensible content.',
      },
      {
        title: 'Architecture Notes',
        body:
          'The app uses React with route-level rendering for the shell, modern reading mode, blog articles, and project pages. Static search assets are generated from source content so feed, sitemap, and share imagery stay aligned with what is actually published.',
      },
      {
        title: 'What It Proves',
        body:
          'This project shows frontend ownership beyond visual polish. It includes content strategy, routing, metadata, and the discipline to make a distinctive UI still work as a serious professional surface.',
      },
    ],
  },
  {
    slug: 'pdfinvoicer',
    title: 'PDF Invoicer',
    eyebrow: 'Offline GST Invoice System',
    summary:
      'An offline-first GST invoice generator for small businesses, designed around privacy, local durability, and zero-recurring-cost operations.',
    image: '/projects/pdfinvoicer-card.jpg',
    duration: '2025',
    role: 'Product architecture, offline workflow design, frontend implementation',
    stack: ['React', 'TypeScript', 'IndexedDB', 'Firebase Auth', 'PWA', 'jsPDF'],
    links: [
      { label: 'Open App', href: 'https://app.ishvaryahospitality.com' },
      { label: 'View Repo', href: 'https://github.com/prithivrajmu/pdfinvoicer' },
    ],
    metrics: [
      { label: 'Mode', value: 'Offline-first with local persistence in IndexedDB' },
      { label: 'Compliance', value: 'GST flows with CGST, SGST, IGST, and HSN or SAC handling' },
      { label: 'Recovery', value: 'Optional Google Drive backup without forcing cloud dependence' },
    ],
    sections: [
      {
        title: 'What I Built',
        body:
          'PDF Invoicer is a business utility product rather than a showcase app. It handles invoice creation, local data storage, authentication, backup, and PDF generation in a way that keeps day-to-day invoicing usable even when connectivity is unreliable.',
      },
      {
        title: 'Why It Matters',
        body:
          'A lot of small-business software assumes permanent connectivity and server-side control. This project took the opposite approach: keep the workflow dependable locally first, protect private business data, and add cloud backup as an option rather than a requirement.',
      },
      {
        title: 'Architecture Notes',
        body:
          'The stack combines React and TypeScript with IndexedDB for local durability, Firebase for authentication, and PWA support so the product behaves like a practical desktop or mobile utility. The design choices center on low-friction operations rather than novelty.',
      },
      {
        title: 'What It Proves',
        body:
          'This is a good example of product thinking grounded in real constraints: compliance, privacy, resilience, and operator trust. It shows the ability to design software around business reality rather than around the easiest hosted architecture.',
      },
    ],
  },
];

export const getProjectCaseStudy = (slug: string) =>
  projectCaseStudies.find((project) => project.slug === slug);
