"use client";
import Contactform from '../../components/Contactform';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, MessageSquareText, Sparkles } from 'lucide-react';

export default function ContactClient() {
  return (
    <div className="w-full pt-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7fbff] via-white to-[#eef5ff] pt-20 pb-14">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Let&apos;s Build Something Valuable
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">Talk to the Phoenix Team</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Share your project goals, timeline, and priorities. We will map the right strategy, define clear next steps, and help you move from idea to execution with confidence.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Clock3, title: 'Fast response', text: 'Most inquiries receive a first response within one business day.' },
              { icon: CheckCircle2, title: 'Clear process', text: 'You get structured next steps and a practical plan, not generic replies.' },
              { icon: MessageSquareText, title: 'Strategic support', text: 'We align design, development, and growth around your business outcomes.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-5 shadow-md">
                <item.icon className="h-5 w-5 text-indigo-600" />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-8 px-4">
        <Contactform />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What happens after you contact us?</h2>
          <p className="mt-3 text-gray-600">
            After receiving your message, we review your goals, scope, and constraints. We then schedule a focused conversation to clarify outcomes, technical requirements, and delivery expectations. This ensures the proposal is realistic, actionable, and aligned with your priorities.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Discovery call</h3>
              <p className="mt-2 text-sm text-gray-600">We align on business context, audience, timeline, and project constraints.</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Scope and roadmap</h3>
              <p className="mt-2 text-sm text-gray-600">You receive a structured plan with deliverables, phases, and recommended stack.</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Execution model</h3>
              <p className="mt-2 text-sm text-gray-600">We define communication loops, milestone reviews, and launch criteria.</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Growth follow-through</h3>
              <p className="mt-2 text-sm text-gray-600">Post-launch optimization and analytics feedback are built into the plan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
