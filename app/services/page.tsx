"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Service = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
};
export default function ServicesPage() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
        const res = await fetch("/api/public/services");
        const data = await res.json();
        setServices(data);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const handleCardClick = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-6xl mx-auto py-16 px-4"
    >
      <h1 className="text-4xl font-bold text-center mb-4">Everything You Need. All in One Stack.</h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        From AI content to SEO automation and web development — scale your digital presence with powerful tools.
      </p>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : services.length === 0 ? (
        <div className="text-center">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service: Service) => (
            <div
              key={service._id}
              onClick={() => handleCardClick(service.slug)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-6 group border border-gray-100"
            >
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl w-full h-40 object-cover mb-4 group-hover:scale-105 transition-transform"
                  style={{ maxWidth: '320px', minHeight: '160px', background: '#f3f4f6' }}
                />
              )}
              <h2 className="text-lg font-semibold mb-2 text-black">{service.title}</h2>
              <p className="text-gray-600 mb-0">{service.description}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
