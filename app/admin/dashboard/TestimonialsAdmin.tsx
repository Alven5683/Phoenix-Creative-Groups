
import { useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div className="py-6 text-gray-400">Loading testimonials...</div>;
  if (error) return <div className="py-6 text-red-500">{error}</div>;
  if (testimonials.length === 0) return <div className="py-6 text-gray-400">No testimonials found.</div>;

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold mb-4">Testimonials</h2>
      <GlassCard className="p-0 overflow-x-auto">
        <table className="min-w-full bg-transparent rounded-xl">
          <thead>
            <tr className="bg-linear-to-r from-primary/10 to-secondary/10">
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Quote</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t: any, idx: number) => (
              <tr key={t.id} className={
                `border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white/60' : 'bg-gray-50/60'} hover:bg-primary/5 transition`}
              >
                <td className="px-6 py-3 font-semibold text-gray-900">{t.name}</td>
                <td className="px-6 py-3 text-xs text-gray-500">{t.role}</td>
                <td className="px-6 py-3 italic text-gray-700 max-w-xs truncate">{t.quote}</td>
                <td className="px-6 py-3">
                  {t.rating ? (
                    <span className="flex items-center">
                      {[1,2,3,4,5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${t.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill={t.rating >= star ? '#facc15' : 'none'}
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
                        </svg>
                      ))}
                    </span>
                  ) : '-'}
                </td>
                <td className="px-6 py-3">
                  {t.rejected ? (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  ) : t.approved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">Pending</span>
                  )}
                </td>
                <td className="px-6 py-3 space-x-2">
                  {!t.approved && !t.rejected && (
                    <>
                      <button
                        onClick={() => updateStatus(t.id, "approved")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(t.id, "rejected")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
