"use client";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useParams } from "next/navigation";
import SafeHtmlContent from "@/components/SafeHtmlContent";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      setLoading(true);
      try {
        const res = await fetch(`/api/public/services/${slug}`);
        const data = await res.json();
        setService(data);
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchService();
  }, [slug]);

  if (loading) return <div className="max-w-2xl mx-auto py-16 px-4">Loading...</div>;
  if (!service) return <div className="max-w-2xl mx-auto py-16 px-4">Service not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-16 px-4"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100">
        {service.image && (
          <img
            src={service.image}
            alt={service.title}
            className="rounded-xl w-full h-48 object-cover mb-6"
            style={{ maxWidth: '400px', minHeight: '192px', background: '#f3f4f6' }}
          />
        )}
        {/* Icon placeholder for dynamic icon support */}
        {/* {service.icon && <IconComponent className="w-12 h-12 mb-4 text-indigo-500" />} */}
        <h1 className="text-3xl font-bold mb-4 text-black">{service.title}</h1>
        <p className="mb-4 text-gray-700">{service.description}</p>
        {service.content && (
          <SafeHtmlContent html={service.content} className="prose max-w-none" />
        )}
      </div>
    </motion.div>
  );
}
