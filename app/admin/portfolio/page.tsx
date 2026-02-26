"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopbar from '../../../components/AdminTopbar';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Project = {
	_id: string;
	title: string;
	featured: boolean;
};

const AdminPortfolio = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		fetchProjects();
	}, []);

	async function fetchProjects() {
		setLoading(true);
		try {
			const res = await axios.get("/api/admin/portfolio");
			setProjects(res.data);
		} catch (e) {
			toast.error("Failed to load projects");
		} finally {
			setLoading(false);
		}
	}

	async function handleDelete(id: string) {
		if (!confirm("Delete this project?")) return;
		try {
			await axios.delete(`/api/admin/portfolio/${id}`);
			setProjects((prev) => prev.filter((p) => p._id !== id));
			toast.success("Project deleted");
		} catch (e) {
			toast.error("Delete failed");
		}
	}

	async function handleToggleFeatured(id: string, featured: boolean) {
		try {
			await axios.put(`/api/admin/portfolio/${id}`, { featured: !featured });
			setProjects((prev) => prev.map((p) => p._id === id ? { ...p, featured: !featured } : p));
			toast.success("Toggled featured");
		} catch (e) {
			toast.error("Toggle failed");
		}
	}



	return (
		<div className="min-h-screen flex bg-slate-100">
			<AdminSidebar />
			<div className="flex-1 flex flex-col h-screen">
				<AdminTopbar />
				<div className="flex-1 overflow-y-auto p-6 md:p-8">
					<div className="flex items-center justify-between mb-8">
						<h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Portfolio</h1>
						<button
							className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
							onClick={() => router.push("/admin/portfolio-upload")}
						>
							Add Project
						</button>
					</div>
					{loading ? (
						<div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">Loading projects...</div>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{projects.map((p) => (
								<div key={p._id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
									<h3 className="mb-1 text-xl font-bold text-slate-900">{p.title}</h3>
									{p.featured && <span className="inline-block px-3 py-1 text-xs bg-linear-to-r from-primary to-secondary text-white rounded-full mb-2 font-semibold shadow">Featured</span>}
									<div className="flex gap-3 mt-2">
										<button
											className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
											onClick={() => router.push(`/admin/portfolio-upload?id=${p._id}`)}
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(p._id)}
											className="px-4 py-2 rounded-lg bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
										>
											Delete
										</button>
										<button
											onClick={() => handleToggleFeatured(p._id, p.featured)}
											className="px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-pink-400 text-white font-semibold shadow hover:from-pink-500 hover:to-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
										>
											Toggle Featured
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminPortfolio;
