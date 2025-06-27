export interface BlogPost {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  preview: string;
  content: string;
}

// List of available blog post IDs - add new post IDs here
const availablePostIds = [
  'modern-web-dev',
  'retro-computing', 
  'javascript-future'
];

// Function to load a single blog post
const loadBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/blog/posts/${id}.json`);
    if (response.ok) {
      const post = await response.json();
      return post;
    }
  } catch (error) {
    console.warn(`Could not load blog post: ${id}`);
  }
  return null;
};

// Function to load all blog posts from individual files
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Load all posts in parallel
    const postPromises = availablePostIds.map(id => loadBlogPost(id));
    const posts = await Promise.all(postPromises);
    
    // Filter out failed loads and sort by date (newest first)
    const validPosts = posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return validPosts;
  } catch (error) {
    console.warn('Could not load blog posts from external files, using fallback data');
    return fallbackPosts;
  }
};

// Function to load a single post by ID
export const loadSinglePost = async (id: string): Promise<BlogPost | null> => {
  return loadBlogPost(id);
};

// Fallback posts if external files fail
const fallbackPosts: BlogPost[] = [
  {
    id: 'modern-web-dev',
    title: 'The Evolution of Web Development',
    date: '1995-10-15',
    preview: 'Exploring how web technologies have evolved from simple HTML pages to complex applications...',
    content: `The world of web development has undergone tremendous changes since the early days of the World Wide Web. What started as simple HTML documents has evolved into complex, interactive applications that power our digital lives.

In the beginning, web pages were static documents, primarily used for sharing information. HTML provided the structure, and that was about it. But as the web grew, so did the demand for more dynamic and interactive experiences.

The introduction of JavaScript in 1995 marked a turning point. Suddenly, web pages could respond to user interactions, validate forms, and create dynamic content. This was just the beginning of what would become a revolution in how we think about web applications.

Today, we're seeing frameworks and libraries that make it easier than ever to build complex applications. The future holds even more promise as we continue to push the boundaries of what's possible on the web.`
  },
  {
    id: 'retro-computing',
    title: 'Why Retro Computing Still Matters',
    date: '1995-09-20',
    preview: 'A look at how classic computing interfaces can inspire modern design...',
    content: `There's something magical about the computing interfaces of yesteryear. The Windows 95 interface, with its distinctive start button and taskbar, represented a major leap forward in user experience design.

Retro computing interfaces teach us valuable lessons about simplicity and user-centered design. Every element had a purpose, every interaction was carefully considered. There was no room for unnecessary complexity.

Modern designers can learn from these classic interfaces. The principles of good design are timeless: clarity, consistency, and user empowerment. These vintage interfaces remind us that good design isn't about following trends—it's about solving problems elegantly.

As we build the interfaces of tomorrow, we should remember the lessons of the past. Sometimes, the old ways of doing things got it right the first time.`
  },
  {
    id: 'javascript-future',
    title: 'The Future of JavaScript',
    date: '1995-08-10',
    preview: 'Predictions about where JavaScript might be heading in the coming years...',
    content: `JavaScript has come a long way since its humble beginnings as a simple scripting language for web browsers. As we look to the future, the possibilities seem endless.

One of the most exciting developments is the expansion of JavaScript beyond the browser. With technologies like Node.js, JavaScript is now powering servers, desktop applications, and even mobile apps. This versatility makes JavaScript an incredibly valuable skill for developers.

The language itself continues to evolve, with new features being added regularly. These improvements make JavaScript more powerful while maintaining its accessibility to new developers.

Looking ahead, I predict we'll see JavaScript become even more central to the computing experience. As the web becomes more sophisticated, JavaScript will be the language that powers the next generation of applications.

The future is bright for JavaScript developers. Those who master this language today will be well-positioned for the opportunities of tomorrow.`
  }
]; 