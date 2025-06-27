import React, { useState, useEffect } from 'react';
import { loadBlogPosts, loadSinglePost, BlogPost } from '../../data/blogPosts';

export const InternetExplorer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);

  // Load all posts for the home page
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  // Load individual post when navigating to a specific post
  useEffect(() => {
    if (currentPage !== 'home') {
      const loadPost = async () => {
        setPostLoading(true);
        try {
          const post = await loadSinglePost(currentPage);
          setCurrentPost(post);
        } catch (error) {
          console.error('Failed to load post:', error);
        } finally {
          setPostLoading(false);
        }
      };
      
      loadPost();
    }
  }, [currentPage]);

  if (loading) {
    return (
      <div className="bg-white h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg mb-2">Loading...</div>
          <div className="text-sm text-gray-600">Please wait while the blog loads</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Browser Navigation */}
      <div className="bg-gray-200 border-b-2 border-gray-400 p-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">http://prithivraj.portfolio/blog{currentPage !== 'home' ? `/${currentPage}` : ''}</span>
            <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs" style={{ borderStyle: 'outset' }}>
              Go
            </button>
          </div>
          <div className="flex space-x-1">
            <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs" style={{ borderStyle: 'outset' }}>Back</button>
            <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs" style={{ borderStyle: 'outset' }}>Forward</button>
            <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs" style={{ borderStyle: 'outset' }}>Stop</button>
            <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs" style={{ borderStyle: 'outset' }}>Refresh</button>
            <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs" style={{ borderStyle: 'outset' }}>Home</button>
          </div>
        </div>

        <div className="border-b border-gray-400 mb-4 pb-2">
          <h1 className="text-2xl font-bold mb-2">Prithiv's Developer Blog</h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
        {currentPage === 'home' && (
          <div>
            <header className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Prithiv's Developer Blog</h1>
              <div className="text-sm text-gray-600">
                <em>Thoughts on Technology, Development, and Digital Innovation</em>
              </div>
              <hr className="my-4 border-gray-400" />
            </header>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-lg font-bold mb-4">Recent Articles</h2>
              
              {blogPosts.map((article) => (
                <div key={article.id} className="mb-6 pb-4 border-b border-gray-300">
                  <h3 className="text-base font-bold mb-1">
                    <a 
                      href="#" 
                      className="text-blue-600 underline hover:text-purple-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(article.id);
                      }}
                    >
                      {article.title}
                    </a>
                  </h3>
                  <div className="text-xs text-gray-600 mb-2">
                    Published: {article.date}
                  </div>
                  <p className="text-sm leading-relaxed">{article.preview}</p>
                  <div className="text-xs mt-2">
                    <a 
                      href="#" 
                      className="text-blue-600 underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(article.id);
                      }}
                    >
                      Read more...
                    </a>
                  </div>
                </div>
              ))}

              <div className="mt-8 text-center">
                <hr className="mb-4 border-gray-400" />
                <div className="text-xs text-gray-600">
                  <p>© 1995 Prithiv Raj. All rights reserved.</p>
                  <p>Best viewed in Netscape Navigator 2.0 or Internet Explorer 3.0</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage !== 'home' && (
          <div>
            <div className="mb-4">
              <button 
                className="text-blue-600 underline text-sm"
                onClick={() => setCurrentPage('home')}
              >
                ← Back to Blog Home
              </button>
            </div>
            {postLoading ? (
              <div className="text-center py-8">
                <div className="text-lg mb-2">Loading article...</div>
              </div>
            ) : currentPost ? (
              <div className="max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">{currentPost.title}</h1>
                <div className="text-sm text-gray-600 mb-6">
                  Published: {currentPost.date}
                </div>
                <div className="prose prose-sm whitespace-pre-line">
                  {currentPost.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-lg mb-2">Article not found</div>
                <div className="text-sm text-gray-600">The requested article could not be loaded.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
