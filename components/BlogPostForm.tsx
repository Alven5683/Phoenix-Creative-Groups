"use client";
import { useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import { Editor } from "@tinymce/tinymce-react";

type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: { name?: string; role?: string; avatar?: string };
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
};

interface BlogPostFormProps {
  initial?: BlogPost;
  onSave: (data: BlogPost) => Promise<void>;
  onClose: () => void;
  autoSlug?: boolean;
  categories?: string[];
  authors?: string[];
}

export default function BlogPostForm({ initial, onSave, onClose, autoSlug, categories = ["Tech", "Design", "Business", "Marketing"], authors = ["John Doe", "Jane Smith", "Akshay Patel"] }: BlogPostFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [image, setImage] = useState(initial?.image || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [date, setDate] = useState(initial?.date || "");
  const [readTime, setReadTime] = useState(initial?.readTime || "");
  const [authorName, setAuthorName] = useState(initial?.author?.name || "");
  const [authorRole, setAuthorRole] = useState(initial?.author?.role || "");
  const [authorAvatar, setAuthorAvatar] = useState(initial?.author?.avatar || "");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription || "");
  const [seoImage, setSeoImage] = useState(initial?.seoImage || "");
  const [saving, setSaving] = useState(false);

  function slugify(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Auto-generate slug from title if enabled and slug not manually edited
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    if (autoSlug && !slugEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(e.target.value);
    setSlugEdited(true);
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
      author: { name: authorName, role: authorRole, avatar: authorAvatar },
      seoTitle,
      seoDescription,
      seoImage,
    });
    setSaving(false);
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit} aria-label="Blog Post Form">
      {/* Left Side: Other Fields */}
      <div className="flex flex-col gap-4">
        <label className="block text-gray-300 mb-1">Category</label>
        <select className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="text" placeholder="Date (e.g. May 12, 2025)" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" placeholder="Read Time (e.g. 8 min read)" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={readTime} onChange={e => setReadTime(e.target.value)} />
        <div>
          <label className="block text-gray-300 mb-1">Image</label>
          {image && <img src={image} alt="Blog Post" className="mb-2 rounded-lg w-32 h-20 object-cover border border-glassBorder" />}
          <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Author</label>
          <select className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={authorName} onChange={e => setAuthorName(e.target.value)} required>
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
          <label className="block text-gray-300 mb-1 mt-2">Author Role</label>
          <input type="text" placeholder="Author Role" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={authorRole} onChange={e => setAuthorRole(e.target.value)} />
          <label className="block text-gray-300 mb-1 mt-2">Author Avatar URL</label>
          <input type="text" placeholder="Author Avatar URL" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={authorAvatar} onChange={e => setAuthorAvatar(e.target.value)} />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">SEO Title</label>
          <input type="text" placeholder="SEO Title" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
          <label className="block text-gray-300 mb-1 mt-2">SEO Description</label>
          <input type="text" placeholder="SEO Description" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
          <label className="block text-gray-300 mb-1 mt-2">SEO Image URL</label>
          <input type="text" placeholder="SEO Image URL" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={seoImage} onChange={e => setSeoImage(e.target.value)} />
        </div>
      </div>
      {/* Right Side: Title & Content */}
      <div className="flex flex-col gap-4">
        <input type="text" placeholder="Title" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={title} onChange={handleTitleChange} required />
        <input type="text" placeholder="Slug" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={slug} onChange={handleSlugChange} required />
        <input type="text" placeholder="Excerpt" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
        <label className="block text-gray-300 mb-1">Content</label>
        <Editor
          apiKey="8p0dlj1p2ljwpile2bbymmp94wfqij4iakpmfptzz5edbkqb"
          value={content}
          onEditorChange={setContent}
          init={{
            height: 350,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
            skin: "oxide-dark",
            content_css: "dark"
          }}
        />
        <div className="flex gap-4 mt-4">
          <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
          <button type="button" className="px-6 py-3 rounded-xl bg-gray-200 text-black font-semibold shadow-lg hover:scale-105 transition-transform" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
