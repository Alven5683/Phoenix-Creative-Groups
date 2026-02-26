"use client";

import Link from "next/link";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminTopbar from "../../../components/AdminTopbar";

export default function AdminServicesPage() {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">Services Admin Removed</h1>
            <p className="mt-3 text-slate-600">
              The public services pages are now fully static to keep content consistent.
            </p>
            <p className="mt-2 text-slate-600">
              Update service content in <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">lib/staticServices.ts</code>.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/admin/dashboard"
                className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/services"
                className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Services Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
