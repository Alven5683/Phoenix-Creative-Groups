"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
type Testimonial = {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  approved: boolean;
  createdAt: string;
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gray-50 w-full" aria-label="Testimonials" style={{width:'100vw', marginLeft:'calc(50% - 50vw)'}}>
      <button className="bg-white shadow-md rounded-full px-4 py-1 text-sm font-semibold flex items-center mx-auto mb-4 focus:outline-none focus:ring-2 focus:ring-glassBorder" tabIndex={0} aria-label="Testimonials">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m13 18V7a2 2 0 00-2-2h-6" />
        </svg>
        Testimonials
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 w-full max-w-full">
            Don't just take our word for it. Here's what industry leaders are saying about ORBAI.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No testimonials yet.</div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12!"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/30 flex flex-col justify-between min-h-[250px]"
                  tabIndex={0}
                  role="listitem"
                  aria-label={testimonial.name}
                >
                  <div className="flex flex-col items-start mb-4">
                    <div className="flex items-center justify-start mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={
                            'h-5 w-5 ' + (i < (testimonial.rating || 0) ? 'text-black-400' : 'text-gray-300')
                          }
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-800 italic mb-2 text-left min-h-[72px]">
                    "{testimonial.quote.length > 100 ? testimonial.quote.slice(0, 137) + '...' : testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={testimonial.image || '/default-avatar.png'}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-base leading-tight">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
