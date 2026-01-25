"use client";
import React from 'react';
import { motion } from 'framer-motion';

const HowWeWork = () => (
  <motion.section
    className="w-full py-16 px-2 xs:px-4 md:px-8 lg:px-16 text-center bg-white"
    style={{width:'100vw', marginLeft:'calc(50% - 50vw)'}}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.h2
      className="text-2xl md:text-3xl font-bold text-black mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true }}
    >
      How We Work
    </motion.h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[{
        title: '1. Plan & Architect',
        desc: 'We listen, strategize, and design a solution tailored to your goals.'
      }, {
        title: '2. Build & Launch',
        desc: 'Our team develops, tests, and launches your project with care.'
      }, {
        title: '3. Grow & Support',
        desc: 'We help you scale, optimize, and support your digital presence.'
      }].map((step, i) => (
        <motion.div
          key={i}
          className="glass-card p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-black mb-2">{step.title}</h3>
          <p className="text-black">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default HowWeWork;
