import React, { useState, useEffect } from 'react';
import { loadBlogPosts, findPostByIdOrSlug, type BlogPost } from '../../data/blogPosts';
import { useSounds } from '../SoundManager';
import { useScreenSize } from '../../hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

// Very small markdown-to-HTML helper (links & line breaks only)
const mdToHtml = (markdown: string) => {
     // Convert horizontal rules first
   let text = markdown.replace(/^---+\s*$/gm, '<hr style="margin: 2em 0; border: none; border-top: 1px solid #ccc;"/>');
  
  // Split into lines and process lists and paragraphs
  const lines = text.split('\n');
  const processed: string[] = [];
  let inList = false;
  let currentParagraph: string[] = [];
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join(' ').trim();
             if (content) {
         processed.push(`<p style="margin: 1em 0; line-height: 1.6;">${content}</p>`);
       }
      currentParagraph = [];
    }
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Handle horizontal rules
    if (trimmed === '<hr/>') {
      flushParagraph();
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
             processed.push('<hr style="margin: 2em 0; border: none; border-top: 1px solid #ccc;"/>');
       continue;
     }
     
     // Handle headings
    if (/^#{1,3}\s+/.test(trimmed)) {
      flushParagraph();
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
             if (trimmed.startsWith('### ')) {
         processed.push(`<h3 style="margin: 1.5em 0 0.5em 0; font-size: 1.2em; font-weight: bold;">${trimmed.substring(4)}</h3>`);
       } else if (trimmed.startsWith('## ')) {
         processed.push(`<h2 style="margin: 1.8em 0 0.6em 0; font-size: 1.4em; font-weight: bold;">${trimmed.substring(3)}</h2>`);
       } else if (trimmed.startsWith('# ')) {
         processed.push(`<h1 style="margin: 2em 0 0.8em 0; font-size: 1.6em; font-weight: bold;">${trimmed.substring(2)}</h1>`);
       }
      continue;
    }
    
    // Handle list items
    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
             if (!inList) {
         processed.push('<ul style="margin: 1em 0; padding-left: 2em;">');
         inList = true;
       }
       const item = trimmed.replace(/^[-*]\s+/, '');
       processed.push(`<li style="margin: 0.3em 0;">${item}</li>`);
      continue;
    }
    
    // Handle empty lines
    if (!trimmed) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      flushParagraph();
      continue;
    }
    
    // Regular text - add to current paragraph
    if (inList) {
      processed.push('</ul>');
      inList = false;
    }
    currentParagraph.push(trimmed);
  }
  
  // Flush any remaining paragraph
  flushParagraph();
  if (inList) {
    processed.push('</ul>');
  }
  
  // Join and apply inline formatting
  let html = processed.join('')
    // links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // bold **text** or __text__
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // italics *text* or _text_ (but not list items)
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    .replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>');
    
  return html;
};

interface InternetExplorerProps {
  /** When provided, the window starts on that page instead of the blog home */
  initialPage?: string;
}

export const InternetExplorer: React.FC<InternetExplorerProps> = ({ initialPage = 'home' }) => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const sounds = useSounds();
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  // Apply initial page on mount / when prop changes
  useEffect(() => {
    setCurrentPage(initialPage || 'home');
  }, [initialPage]);

  // Load all posts for the home page and cache them
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

  // Load individual post when navigating to a specific post (after posts are loaded)
  useEffect(() => {
    if (currentPage !== 'home' && !loading) {
      const loadPost = async () => {
        setPostLoading(true);
        try {
          const post = await findPostByIdOrSlug(currentPage);
          setCurrentPost(post);
          if (!post) {
            console.warn(`Blog post not found: ${currentPage}`);
          }
        } catch (error) {
          console.error('Failed to load post:', error);
          setCurrentPost(null);
        } finally {
          setPostLoading(false);
        }
      };
      
      loadPost();
    } else if (currentPage === 'home') {
      setCurrentPost(null);
    }
  }, [currentPage, loading]);

  // Keep the URL in sync when page changes (so address bar & back/forward work)
  useEffect(() => {
    if (currentPage === 'home') navigate('/blog', { replace: true });
    else navigate(`/blog/${currentPage}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex items-center gap-1 mb-1 overflow-x-auto">
          {/* Navigation Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
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
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Forward"
          >
            →
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Stop"
          >
            ⊠
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
            title="Refresh"
          >
            ↻
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              height: screenSize.isMobile ? '36px' : screenSize.isTablet ? '28px' : '24px',
              touchAction: 'manipulation',
              fontSize: screenSize.isMobile ? '14px' : '12px'
            }}
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
          <span className={screenSize.isMobile ? 'text-xs' : 'text-xs'}>Address:</span>
          <div className={`flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 ${
            screenSize.isMobile ? 'text-xs' : 'text-xs'
          }`} style={{ borderStyle: 'inset' }}>
            <span className="text-blue-600">http://prithivraj.portfolio/blog{currentPage !== 'home' ? `/${currentPage}` : ''}</span>
          </div>
          <button 
            className={`px-2 py-0.5 bg-[#c0c0c0] border border-[#808080] text-xs hover:bg-[#e0e0e0] flex-shrink-0 ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`} 
            style={{ 
              borderStyle: 'outset',
              minHeight: screenSize.isMobile ? '36px' : 'auto',
              touchAction: 'manipulation'
            }}
          >
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
                            setCurrentPage(article.slug);
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
                            setCurrentPage(article.slug);
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
                  <div 
                    className="prose prose-sm" 
                    style={{
                      lineHeight: '1.6',
                      maxWidth: 'none'
                    }}
                    dangerouslySetInnerHTML={{ __html: mdToHtml(currentPost.content) }} 
                  />
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
