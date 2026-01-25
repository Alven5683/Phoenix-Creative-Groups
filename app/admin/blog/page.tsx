
"use client";
import React, { useState } from "react";
import BlogPostForm, { type BlogPost } from "@/components/BlogPostForm";
import AdminSidebar from "@/components/AdminSidebar";

import { useRouter } from "next/navigation";
function BlogPostListWithModal() {
  const BlogPostList = require("@/components/BlogPostList").default;
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  // Handler for edit
  function handleEdit(post: BlogPost) {
    if (post && post._id) {
      router.push(`/admin/blog/edit/${post._id}`);
    }
  }

  // Handler for delete
  async function handleDelete(post: BlogPost) {
    if (!post || !post._id) return;
    try {
      const res = await fetch(`/api/admin/blog/${post._id}`, { method: 'DELETE' });
      if (res.ok) {
        setRefreshKey(k => k + 1); // trigger refresh
      } else {
        alert('Failed to delete post');
      }
    } catch {
      alert('Error deleting post');
    }
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <a href="/admin/blog/create" className="bg-green-600 text-white px-4 py-2 rounded">New Post</a>
      </div>
      <BlogPostList key={refreshKey} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}

export default function AdminBlogCMS() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="w-full px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
          </div>
        </header>
        <section className="flex-1 p-8">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md min-h-100">
            <BlogPostListWithModal />
          </div>
        </section>
      </main>
    </div>
  );
}
