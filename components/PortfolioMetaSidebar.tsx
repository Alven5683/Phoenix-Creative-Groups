import React from "react";
import type { PortfolioDetail } from "./PortfolioHero";

export default function PortfolioMetaSidebar({ meta }: { meta: PortfolioDetail }) {
  return (
    <aside className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 mt-16">
      {/* Dates */}
      <div className="mb-6 flex items-center gap-2">
        <span aria-hidden className="text-gray-400">📅</span>
        <div>
          <div className="font-semibold text-gray-700">Start Date / End Date</div>
          <div className="text-sm text-gray-600">
            Start: {meta.startDate || <span className="text-gray-400">Not provided</span>}<br />
            End: {meta.endDate || <span className="text-gray-400">Not provided</span>}
          </div>
        </div>
      </div>
      <hr className="my-3 border-gray-200" />
      {/* Author */}
      <div className="mb-6">
        <div className="font-semibold text-gray-700 flex items-center gap-2"><span aria-hidden className="text-gray-400">👤</span>Project Author</div>
        {meta.author && meta.author.name ? (
          <div className="flex items-center gap-2 mt-2">
            {meta.author.avatar ? (
              <img src={meta.author.avatar} alt={meta.author.name} className="w-8 h-8 rounded-full border border-gray-300" />
            ) : (
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">?</span>
            )}
            <div>
              <div className="text-sm font-bold">{meta.author.name}</div>
              <div className="text-xs text-gray-500">{meta.author.role || <span className="text-gray-400">No role</span>}</div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-400 mt-2">No author info</div>
        )}
      </div>
      <hr className="my-3 border-gray-200" />
      {/* Contact Links */}
      <div className="mb-6">
        <div className="font-semibold text-gray-700 flex items-center gap-2"><span aria-hidden className="text-gray-400">🔗</span>Contact Links</div>
        <div className="flex gap-2 mt-2">
          {meta.author && Array.isArray(meta.author.contactLinks) && meta.author.contactLinks.length > 0 ? (
            meta.author.contactLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs focus:outline focus:ring-2 focus:ring-blue-400" aria-label={link.type}>
                {link.type}
              </a>
            ))
          ) : (
            <span className="text-xs text-gray-400">No contact links</span>
          )}
        </div>
      </div>
      <hr className="my-3 border-gray-200" />
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {meta.tags && meta.tags.length > 0 ? (
          meta.tags.map((tag, i) => (
            <span key={i} className="inline-block bg-accent-cyan/10 text-accent-cyan px-2 py-1 rounded-full text-xs font-semibold border border-accent-cyan/30">
              #{tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No tags</span>
        )}
      </div>
    </aside>
  );
}
