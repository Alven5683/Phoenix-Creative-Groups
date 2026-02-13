"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PortfolioHero, { PortfolioDetail } from "components/PortfolioHero";
import PortfolioDescription from "components/PortfolioDescription";
import PortfolioMetaSidebar from "components/PortfolioMetaSidebar";
import PortfolioFAQ from "components/PortfolioFAQ";
import RelatedProjects from "components/RelatedProjects";

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/portfolio/${id}`);
        const data = await res.json();
        setProject(data);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProject();
  }, [id]);

  if (loading) return <div className="py-16 text-center">Loading...</div>;
  if (!project) return <div className="py-16 text-center">Project not found.</div>;

  // Theme colors and gradients
  const gradientBg = "bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] min-h-screen";
  const cardBg = "glass-card p-8 md:p-10 mb-8";

  return (
    <div className={gradientBg}>
      <div className="max-w-2xl mx-auto pt-12 pb-24 px-2 md:px-0 flex flex-col gap-8">
        {/* Top Info Card */}
        <div className={cardBg + " flex flex-col gap-4 items-center text-center"}>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 leading-tight">{project.title}</h1>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500 font-medium mb-2">
            <div><span className="font-semibold">Published Date:</span> {project.startDate || "N/A"}</div>
            <div><span className="font-semibold">Industry:</span> {project.category || "N/A"}</div>
          </div>
          <div className="text-xs text-gray-400 mb-2">Services: {project.tags?.join(", ") || "N/A"}</div>
        </div>

        {/* Main Image */}
        {(project.image || project.images?.[0]) && (
          <div className={cardBg + " p-0 flex justify-center"}>
            <img src={project.image || project.images[0]} alt={project.title} className="w-full max-w-2xl h-72 md:h-96 object-cover rounded-2xl border border-gray-200 shadow-lg" />
          </div>
        )}

        {/* Gallery Section */}
        {((project.images && project.images.length > 1) || (project.gallery && project.gallery.length > 0)) && (
          <div className={cardBg}>
            <div className="text-2xl font-bold mb-4 text-left">Gallery</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ...(project.images ? project.images.slice(1) : []),
                ...(project.gallery || [])
              ].map((img, idx) => (
                <img key={idx} src={img} alt={project.title + " gallery " + idx} className="w-full h-56 object-cover rounded-xl border border-gray-200 shadow-md transition-transform hover:scale-105" />
              ))}
            </div>
          </div>
        )}

        {/* Overview Section */}
        <div className={cardBg}>
          <h2 className="text-2xl font-bold mb-4 text-left">Overview</h2>
          <div className="text-gray-700 text-base mb-2">{project.shortDescription || project.description}</div>
          <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 mb-2">
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
          {project.content && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1">Content</h3>
              <div className="prose prose-base max-w-none text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-4 items-center">
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">Visit Project</a>
            )}
            {project.featured && (
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold ml-2">Featured Project</span>
            )}
          </div>
        </div>
      </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardBg}>
            <h3 className="text-xl font-bold mb-2">Challenge</h3>
            <div className="text-gray-700 text-base">{project.challenge || "In the crowded market, differentiation is everything. (Add your challenge here.)"}</div>
          </div>
          <div className={cardBg}>
            <h3 className="text-xl font-bold mb-2">Solution</h3>
            <div className="text-gray-700 text-base">{project.solution || "We began by defining a new brand strategy... (Add your solution here.)"}</div>
          </div>
        </div>

        {/* Results Section */}
        {project.results && project.results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.results.map((result, idx) => (
              <div key={idx} className={cardBg + " flex flex-col items-center justify-center text-center p-6"}>
                <div className="text-2xl font-bold text-accent-cyan mb-2">{result.stat}</div>
                <div className="text-gray-700 text-sm">{result.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* Author Section */}
        {project.author && (
          <div className={cardBg + " flex items-center gap-4"}>
            {project.author.avatar && (
              <img src={project.author.avatar} alt={project.author.name} className="w-16 h-16 rounded-full border border-gray-200" />
            )}
            <div>
              <div className="font-bold">{project.author.name}</div>
              <div className="text-sm text-gray-500">{project.author.role}</div>
              {project.author.contactLinks && project.author.contactLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.author.contactLinks.map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">{link.type}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQs Section */}
        {project.faqs && project.faqs.length > 0 && (
          <div className={cardBg}>
            <h3 className="text-xl font-bold mb-4">FAQs</h3>
            <ul className="list-disc pl-5 space-y-2 text-left">
              {project.faqs.map((faq, idx) => (
                <li key={idx}>
                  <span className="font-semibold">Q:</span> {faq.question}<br />
                  <span className="font-semibold">A:</span> {faq.answer}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonials Section */}
        {project.testimonials && project.testimonials.length > 0 && (
          <div className={cardBg}>
            <h3 className="text-xl font-bold mb-4">Testimonials</h3>
            <ul className="space-y-4">
              {project.testimonials.map((t, idx) => (
                <li key={idx} className="border-l-4 border-accent-cyan pl-4">
                  <div className="italic">"{t.text}"</div>
                  <div className="mt-1 text-sm font-semibold">- {t.name}, {t.role} {t.rating && (<span className="text-yellow-500">({t.rating}★)</span>)}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Projects Section */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <div className={cardBg}>
            <h3 className="text-xl font-bold mb-4">Related Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.relatedProjects.map((rp, idx) => (
                <div key={idx} className="flex gap-3 items-center border border-gray-200 rounded-lg p-2 bg-white/70">
                  {rp.image && <img src={rp.image} alt={rp.title} className="w-16 h-16 object-cover rounded-md" />}
                  <div>
                    <div className="font-semibold">{rp.title}</div>
                    <div className="text-xs text-gray-500">{rp.category}</div>
                    <div className="text-xs text-gray-400">{rp.shortDescription}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Created At Section */}
        {project.createdAt && (
          <div className="text-right text-xs text-gray-400 mb-4">
            Created: {new Date(project.createdAt).toLocaleString()}
          </div>
        )}

        {/* Let's Crafting Section */}

        <div className={cardBg + " p-0 bg-linear-to-r from-primary to-secondary text-white text-center font-display text-3xl font-bold shadow-xl"}>
          <div className="py-8">Let’s Crafting</div>
        </div>
    </div>
  );
}
