"use client";

// Sidebar and layout will be inlined for consistency
import BlogPostForm from "@/components/BlogPostForm";
import AdminSidebar from "@/components/AdminSidebar";
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
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="w-full px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        </header>
        <section className="flex-1 p-8">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md min-h-100 w-full">
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
