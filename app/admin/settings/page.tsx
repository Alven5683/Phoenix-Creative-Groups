"use client";
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopbar from '../../../components/AdminTopbar';
import GlassCard from '../../../components/GlassCard';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Settings = {
	siteTitle: string;
	contactEmail: string;
	socialLinks: string[];
	footerContent: string;
};

export default function AdminSettings() {
	const [settings, setSettings] = useState<Settings | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		fetchSettings();
	}, []);

	async function fetchSettings() {
		setLoading(true);
		try {
			const res = await axios.get("/api/admin/settings");
			setSettings(res.data);
		} catch (e) {
			toast.error("Failed to load settings");
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSaving(true);
		const form = e.currentTarget;
		const formData = new FormData(form);
		const data = {
			siteTitle: formData.get("siteTitle") as string,
			contactEmail: formData.get("contactEmail") as string,
			socialLinks: (formData.get("socialLinks") as string).split(",").map(s => s.trim()),
			footerContent: formData.get("footerContent") as string,
		};
		try {
			await axios.post("/api/admin/settings", data);
			toast.success("Settings saved");
			setSettings(data);
		} catch (e) {
			toast.error("Save failed");
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="min-h-screen flex bg-dark">
			<AdminSidebar />
			<div className="flex-1 flex flex-col">
				<AdminTopbar />
				<main className="flex-1 p-8 w-full">
					<h1 className="text-2xl font-bold text-white mb-8">Settings</h1>
					<GlassCard className="p-8">
						{loading ? (
							<div className="text-gray-300">Loading...</div>
						) : (
							<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
								<input
									type="text"
									name="siteTitle"
									placeholder="Site Title"
									className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
									defaultValue={settings?.siteTitle || ""}
									required
								/>
								<input
									type="email"
									name="contactEmail"
									placeholder="Contact Email"
									className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
									defaultValue={settings?.contactEmail || ""}
									required
								/>
								<input
									type="text"
									name="socialLinks"
									placeholder="Social Links (comma separated)"
									className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
									defaultValue={settings?.socialLinks?.join(", ") || ""}
								/>
								<textarea
									name="footerContent"
									placeholder="Footer Content"
									rows={3}
									className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
									defaultValue={settings?.footerContent || ""}
								/>
								<button
									type="submit"
									   className="mt-2 px-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform"
									disabled={saving}
								>
									{saving ? "Saving..." : "Save Settings"}
								</button>
							</form>
						)}
					</GlassCard>
				</main>
			</div>
		</div>
	);
}
