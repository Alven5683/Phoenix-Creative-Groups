"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Compass, Layers3, Sparkles, Users2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full pt-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eef5ff] py-20">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Who We Are
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-gray-900">About Phoenix Creative Group</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              We are a strategy-led digital team focused on building premium brand experiences that combine design quality, technical execution, and measurable growth outcomes.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: '8+', label: 'Years of Experience' },
              { value: '120+', label: 'Projects Delivered' },
              { value: '97%', label: 'Client Satisfaction' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md text-center">
                <p className="text-3xl font-extrabold text-gray-900">{metric.value}</p>
                <p className="mt-1 text-sm text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Compass,
              title: 'Mission',
              text: 'Help businesses grow through high-impact strategy, modern design, and reliable development execution.',
            },
            {
              icon: Layers3,
              title: 'Approach',
              text: 'Every project is planned as a system: clear goals, user-focused flows, and measurable delivery checkpoints.',
            },
            {
              icon: Users2,
              title: 'Team',
              text: 'Designers, developers, and strategists working together with one shared standard: quality that performs.',
            },
          ].map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
            >
              <item.icon className="h-5 w-5 text-indigo-600" />
              <h2 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why clients work with us</h2>
          <p className="mt-3 text-gray-600">
            Our clients choose Phoenix Creative Group because we balance creative ambition with delivery discipline. We build practical roadmaps, avoid vague scope, and focus on outcomes that matter to real business goals.
          </p>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li className="rounded-xl bg-gray-50 border border-gray-200 p-4">Strategy first, then design and implementation</li>
            <li className="rounded-xl bg-gray-50 border border-gray-200 p-4">Clear communication and milestone-based execution</li>
            <li className="rounded-xl bg-gray-50 border border-gray-200 p-4">Performance, accessibility, and scalability as defaults</li>
            <li className="rounded-xl bg-gray-50 border border-gray-200 p-4">Post-launch optimization support for continuous growth</li>
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 transition">
              Start a Conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
