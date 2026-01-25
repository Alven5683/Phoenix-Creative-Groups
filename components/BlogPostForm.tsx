"use client";
import { useState, useEffect } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import { Editor } from "@tinymce/tinymce-react";

export type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string; // will hold ObjectId string
  date?: string;
  readTime?: string;
  author?: string; // will hold ObjectId string
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

export default function BlogPostForm({ initial, onSave, onClose, autoSlug, categories = [], authors = [] }: BlogPostFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [image, setImage] = useState(initial?.image || "");
  const [category, setCategory] = useState(() => {
    const cat = initial?.category;
    if (cat && typeof cat === 'object' && cat !== null && typeof (cat as any)._id === 'string') {
      return (cat as { _id: string })._id;
    }
    if (typeof cat === 'string') {
      return cat;
    }
    return '';
  });
  const [date, setDate] = useState(initial?.date || "");
  const [readTime, setReadTime] = useState(initial?.readTime || "");
  const [author, setAuthor] = useState(() => {
    const auth = initial?.author;
    if (auth && typeof auth === 'object' && auth !== null && typeof (auth as any)._id === 'string') {
      return (auth as { _id: string })._id;
    }
    if (typeof auth === 'string') {
      return auth;
    }
    return '';
  });
  const [authorRole, setAuthorRole] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription || "");
  const [saving, setSaving] = useState(false);

  // Set date to today on mount if not already set
  useEffect(() => {
    if (!initial?.date) {
      const today = new Date();
      const formatted = today.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
      setDate(formatted);
    }
  }, [initial?.date]);

  // Estimate read time from content (average 200 words/minute)
  useEffect(() => {
    if (content) {
      const words = content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
      const mins = Math.max(1, Math.round(words / 200));
      setReadTime(`${mins} min read`);
    } else {
      setReadTime("");
    }
  }, [content]);

  // When author changes, update role and avatar from authors list
  useEffect(() => {
    if (author && authors && authors.length > 0) {
      const found = authors.find((a: Author) => a._id === author);
      setAuthorRole(found?.role || "");
      setAuthorAvatar(found?.avatar || "");
    } else {
      setAuthorRole("");
      setAuthorAvatar("");
    }
  }, [author, authors]);

  function slugify(str: string) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Always auto-generate slug from title
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
      category, // _id string
      date,
      readTime,
      author, // _id string
      seoTitle,
      seoDescription,
    });
    setSaving(false);
  }

  return (
    <form className="w-full flex flex-row gap-8" onSubmit={handleSubmit} aria-label="Blog Post Form">
      {/* Left column: 20% */}
      <div className="w-1/5 min-w-50 flex flex-col gap-4">
        <label className="block text-gray-300 mb-1">Category</label>
        <select className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {Array.isArray(categories) && categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        {/* Date and Read Time fields are hidden from the form UI, but still included in submission */}
        {/* <input type="text" placeholder="Date (e.g. May 12, 2025)" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={date} readOnly /> */}
        {/* <input type="text" placeholder="Read Time (e.g. 8 min read)" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={readTime} readOnly /> */}
        <div>
          <label className="block text-gray-300 mb-1">Image</label>
          {image && <img src={image} alt="Blog Post" className="mb-2 rounded-lg w-32 h-20 object-cover border border-glassBorder" />}
          <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Author</label>
          <select className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={author} onChange={e => setAuthor(e.target.value)} required>
            <option value="">Select Author</option>
            {Array.isArray(authors) && authors.map((a) =>
              typeof a === 'object' && a && '_id' in a ? (
                <option key={a._id} value={a._id}>{a.name}</option>
              ) : null
            )}
          </select>
          <label className="block text-gray-300 mb-1 mt-2">Author Role</label>
          <input type="text" placeholder="Author Role" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={authorRole} readOnly />
          <label className="block text-gray-300 mb-1 mt-2">Author Avatar URL</label>
          <input type="text" placeholder="Author Avatar URL" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={authorAvatar} readOnly />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">SEO Title</label>
          <input type="text" placeholder="SEO Title" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
          <label className="block text-gray-300 mb-1 mt-2">SEO Description</label>
          <input type="text" placeholder="SEO Description" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
        </div>
      </div>
      {/* Right column: 80% */}
      <div className="w-4/5 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Write a compelling title..."
          className="w-full text-4xl font-bold outline-none border-none mb-6 bg-transparent text-black placeholder:text-gray-400"
          value={title}
          onChange={handleTitleChange}
          required
        />
        {/* Slug is auto-generated and hidden from the form UI */}
        <input type="text" placeholder="Excerpt" className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white" value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
        <label className="block text-black-300 mb-1">Content</label>
        <div className="mb-2 text-sm text-blue-400 bg-blue-900/30 rounded px-3 py-2">
          <b>Tip:</b> Use the toolbar to add headings, lists, and formatting. Paste from Google Docs/Word, then re-apply formatting if needed.<br />
          For headings, use the "Paragraph" dropdown. For lists, use the bullet/numbered list buttons.
        </div>
        <Editor
          apiKey="8p0dlj1p2ljwpile2bbymmp94wfqij4iakpmfptzz5edbkqb"
          value={content}
          onEditorChange={setContent}
          init={{
            height: '70vh',
            menubar: 'file edit view insert format tools table help',
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'media',
              'table',
              'code',
              'fullscreen',
              'wordcount',
              'searchreplace',
              'visualblocks',
              'paste',
            ],
            toolbar:
              'undo redo | blocks | bold italic underline | ' +
              'alignleft aligncenter alignright | bullist numlist | ' +
              'link image media | removeformat | fullscreen',
            toolbar_mode: 'sliding',
            branding: false,
            statusbar: true,
            content_style: `\
              body {\
                font-family: Inter, system-ui, -apple-system;\
                font-size: 18px;\
                line-height: 1.8;\
                max-width: 760px;\
                margin: 40px auto;\
                padding: 0 16px;\
                color: #000;\
                background: transparent;\
              }\
              h1 { font-size: 2.4em; font-weight: 700; }\
              h2 { font-size: 1.8em; font-weight: 600; }\
              h3 { font-size: 1.4em; font-weight: 600; }\
              p  { margin: 0.8em 0; }\
            `,
            block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3',
            placeholder: 'Start writing your story...'
          }}
        />
        <div className="flex gap-4 mt-4">
          <button type="submit" className="px-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
          <button type="button" className="px-6 py-3 rounded-xl bg-gray-200 text-black font-semibold shadow-lg hover:scale-105 transition-transform" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
