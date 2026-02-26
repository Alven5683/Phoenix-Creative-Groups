
"use client";
import React, { useState } from "react";
import { type BlogPost } from "@/components/BlogPostForm";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

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
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopbar />
        <section className="flex-1 p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
            <p className="mt-1 text-sm text-slate-600">Create, edit, and organize all blog posts.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <BlogPostListWithModal />
          </div>
        </section>
      </main>
    </div>
  );
}
