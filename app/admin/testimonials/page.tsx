"use client";
import TestimonialsAdmin from "../dashboard/TestimonialsAdmin";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

export default function AdminTestimonialsPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-3 md:gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">Testimonials</h1>
              <p className="text-sm text-slate-600">Review client feedback submissions and manage approval status.</p>
            </div>
          </div>
          <TestimonialsAdmin />
        </div>
      </div>
    </div>
  );
}
