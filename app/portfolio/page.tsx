"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import GlassCard from "../../components/GlassCard";
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
      <h1 className="text-4xl font-display font-bold mb-8 text-accent-violet drop-shadow-lg">Our Portfolio</h1>
      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        <motion.div
          className="grid xs:grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {projects.map((project) => (
            <Link key={project._id} href={`/portfolio/${project._id}`} className="block focus:outline-none focus:ring-2 focus:ring-accent-cyan rounded-lg">
              <GlassCard className="p-6 cursor-pointer hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-display font-bold mb-2 text-accent-cyan drop-shadow">
                  {project.title}
                </h2>
                <p className="mb-4 text-lg text-gray-900 dark:text-gray-100/90">{project.description}</p>
                {project.image && (
                  <img src={project.image} alt={project.title} className="mb-4 rounded-lg w-full h-40 object-cover border border-glassBorder shadow-glass" />
                )}
                <span className="text-accent-neon underline font-semibold">View Project</span>
              </GlassCard>
            </Link>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
