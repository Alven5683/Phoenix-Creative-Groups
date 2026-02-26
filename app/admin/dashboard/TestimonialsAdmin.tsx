"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    fetch("/api/testimonials/all")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load testimonials");
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const res = await fetch(`/api/testimonials/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setTestimonials((prev) =>
        prev.map((t: any) => t.id === id ? { ...t, approved: updated.approved, rejected: updated.rejected } : t)
      );
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    const res = await fetch(`/api/testimonials/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setTestimonials((prev) => prev.filter((t: any) => t.id !== id));
    }
  };

  const stats = {
    total: testimonials.length,
    pending: testimonials.filter((t) => !t.approved && !t.rejected).length,
    approved: testimonials.filter((t) => t.approved).length,
    rejected: testimonials.filter((t) => t.rejected).length,
  };

  const filtered = testimonials.filter((t) => {
    if (filter === "pending") return !t.approved && !t.rejected;
    if (filter === "approved") return t.approved;
    if (filter === "rejected") return t.rejected;
    return true;
  });

  if (loading) return <div className="py-6 text-gray-400">Loading testimonials...</div>;
  if (error) return <div className="py-6 text-red-500">{error}</div>;
  if (testimonials.length === 0) return <div className="py-6 text-gray-400">No testimonials found.</div>;

  return (
    <div className="py-2">
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Total</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Approved</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Rejected</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              filter === key
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {key[0].toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full bg-transparent">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Name</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Role</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Quote</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Rating</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t: any, idx: number) => (
              <tr key={t.id} className={
                `border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-slate-50 transition`}
              >
                <td className="px-5 py-3 font-semibold text-slate-900">{t.name}</td>
                <td className="px-5 py-3 text-sm text-slate-600">{t.role}</td>
                <td className="max-w-md px-5 py-3 text-sm italic text-slate-700">{t.quote}</td>
                <td className="px-5 py-3">
                  {t.rating ? (
                    <span className="flex items-center">
                      {[1,2,3,4,5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${t.rating >= star ? "text-amber-500" : "text-slate-300"}`}
                          fill={t.rating >= star ? "#f59e0b" : "none"}
                        />
                      ))}
                    </span>
                  ) : '-'}
                </td>
                <td className="px-5 py-3">
                  {t.rejected ? (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">Rejected</span>
                  ) : t.approved ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">Approved</span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">Pending</span>
                  )}
                </td>
                <td className="px-5 py-3 space-x-2">
                  {!t.approved && !t.rejected && (
                    <>
                      <button
                        onClick={() => updateStatus(t.id, "approved")}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(t.id, "rejected")}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="ml-2 rounded bg-slate-200 px-3 py-1 text-sm text-slate-900 hover:bg-slate-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
