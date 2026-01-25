"use client";
import { useState } from "react";
import { Star } from 'lucide-react';


export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", role: "", image: "", quote: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.role || !form.quote || !form.rating) {
      setError("Please fill all required fields.");
      return;
    }
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, rating: Number(form.rating) }),
    });
    if (res.ok) setSubmitted(true);
    else setError("Submission failed. Try again.");
  };

  if (submitted) {
    return <div className="max-w-md mx-auto py-20 text-center">Thank you for your feedback! It will appear after admin approval.</div>;
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Submit Your Testimonial</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setForm(f => ({ ...f, rating: star }))}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                className="focus:outline-none"
              >
                <Star
                  className={`h-7 w-7 ${form.rating >= star ? 'text-black' : 'text-gray-300'}`}
                  fill={form.rating >= star ? '#000' : 'none'}
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        </div>
        <input name="role" placeholder="Your Role/Company" value={form.role} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="quote" placeholder="Your Feedback" value={form.quote} onChange={handleChange} className="w-full border p-2 rounded" required rows={4} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-black text-white py-2 rounded font-semibold">Submit</button>
      </form>
    </div>
  );
}
