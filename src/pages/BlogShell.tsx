import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const { postId } = useParams<{ postId?: string }>();
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
          if (!cancelled) {
            setCurrentPost(post);
          }
        } else {
          setCurrentPost(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  const featuredPost = useMemo(() => posts[0] ?? null, [posts]);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-stone-900">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </div>

        {loading ? (
          <div className="rounded-[28px] border border-stone-300 bg-white/85 px-8 py-20 text-center shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Loading</p>
            <h1 className="mt-4 text-3xl font-black">Preparing the article desk</h1>
          </div>
        ) : postId ? (
          currentPost ? (
            <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="rounded-[24px] border border-stone-300 bg-white/80 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.05)]">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Articles</p>
                  <div className="mt-5 space-y-4">
                    {posts.map((post) => {
                      const isActive = post.slug === currentPost.slug;
                      return (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className={`block border-l-2 pl-4 transition ${
                            isActive
                              ? "border-stone-900 text-stone-900"
                              : "border-transparent text-stone-500 hover:border-stone-400 hover:text-stone-900"
                          }`}
                        >
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
                            {formatDate(post.date)}
                          </p>
                          <p className="mt-1 text-lg font-bold leading-6">{post.title}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>

              <article className="rounded-[32px] border border-stone-300 bg-white px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:px-10 sm:py-12 lg:px-14">
                <div className="mx-auto max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">
                    Essay
                  </p>
                  <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                    {currentPost.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
                    {currentPost.preview}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                    <span>{formatDate(currentPost.date)}</span>
                    <span className="h-1 w-1 rounded-full bg-stone-400" />
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5" />
                      {estimateReadTime(currentPost.content)}
                    </span>
                  </div>

                  <div className="my-10 border-t border-stone-200" />

                  <div
                    className="prose prose-stone prose-lg max-w-none prose-headings:font-black prose-headings:tracking-[-0.03em] prose-p:text-[1.18rem] prose-p:leading-9 prose-li:text-[1.1rem] prose-li:leading-8 prose-a:text-stone-900 prose-a:underline-offset-4 prose-strong:text-stone-900"
                    dangerouslySetInnerHTML={{ __html: marked.parse(currentPost.content) as string }}
                  />
                </div>
              </article>
            </div>
          ) : (
            <div className="rounded-[28px] border border-stone-300 bg-white/85 px-8 py-20 text-center shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Not Found</p>
              <h1 className="mt-4 text-3xl font-black">That article does not exist.</h1>
              <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">
                View all writing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )
        ) : (
          <div className="space-y-8">
            <section className="rounded-[32px] border border-stone-300 bg-white/85 px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:px-10 sm:py-12">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">Writing</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                Long-form notes on systems, product decisions, and work that deserves more than a project tile.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
                The portfolio stays concise. The writing lives here as full pages with room to read properly.
              </p>
              {featuredPost && (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="mt-8 inline-flex items-center gap-2 border-2 border-stone-900 bg-[#000080] px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.8)]"
                >
                  Start with the latest article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group rounded-[24px] border border-stone-300 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:border-stone-900 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.03em]">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-stone-600">
                    {post.preview}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">
                    Read article
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogShell;
