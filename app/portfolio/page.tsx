"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import GlassCard from "../../components/GlassCard";

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
        const res = await fetch("/api/admin/portfolio");
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-5xl mx-auto py-16 px-4"
    >
      <h1 className="text-3xl font-bold mb-8">Our Portfolio</h1>
      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <GlassCard key={project._id} className="p-6">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="mb-4">{project.description}</p>
              {project.image && (
                <img src={project.image} alt={project.title} className="mb-4 rounded-lg w-full h-40 object-cover border border-glassBorder" />
              )}
              {project.projectUrl && (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">View Project</a>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </motion.div>
  );
}
