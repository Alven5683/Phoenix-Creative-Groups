"use client";

import { useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import RichTextEditor from "./RichTextEditor";

interface ServiceFormProps {
  initial?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function ServiceForm({ initial, onSave, onClose }: ServiceFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [content, setContent] = useState(initial?.content || "");
  const [image, setImage] = useState(initial?.image || "");
  const [seoTitle, setSeoTitle] = useState(initial?.seoMeta?.title || "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoMeta?.description || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      title,
      slug,
      description,
      content,
      image,
      seoMeta: { title: seoTitle, description: seoDescription },
    });
    setSaving(false);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} aria-label="Service Form">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Service Basics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
            <input type="text" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
            <input type="text" className={inputClass} value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Short Description</label>
            <textarea className={`${inputClass} min-h-24`} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Media & Content</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Image</label>
            {image ? <img src={image} alt="Service" className="mb-2 h-24 w-36 rounded-lg border border-slate-200 object-cover" /> : null}
            <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Content</label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">SEO</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">SEO Title</label>
            <input type="text" className={inputClass} value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">SEO Description</label>
            <input type="text" className={inputClass} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} required />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Service"}
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
