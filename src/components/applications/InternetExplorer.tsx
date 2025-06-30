import React, { useState, useEffect } from 'react';
import { loadBlogPosts, loadSinglePost, BlogPost } from '../../data/blogPosts';
import { useSounds } from '../SoundManager';

export const InternetExplorer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const sounds = useSounds();

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
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1">
        <div className="flex text-xs">
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">File</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Edit</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">View</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Go</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Favorites</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Help</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1">
        <div className="flex items-center gap-1 mb-1">
          {/* Navigation Buttons */}
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Back"
            onClick={() => {
              if (currentPage !== 'home') {
                sounds.playClick();
                setCurrentPage('home');
              }
            }}
          >
            ←
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Forward"
          >
            →
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Stop"
          >
            ⊠
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Refresh"
          >
            ↻
          </button>
          <button 
            className="w-6 h-6 bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            style={{ borderStyle: 'outset' }}
            title="Home"
            onClick={() => {
              sounds.playClick();
              setCurrentPage('home');
            }}
          >
            🏠
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <span className="text-blue-600">http://prithivraj.portfolio/blog{currentPage !== 'home' ? `/${currentPage}` : ''}</span>
          </div>
          <button className="px-2 py-0.5 bg-[#c0c0c0] border border-[#808080] text-xs hover:bg-[#e0e0e0]" style={{ borderStyle: 'outset' }}>
            Go
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
        <div className="p-6">
          {currentPage === 'home' && (
            <div>
              <header className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Prithiv's Developer Blog</h1>
                <div className="text-sm text-gray-600">
                  <em>Thoughts on Technology, Life, and Digital Innovation</em>
                </div>
                <hr className="my-4 border-gray-400" />
              </header>

              <div>
                <h2 className="text-lg font-bold mb-4">Recent Posts</h2>
                
                {blogPosts.length > 0 ? (
                  blogPosts.map((article) => (
                    <div key={article.id} className="mb-6 pb-4 border-b border-gray-300">
                      <h3 className="text-base font-bold mb-1">
                        <a 
                          href="#" 
                          className="text-blue-600 underline hover:text-purple-600"
                          onClick={(e) => {
                            e.preventDefault();
                            sounds.playDialUpConnect();
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
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-bold mb-2">No Articles Yet</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      I haven't written anything yet, but stay tuned!<br/>
                      Great things are coming soon.
                    </p>
                    <div className="text-xs text-gray-500 italic">
                      "The best time to plant a tree was 20 years ago.<br/>
                      The second best time is now." - Chinese Proverb
                    </div>
                  </div>
                )}

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
                <div>
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

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            {currentPage === 'home' 
              ? blogPosts.length > 0 
                ? `${blogPosts.length} articles available` 
                : 'No articles yet'
              : 'Article loaded'
            }
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            Internet - World Wide Web
          </div>
        </div>
      </div>
    </div>
  );
};
