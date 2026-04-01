export interface BlogPost {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  preview: string;
  content: string;
  slug: string; // SEO-friendly URL slug
  keywords?: string; // comma-separated keywords for meta SEO
}

// Generate SEO-friendly slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// List of available blog post IDs - add new post IDs here
const availablePostIds = [
  'blog-1',
  'blog-2',
  'blog-3',
  'blog-4',
  'blog-5',
  'blog-6',
  'blog-7',
  'blog-8',
  'blog-9',
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
      
      const title = frontMatter.title || 'Untitled';
      return {
        id: frontMatter.id || id,
        title: title,
        date: frontMatter.date || '1995-01-01',
        preview: frontMatter.preview || content.substring(0, 150) + '...',
        content: content,
        slug: generateSlug(title),
        keywords: frontMatter.keywords || undefined,
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
    // Load all posts in parallel using filenames
    const postPromises = availablePostIds.map(id => loadBlogPost(id));
    const posts = await Promise.all(postPromises);
    
    // Filter out failed loads and sort by date (newest first)
    const validPosts = posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Update cache
    postsCache = validPosts;
    
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

// Cache for loaded posts to avoid reloading
let postsCache: BlogPost[] | null = null;

// Function to find a post by slug
export const findPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // Use cache if available, otherwise load all posts
    let allPosts = postsCache;
    if (!allPosts) {
      allPosts = await loadBlogPosts();
    }
    
    const post = allPosts.find(post => post.slug === slug);
    if (post) {
      return post;
    }
    
    // If not found, log for debugging
    console.warn(`Blog post with slug "${slug}" not found. Available slugs:`, allPosts.map(p => p.slug));
    return null;
  } catch (error) {
    console.warn(`Could not find blog post with slug: ${slug}`, error);
    return null;
  }
};

// Function to find a post by ID or slug (for backward compatibility)
export const findPostByIdOrSlug = async (identifier: string): Promise<BlogPost | null> => {
  // First try to find by slug (most common case now)
  const postBySlug = await findPostBySlug(identifier);
  if (postBySlug) return postBySlug;
  
  // If not found by slug, try to load by ID (for backward compatibility with old URLs)
  const postById = await loadBlogPost(identifier);
  if (postById) {
    // Update cache if we found a post by ID
    if (postsCache) {
      const existingIndex = postsCache.findIndex(p => p.id === postById.id);
      if (existingIndex >= 0) {
        postsCache[existingIndex] = postById;
      } else {
        postsCache.push(postById);
      }
    }
    return postById;
  }
  
  return null;
}; 