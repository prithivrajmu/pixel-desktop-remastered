import React, { useEffect, useMemo } from 'react';
import { portfolioProjects, portfolioProjectsList, contactInfo, education, summary } from '@/data/portfolioData';

interface SEOStructuredDataProps {
  type?: 'home' | 'blog' | 'blogPost' | 'project';
  blogPost?: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };
  project?: {
    title: string;
    description: string;
    slug: string;
    image: string;
    tech: string[];
    url: string;
  };
}

export const SEOStructuredData: React.FC<SEOStructuredDataProps> = ({ type = 'home', blogPost, project }) => {
  const baseUrl = 'https://prithivraj.xyz';
  
  // Create schemas - using useMemo with stable dependencies
  const personSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prithiv Raj",
    "url": baseUrl,
    "image": `${baseUrl}/og-image.jpg`,
    "jobTitle": "Data Architect",
    "worksFor": {
      "@type": "Organization",
      "name": "Headwind Labs"
    },
    "email": contactInfo.email,
    "telephone": contactInfo.phone || undefined,
    "sameAs": [
      contactInfo.github,
      contactInfo.linkedin,
      contactInfo.website
    ],
    "alumniOf": education.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": edu.location
      }
    })),
    "knowsAbout": [
      "Full-Stack Development",
      "Data Engineering",
      "Machine Learning",
      "React",
      "TypeScript",
      "Supabase",
      "Operations Research",
      "AI/ML",
      "Software Architecture"
    ],
    "description": summary
  }), []);

  // Professional Profile Schema
  const profileSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Prithiv Raj",
      "description": summary,
      "url": baseUrl,
      "image": `${baseUrl}/og-image.jpg`,
      "jobTitle": "Data Architect",
      "worksFor": {
        "@type": "Organization",
        "name": "Headwind Labs"
      },
      "email": contactInfo.email,
      "sameAs": [
        contactInfo.github,
        contactInfo.linkedin,
        contactInfo.website
      ].filter(Boolean)
    }
  }), []);

  // Portfolio/Collection Schema
  const portfolioSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Prithiv Raj Projects",
    "description": "Selected software systems, internal tools, and data platform work",
    "itemListElement": portfolioProjectsList.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": project.name,
        "description": project.description,
        "applicationCategory": "WebApplication",
        "operatingSystem": "Web",
        "url": project.url || baseUrl,
        "keywords": project.tech.join(", ")
      }
    }))
  }), []);

  // Work Experience Schema
  const workExperienceSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prithiv Raj",
    "hasOccupation": portfolioProjects.map(project => ({
      "@type": "Occupation",
      "name": project.name,
      "occupationLocation": {
        "@type": "Place",
        "name": project.name.split(' - ')[0]
      },
      "description": project.description,
      "skills": project.tech
    }))
  }), []);

  // Blog Post Schema
  const blogPostSchema = useMemo(() => blogPost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "description": blogPost.description,
    "author": {
      "@type": "Person",
      "name": "Prithiv Raj",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Person",
      "name": "Prithiv Raj",
      "url": baseUrl
    },
    "datePublished": blogPost.date,
    "dateModified": blogPost.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${blogPost.slug}`
    },
    "url": `${baseUrl}/blog/${blogPost.slug}`
  } : null, [blogPost?.slug, blogPost?.title, blogPost?.description, blogPost?.date]);

  const projectSchema = useMemo(() => project ? {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description,
    "url": `${baseUrl}/projects/${project.slug}`,
    "codeRepository": project.url.startsWith('https://github.com') ? project.url : undefined,
    "image": `${baseUrl}${project.image}`,
    "programmingLanguage": project.tech,
    "author": {
      "@type": "Person",
      "name": "Prithiv Raj",
      "url": baseUrl
    }
  } : null, [project]);

  // Website Schema
  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Prithiv Raj",
    "url": baseUrl,
    "description": summary,
    "author": {
      "@type": "Person",
      "name": "Prithiv Raj"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }), []);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Build schemas array based on type
    const schemas = [];
    
    if (type === 'home') {
      schemas.push(personSchema, profileSchema, portfolioSchema, workExperienceSchema, websiteSchema);
    } else if (type === 'blogPost' && blogPostSchema) {
      schemas.push(personSchema, blogPostSchema, websiteSchema);
    } else if (type === 'blog') {
      schemas.push(personSchema, websiteSchema);
    } else if (type === 'project' && projectSchema) {
      schemas.push(personSchema, projectSchema, websiteSchema);
    }

    // Remove any existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data scripts to head
    schemas.forEach((schema) => {
      if (schema) {
        try {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.text = JSON.stringify(schema);
          document.head.appendChild(script);
        } catch (error) {
          console.error('Error adding structured data script:', error);
        }
      }
    });

    // Cleanup function
    return () => {
      try {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => script.remove());
      } catch (error) {
        console.error('Error removing structured data scripts:', error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, blogPost]);

  return null;
};
