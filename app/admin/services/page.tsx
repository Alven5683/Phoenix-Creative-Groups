"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopbar from '../../../components/AdminTopbar';
import GlassCard from '../../../components/GlassCard';
import Link from 'next/link';
import ServiceForm from '../../../components/ServiceForm';

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Service = {
	_id: string;
	title: string;
	slug: string;
	description: string;
	content?: string;
	image?: string;
	seoMeta?: { title?: string; description?: string };
};

export default function AdminServicesPage() {
	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editService, setEditService] = useState<Service | null>(null);

	useEffect(() => {
		fetchServices();
	}, []);

	async function fetchServices() {
		setLoading(true);
		try {
			const res = await axios.get("/api/admin/services");
			setServices(res.data);
		} catch (e) {
			toast.error("Failed to load services");
		} finally {
			setLoading(false);
		}
	}

	async function handleDelete(id: string) {
		if (!confirm("Delete this service?")) return;
		try {
			await axios.delete(`/api/admin/services/${id}`);
			setServices((prev) => prev.filter((s) => s._id !== id));
			toast.success("Service deleted");
		} catch (e) {
			toast.error("Delete failed");
		}
	}

	async function handleSave(data: any) {
		try {
			if (editService) {
				// Use the collection endpoint for PUT, with _id in the body
				const res = await axios.put("/api/admin/services", { ...data, _id: editService._id });
				setServices((prev) => prev.map((s) => s._id === editService._id ? res.data : s));
				toast.success("Service updated");
			} else {
				const res = await axios.post("/api/admin/services", data);
				setServices((prev) => [res.data, ...prev]);
				toast.success("Service created");
			}
			setShowForm(false);
			setEditService(null);
		} catch (e) {
			toast.error("Save failed");
		}
	}

	return (
		<div className="min-h-screen flex bg-gray-50">
			<AdminSidebar />
			<div className="flex-1 flex flex-col h-screen">
				<AdminTopbar />
				<div className="flex-1 overflow-y-auto p-8">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-4xl font-bold text-gray-900">Services</h1>
						<button
							className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
							onClick={() => { setShowForm(true); setEditService(null); }}
						>
							Add Service
						</button>
					</div>
					{loading ? (
						<div className="text-gray-400">Loading...</div>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{services.map((s) => (
								<div key={s._id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-gray-100 hover:shadow-xl transition-all">
									{s.image && (
										<img
											src={s.image}
											alt={s.title}
											className="mb-3 rounded-xl w-36 h-24 object-cover border border-gray-100 shadow-md bg-white"
										/>
									)}
									<h3 className="text-xl font-bold text-gray-900 mb-1">{s.title}</h3>
									<p className="text-gray-700 mb-2">{s.description}</p>
									<div className="flex gap-3 mt-2">
										<button
											className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
											onClick={() => { setEditService(s); setShowForm(true); }}
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(s._id)}
											className="px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
										>
											Delete
										</button>
										<Link
											href={`/services/${s.slug}`}
											className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 font-medium shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
										>
											View
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
					{showForm && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
							<div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-200">
								<ServiceForm
									initial={editService}
									onSave={handleSave}
									onClose={() => { setShowForm(false); setEditService(null); }}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
