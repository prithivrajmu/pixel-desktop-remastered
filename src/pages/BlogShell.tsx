import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { marked } from "marked";
import { findPostByIdOrSlug, loadBlogPosts, type BlogPost } from "@/data/blogPosts";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const estimateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(3, Math.ceil(words / 220))} min read`;
};

const BlogShell: React.FC = () => {
  const location = useLocation();
  const postId = useMemo(() => {
    const match = location.pathname.match(/^\/blog\/(.+)$/);
    return match?.[1] || undefined;
  }, [location.pathname]);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const allPosts = await loadBlogPosts();
        if (cancelled) return;
        setPosts(allPosts);
        if (postId) {
          const post = await findPostByIdOrSlug(postId);
          if (!cancelled) setCurrentPost(post);
        } else {
          setCurrentPost(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [postId]);

  const currentIndex = useMemo(
    () => posts.findIndex((p) => p.slug === currentPost?.slug),
    [posts, currentPost]
  );
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-[680px] px-6 py-32 text-center">
          <p className="text-sm uppercase tracking-widest text-stone-400">Loading</p>
        </div>
      </main>
    );
  }

  // ── Article reading view ─────────────────────────────────────────────────
  if (postId) {
    if (!currentPost) {
      return (
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-[680px] px-6 py-32 text-center">
            <p className="text-sm uppercase tracking-widest text-stone-400">Not found</p>
            <h1 className="mt-4 text-2xl font-bold text-stone-900">That article doesn't exist.</h1>
            <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 underline underline-offset-4 hover:text-stone-900">
              Back to all writing
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white text-stone-900">

        {/* Top bar — system font intentionally, it's UI not content */}
        <div className="sticky top-0 z-10 border-b border-stone-100 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[780px] items-center justify-between px-6 py-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-900"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
            <span className="text-sm font-semibold text-stone-400">Prithiv Raj</span>
            <span className="text-sm text-stone-400">{estimateReadTime(currentPost.content)}</span>
          </div>
        </div>

        {/* Article — blog-reading forces Georgia serif on every child */}
        <article className="blog-reading mx-auto max-w-[680px] px-6 pb-32 pt-16">

          {/* Header */}
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              {formatDate(currentPost.date)}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl">
              {currentPost.title}
            </h1>
            <p className="mt-6 text-xl leading-[1.7] text-stone-500">
              {currentPost.preview}
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-stone-400">
              <span>Prithiv Raj</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {estimateReadTime(currentPost.content)}
              </span>
            </div>
          </header>

          <hr className="border-stone-200" />

          {/* Body */}
          <div
            className="
              mt-12
              prose prose-stone max-w-none
              prose-p:text-[1.175rem] prose-p:leading-[1.9] prose-p:text-stone-700 prose-p:mb-8
              prose-h1:font-bold prose-h1:mt-0
              prose-h2:text-[1.5rem] prose-h2:font-bold prose-h2:text-stone-900 prose-h2:mt-16 prose-h2:mb-5 prose-h2:leading-snug
              prose-h3:text-[1.25rem] prose-h3:font-bold prose-h3:text-stone-900 prose-h3:mt-12 prose-h3:mb-4
              prose-li:text-[1.1rem] prose-li:leading-[1.85] prose-li:text-stone-700
              prose-ul:my-8 prose-ol:my-8 prose-ul:space-y-2 prose-ol:space-y-2
              prose-hr:my-16 prose-hr:border-stone-200
              prose-blockquote:border-l-[3px] prose-blockquote:border-stone-300 prose-blockquote:pl-6 prose-blockquote:not-italic prose-blockquote:text-stone-500
              prose-strong:text-stone-900 prose-strong:font-semibold
              prose-a:text-stone-900 prose-a:underline prose-a:underline-offset-[3px] prose-a:decoration-stone-400 hover:prose-a:decoration-stone-900
              prose-code:text-[0.875em] prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-stone-800
              prose-pre:bg-stone-950 prose-pre:text-stone-100 prose-pre:rounded-lg
            "
            dangerouslySetInnerHTML={{ __html: marked.parse(currentPost.content) as string }}
          />

          {/* Prev / Next */}
          {(prevPost || nextPost) && (
            <nav className="mt-20 border-t border-stone-200 pt-10">
              <div className="grid gap-6 sm:grid-cols-2">
                {prevPost ? (
                  <Link to={`/blog/${prevPost.slug}`} className="group flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 transition group-hover:text-stone-600">
                      ← Previous
                    </span>
                    <span className="text-base font-semibold leading-snug text-stone-800 transition group-hover:text-stone-900">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : <div />}
                {nextPost && (
                  <Link to={`/blog/${nextPost.slug}`} className="group flex flex-col items-end gap-1 text-right">
                    <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 transition group-hover:text-stone-600">
                      Next →
                    </span>
                    <span className="text-base font-semibold leading-snug text-stone-800 transition group-hover:text-stone-900">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          )}

          <div className="mt-12 text-center">
            <Link to="/" className="text-sm text-stone-400 underline underline-offset-4 hover:text-stone-700">
              Back to portfolio
            </Link>
          </div>
        </article>
      </main>
    );
  }

  // ── Blog home ────────────────────────────────────────────────────────────
  return (
    <main className="blog-reading min-h-screen bg-white text-stone-900">

      {/* Masthead */}
      <div className="border-b border-stone-100">
        <div className="mx-auto max-w-[780px] px-6 py-12 sm:py-16">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-stone-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to portfolio
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Writing</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-5xl">
            Long-form notes on systems, decisions, and the work behind the work.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-500">
            If you want to understand how something was built, or why a decision went the way it did — this is where that lives.
          </p>
        </div>
      </div>

      {/* Article list */}
      <div className="mx-auto max-w-[780px] px-6 py-10">
        <div className="divide-y divide-stone-100">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block py-9 transition"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                {formatDate(post.date)}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-stone-900 transition group-hover:text-stone-600 sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-3 text-base leading-[1.75] text-stone-500">
                {post.preview}
              </p>
              <div className="mt-5 flex items-center gap-3 text-sm text-stone-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {estimateReadTime(post.content)}
                </span>
                <span>·</span>
                <span className="font-semibold text-stone-500 transition group-hover:text-stone-900">
                  Read article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogShell;
