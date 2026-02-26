"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

type Portfolio = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  projectUrl?: string;
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/public/portfolio");
        const data = await res.json();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const truncate = (text?: string, max = 220) => {
    if (!text) return "Explore how we solved this challenge with design, engineering, and measurable business outcomes.";
    if (text.length <= max) return text;
    return `${text.slice(0, max).trimEnd()}...`;
  };

  return (
    <div className="bg-[#eceff4]">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-4 pb-10 pt-24 text-center sm:px-6"
      >
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Projects made with
          <br />
          purpose.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
          We design and build digital products that solve real business problems and drive measurable growth.
        </p>
      </motion.section>

      <main className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        {loading ? (
          <div className="space-y-14 py-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="h-72 animate-pulse rounded-sm border border-slate-200 bg-slate-100" />
                <div className="h-72 animate-pulse rounded-sm border border-slate-200 bg-slate-100" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">No portfolio items yet</h2>
            <p className="mt-2 text-slate-600">
              Add portfolio entries from the admin panel and they will appear here automatically.
            </p>
          </div>
        ) : (
          <section className="space-y-20 py-6">
            {projects.map((project, index) => {
              const reverse = index % 2 !== 0;
              return (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`grid items-center gap-12 ${reverse ? "md:grid-cols-[1fr_1.1fr]" : "md:grid-cols-[1.1fr_1fr]"}`}
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <div className="overflow-hidden rounded-sm border border-slate-300 bg-white shadow-sm">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="h-[280px] w-full object-cover md:h-[360px]" />
                      ) : (
                        <div className="flex h-[280px] items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100 md:h-[360px]">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Project Preview
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={reverse ? "md:order-1" : ""}>
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900">{project.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                      {truncate(project.description)}
                    </p>
                    <ul className="mt-6 space-y-2 text-sm font-medium text-slate-800">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-900" />
                        Redesign and optimize user journey
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-900" />
                        Improve SEO and technical performance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-900" />
                        Launch scalable growth-ready architecture
                      </li>
                    </ul>
                    <Link
                      href={`/portfolio/${project._id}`}
                      className="mt-6 inline-flex items-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Case study
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </section>
        )}
      </main>

      <section className="border-t border-slate-200/80 bg-[#eef2f7] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h3 className="text-center text-4xl font-bold text-slate-900">Are you looking for a partner to help?</h3>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Tell us about your product, timeline, and goals. We will reply with clear next steps.
          </p>
          <form className="mt-10 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First name"
                className="h-12 rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
              />
              <input
                type="text"
                placeholder="Last name"
                className="h-12 rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                className="h-12 rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
              />
              <input
                type="text"
                placeholder="Phone number"
                className="h-12 rounded-md border border-slate-200 px-4 text-sm text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
              />
            </div>
            <textarea
              placeholder="How can we help you?"
              rows={5}
              className="w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none ring-blue-500 transition focus:ring-2"
            />
            <div className="text-center">
              <button
                type="button"
                className="inline-flex h-11 items-center rounded-md bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
