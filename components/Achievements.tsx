"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, ThumbsUp } from 'lucide-react';

type Achievement = {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  value: string;
  label: string;
  description: string;
};

const achievements: Achievement[] = [
  {
    icon: Award,
    value: '15+',
    label: 'Industry Awards',
    description: 'Recognized for innovation and excellence in digital solutions.'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Client Rating',
    description: 'Consistently rated highly by our clients for quality and service.'
  },
  {
    icon: ThumbsUp,
    value: '99%',
    label: 'Satisfaction Rate',
    description: 'Our clients recommend us for reliability and results.'
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-white w-full" aria-label="Achievements">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Achievements
          </h2>
          <p className="text-xl text-gray-600 w-full max-w-full">
            Celebrating milestones and recognition earned through dedication and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center focus-within:ring-2 focus-within:ring-glassBorder"
                tabIndex={0}
                role="listitem"
                aria-label={item.label}
              >
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-10 w-10 text-black" aria-hidden={true} />
                </div>
                <div className="text-5xl font-bold text-black mb-2">{item.value}</div>
                <div className="text-xl font-semibold text-gray-800 mb-4">{item.label}</div>
                <p className="text-gray-600 max-w-xs mx-auto">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

