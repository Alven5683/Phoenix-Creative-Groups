"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { Brain, Code2, Settings2, Search, Server, Globe2 } from 'lucide-react';

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Brain,
    title: 'AI Content Creation',
    description: 'Generate SEO-friendly articles, product descriptions, and landing pages in seconds.'
  },
  {
    icon: Code2,
    title: 'Modern Web Development',
    description: 'We build blazing-fast websites using Next.js, Tailwind CSS, and headless CMS technologies.'
  },
  {
    icon: Search,
    title: 'Advanced SEO Automation',
    description: 'On-page audits, backlink tracking, keyword clustering — all automated with real-time data.'
  },
  {
    icon: Server,
    title: 'Scalable Hosting & Deployment',
    description: 'Deployed on Vercel, Cloudflare, or GCP for top performance and reliability.'
  },
  {
    icon: Settings2,
    title: 'Automation Workflows',
    description: 'Connect tools like Zapier, Make, or custom scripts to automate daily marketing operations.'
  },
  {
    icon: Globe2,
    title: 'Global Reach Campaigns',
    description: 'Multi-language SEO, region-specific link building, and global content strategies.'
  }
];


const Services = () => {
  return (
    <motion.section
      className="py-20 bg-gray-50 w-full"
      aria-label="Services"
      style={{width:'100vw', marginLeft:'calc(50% - 50vw)'}}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full px-2 xs:px-4 md:px-8 lg:px-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center focus-within:ring-2 focus-within:ring-glassBorder"
                tabIndex={0}
                role="listitem"
                aria-label={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-black" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
