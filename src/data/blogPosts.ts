export interface BlogPost {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  preview: string;
  content: string;
}

// List of available blog post IDs - add new post IDs here
const availablePostIds = [
  'blog-1',
  'blog-2'
];

// Function to parse markdown front matter
const parseFrontMatter = (markdown: string): { frontMatter: any; content: string } => {
  const frontMatterRegex = /^---\s*\n(.*?)\n---\s*\n(.*)/s;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return { frontMatter: {}, content: markdown };
  }
  
  const frontMatterText = match[1];
  const content = match[2];
  
  // Parse YAML-like front matter
  const frontMatter: any = {};
  frontMatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      frontMatter[key] = value;
    }
  });
  
  return { frontMatter, content: content.trim() };
};

// Function to load a single blog post from markdown
const loadBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/blog/posts/${id}.md`);
    if (response.ok) {
      const markdownText = await response.text();
      const { frontMatter, content } = parseFrontMatter(markdownText);
      
      return {
        id: frontMatter.id || id,
        title: frontMatter.title || 'Untitled',
        date: frontMatter.date || '1995-01-01',
        preview: frontMatter.preview || content.substring(0, 150) + '...',
        content: content
      };
    }
  } catch (error) {
    console.warn(`Could not load blog post: ${id}`);
  }
  return null;
};

// Function to load all blog posts from markdown files
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
    console.warn('Could not load blog posts from markdown files');
    return [];
  }
};

// Function to load a single post by ID
export const loadSinglePost = async (id: string): Promise<BlogPost | null> => {
  return loadBlogPost(id);
}; 