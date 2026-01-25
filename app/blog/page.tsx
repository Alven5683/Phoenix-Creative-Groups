"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// BlogPost type definition for client-side use
export type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string | { name: string };
  date?: string;
  readTime?: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
    facebook?: string;
    linkedin?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [postsRes, categoriesRes, authorsRes] = await Promise.all([
        fetch("/api/admin/blog"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/authors"),
      ]);
      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      const authorsData = await authorsRes.json();
      // Merge author details into each post
      const postsWithAuthors = postsData.map((post: any) => {
        if (post.author && post.author.name) {
          const found = authorsData.find((a: any) => a.name === post.author.name);
          if (found) {
            return {
              ...post,
              author: {
                ...post.author,
                role: found.role,
                avatar: found.avatar,
                facebook: found.facebook || (found.social && found.social.facebook),
                linkedin: found.linkedin || (found.social && found.social.linkedin),
              },
            };
          }
        }
        return post;
      });
      setPosts(postsWithAuthors);
      setCategories(["All", ...categoriesData.map((c: any) => c.name)]);
      setAuthors(authorsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pt-20 min-h-screen bg-linear-to-br from-gray-50 to-white w-full"
    >
      {/* Hero Section */}
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Phoenix Blog
            </h1>
            <p className="text-xl text-gray-600 w-full">
              Insights, updates, and stories from the future of AI-powered creativity
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full mb-12"
          >
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.filter(Boolean).map((category: string) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap px-4 h-11 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost, index: number) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                      {typeof post.category === 'object' && post.category !== null && 'name' in post.category
                        ? post.category.name
                        : typeof post.category === 'string'
                          ? post.category
                          : ''}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-black mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-black hover:gap-2 transition-all font-medium"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.main>
  );
};

export default BlogPage;




