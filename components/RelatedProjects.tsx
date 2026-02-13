import React from "react";
import type { PortfolioDetail } from "./PortfolioHero";

export default function RelatedProjects({ projects }: Pick<PortfolioDetail, "relatedProjects">) {
  if (!projects?.relatedProjects?.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Related Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.relatedProjects.map((p, i) => (
          <a key={i} href={`/portfolio/${p.id}`} className="block bg-white/70 dark:bg-gray-900/70 rounded-lg shadow p-4 hover:shadow-lg transition">
            {p.image && (
              <img src={p.image} alt={p.title} className="rounded mb-2 w-full h-32 object-cover" />
            )}
            <div className="text-xs text-gray-500 mb-1">{p.category}</div>
            <div className="font-semibold text-lg mb-1">{p.title}</div>
            <div className="text-sm text-gray-700 dark:text-gray-200">{p.shortDescription}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
