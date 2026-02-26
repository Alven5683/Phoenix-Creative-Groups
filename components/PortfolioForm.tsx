"use client";

import { useEffect, useMemo, useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import RichTextEditor from "./RichTextEditor";

interface PortfolioFormProps {
  initial?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const splitByComma = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function parsePipeRecord(line: string, length: number) {
  const parts = line.split("|").map((part) => part.trim());
  if (parts.length < length) return null;
  return parts;
}

export default function PortfolioForm({ initial, onSave, onClose }: PortfolioFormProps) {
  const parsedInitial = useMemo(() => {
    if (!initial) return null;

    return {
      title: initial.title || "",
      description: initial.description || "",
      image: initial.image || "",
      projectUrl: initial.projectUrl || "",
      featured: Boolean(initial.featured),
      content: initial.content || "",
      category: initial.category || "",
      authorName: initial.author?.name || "",
      authorAvatar: initial.author?.avatar || "",
      authorRole: initial.author?.role || "",
      authorContactLinks: (initial.author?.contactLinks || [])
        .map((link: any) => `${link.type || ""}|${link.url || ""}`)
        .join("\n"),
      tags: (initial.tags || []).join(", "),
      startDate: initial.startDate || "",
      endDate: initial.endDate || "",
      faqs: (initial.faqs || [])
        .map((faq: any) => `${faq.question || ""}|${faq.answer || ""}`)
        .join("\n"),
      testimonials: (initial.testimonials || [])
        .map((t: any) => `${t.name || ""}|${t.role || ""}|${t.text || ""}|${t.rating ?? ""}`)
        .join("\n"),
      relatedProjects: (initial.relatedProjects || [])
        .map(
          (r: any) =>
            `${r.id || ""}|${r.title || ""}|${r.image || ""}|${r.category || ""}|${r.shortDescription || ""}`,
        )
        .join("\n"),
      challenge: initial.challenge || "",
      solution: initial.solution || "",
      results: (initial.results || [])
        .map((r: any) => `${r.stat || ""}|${r.description || ""}`)
        .join("\n"),
      gallery: (initial.gallery || []).join("\n"),
    };
  }, [initial]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [authorContactLinks, setAuthorContactLinks] = useState("");
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [faqs, setFaqs] = useState("");
  const [testimonials, setTestimonials] = useState("");
  const [relatedProjects, setRelatedProjects] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState("");
  const [gallery, setGallery] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!parsedInitial) return;

    setTitle(parsedInitial.title);
    setDescription(parsedInitial.description);
    setImage(parsedInitial.image);
    setProjectUrl(parsedInitial.projectUrl);
    setFeatured(parsedInitial.featured);
    setContent(parsedInitial.content);
    setCategory(parsedInitial.category);
    setAuthorName(parsedInitial.authorName);
    setAuthorAvatar(parsedInitial.authorAvatar);
    setAuthorRole(parsedInitial.authorRole);
    setAuthorContactLinks(parsedInitial.authorContactLinks);
    setTags(parsedInitial.tags);
    setStartDate(parsedInitial.startDate);
    setEndDate(parsedInitial.endDate);
    setFaqs(parsedInitial.faqs);
    setTestimonials(parsedInitial.testimonials);
    setRelatedProjects(parsedInitial.relatedProjects);
    setChallenge(parsedInitial.challenge);
    setSolution(parsedInitial.solution);
    setResults(parsedInitial.results);
    setGallery(parsedInitial.gallery);
  }, [parsedInitial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      projectUrl: projectUrl.trim(),
      featured,
      content,
      category: category.trim(),
      author: {
        name: authorName.trim(),
        avatar: authorAvatar.trim(),
        role: authorRole.trim(),
        contactLinks: splitLines(authorContactLinks)
          .map((line) => parsePipeRecord(line, 2))
          .filter((row): row is string[] => Boolean(row))
          .map(([type, url]) => ({ type, url })),
      },
      tags: splitByComma(tags),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      faqs: splitLines(faqs)
        .map((line) => parsePipeRecord(line, 2))
        .filter((row): row is string[] => Boolean(row))
        .map(([question, answer]) => ({ question, answer })),
      testimonials: splitLines(testimonials)
        .map((line) => parsePipeRecord(line, 4))
        .filter((row): row is string[] => Boolean(row))
        .map(([name, role, text, rating]) => ({
          name,
          role,
          text,
          rating: Number(rating) || 0,
        })),
      relatedProjects: splitLines(relatedProjects)
        .map((line) => parsePipeRecord(line, 5))
        .filter((row): row is string[] => Boolean(row))
        .map(([id, itemTitle, itemImage, itemCategory, shortDescription]) => ({
          id,
          title: itemTitle,
          image: itemImage,
          category: itemCategory,
          shortDescription,
        })),
      challenge: challenge.trim(),
      solution: solution.trim(),
      results: splitLines(results)
        .map((line) => parsePipeRecord(line, 2))
        .filter((row): row is string[] => Boolean(row))
        .map(([stat, resultDescription]) => ({ stat, description: resultDescription })),
      gallery: splitLines(gallery),
    };

    await onSave(payload);
    setSaving(false);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const textareaClass = `${inputClass} min-h-[110px] resize-y`;

  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit}>
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Project Basics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Project URL</label>
            <input type="url" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Start Date</label>
            <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} placeholder="2026-02-01" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">End Date</label>
            <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} placeholder="2026-03-15" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={textareaClass} required />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Media & Content</h2>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Main Image</label>
          {image ? (
            <img
              src={image}
              alt="Project preview"
              className="mb-3 h-28 w-44 rounded-lg border border-slate-200 object-cover"
            />
          ) : null}
          <CloudinaryUpload onUpload={setImage}>Upload Image</CloudinaryUpload>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Gallery URLs (one URL per line)</label>
          <textarea
            value={gallery}
            onChange={(e) => setGallery(e.target.value)}
            className={textareaClass}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Rich Content</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Case Study Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Tags (comma separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} placeholder="nextjs, seo, mongodb" />
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Mark as featured project
          </label>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Challenge</label>
            <textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} className={textareaClass} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Solution</label>
            <textarea value={solution} onChange={(e) => setSolution(e.target.value)} className={textareaClass} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Results (one per line: stat|description)</label>
            <textarea
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className={textareaClass}
              placeholder="95+|Google PageSpeed score"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Author & Extended Data</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className={inputClass} placeholder="Author name" />
          <input type="text" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} className={inputClass} placeholder="Author role" />
          <input type="url" value={authorAvatar} onChange={(e) => setAuthorAvatar(e.target.value)} className={inputClass} placeholder="Author avatar URL" />
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Author contact links (one per line: type|url)</label>
            <textarea value={authorContactLinks} onChange={(e) => setAuthorContactLinks(e.target.value)} className={textareaClass} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">FAQs (one per line: question|answer)</label>
            <textarea value={faqs} onChange={(e) => setFaqs(e.target.value)} className={textareaClass} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Testimonials (one per line: name|role|text|rating)</label>
            <textarea value={testimonials} onChange={(e) => setTestimonials(e.target.value)} className={textareaClass} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Related projects (one per line: id|title|image|category|shortDescription)</label>
            <textarea value={relatedProjects} onChange={(e) => setRelatedProjects(e.target.value)} className={textareaClass} />
          </div>
        </div>
      </section>

      <div className="sticky bottom-4 z-10 flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-lg bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-lg border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
