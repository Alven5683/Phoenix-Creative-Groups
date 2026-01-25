"use client";

import PageHero from '../../components/PageHero';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <>
      <motion.section
        className="w-full bg-white py-16 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-4xl font-extrabold text-black mt-12 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            About Phoenix Creative Group
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet the team behind Phoenix Creative Group.
          </motion.p>
        </div>
      </motion.section>
      <motion.section
        className="max-w-3xl mx-auto mt-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <GlassCard className="p-8">
          <motion.h2 className="text-2xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >Our Mission</motion.h2>
          <motion.p className="text-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            We help brands and businesses grow through world-class web development, UI/UX design, and digital marketing. Our team blends creativity, technology, and strategy to deliver premium results for every client.
          </motion.p>
          <motion.h2 className="text-2xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >Why Choose Us?</motion.h2>
          <motion.ul className="list-disc list-inside text-black space-y-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <li>Experienced, passionate team</li>
            <li>Cutting-edge technology &amp; design</li>
            <li>Transparent, collaborative process</li>
            <li>Results-driven digital solutions</li>
          </motion.ul>
          <motion.h2 className="text-2xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >Our Team</motion.h2>
          <motion.p className="text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            {`We're a diverse group of designers, developers, and strategists united by a love for digital innovation. Let's build something amazing together.`}
          </motion.p>
        </GlassCard>
      </motion.section>
    </>
  );
}
