import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

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
}

export const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  title = 'Prithiv Raj - Technical Lead Engineer & Full-Stack Developer',
  description = 'Technical Lead Engineer with 9+ years of experience in data, software, operations research, and managing technical teams.',
  keywords = 'Prithiv Raj, Full-Stack Developer, Data Engineer, Technical Lead, React, TypeScript, Supabase',
  image = 'https://prithivraj.xyz/og-image.jpg',
  url = 'https://prithivraj.xyz',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Prithiv Raj'
}) => {
  const fullTitle = title.includes('Prithiv Raj') ? title : `${title} | Prithiv Raj`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article specific */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

