"use client";
import { useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import RichTextEditor from "./RichTextEditor";

interface PortfolioFormProps {
  initial?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}

export default function PortfolioForm({ initial, onSave, onClose }: PortfolioFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState(initial?.image || "");
  const [projectUrl, setProjectUrl] = useState(initial?.projectUrl || "");
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [content, setContent] = useState(initial?.content || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      title,
      description,
      image,
      projectUrl,
      featured,
      content,
    });
    setSaving(false);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        placeholder="Description"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <div>
        <label className="block text-gray-300 mb-1">Image</label>
        {image && <img src={image} alt="Project" className="mb-2 rounded-lg w-32 h-20 object-cover border border-glassBorder" />}
        <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
      </div>
      <input
        type="text"
        placeholder="Project URL"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={projectUrl}
        onChange={e => setProjectUrl(e.target.value)}
      />
      <div>
        <label className="block text-gray-300 mb-1">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />
        <span className="text-gray-200">Featured</span>
      </label>
      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="px-6 py-3 rounded-xl bg-glass border border-glassBorder text-gray-200 hover:text-white hover:bg-glass/60 transition-colors font-semibold"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
