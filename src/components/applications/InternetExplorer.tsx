
import React, { useState } from 'react';

export const InternetExplorer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const articles = [
    {
      id: 'modern-web-dev',
      title: 'The Evolution of Web Development',
      date: '1995-10-15',
      preview: 'Exploring how web technologies have evolved from simple HTML pages to complex applications...'
    },
    {
      id: 'retro-computing',
      title: 'Why Retro Computing Still Matters',
      date: '1995-09-20',
      preview: 'A look at how classic computing interfaces can inspire modern design...'
    },
    {
      id: 'javascript-future',
      title: 'The Future of JavaScript',
      date: '1995-08-10',
      preview: 'Predictions about where JavaScript might be heading in the coming years...'
    }
  ];

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Browser Navigation */}
      <div className="bg-gray-200 border-b-2 border-gray-400 p-2">
        <div className="flex items-center space-x-2 mb-2">
          <button className="bg-gray-300 border border-gray-400 px-2 py-1 text-xs" style={{ borderStyle: 'outset' }}>Back</button>
          <button className="bg-gray-300 border border-gray-400 px-2 py-1 text-xs" style={{ borderStyle: 'outset' }}>Forward</button>
          <button className="bg-gray-300 border border-gray-400 px-2 py-1 text-xs" style={{ borderStyle: 'outset' }}>Stop</button>
          <button className="bg-gray-300 border border-gray-400 px-2 py-1 text-xs" style={{ borderStyle: 'outset' }}>Refresh</button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs">Address:</span>
          <div className="flex-1 bg-white border border-gray-400 px-2 py-1 text-xs" style={{ borderStyle: 'inset' }}>
            http://johndeveloper.portfolio/blog
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
        {currentPage === 'home' && (
          <div>
            <header className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">John's Developer Blog</h1>
              <div className="text-sm text-gray-600">
                <em>Thoughts on Technology, Development, and Digital Innovation</em>
              </div>
              <hr className="my-4 border-gray-400" />
            </header>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-lg font-bold mb-4">Recent Articles</h2>
              
              {articles.map((article) => (
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
                  <p>© 1995 John Developer. All rights reserved.</p>
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
            <div className="max-w-2xl mx-auto">
              <h1 className="text-xl font-bold mb-4">
                {articles.find(a => a.id === currentPage)?.title}
              </h1>
              <div className="text-sm text-gray-600 mb-6">
                Published: {articles.find(a => a.id === currentPage)?.date}
              </div>
              <div className="prose prose-sm">
                <p>This is where the full article content would appear. In a real implementation, you would fetch the article content based on the ID and display it here.</p>
                <p>The article would include detailed insights, code examples, and thoughtful commentary on the topic at hand.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
