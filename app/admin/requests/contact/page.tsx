"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";

type ContactRequest = {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
};

export default function AdminContactRequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      } else {
        setRequests([]);
      }
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full mt-4 md:mt-10">
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-8 py-4 md:py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Contact Us Requests</h1>
          <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8">
            {loading ? (
              <div className="flex items-center justify-center min-h-30 text-gray-400 animate-pulse">Loading requests...</div>
            ) : requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No contact requests found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-2xl overflow-hidden shadow border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-[#2d2e83]">
                      <th className="px-6 py-4 text-lg font-bold text-left text-[#fffbe7]">Name</th>
                      <th className="px-6 py-4 text-lg font-bold text-left text-[#fffbe7]">Email</th>
                      <th className="px-6 py-4 text-lg font-bold text-left text-[#fffbe7]">Subject</th>
                      <th className="px-6 py-4 text-lg font-bold text-left text-[#fffbe7]">Message</th>
                      <th className="px-6 py-4 text-lg font-bold text-left text-[#fffbe7]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, idx) => (
                      <tr key={req._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-pre-line">{req.name}</td>
                        <td className="px-6 py-4 text-gray-700">{req.email}</td>
                        <td className="px-6 py-4 text-gray-700">{req.subject || '-'}</td>
                        <td className="px-6 py-4 text-gray-700 max-w-xs truncate" title={req.message}>{req.message}</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(req.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
