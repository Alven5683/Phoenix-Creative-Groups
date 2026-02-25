"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { FaFileAlt, FaFileSignature, FaFolderOpen, FaUsers, FaBriefcase } from "react-icons/fa";

import DeviceTypeChart from "@/components/DeviceTypeChart";
import TestimonialsAdmin from "./TestimonialsAdmin";



export default function AdminDashboardPage() {
	const [stats, setStats] = useState({
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
				services: services.length,
				publishedPosts: posts.filter((p: any) => (p.status ?? "published") === "published").length,
				categories: categories.length,
				authors: authors.length,
				portfolio: portfolio.length,
			});
		} catch {
			setStats({ services: 0, publishedPosts: 0, categories: 0, authors: 0, portfolio: 0 });
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
			<AdminSidebar />
			<div className="flex-1 flex flex-col h-full mt-4 md:mt-10">
						<div className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-8 py-4 md:py-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-3 md:gap-4">
						<div>
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Dashboard</h1>
							<div className="text-gray-500 text-base md:text-lg">Welcome back, Alven Smith!</div>
						</div>
						<button className="px-4 md:px-5 py-2 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Settings</button>
					</div>
					{loading ? (
						<div className="mb-8 flex items-center justify-center min-h-30">
							<span className="text-gray-400 animate-pulse">Loading stats...</span>
						</div>
					) : (
						<>
							<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
								<StatCard label="Services" value={stats.services} icon={<FaFileAlt className="w-7 h-7 md:w-8 md:h-8" />} accent="from-blue-400 to-blue-600" />
								<StatCard label="Published Posts" value={stats.publishedPosts} icon={<FaFileSignature className="w-7 h-7 md:w-8 md:h-8" />} accent="from-purple-400 to-purple-600" />
								<StatCard label="Categories" value={stats.categories} icon={<FaFolderOpen className="w-7 h-7 md:w-8 md:h-8" />} accent="from-green-400 to-green-600" />
								<StatCard label="Authors" value={stats.authors} icon={<FaUsers className="w-7 h-7 md:w-8 md:h-8" />} accent="from-pink-400 to-pink-600" />
								<StatCard label="Portfolio" value={stats.portfolio} icon={<FaBriefcase className="w-7 h-7 md:w-8 md:h-8" />} accent="from-orange-400 to-orange-600" />
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
								<DeviceTypeChart />
								<div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col justify-between">
									<h3 className="text-base md:text-lg font-semibold mb-2 text-gray-900">Active Users</h3>
									<div className="flex items-center gap-3 md:gap-4">
										<span className="text-3xl md:text-4xl font-bold text-primary">42.5K</span>
										<span className="text-lg text-gray-500">78%</span>
									</div>
									<div className="text-gray-400 mt-2">24K users increased from last month</div>
								</div>
								<div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col justify-between">
									<h3 className="text-base md:text-lg font-semibold mb-2 text-gray-900">Total Users</h3>
									<div className="flex items-center gap-3 md:gap-4">
										<span className="text-3xl md:text-4xl font-bold text-secondary">97.4K</span>
										<span className="text-green-500 text-lg">+12.5%</span>
									</div>
									<div className="text-gray-400 mt-2">from last month</div>
								</div>
							</div>
							<div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
								<h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-gray-800">Quick Actions</h2>
								<div className="flex flex-wrap gap-4 md:gap-6">
									<Link href="/admin/blog" className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
										<span>📄</span> <span className="hidden xs:inline">Create Post</span>
									</Link>
									<Link href="/admin/blog" className="flex items-center gap-2 text-gray-700 font-medium hover:underline">
										<span>📄</span> <span className="hidden xs:inline">Manage Posts</span>
									</Link>
									<Link href="/admin/blog" className="flex items-center gap-2 text-purple-600 font-medium hover:underline">
										<span>📁</span> <span className="hidden xs:inline">Manage Categories</span>
									</Link>
									<Link href="/admin/blog" className="flex items-center gap-2 text-pink-600 font-medium hover:underline">
										<span>🏷️</span> <span className="hidden xs:inline">Manage Tags</span>
									</Link>
									<a href="https://news.yoursite.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 font-medium hover:underline">
										<span>📰</span> <span className="hidden xs:inline">External News</span>
									</a>
								</div>
							</div>
						</>
					)}
				</div>

			{/* ...existing dashboard content... */}
			{/* <TestimonialsAdmin /> */}
		</div>
	</div>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: number; icon: React.ReactNode; accent: string }) {
	return (
		<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-6 border border-gray-100">
			<div className={`mb-3 bg-linear-to-r ${accent} p-3 rounded-full text-white flex items-center justify-center`}>{icon}</div>
			<div className="text-3xl font-extrabold text-gray-900">{value}</div>
			<div className="text-gray-500 mt-1 font-medium">{label}</div>
		</div>
	);
}
