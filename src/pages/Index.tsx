import React, { useMemo, useEffect, useState } from "react";
import { Desktop } from "@/components/Desktop";
import { useLocation, useSearchParams } from "react-router-dom";
import ModernPortfolio from "./ModernPortfolio";
import BlogShell from "./BlogShell";
import { Win95ModeDialog, useWin95ModePreference } from "@/components/Win95ModeDialog";
import { DynamicMetaTags } from "@/components/DynamicMetaTags";
import { SEOStructuredData } from "@/components/SEOStructuredData";
import { findPostByIdOrSlug, type BlogPost } from "@/data/blogPosts";

const Index: React.FC = () => {
  // Initialize router hooks first - these must be called unconditionally
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Then initialize our custom hook
  const { mode, showDialog, setShowDialog, handleModeSelect } = useWin95ModePreference();
  
  // Check URL parameter for mode override
  const urlMode = searchParams.get('mode') as 'modern' | 'win95' | null;
  const currentMode = urlMode || mode || 'modern';
  const [currentBlogPost, setCurrentBlogPost] = useState<BlogPost | null>(null);

  // Determine if the current path is /blog or /blog/:id
  const blogInfo = useMemo(() => {
    const match = location.pathname.match(/^\/blog(?:\/(.*))?$/);
    if (match) {
      return {
        isBlog: true,
        postId: match[1] || "home",
      } as const;
    }
    return { isBlog: false, postId: null } as const;
  }, [location.pathname]);

  // Show Win95 mode for blog routes or if explicitly set to win95
  const shouldShowWin95 = currentMode === 'win95' && !blogInfo.isBlog;

  // Add data attribute to body/html to distinguish between modes for CSS
  useEffect(() => {
    if (shouldShowWin95) {
      document.documentElement.setAttribute('data-mode', 'win95');
      document.body.setAttribute('data-mode', 'win95');
    } else {
      document.documentElement.setAttribute('data-mode', 'modern');
      document.body.setAttribute('data-mode', 'modern');
    }
  }, [shouldShowWin95]);

  useEffect(() => {
    if (!blogInfo.isBlog || !blogInfo.postId || blogInfo.postId === 'home') {
      setCurrentBlogPost(null);
      return;
    }

    let cancelled = false;

    const loadPost = async () => {
      const post = await findPostByIdOrSlug(blogInfo.postId);
      if (!cancelled) {
        setCurrentBlogPost(post);
      }
    };

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [blogInfo.isBlog, blogInfo.postId]);

  const isWin95QueryMode = urlMode === 'win95';
  const rootUrl = 'https://prithivraj.xyz';
  const blogUrl = blogInfo.postId && blogInfo.postId !== 'home'
    ? `${rootUrl}/blog/${blogInfo.postId}`
    : `${rootUrl}/blog`;

  return (
    <>
      {blogInfo.isBlog ? (
        currentBlogPost ? (
          <>
            <DynamicMetaTags
              title={currentBlogPost.title}
              description={currentBlogPost.preview}
              url={`${rootUrl}/blog/${currentBlogPost.slug}`}
              type="article"
              publishedTime={currentBlogPost.date}
              modifiedTime={currentBlogPost.date}
              keywords={`Prithiv Raj, ${currentBlogPost.title}, data engineering, data architecture, AI systems`}
            />
            <SEOStructuredData
              type="blogPost"
              blogPost={{
                title: currentBlogPost.title,
                description: currentBlogPost.preview,
                date: currentBlogPost.date,
                slug: currentBlogPost.slug,
              }}
            />
          </>
        ) : (
          <>
            <DynamicMetaTags
              title="Blog"
              description="Writing on data systems, internal software, AI-enabled products, and applied engineering work."
              url={blogUrl}
              keywords="Prithiv Raj blog, data engineering, data architecture, AI systems, software engineering"
            />
            <SEOStructuredData type="blog" />
          </>
        )
      ) : (
        <>
          <DynamicMetaTags
            title="Prithiv Raj | Data Architect and Senior Data Engineer"
            description="Senior data engineer turned data architect building data platforms, internal software, and AI-enabled applications."
            url={rootUrl}
            robots={
              isWin95QueryMode
                ? 'noindex, nofollow, noarchive'
                : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
            }
          />
          <SEOStructuredData type="home" />
        </>
      )}
      <Win95ModeDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSelectMode={handleModeSelect}
      />
      {blogInfo.isBlog ? (
        <BlogShell />
      ) : shouldShowWin95 ? (
        <Desktop autoOpenWindows={[]} />
      ) : (
        <ModernPortfolio />
      )}
    </>
  );
};

export default Index;
