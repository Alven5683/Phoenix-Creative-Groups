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
  // Main fields
  const [title, setTitle] = useState<string>(initial?.title || "");
  const [description, setDescription] = useState<string>(initial?.description || "");
  const [image, setImage] = useState<string>(initial?.image || "");
  const [projectUrl, setProjectUrl] = useState<string>(initial?.projectUrl || "");
  const [featured, setFeatured] = useState<boolean>(initial?.featured || false);
  const [content, setContent] = useState<string>(initial?.content || "");
  // New fields
  const [category, setCategory] = useState<string>(initial?.category || "");
  const [authorName, setAuthorName] = useState<string>(initial?.author?.name || "");
  const [authorAvatar, setAuthorAvatar] = useState<string>(initial?.author?.avatar || "");
  const [authorRole, setAuthorRole] = useState<string>(initial?.author?.role || "");
  const [authorContactLinks, setAuthorContactLinks] = useState<string>(initial?.author?.contactLinks?.map((c: any) => `${c.type}:${c.url}`).join(",") || "");
  const [tags, setTags] = useState<string>(initial?.tags?.join(",") || "");
  const [startDate, setStartDate] = useState<string>(initial?.startDate || "");
  const [endDate, setEndDate] = useState<string>(initial?.endDate || "");
  const [faqs, setFaqs] = useState<string>(initial?.faqs?.map((f: any) => `${f.question}:${f.answer}`).join(",") || "");
  const [testimonials, setTestimonials] = useState<string>(initial?.testimonials?.map((t: any) => `${t.name}:${t.role}:${t.text}:${t.rating}`).join(",") || "");
  const [relatedProjects, setRelatedProjects] = useState<string>(initial?.relatedProjects?.map((r: any) => `${r.id}:${r.title}:${r.image}:${r.category}:${r.shortDescription}`).join(",") || "");
  const [challenge, setChallenge] = useState<string>(initial?.challenge || "");
  const [solution, setSolution] = useState<string>(initial?.solution || "");
  const [results, setResults] = useState<string>(initial?.results?.map((r: any) => `${r.stat}:${r.description}`).join(",") || "");
  const [gallery, setGallery] = useState<string>(initial?.gallery?.join(",") || "");
  const [saving, setSaving] = useState<boolean>(false);

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
      category,
      author: {
        name: authorName,
        avatar: authorAvatar,
        role: authorRole,
        contactLinks: authorContactLinks.split(",").map((c: string) => {
          const [type, url] = c.split(":");
          return { type, url };
        }),
      },
      tags: tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      startDate,
      endDate,
      faqs: faqs.split(",").map((f: string) => {
        const [question, answer] = f.split(":");
        return { question, answer };
      }),
      testimonials: testimonials.split(",").map((t: string) => {
        const [name, role, text, rating] = t.split(":");
        return { name, role, text, rating: Number(rating) };
      }),
      relatedProjects: relatedProjects.split(",").map((r: string) => {
        const [id, title, image, category, shortDescription] = r.split(":");
        return { id, title, image, category, shortDescription };
      }),
      challenge,
      solution,
      results: results.split(",").map((r: string) => {
        const [stat, description] = r.split(":");
        return { stat, description };
      }),
      gallery: gallery.split(",").map((g: string) => g.trim()).filter(Boolean),
    });
    setSaving(false);
  }

  return (
    <form className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto w-full" style={{ minWidth: 0 }} onSubmit={handleSubmit}>
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
        placeholder="Challenge"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={challenge}
        onChange={e => setChallenge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Solution"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={solution}
        onChange={e => setSolution(e.target.value)}
      />
      <input
        type="text"
        placeholder="Results (stat:description,...)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={results}
        onChange={e => setResults(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gallery Images (comma separated URLs)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={gallery}
        onChange={e => setGallery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={category}
        onChange={e => setCategory(e.target.value)}
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
        placeholder="Author Name"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={authorName}
        onChange={e => setAuthorName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author Avatar URL"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={authorAvatar}
        onChange={e => setAuthorAvatar(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author Role"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={authorRole}
        onChange={e => setAuthorRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author Contact Links (type:url,...)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={authorContactLinks}
        onChange={e => setAuthorContactLinks(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Start Date"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Date"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="FAQs (question:answer,...)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={faqs}
        onChange={e => setFaqs(e.target.value)}
      />
      <input
        type="text"
        placeholder="Testimonials (name:role:text:rating,...)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={testimonials}
        onChange={e => setTestimonials(e.target.value)}
      />
      <input
        type="text"
        placeholder="Related Projects (id:title:image:category:shortDescription,...)"
        className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white"
        value={relatedProjects}
        onChange={e => setRelatedProjects(e.target.value)}
      />
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
