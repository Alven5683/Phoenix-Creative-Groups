import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SafeHtmlContent from '@/components/SafeHtmlContent';
import MotionDiv from '@/components/MotionDiv';

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  date?: string;
  readTime?: string;
  category?: string | { name?: string };
  author?: { name?: string; role?: string; avatar?: string };
};


function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${getBaseUrl()}/api/admin/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getRelatedPosts(slug: string, category: string | { name?: string } | undefined, id: string): Promise<BlogPost[]> {
  const res = await fetch(`${getBaseUrl()}/api/admin/blog?relatedTo=${slug}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  // Filter out current post and limit to 3, match category
  return (Array.isArray(data) ? data : []).filter((p: BlogPost) => p._id !== id && (p.category === category || (typeof p.category === 'object' && typeof category === 'object' && p.category?.name === category?.name))).slice(0, 3);
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();
  const post = await getBlogPost(slug);
  if (!post) return notFound();
  const relatedPosts = await getRelatedPosts(slug, post.category, post._id);

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-linear-to-br from-gray-50 to-white">
        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                    {typeof post.category === 'string' ? post.category : post.category?.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {post.author?.avatar && (
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-black">{post.author?.name}</div>
                      <div className="text-sm text-gray-600">{post.author?.role}</div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-lg mb-8">
                  <div className="w-full aspect-16/7 overflow-hidden rounded-xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-xl"
                      style={{ display: 'block', background: '#111' }}
                    />
                  </div>
                </div>
              )}
            </MotionDiv>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-xl border border-gray-200/80 p-0 md:p-0 flex justify-center"
            >
              <SafeHtmlContent
                html={post.content}
                className="google-doc-style w-full max-w-6xl min-h-225 bg-white px-6 py-10 md:px-12 md:py-16 rounded-xl shadow-none border-none text-black text-[1.08rem] leading-[1.9] font-sans mx-auto"
                style={{ boxShadow: '0 1px 8px 0 rgba(60,60,60,0.08)', fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
              />
            </MotionDiv>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-gray-50/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-black mb-8 text-center">
                  Related Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <MotionDiv
                      key={relatedPost._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="h-40 overflow-hidden">
                        {relatedPost.image && (
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-500 mb-2">
                          {relatedPost.date}
                        </div>
                        <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {relatedPost.excerpt}
                        </p>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="inline-flex items-center gap-1 text-black hover:gap-2 transition-all font-medium text-sm"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              </MotionDiv>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

