"use client";
import React, { useState, useEffect } from "react";

// Blog post type
type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string | { name?: string };
  date?: string;
  readTime?: string;
  author?: { name?: string; role?: string; avatar?: string };
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
};

type BlogPostListProps = {
  onEdit?: (post: BlogPost) => void;
  onDelete?: (post: BlogPost) => void;
};

export default function BlogPostList({ onEdit, onDelete }: BlogPostListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    async function fetchData() {
      const [postsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/blog"),
        fetch("/api/admin/categories"),
      ]);
      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      setPosts(postsData);
      setCategories(["All", ...categoriesData.map((c: any) => c.name)]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesCategory = category === "All" || post.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-64"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-48"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-gray-500">No posts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow border border-gray-200">
            <thead>
              <tr className="bg-linear-to-r from-blue-500 to-purple-400 text-white">
                <th className="px-6 py-3 text-left font-bold rounded-tl-2xl">Image</th>
                <th className="px-6 py-3 text-left font-bold">Title</th>
                <th className="px-6 py-3 text-left font-bold">Category</th>
                <th className="px-6 py-3 text-left font-bold">Date</th>
                <th className="px-6 py-3 text-left font-bold">Author</th>
                <th className="px-6 py-3 text-left font-bold rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-800">{post.title}</td>
                  <td className="px-6 py-3 text-gray-700">{
                    typeof post.category === 'object' && post.category !== null && 'name' in post.category
                      ? post.category.name
                      : typeof post.category === 'string'
                        ? post.category
                        : ''
                  }</td>
                  <td className="px-6 py-3 text-gray-700">{post.date}</td>
                  <td className="px-6 py-3 text-gray-700">{post.author?.name || ''}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-linear-to-r from-blue-500 to-purple-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform mr-2"
                      onClick={() => onEdit && onEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-linear-to-r from-pink-500 to-red-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?')) {
                          onDelete && onDelete(post);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
