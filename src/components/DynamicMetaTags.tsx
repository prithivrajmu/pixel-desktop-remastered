import { useEffect } from 'react';

interface DynamicMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  robots?: string;
}

export const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  title = 'Prithiv Raj | Data Architect and Senior Data Engineer',
  description = 'Senior data engineer turned data architect building data platforms, internal software, and AI-enabled applications.',
  keywords = 'Prithiv Raj, Data Architect, Senior Data Engineer, Full-Stack Engineer, AI Inference, Data Platforms, React, TypeScript, PostgreSQL, Supabase',
  image = 'https://prithivraj.xyz/og-image.jpg',
  url = 'https://prithivraj.xyz',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Prithiv Raj',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}) => {
  const fullTitle = title.includes('Prithiv Raj') ? title : `${title} | Prithiv Raj`;
  const googleSiteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

  useEffect(() => {
    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLink = (selector: string, rel: string, href: string) => {
      let element = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const removeMeta = (selector: string) => {
      const element = document.head.querySelector(selector);
      if (element) {
        element.remove();
      }
    };

    document.title = fullTitle;

    setMeta('meta[name="title"]', 'name', 'title', fullTitle);
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMeta('meta[name="robots"]', 'name', 'robots', robots);

    if (googleSiteVerification) {
      setMeta(
        'meta[name="google-site-verification"]',
        'name',
        'google-site-verification',
        googleSiteVerification
      );
    }

    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Prithiv Raj');

    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', url);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    setMeta('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@prithivrajmu');

    setLink('link[rel="canonical"]', 'canonical', url);

    if (type === 'article') {
      if (publishedTime) {
        setMeta(
          'meta[property="article:published_time"]',
          'property',
          'article:published_time',
          publishedTime
        );
      }
      if (modifiedTime) {
        setMeta(
          'meta[property="article:modified_time"]',
          'property',
          'article:modified_time',
          modifiedTime
        );
      }
      setMeta('meta[property="article:author"]', 'property', 'article:author', author);
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
      removeMeta('meta[property="article:author"]');
    }
  }, [
    author,
    description,
    fullTitle,
    googleSiteVerification,
    image,
    keywords,
    modifiedTime,
    publishedTime,
    robots,
    type,
    url,
  ]);
  
  return null;
};
