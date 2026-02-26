"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

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
    <div className="min-h-screen bg-slate-100 md:flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <h1 className="text-3xl font-bold text-slate-900">Contact Us Requests</h1>
          <p className="mb-6 mt-1 text-sm text-slate-600">Messages submitted from the public contact page.</p>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            {loading ? (
              <div className="py-8 text-center text-slate-500">Loading requests...</div>
            ) : requests.length === 0 ? (
              <div className="py-8 text-center text-slate-500">No contact requests found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-slate-50 text-left text-sm text-slate-700">
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Subject</th>
                      <th className="px-4 py-3 font-semibold">Message</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, idx) => (
                      <tr key={req._id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"} border-b border-slate-100`}>
                        <td className="whitespace-pre-line px-4 py-3 font-semibold text-slate-900">{req.name}</td>
                        <td className="px-4 py-3 text-slate-700">{req.email}</td>
                        <td className="px-4 py-3 text-slate-700">{req.subject || "-"}</td>
                        <td className="max-w-xs truncate px-4 py-3 text-slate-700" title={req.message}>
                          {req.message}
                        </td>
                        <td className="px-4 py-3 text-slate-500">{new Date(req.createdAt).toLocaleString()}</td>
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
