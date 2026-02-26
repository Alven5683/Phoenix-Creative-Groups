"use client";
import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", role: "", image: "", quote: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      });
      if (res.ok) setSubmitted(true);
      else setError("Submission failed. Try again.");
    } catch {
      setError("Submission failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10">
          <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Thank you for your feedback</h1>
          <p className="mt-2 text-slate-600">Your testimonial was submitted and will appear after admin approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <section className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Client Testimonials</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Help Others Trust Phoenix Creative Group
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Share your project experience, communication quality, and business results. Your feedback helps new clients
          make confident decisions.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Feedback</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">Share Your Experience With Phoenix</h2>
          <p className="mt-4 text-slate-300">
            Your words help future clients understand our delivery quality and communication standards.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-slate-100" />
              Only authentic client feedback is published
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-slate-100" />
              Approval review before appearing publicly
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-slate-100" />
              Fast moderation and quality control
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Submit Your Testimonial</h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Your Name *</label>
            <input
              name="name"
              placeholder="John Smith"
              value={form.name}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Rating *</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setForm((f) => ({ ...f, rating: star }))}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-7 w-7 ${form.rating >= star ? "text-amber-500" : "text-slate-300"}`}
                    fill={form.rating >= star ? "#f59e0b" : "none"}
                    strokeWidth={2}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role / Company *</label>
            <input
              name="role"
              placeholder="Founder, Example Inc."
              value={form.role}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Image URL (Optional)</label>
            <input
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Your Feedback *</label>
            <textarea
              name="quote"
              placeholder="Tell us about your experience working with Phoenix Creative Group..."
              value={form.quote}
              onChange={handleChange}
              className="min-h-[130px] w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
              rows={5}
            />
          </div>

          {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Submitting..." : "Submit Testimonial"}
          </button>
        </form>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900">What should you include?</h3>
        <p className="mt-2 text-slate-600">
          Mention the challenge you had, what we delivered, and the impact on your business. Specific outcomes like
          speed, conversions, leads, or team efficiency make your testimonial more valuable.
        </p>
      </section>
    </div>
  );
}
