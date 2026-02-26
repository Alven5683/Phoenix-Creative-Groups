"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
			const data = await res.json().catch(() => null);
			setError(data?.error || "Login failed");
		}
	}

	return (
		<div className="flex min-h-[70vh] items-center justify-center px-4">
			<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
				<h1 className="mb-2 text-3xl font-bold text-slate-900">Admin Login</h1>
				<p className="mb-5 text-sm text-slate-600">Enter your admin secret to access the dashboard.</p>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="password"
						placeholder="Admin Secret"
						className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
						value={secret}
						onChange={e => setSecret(e.target.value)}
						required
					/>
					<button
						type="submit"
						className="mt-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
					>
						Login
					</button>
				</form>
				{error && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
			</div>
		</div>
	);
}
