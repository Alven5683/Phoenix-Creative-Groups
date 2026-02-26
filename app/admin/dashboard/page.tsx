"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBriefcase, FaFileAlt, FaFileSignature, FaFolderOpen, FaUsers } from "react-icons/fa";
import { PencilLine, PlusCircle, Tags, UserPlus } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import DeviceTypeChart from "@/components/DeviceTypeChart";

type Stats = {
  services: number;
  publishedPosts: number;
  categories: number;
  authors: number;
  portfolio: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    publishedPosts: 0,
    categories: 0,
    authors: 0,
    portfolio: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      const [servicesRes, postsRes, categoriesRes, authorsRes, portfolioRes] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/blog"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/authors"),
        fetch("/api/admin/portfolio"),
      ]);

      const services = await servicesRes.json();
      const posts = await postsRes.json();
      const categories = await categoriesRes.json();
      const authors = await authorsRes.json();
      const portfolio = await portfolioRes.json();

      setStats({
        services: Array.isArray(services) ? services.length : 0,
        publishedPosts: Array.isArray(posts) ? posts.filter((p: any) => (p.status ?? "published") === "published").length : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
        authors: Array.isArray(authors) ? authors.length : 0,
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
      });
    } catch {
      setStats({ services: 0, publishedPosts: 0, categories: 0, authors: 0, portfolio: 0 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminTopbar />
        <main className="p-4 md:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Dashboard</h1>
              <p className="mt-1 text-slate-600">Track content, portfolio, and team activity from one place.</p>
            </div>
            <Link href="/admin/settings" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Open Settings
            </Link>
          </div>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">Loading dashboard stats...</div>
          ) : (
            <>
              <section className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                <StatCard label="Services" value={stats.services} icon={<FaFileAlt className="h-5 w-5" />} />
                <StatCard label="Published Posts" value={stats.publishedPosts} icon={<FaFileSignature className="h-5 w-5" />} />
                <StatCard label="Categories" value={stats.categories} icon={<FaFolderOpen className="h-5 w-5" />} />
                <StatCard label="Authors" value={stats.authors} icon={<FaUsers className="h-5 w-5" />} />
                <StatCard label="Portfolio" value={stats.portfolio} icon={<FaBriefcase className="h-5 w-5" />} />
              </section>

              <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <DeviceTypeChart />
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Active Users</h3>
                  <p className="mt-3 text-4xl font-bold text-slate-900">42.5K</p>
                  <p className="mt-2 text-sm text-slate-600">24K users increased from last month.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Total Users</h3>
                  <p className="mt-3 text-4xl font-bold text-slate-900">97.4K</p>
                  <p className="mt-2 text-sm text-green-600">+12.5% from last month.</p>
                </div>
              </section>

              <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <QuickLink href="/admin/blog/create" icon={<PlusCircle size={16} />} label="Create Post" />
                  <QuickLink href="/admin/blog" icon={<PencilLine size={16} />} label="Manage Posts" />
                  <QuickLink href="/admin/categories" icon={<Tags size={16} />} label="Manage Categories" />
                  <QuickLink href="/admin/authors" icon={<UserPlus size={16} />} label="Manage Authors" />
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">{icon}</div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
