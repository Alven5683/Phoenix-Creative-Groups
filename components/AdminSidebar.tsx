"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Layers, Image, FileText, Settings, BookOpen } from "lucide-react";

const adminLinks = [
	{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/admin/dashboard/requests", label: "Contact Requests", icon: FileText },
	{ href: "/admin/requests/contact", label: "Contact Us Requests", icon: FileText },
	{ href: "/admin/portfolio", label: "Portfolio", icon: Image },
	{ href: "/admin/portfolio-upload", label: "Add Portfolio", icon: Image },
	{ href: "/admin/blog", label: "Blog", icon: BookOpen },
	{ href: "/admin/categories", label: "Categories", icon: Layers },
	{ href: "/admin/authors", label: "Authors", icon: BookOpen },
	{ href: "/admin/testimonials", label: "Testimonials", icon: FileText },
	{ href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
	const pathname = usePathname();
	return (
		<aside className="sticky top-0 hidden min-h-screen w-72 flex-col border-r border-slate-200 bg-white p-6 md:flex" aria-label="Admin Sidebar">
			<div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
				<div className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Admin Console</div>
				<div className="text-xl font-extrabold tracking-tight text-slate-900">Phoenix Creative</div>
			</div>
			<nav className="flex flex-col gap-2" aria-label="Admin navigation">
				{adminLinks.map(({ href, label, icon: Icon }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							aria-current={active ? 'page' : undefined}
							className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-300
								${active
									? 'bg-slate-900 text-white shadow-sm'
									: 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}
							`}
						>
							<span className={`flex h-7 w-7 items-center justify-center rounded-lg ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'} transition-all`}>
								<Icon size={18} aria-hidden="true" />
							</span>
							{label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
