// Admin: Website Proposal Requests Receiver
// Shows a list of website cost calculator requests submitted by users.
// This is a placeholder. Integrate with your backend or database as needed.

'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

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
        const res = await fetch('/api/admin/requests');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRequests(
          (Array.isArray(data) ? data : []).map((r: any) => ({
            id: r.id || '',
            name: r.name || '',
            email: r.email || '',
            phone: r.phone || '',
            message: r.message || '',
            type: r.type || '',
            pages: r.pages || '',
            design: r.design || '',
            features: Array.isArray(r.features) ? r.features : [],
            total: typeof r.total === 'number' ? r.total : 0,
            createdAt: r.createdAt || '',
          }))
        );
      } catch (err) {
        setRequests([]);
        toast.error('Failed to load requests.');
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Website Proposal Requests</h1>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="text-gray-400">No requests yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Mobile/WhatsApp</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Pages</th>
                    <th className="py-3 px-4">Design</th>
                    <th className="py-3 px-4">Features</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b last:border-none hover:bg-gray-50 transition">
                      <td className="py-2 px-4 font-medium">{req.name}</td>
                      <td className="py-2 px-4 text-blue-700">{req.email}</td>
                      <td className="py-2 px-4">{req.phone || <span className="text-gray-400">—</span>}</td>
                      <td className="py-2 px-4">{req.type}</td>
                      <td className="py-2 px-4">{req.pages}</td>
                      <td className="py-2 px-4">{req.design}</td>
                      <td className="py-2 px-4">
                        <ul className="list-disc list-inside text-xs text-gray-700">
                          {req.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      </td>
                      <td className="py-2 px-4 font-semibold">${req.total.toLocaleString()}</td>
                      <td className="py-2 px-4 text-xs text-gray-500">{new Date(req.createdAt).toLocaleString()}</td>
                      <td className="py-2 px-4 text-gray-600 max-w-xs truncate" title={req.message}>{req.message}</td>
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
