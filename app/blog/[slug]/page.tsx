import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MotionDiv from '@/components/MotionDiv';
import SafeHtml from '@/components/SafeHtml';

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
  author?: {
    name?: string;
    role?: string;
    avatar?: string;
  };
};

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost:3000'
  );
}

async function getBlogPost(slug: string) {
  const res = await fetch(
    `${getBaseUrl()}/api/admin/blog/${slug}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();

  const post: BlogPost | null =
    await getBlogPost(slug);

  if (!post) return notFound();

  return (
    <>
      <Navbar />

      <div className="pt-20 min-h-screen bg-gray-50">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-6 text-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-xl mb-8"
            />
          )}

          <article className="google-doc-style w-full max-w-6xl min-h-225 bg-white px-6 py-10 md:px-12 md:py-16 rounded-xl shadow-none border-none text-black text-[1.08rem] leading-[1.9] font-sans mx-auto">
            <SafeHtml html={post.content} />
          </article>
        </section>
      </div>
    </>
  );
}
