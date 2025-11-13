import React, { useEffect, useMemo } from 'react';
import { portfolioProjects, portfolioProjectsList, contactInfo, education, summary } from '@/data/portfolioData';

interface SEOStructuredDataProps {
  type?: 'home' | 'blog' | 'blogPost';
  blogPost?: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };
}

export const SEOStructuredData: React.FC<SEOStructuredDataProps> = ({ type = 'home', blogPost }) => {
  const baseUrl = 'https://prithivraj.xyz';
  
  // Memoize schemas to avoid recreating on every render
  const personSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prithiv Raj",
    "url": baseUrl,
    "image": `${baseUrl}/og-image.jpg`,
    "jobTitle": "Technical Lead Engineer",
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
  }), [contactInfo.email, contactInfo.phone, contactInfo.github, contactInfo.linkedin, contactInfo.website, education, summary]);

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
      "jobTitle": "Technical Lead Engineer",
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
  }), [contactInfo.email, contactInfo.github, contactInfo.linkedin, contactInfo.website, summary]);

  // Portfolio/Collection Schema
  const portfolioSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Prithiv Raj Portfolio Projects",
    "description": "Featured software projects and work experience",
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
  }), [portfolioProjectsList, baseUrl]);

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
  }), [portfolioProjects]);

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
  } : null, [blogPost, baseUrl]);

  // Website Schema
  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Prithiv Raj Portfolio",
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
  }), [summary, baseUrl]);

  useEffect(() => {
    const schemas = [];
    
    if (type === 'home') {
      schemas.push(personSchema, profileSchema, portfolioSchema, workExperienceSchema, websiteSchema);
    } else if (type === 'blogPost' && blogPostSchema) {
      schemas.push(personSchema, blogPostSchema, websiteSchema);
    } else if (type === 'blog') {
      schemas.push(personSchema, websiteSchema);
    }

    // Remove any existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data scripts to head
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [type, blogPost]);

  return null;
};

