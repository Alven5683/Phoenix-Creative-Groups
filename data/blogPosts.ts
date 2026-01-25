export interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const blogPosts: BlogPostData[] = [
  {
    id: 1,
    title: "The Future of AI-Powered Content Creation",
    slug: "future-ai-powered-content-creation",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we create, curate, and distribute content across digital platforms.",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is transforming the content creation landscape at an unprecedented pace. From automated writing assistants to AI-generated visuals, the tools available to creators today would have seemed like science fiction just a decade ago.</p>
      
      <h2>The Current State of AI Content Tools</h2>
      <p>Today's AI content creation tools span across multiple mediums:</p>
      <ul>
        <li><strong>Text Generation:</strong> Advanced language models can produce human-like text for blogs, social media, and marketing copy</li>
        <li><strong>Image Creation:</strong> AI can generate stunning visuals from simple text descriptions</li>
        <li><strong>Video Production:</strong> Automated video editing and generation tools are becoming mainstream</li>
        <li><strong>Audio Content:</strong> Voice synthesis and music generation are reaching professional quality</li>
      </ul>
      
      <h2>Impact on Creative Industries</h2>
      <p>The integration of AI in creative workflows is not replacing human creativity but amplifying it. Content creators can now:</p>
      <ul>
        <li>Produce content at scale without sacrificing quality</li>
        <li>Experiment with new formats and styles quickly</li>
        <li>Focus on strategy and creative direction while AI handles execution</li>
        <li>Personalize content for different audiences automatically</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      <p>While AI-powered content creation offers immense opportunities, it also presents challenges:</p>
      <ul>
        <li><strong>Authenticity:</strong> Maintaining genuine human connection in AI-assisted content</li>
        <li><strong>Quality Control:</strong> Ensuring AI-generated content meets brand standards</li>
        <li><strong>Ethical Use:</strong> Responsible deployment of AI tools in creative processes</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>The future of AI-powered content creation is bright. We can expect to see more sophisticated tools that understand context, brand voice, and audience preferences. The key to success will be finding the right balance between AI efficiency and human creativity.</p>
      
      <p>At ORBAI, we're committed to building tools that empower creators rather than replace them. Our platform provides the AI capabilities you need while keeping you in control of your creative vision.</p>
    `,
    image: "https://www.shutterstock.com/image-photo/aipowered-technology-innovations-transforming-digital-600nw-2620882953.jpg?auto=compress&cs=tinysrgb&w=800",
    category: "AI Technology",
    date: "May 15, 2025",
    readTime: "5 min read",
    author: {
      name: "Sarah Chen",
      role: "Head of AI Research",
      avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  },
  // ... (other blog posts from your sample data)
];
