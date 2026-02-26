"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart, CloudLightning, Users, Settings, Rocket } from 'lucide-react';

type Benefit = {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security and compliance for peace of mind.'
  },
  {
    icon: BarChart,
    title: 'Data-Driven Insights',
    description: 'Unlock actionable insights from your data to drive growth.'
  },
  {
    icon: CloudLightning,
    title: 'Scalable Infrastructure',
    description: 'Cloud-native solutions that grow with your business.'
  },
  {
    icon: Users,
    title: 'Customer Engagement',
    description: 'Personalized experiences to boost customer satisfaction.'
  },
  {
    icon: Settings,
    title: 'Automation & Efficiency',
    description: 'Automate workflows and reduce manual effort.'
  },
  {
    icon: Rocket,
    title: 'Rapid Innovation',
    description: 'Accelerate your digital transformation and stay ahead.'
  }
];

const BusinessBenefits = () => {
  return (
    <section id="benefits" className="py-20 bg-white w-full" aria-label="Business Benefits">
      <button className="bg-white shadow-md rounded-full px-4 py-1 text-sm font-semibold flex items-center mx-auto mb-4 focus:outline-none focus:ring-2 focus:ring-glassBorder" tabIndex={0} aria-label="Business Benefits">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m13 18V7a2 2 0 00-2-2h-6" />
        </svg>
        Business Benefits
      </button>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Business Benefits
          </h2>
          <p className="text-xl text-gray-600 w-full max-w-full">
            Discover how our AI solutions deliver measurable value and competitive advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-glassBorder"
                tabIndex={0}
                role="listitem"
                aria-label={benefit.title}
              >
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-black" aria-hidden={true} />
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessBenefits;

