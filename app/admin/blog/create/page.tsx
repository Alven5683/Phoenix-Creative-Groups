"use client";

// Sidebar and layout will be inlined for consistency
import BlogPostForm from "@/components/BlogPostForm";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); // full category objects
  const [authors, setAuthors] = useState<any[]>([]); // full author objects

  useEffect(() => {
    // Fetch categories
    fetch("/api/admin/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data.filter((c: any) => c && c._id && c.name));
        } else if (Array.isArray(data.categories)) {
          setCategories(data.categories.filter((c: any) => c && c._id && c.name));
        }
      });
    // Fetch authors
    fetch("/api/admin/authors")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAuthors(data.filter((a: any) => a && a.name));
        } else if (Array.isArray(data.authors)) {
          setAuthors(data.authors.filter((a: any) => a && a.name));
        }
      });
  }, []);

  async function handleSave(data: any) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/admin/blog");
      } else {
        alert("Failed to create post");
      }
    } catch {
      alert("Error creating post");
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <AdminTopbar />
        <section className="flex-1 p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Create New Blog Post</h1>
            <p className="mt-1 text-sm text-slate-600">Draft and publish a new post with SEO metadata.</p>
          </div>
          <div className="min-h-100 w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <BlogPostForm
              onSave={handleSave}
              onClose={() => router.push("/admin/blog")}
              autoSlug
              categories={categories}
              authors={authors}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
