"use client";
import Link from 'next/link';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs'; 
import Services from '@/components/Services';
import BusinessBenefits from '@/components/BusinessBenefits';
import HowWeWork from '@/components/HowWeWork';
import Achievements from '@/components/Achievements';
import Pricing from '@/components/Pricing';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { motion } from 'framer-motion';

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

      {/* Features / Why Choose Us */}
      <WhyChooseUs />

      {/* Services Grid */}
      <Services />

      {/* Business Benefits Section */}
      <BusinessBenefits />

      {/* Process / How It Works */}
      <HowWeWork />

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
