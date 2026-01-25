"use client";
import TestimonialsAdmin from "../dashboard/TestimonialsAdmin";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminTestimonialsPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full mt-4 md:mt-10">
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-8 py-4 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-3 md:gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Testimonials</h1>
          </div>
          <TestimonialsAdmin />
        </div>
      </div>
    </div>
  );
}
