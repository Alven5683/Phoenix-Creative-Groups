"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

interface ProposalRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
  pages: string;
  design: string;
  features: string[];
  total: number;
  createdAt: string;
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<ProposalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/requests");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRequests(
          (Array.isArray(data) ? data : []).map((r: any) => ({
            id: r.id || r._id || "",
            name: r.name || "",
            email: r.email || "",
            phone: r.phone || "",
            message: r.message || "",
            type: r.type || "",
            pages: r.pages || "",
            design: r.design || "",
            features: Array.isArray(r.features) ? r.features : [],
            total: typeof r.total === "number" ? r.total : 0,
            createdAt: r.createdAt || "",
          }))
        );
      } catch {
        setRequests([]);
        toast.error("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <h1 className="text-3xl font-bold text-slate-900">Website Proposal Requests</h1>
          <p className="mb-6 mt-1 text-sm text-slate-600">Leads submitted from the website cost calculator.</p>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">No requests yet.</div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-700">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Pages</th>
                    <th className="px-4 py-3">Design</th>
                    <th className="px-4 py-3">Features</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{req.name}</td>
                      <td className="px-4 py-3 text-blue-700">{req.email}</td>
                      <td className="px-4 py-3 text-slate-700">{req.phone || "-"}</td>
                      <td className="px-4 py-3 text-slate-700">{req.type}</td>
                      <td className="px-4 py-3 text-slate-700">{req.pages}</td>
                      <td className="px-4 py-3 text-slate-700">{req.design}</td>
                      <td className="px-4 py-3">
                        <ul className="list-disc list-inside text-xs text-slate-700">
                          {req.features.map((f, i) => (
                            <li key={`${req.id}-${i}`}>{f}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">${req.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{new Date(req.createdAt).toLocaleString()}</td>
                      <td className="max-w-xs truncate px-4 py-3 text-slate-600" title={req.message}>
                        {req.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
