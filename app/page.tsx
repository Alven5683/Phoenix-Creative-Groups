"use client";
import Link from 'next/link';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs'; 
import Services from '@/components/Services';
import BusinessBenefits from '@/components/BusinessBenefits';
import Achievements from '@/components/Achievements';
import Pricing from '@/components/Pricing';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Hero Section */}
      <Hero />

      <section className="py-16 bg-white w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Visual Experience
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">Professional, Modern, and Built to Convert</h2>
              <p className="mt-4 text-lg text-gray-600">
                Real visual depth with clean structure, strong messaging, and better user flow.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Brand Strategy', image: '/globe.svg', desc: 'Positioning, messaging, and identity systems that feel premium.' },
                { title: 'Interactive Design', image: '/window.svg', desc: 'Modern UI with glass layers, motion cues, and clean hierarchy.' },
                { title: 'Growth Engineering', image: '/next.svg', desc: 'Fast implementation, scalable architecture, measurable outcomes.' },
              ].map((card, i) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                  className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50">
                    <img src={card.image} alt={card.title} className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{card.desc}</p>
                  <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                    Discuss Project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <WhyChooseUs />

      {/* Services Grid */}
      <Services />

      {/* Business Benefits Section */}
      <BusinessBenefits />

      {/* Results / Stats */}
      <Achievements />

      {/* Pricing Cards & Comparison */}
      <Pricing />

      {/* Comparison Table */}
      <Comparison />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
    </motion.div>
  );
}

