"use client";
import React, { useEffect, useState } from "react";
import BlogPostForm from "@/components/BlogPostForm";
import { useRouter, useParams } from "next/navigation";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      const res = await fetch(`/api/admin/blog/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!post) return <div className="p-8 text-red-500">Post not found.</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 mt-8">
          <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
          <BlogPostForm initial={post} onSave={async () => router.push('/admin/blog')} onClose={() => router.push('/admin/blog')} />
        </div>
      </main>
    </div>
  );
}
