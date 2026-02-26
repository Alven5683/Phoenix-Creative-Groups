"use client";

import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CloudinaryUpload from "./CloudinaryUpload";

export type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
};

interface Author {
  _id: string;
  name: string;
  role?: string;
  avatar?: string;
}

interface BlogPostFormProps {
  initial?: BlogPost;
  onSave: (data: BlogPost) => Promise<void>;
  onClose: () => void;
  autoSlug?: boolean;
  categories?: { _id: string; name: string }[];
  authors?: Author[];
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function BlogPostForm({ initial, onSave, onClose, categories = [], authors = [] }: BlogPostFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [image, setImage] = useState(initial?.image || "");
  const [category, setCategory] = useState(() => {
    const cat = initial?.category;
    if (cat && typeof cat === "object" && (cat as any)._id) return (cat as any)._id;
    return typeof cat === "string" ? cat : "";
  });
  const [date, setDate] = useState(initial?.date || "");
  const [readTime, setReadTime] = useState(initial?.readTime || "");
  const [author, setAuthor] = useState(() => {
    const auth = initial?.author;
    if (auth && typeof auth === "object" && (auth as any)._id) return (auth as any)._id;
    return typeof auth === "string" ? auth : "";
  });
  const [authorRole, setAuthorRole] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!initial?.date) {
      setDate(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
    }
  }, [initial?.date]);

  useEffect(() => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
    if (words > 0) {
      const mins = Math.max(1, Math.round(words / 200));
      setReadTime(`${mins} min read`);
    } else {
      setReadTime("");
    }
  }, [content]);

  useEffect(() => {
    const selected = authors.find((item) => item._id === author);
    setAuthorRole(selected?.role || "");
    setAuthorAvatar(selected?.avatar || "");
  }, [author, authors]);

  function slugify(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      title,
      slug,
      excerpt,
      content,
      image,
      category,
      date,
      readTime,
      author,
      seoTitle,
      seoDescription,
    });
    setSaving(false);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} aria-label="Blog Post Form">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:col-span-1">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Category</label>
            <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Feature Image</label>
            {image ? <img src={image} alt="Blog Post" className="mb-2 h-28 w-full rounded-lg border border-slate-200 object-cover" /> : null}
            <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Author</label>
            <select className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} required>
              <option value="">Select Author</option>
              {authors.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <input type="text" value={authorRole} className={inputClass} readOnly placeholder="Author role" />
          <input type="text" value={authorAvatar} className={inputClass} readOnly placeholder="Author avatar URL" />

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">SEO Title</label>
            <input type="text" className={inputClass} value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">SEO Description</label>
            <textarea className={`${inputClass} min-h-24`} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Title</label>
            <input type="text" className={`${inputClass} text-2xl font-bold`} value={title} onChange={handleTitleChange} required />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Slug</label>
              <input type="text" className={inputClass} value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Read Time</label>
              <input type="text" className={inputClass} value={readTime} readOnly />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Excerpt</label>
            <textarea className={`${inputClass} min-h-24`} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Content</label>
            <Editor
              apiKey="8p0dlj1p2ljwpile2bbymmp94wfqij4iakpmfptzz5edbkqb"
              value={content}
              onEditorChange={setContent}
              init={{
                height: 600,
                menubar: "file edit view insert format tools table help",
                plugins: ["advlist", "autolink", "lists", "link", "image", "media", "table", "code", "fullscreen", "wordcount", "searchreplace", "visualblocks", "paste"],
                toolbar:
                  "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media | removeformat | fullscreen",
                toolbar_mode: "sliding",
                branding: false,
                statusbar: true,
                placeholder: "Start writing your post...",
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Post"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
