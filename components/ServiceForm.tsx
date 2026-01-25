"use client";
import { useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import RichTextEditor from "./RichTextEditor";

interface ServiceFormProps {
  initial?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}

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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} aria-label="Service Form">
      <input
        type="text"
        placeholder="Title"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Slug"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={slug}
        onChange={e => setSlug(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Short Description"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <div>
        <label className="block text-gray-300 mb-1">Image</label>
        {image && <img src={image} alt="Service" className="mb-2 rounded-lg w-32 h-20 object-cover border border-glassBorder" />}
        <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
      </div>
      <div>
        <label className="block text-gray-300 mb-1">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <div>
        <label className="block text-gray-300 mb-1">SEO Title</label>
        <input
          type="text"
          placeholder="SEO Title"
          className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white focus:outline-none focus:ring-2 focus:ring-glassBorder"
          aria-label="SEO Title"
          value={seoTitle}
          onChange={e => setSeoTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="SEO Description"
          className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white focus:outline-none focus:ring-2 focus:ring-glassBorder"
          aria-label="SEO Description"
          value={seoDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeoDescription(e.target.value)}
          required
        />
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-glassBorder"
            disabled={saving}
            aria-label="Save Service"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-glassBorder"
            onClick={onClose}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}