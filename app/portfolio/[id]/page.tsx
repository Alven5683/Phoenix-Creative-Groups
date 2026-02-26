"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import type { PortfolioDetail } from "components/PortfolioHero";
import SafeHtmlContent from "@/components/SafeHtmlContent";

const fallbackHighlights = [
  "High-performance, scalable architecture",
  "Enterprise-grade security standards",
  "SEO-first technical implementation",
  "Cloud-native deployment strategy",
];

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [project, setProject] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/public/portfolio/${id}`);
        if (!res.ok) {
          setProject(null);
          return;
        }
        const data = await res.json();
        setProject(data);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="py-24 text-center text-slate-600">Loading project...</div>;
  }

  if (!project) {
    return <div className="py-24 text-center text-slate-700">Project not found.</div>;
  }

  const heroImage = project.image || project.images?.[0];
  const gallery = [
    ...(project.images?.slice(1) ?? []),
    ...(project.gallery ?? []),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm sm:p-10">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            {project.category || "Case Study"}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="mt-4 text-lg text-slate-600">{project.subtitle}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-lg bg-white/80 px-3 py-1">Published: {project.startDate || "N/A"}</span>
            <span className="rounded-lg bg-white/80 px-3 py-1">Industry: {project.category || "N/A"}</span>
            <span className="rounded-lg bg-white/80 px-3 py-1">Tech: {project.tags?.join(", ") || "N/A"}</span>
          </div>
        </div>

        {heroImage ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <img
              src={heroImage}
              alt={project.title}
              className="h-[260px] w-full object-cover sm:h-[420px]"
            />
          </motion.div>
        ) : null}
      </section>

      {gallery.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-slate-900">Gallery</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {gallery.map((img, idx) => (
              <img
                key={`${img}-${idx}`}
                src={img}
                alt={`${project.title} gallery ${idx + 1}`}
                className="h-64 w-full rounded-2xl border border-slate-200 object-cover"
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Overview</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            {project.shortDescription || project.description}
          </p>
          {project.content ? (
            <SafeHtmlContent html={project.content} className="prose prose-slate mt-5 max-w-none text-slate-700" />
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.projectUrl ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Visit Project
              </a>
            ) : null}
            {project.featured ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                Featured Project
              </span>
            ) : null}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">Key Highlights</h3>
          <ul className="mt-5 space-y-3">
            {(project.highlights?.map((h) => h.text) || fallbackHighlights).slice(0, 4).map((text, idx) => (
              <li key={`${text}-${idx}`} className="flex items-start gap-3 text-slate-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-slate-900" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-2xl font-semibold text-slate-900">Challenge</h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            {project.challenge || "The project required balancing speed, content scale, and search visibility within a competitive market."}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-2xl font-semibold text-slate-900">Solution</h3>
          <p className="mt-3 leading-relaxed text-slate-700">
            {project.solution || "We delivered a structured architecture, performance-focused UX, and scalable content operations."}
          </p>
        </div>
      </section>

      {project.results && project.results.length > 0 ? (
        <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-slate-900">Outcomes</h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.results.slice(0, 4).map((result, idx) => (
              <div key={`${result.stat}-${idx}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <div className="text-3xl font-bold text-slate-900">{result.stat}</div>
                <div className="mt-2 text-sm text-slate-600">{result.description}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {project.testimonials && project.testimonials.length > 0 ? (
        <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="mx-auto max-w-3xl text-xl italic leading-relaxed text-slate-800">
            "{project.testimonials[0].text}"
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-600">
            {project.testimonials[0].name}
            {project.testimonials[0].role ? `, ${project.testimonials[0].role}` : ""}
          </p>
        </section>
      ) : null}

      {project.faqs && project.faqs.length > 0 ? (
        <section className="mt-14">
          <h3 className="text-3xl font-bold text-slate-900">FAQs</h3>
          <div className="mt-6 space-y-4">
            {project.faqs.map((faq, idx) => (
              <details key={`${faq.question}-${idx}`} className="rounded-xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-center text-white sm:p-10">
        <h3 className="text-3xl font-bold">Ready to build your next case study?</h3>
        <p className="mx-auto mt-3 max-w-2xl text-white/90">
          Let us turn your vision into a measurable digital product with clear strategy, design, and execution.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Start a project
        </Link>
      </section>
    </div>
  );
}
