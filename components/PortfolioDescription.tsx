import React from "react";
import type { PortfolioDetail } from "./PortfolioHero";
import SafeHtmlContent from "@/components/SafeHtmlContent";

export default function PortfolioDescription({ description, images }: Pick<PortfolioDetail, "description" | "images">) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Project Description</h2>
      <div className="prose prose-lg max-w-none mb-6 text-gray-800 dark:text-gray-200">
        <SafeHtmlContent html={description} />
      </div>
      {images?.[1] && (
        <img
          src={images[1]}
          alt="Project visual"
          className="rounded-lg shadow w-full max-w-2xl mx-auto mb-4 object-cover"
        />
      )}
    </section>
  );
}
