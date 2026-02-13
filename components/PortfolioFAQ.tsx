import React from "react";
import type { PortfolioDetail } from "./PortfolioHero";

export default function PortfolioFAQ({ faqs }: Pick<PortfolioDetail, "faqs">) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Why This Project Matters</h2>
      <div className="space-y-2">
        {faqs?.map((faq, i) => (
          <details key={i} className="bg-white/60 dark:bg-gray-900/60 rounded p-4">
            <summary className="font-semibold cursor-pointer">{faq.question}</summary>
            <div className="mt-2 text-gray-700 dark:text-gray-200">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
