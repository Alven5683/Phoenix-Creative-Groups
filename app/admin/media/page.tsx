"use client";
import React from "react";
import MediaManager from "@/components/MediaManager";

export default function AdminMediaPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">CMS Admin</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin/dashboard" className="text-gray-700 hover:text-black font-medium">Dashboard</a>
          <a href="/admin/blog" className="text-gray-700 hover:text-black font-medium">Blog</a>
          <a href="/admin/categories" className="text-gray-700 hover:text-black font-medium">Categories</a>
          <a href="/admin/authors" className="text-gray-700 hover:text-black font-medium">Authors</a>
          <a href="/admin/media" className="text-black font-semibold">Media</a>
          <a href="/admin/settings" className="text-gray-700 hover:text-black font-medium">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="w-full px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <h1 className="text-3xl font-bold">Media Management</h1>
        </header>
        <section className="flex-1 p-8">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md min-h-[400px]">
            <MediaManager />
          </div>
        </section>
      </main>
    </div>
  );
}
