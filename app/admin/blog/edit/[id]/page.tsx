"use client";
import React, { useEffect, useState } from "react";
import BlogPostForm from "@/components/BlogPostForm";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import { useRouter, useParams } from "next/navigation";

import type { BlogPost } from "@/components/BlogPostForm";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const [postRes, catRes, authRes] = await Promise.all([
        fetch(`/api/admin/blog/${id}`),
        fetch("/api/admin/categories"),
        fetch("/api/admin/authors"),
      ]);
      const postData = postRes.ok ? await postRes.json() : null;
      const categoriesData = catRes.ok ? await catRes.json() : [];
      const authorsData = authRes.ok ? await authRes.json() : [];
      setPost(postData);
      setCategories(categoriesData);
      setAuthors(authorsData);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleSave(data: BlogPost) {
    if (!id) return;
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/blog");
    } else {
      alert("Failed to update post");
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (!post) return <div className="p-8 text-red-500">Post not found.</div>;

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopbar />
        <section className="flex-1 p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Edit Blog Post</h1>
            <p className="mt-1 text-sm text-slate-600">Update content, metadata, and author details.</p>
          </div>
          <div className="min-h-100 w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <BlogPostForm
              initial={post}
              categories={categories}
              authors={authors}
              onSave={handleSave}
              onClose={() => router.push("/admin/blog")}
              autoSlug={true}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
