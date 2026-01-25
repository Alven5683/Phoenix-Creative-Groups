"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services does Phoenix Creative Group offer?',
      answer:
        'We specialize in custom software development, web and mobile app development, UI/UX design, cloud integration, and product consulting tailored to your business needs.',
    },
    {
      question: 'How experienced is your development team?',
      answer:
        'Our team consists of highly skilled developers, designers, and project managers with years of experience delivering successful digital solutions across various industries.',
    },
    {
      question: 'Do you offer end-to-end project development?',
      answer:
        'Yes, we handle everything from ideation and design to development, testing, deployment, and post-launch support, ensuring a seamless experience throughout the lifecycle of your project.',
    },
    {
      question: 'Can you work with existing systems or projects?',
      answer:
        'Absolutely! We can integrate with your existing systems, improve legacy code, or pick up ongoing projects to bring them to completion efficiently.',
    },
    {
      question: 'What technologies do you work with?',
      answer:
        'We work with modern and scalable technologies including React, Next.js, Node.js, Python, Flutter, AWS, Firebase, MongoDB, and more based on your project requirements.',
    },
    {
      question: 'How do you ensure project confidentiality and security?',
      answer:
        'We take confidentiality seriously and are happy to sign NDAs. We follow strict data security protocols and best practices to keep your project and information safe.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50 w-full" aria-label="Frequently Asked Questions" style={{width:'100vw', marginLeft:'calc(50% - 50vw)'}}>
      <button className="bg-white shadow-md rounded-full px-4 py-1 text-sm font-semibold flex items-center mx-auto mb-4 focus:outline-none focus:ring-2 focus:ring-glassBorder" tabIndex={0} aria-label="FAQ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m13 18V7a2 2 0 00-2-2h-6" />
        </svg>
        Frequently Asked Questions
      </button>
      <div className="w-full px-2 xs:px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 w-full max-w-full">
            Find answers to common questions about our software development services.
          </p>
        </motion.div>

        <div className="space-y-4" role="list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-glassBorder"
              tabIndex={0}
              role="listitem"
              aria-label={faq.question}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-glassBorder"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="text-lg font-semibold text-black">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-600 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
