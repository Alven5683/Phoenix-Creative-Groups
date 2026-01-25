"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: isYearly ? 250 : 300,
      originalPrice: isYearly ? 300 : null,
      features: [
        'Up to 10,000 AI requests',
        'Basic analytics dashboard',
        'Email support',
        'API access',
        'Basic customization'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: isYearly ? 1400 : 1700,
      originalPrice: isYearly ? 1700 : null,
      features: [
        'Up to 100,000 AI requests',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Advanced customization',
        'Team collaboration',
        'White-label options'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: isYearly ? 3500 : 4200,
      originalPrice: isYearly ? 4200 : null,
      features: [
        'Unlimited AI requests',
        'Enterprise analytics',
        'Dedicated support',
        'Custom AI models',
        'Full customization',
        'Advanced security',
        'SLA guarantee',
        'On-premise deployment'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <button className="bg-white shadow-md rounded-full px-4 py-1 text-sm font-semibold flex items-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m13 18V7a2 2 0 00-2-2h-6" />
          </svg>
          Price
        </button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. All plans include our core AI features.
          </p>

          {/* Pricing Toggle */}
          <div className="bg-gray-100 rounded-full p-1 inline-flex">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !isYearly ? 'bg-black text-white' : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                isYearly ? 'bg-black text-white' : 'text-gray-600'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-Black-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative bg-white/70 backdrop-blur-sm border ${
                plan.popular ? 'border-black' : 'border-gray-200/50'
              } rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-black">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                {plan.originalPrice && (
                  <div className="text-gray-500 line-through text-lg">
                    ${plan.originalPrice}/month
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'border-2 border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
