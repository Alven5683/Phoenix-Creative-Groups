"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from '../../../components/GlassCard';

export default function AdminLogin() {
	const [secret, setSecret] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		// TODO: Replace with real server action
		const res = await fetch("/api/admin/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ secret }),
		});
		if (res.ok) {
			router.push("/admin/dashboard");
		} else {
			setError("Invalid admin secret");
		}
	}

	return (
		<div className="flex items-center justify-center min-h-[60vh]">
			<GlassCard className="p-8 w-full">
				<h1 className="text-2xl font-bold text-black mb-4">Admin Login</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="password"
						placeholder="Admin Secret"
						className="px-4 py-3 rounded-lg bg-dark/80 border border-glassBorder text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
						value={secret}
						onChange={e => setSecret(e.target.value)}
						required
					/>
					<button
						type="submit"
						   className="mt-2 px-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-black font-semibold shadow-lg hover:scale-105 transition-transform"
					>
						Login
					</button>
				</form>
				{error && <div className="mt-4 text-red-400 text-sm">{error}</div>}
			</GlassCard>
		</div>
	);
}
