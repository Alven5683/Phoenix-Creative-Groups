"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PortfolioHero, { PortfolioDetail } from "components/PortfolioHero";
import PortfolioDescription from "components/PortfolioDescription";
import PortfolioMetaSidebar from "components/PortfolioMetaSidebar";
import PortfolioFAQ from "components/PortfolioFAQ";
import RelatedProjects from "components/RelatedProjects";
import SafeHtmlContent from "@/components/SafeHtmlContent";

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const res = await fetch(`/api/public/portfolio/${id}`);
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

  // Visual system
  const container = "max-w-[1200px] mx-auto px-6 w-full";
  const section = "w-full flex flex-col items-center justify-center py-20"; // 80px top/bottom
  const sectionNarrow = "max-w-[900px] w-full mx-auto";
  const muted = "text-[#6B7280]";
  const primary = "text-[#4F46E5]";
  const bg = "bg-[#F8F9FB] min-h-screen";
  const h1 = "text-[48px] font-bold text-[#111827] leading-tight text-center font-sans";
  const h2 = "text-[32px] font-semibold text-[#111827] font-sans";
  const h3 = "text-[24px] font-semibold text-[#111827] font-sans";
  const body = "text-[18px] text-[#111827] font-sans";
  const meta = "text-[14px] text-[#6B7280] font-sans";
  const radius = "rounded-[12px]";

  return (
    <div className={bg}>
      <div className={container}>
        {/* HERO SECTION */}
        <section className={section}>
          <div className={sectionNarrow}>
            <h1 className={h1}>{project.title}</h1>
            <div className={"mt-6 text-[24px] text-center font-normal " + muted}>{project.subtitle || ""}</div>
            <div className="flex flex-wrap gap-6 justify-center items-center mt-6 mb-2">
              <div className={meta}>Published: {project.startDate || "N/A"}</div>
              <div className={meta}>Industry: {project.category || "N/A"}</div>
              <div className={meta}>Tech: {project.tags?.join(", ") || "N/A"}</div>
            </div>
          </div>
          {(project.image || project.images?.[0]) && (
            <div className="w-full flex justify-center mt-10">
              <img src={project.image || project.images[0]} alt={project.title} className="w-full max-w-3xl h-96 object-cover rounded-[12px] border border-gray-200" style={{boxShadow:'0 2px 24px 0 rgba(31,41,55,0.06)'}} />
            </div>
          )}
        </section>

        {/* Gallery Section */}
        {/* GALLERY SECTION */}
        {((project.images && project.images.length > 1) || (project.gallery && project.gallery.length > 0)) && (
          <section className={section + " pt-0"}>
            <div className="w-full">
              <h2 className={h2 + " mb-8 text-left"}>Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  ...(project.images ? project.images.slice(1) : []),
                  ...(project.gallery || [])
                ].map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={project.title + " gallery " + idx}
                    className={"w-full h-72 object-cover rounded-[12px] border border-gray-200 transition-shadow duration-200 hover:shadow-lg"}
                    style={{boxShadow:'none'}}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Overview Section */}
        {/* OVERVIEW SECTION */}
        <section className={section}>
          <div className="w-full flex flex-col md:flex-row gap-12 items-start">
            {/* Left: Heading & Paragraph */}
            <div className="flex-1 min-w-0">
              <h2 className={h2 + " mb-6"}>Overview</h2>
              <div className={body + " mb-4"}>{project.shortDescription || project.description}</div>
              {project.content && (
                <SafeHtmlContent html={project.content} className={body + " mb-2"} />
              )}
              <div className="flex flex-wrap gap-3 mt-4 items-center">
                {project.projectUrl && (
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] underline font-medium">Visit Project</a>
                )}
                {project.featured && (
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold ml-2">Featured Project</span>
                )}
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-px h-full bg-gray-200 mx-4" />
            {/* Right: 4 Bullet Highlights */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {(project.highlights || [
                  { icon: '🚀', text: 'High performance, scalable architecture' },
                  { icon: '🔒', text: 'Enterprise-grade security' },
                  { icon: '⚡', text: 'Fast, SEO-optimized delivery' },
                  { icon: '☁️', text: 'Cloud-native deployment' },
                ]).slice(0,4).map((h: {icon: string; text: string}, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden>{h.icon}</span>
                  <span className={body}>{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

        {/* Challenge & Solution */}
        {/* CHALLENGE & SOLUTION SECTION */}
        <section className={section}>
          <div className="w-full flex flex-col md:flex-row gap-0">
            <div className="flex-1 pr-0 md:pr-10">
              <h3 className={h3 + " mb-4"}>Challenge</h3>
              <div className={body}>{project.challenge || "In the crowded market, differentiation is everything. (Add your challenge here.)"}</div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 mx-8" />
            <div className="flex-1 pl-0 md:pl-10 mt-12 md:mt-0">
              <h3 className={h3 + " mb-4"}>Solution</h3>
              <div className={body}>{project.solution || "We began by defining a new brand strategy... (Add your solution here.)"}</div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {/* METRICS SECTION */}
        {project.results && project.results.length > 0 && (
          <section className={section + " py-16"}>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#F3F4F6] rounded-[12px] p-8">
              {project.results.slice(0,4).map((result, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center">
                  <div className="text-[48px] font-bold text-[#111827] mb-2">{result.stat}</div>
                  <div className="text-[16px] text-[#6B7280]">{result.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Author Section */}
        {project.author && (
          <section className={section + " py-8"}>
            <div className="w-full flex items-center gap-6">
              {project.author.avatar && (
                <img src={project.author.avatar} alt={project.author.name} className="w-16 h-16 rounded-full border border-gray-200" />
              )}
              <div>
                <div className="font-bold text-[20px] text-[#111827]">{project.author.name}</div>
                <div className="text-[16px] text-[#6B7280]">{project.author.role}</div>
                {project.author.contactLinks && project.author.contactLinks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.author.contactLinks.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#4F46E5] underline text-xs">{link.type}</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {project.faqs && project.faqs.length > 0 && (
          <section className={section + " py-8"}>
            <div className="w-full">
              <h3 className={h3 + " mb-6"}>FAQs</h3>
              <ul className="list-disc pl-5 space-y-4 text-left">
                {project.faqs.map((faq, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">Q:</span> {faq.question}<br />
                    <span className="font-semibold">A:</span> {faq.answer}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {/* TESTIMONIAL SECTION */}
        {project.testimonials && project.testimonials.length > 0 && (
          <section className={section + " py-16"}>
            <div className="w-full flex justify-center">
              <div className="max-w-[800px] w-full bg-[#F3F4F6] rounded-[12px] px-8 py-10 flex flex-col items-center relative">
                <span className="text-[64px] text-[#4F46E5] absolute left-6 top-2 select-none" aria-hidden>“</span>
                <div className="text-[24px] text-[#111827] italic text-center z-10">{project.testimonials[0].text}</div>
                <div className="mt-6 text-[16px] text-[#6B7280] font-semibold text-center z-10">- {project.testimonials[0].name}{project.testimonials[0].role ? `, ${project.testimonials[0].role}` : ''}</div>
              </div>
            </div>
          </section>
        )}

        {/* Related Projects Section */}
        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <section className={section + " py-8"}>
            <div className="w-full">
              <h3 className={h3 + " mb-6"}>Related Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.relatedProjects.map((rp, idx) => (
                  <div key={idx} className="flex gap-3 items-center border border-gray-200 rounded-2xl p-2 bg-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-200">
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
          </section>
        )}

        {/* Created At Section */}
        {project.createdAt && (
          <div className="text-right text-xs text-gray-400 mb-4">
            Created: {new Date(project.createdAt).toLocaleString()}
          </div>
        )}

        {/* Let's Crafting Section */}

        {/* CTA SECTION */}
        <section className={section + " py-0"}>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl bg-linear-to-r from-[#4F46E5] to-[#6366F1] text-white text-center font-bold text-[32px] px-8 py-16 rounded-[12px] shadow-none">
              Let’s Crafting
            </div>
          </div>
        </section>
      {/* FOOTER (full width bg, container content) */}
      <footer className="w-full bg-[#111827] mt-20 py-12">
        <div className={container + " flex flex-col items-center text-center text-white gap-4"}>
          <div className="text-[20px] font-bold mb-2">Phoenix Creative Group</div>
          <div className="text-[14px] text-[#D1D5DB]">&copy; 2026 Phoenix Creative Group. All rights reserved. Built with passion for the future of AI.</div>
        </div>
      </footer>
    </div>
  );
}
