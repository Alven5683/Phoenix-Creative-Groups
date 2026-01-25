"use client";
import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contactform = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Thank you for contacting us!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6" aria-label="Contact Form">
      {/* Header */}
      <div className="text-center mb-10">
        <button className="bg-white shadow-md rounded-full px-4 py-1 text-sm font-semibold flex items-center mx-auto mb-4 focus:outline-none focus:ring-2 focus:ring-glassBorder" tabIndex={0} aria-label="Contact">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3m13 18V7a2 2 0 00-2-2h-6" />
          </svg>
          CONTACT
        </button>
        <h1 className="text-4xl font-extrabold mb-2">Reach Us At Anytime</h1>
        <p className="text-gray-600">Have questions or need any help? We’re here to help you with that</p>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6" role="list">
          {/* Card Template */}
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4" />
              ),
              text: 'Feel free to email me if you have any questions or need more details!',
              linkText: 'phoenixtechgroup1998@gmail.com',
              linkHref: 'mailto:phoenixtechgroup1998@gmail.com',
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2a2 2 0 012 2v.18a2 2 0 01-.88 1.68l-1.42 1.07a16.001 16.001 0 006.29 6.29l1.07-1.42A2 2 0 0116.82 17H17a2 2 0 012 2v2a2 2 0 01-2 2h-.01C8.835 23 1 15.165 1 6.01V6a2 2 0 012-2z" />
              ),
              text: 'Feel free to book a call if that’s more convenient and easier for you',
              linkText: 'Book a call',
              linkHref: 'https://wa.me/9327230398?text=Hello',
            },
            {
              icon: (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-3.582-8-8 0-3.866 3.134-7 7-7 3.866 0 7 3.134 7 7 0 4.418-3.582 8-8 8z" />
                </>
              ),
              text: `215 Sundrop Ct, Eureka. MO 63025, United States`,
              linkText: '',
              linkHref: '',
            },
          ].map(({ icon, text, linkText, linkHref }, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md transform transition duration-300 hover:shadow-2xl hover:scale-[1.02] focus-within:ring-2 focus-within:ring-glassBorder"
              tabIndex={0}
              role="listitem"
              aria-label={text}
            >
              <div className="mb-4">
                <div className="bg-linear-to-br from-black to-gray-800 rounded-lg p-3 shadow-md inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    {icon}
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-1 whitespace-pre-line">{text}</p>
              {linkText && (
                <a
                  href={linkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold underline hover:text-blue-600"
                  aria-label={linkText}
                >
                  {linkText}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 bg-white shadow-xl rounded-lg p-6 transform hover:scale-[1.01] transition duration-300">
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
            {success && <div className="text-green-600 font-semibold">{success}</div>}
            {error && <div className="text-red-600 font-semibold">{error}</div>}
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ikta Sollork"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block font-semibold mb-1">Subject Of Interest</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-semibold mb-1">How may we assist you?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Give us more info.."
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-900 transition w-full focus:outline-none focus:ring-2 focus:ring-glassBorder disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Your Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactform;
