"use client";
import { motion } from 'framer-motion';
import { Zap, Shield, Palette } from 'lucide-react';

type Feature = {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Deploy AI solutions in minutes, not months. Our optimized infrastructure ensures peak performance.'
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description: 'Tailor every aspect to your brand. Complete control over design, functionality, and user experience.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption. Your data and your users are always protected.'
  }
];

const WhyChooseUs = () => {
  return (
    <section id="features" className="py-20 bg-white w-full" aria-label="Why Choose Us">
      <button className="bg-white shadow-md rounded-full px-4 py-1 text-sm font-semibold flex items-center mx-auto mb-4 focus:outline-none focus:ring-2 focus:ring-glassBorder" tabIndex={0} aria-label="Why Choose Us">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m13 18V7a2 2 0 00-2-2h-6" />
        </svg>
        WhyChooseUs
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
            Why Choose Phoenix?
          </h2>
          <p className="text-xl text-gray-600 w-full max-w-full">
            Built for creators, designed for scale. Experience the perfect blend of power and simplicity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-glassBorder"
                tabIndex={0}
                role="listitem"
                aria-label={feature.title}
              >
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-black" aria-hidden={true} />
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;

