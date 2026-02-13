import React from "react";

export interface PortfolioDetail {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  shortDescription: string;
  description: string;
  image?: string;
  images: string[];
  content?: string;
  projectUrl?: string;
  featured?: boolean;
  createdAt?: string | Date;
  startDate: string;
  endDate: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    contactLinks: { type: string; url: string }[];
  };
  tags: string[];
  faqs: { question: string; answer: string }[];
  testimonials: { name: string; role: string; text: string; rating: number }[];
  relatedProjects: { id: string; title: string; image: string; category: string; shortDescription: string }[];
  challenge?: string;
  solution?: string;
  results?: { stat: string; description: string }[];
  gallery?: string[];
  highlights?: { icon: string; text: string }[];
}

export default function PortfolioHero({ project }: { project: PortfolioDetail }) {
  return (
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            {project.category}
          </span>
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{project.shortDescription}</p>
        </div>
        {project.images?.[0] && (
          <img
            src={project.images[0]}
            alt={project.title}
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        )}
      </div>
    </section>
  );
}
