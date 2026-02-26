"use client";
import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contactform = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Thank you for contacting us!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full" aria-label="Contact Form">
      <div className="flex flex-col gap-6">

        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-xl transition duration-300">
          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Send us your project details</h2>
              <p className="mt-1 text-sm text-gray-600">Tell us what you are building, and we will reply with clear next steps.</p>
            </div>

            {success && <div className="font-semibold text-green-600">{success}</div>}
            {error && <div className="font-semibold text-red-600">{error}</div>}

            <div>
              <label htmlFor="name" className="mb-1 block font-semibold">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ikta Sollork"
                required
                className="h-12 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block font-semibold">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="h-12 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block font-semibold">Subject Of Interest</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="h-12 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block font-semibold">How may we assist you?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Give us more info.."
                rows={6}
                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-black px-6 font-semibold text-white transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-glassBorder disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Your Message"}
            </button>
          </form>
        </div>
        <div className="space-y-4" role="list">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4" />
              ),
              text: "Feel free to email me if you have any questions or need more details!",
              linkText: "phoenixtechgroup1998@gmail.com",
              linkHref: "mailto:phoenixtechgroup1998@gmail.com",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2a2 2 0 012 2v.18a2 2 0 01-.88 1.68l-1.42 1.07a16.001 16.001 0 006.29 6.29l1.07-1.42A2 2 0 0116.82 17H17a2 2 0 012 2v2a2 2 0 01-2 2h-.01C8.835 23 1 15.165 1 6.01V6a2 2 0 012-2z" />
              ),
              text: "Feel free to book a call if that is more convenient and easier for you",
              linkText: "Book a call",
              linkHref: "https://wa.me/9327230398?text=Hello",
            },
            {
              icon: (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-3.582-8-8 0-3.866 3.134-7 7-7 3.866 0 7 3.134 7 7 0 4.418-3.582 8-8 8z" />
                </>
              ),
              text: "215 Sundrop Ct, Eureka, MO 63025, United States",
              linkText: "",
              linkHref: "",
            },
          ].map(({ icon, text, linkText, linkHref }, index) => (
            <div
              key={index}
              className="min-h-[132px] flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-glassBorder"
              tabIndex={0}
              role="listitem"
              aria-label={text}
            >
              <div className="mb-4">
                <div className="inline-block rounded-lg bg-gradient-to-br from-black to-gray-800 p-3 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    {icon}
                  </svg>
                </div>
              </div>
              <p className="mb-1 text-sm text-gray-700 whitespace-pre-line">{text}</p>
              {linkText && (
                <a href={linkHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline hover:text-blue-600" aria-label={linkText}>
                  {linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contactform;
