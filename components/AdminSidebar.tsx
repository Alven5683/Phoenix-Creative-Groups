"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Layers, Image, FileText, Settings, BookOpen } from "lucide-react";

const adminLinks = [
	{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/admin/dashboard/requests", label: "Contact Requests", icon: FileText },
	{ href: "/admin/requests/contact", label: "Contact Us Requests", icon: FileText },
	{ href: "/admin/services", label: "Services", icon: Layers },
	{ href: "/admin/portfolio", label: "Portfolio", icon: Image },
	{ href: "/admin/portfolio-upload", label: "Add Portfolio", icon: Image },
	{ href: "/admin/blog", label: "Blog", icon: BookOpen },
	{ href: "/admin/categories", label: "Categories", icon: Layers },
	{ href: "/admin/authors", label: "Authors", icon: BookOpen },
	{ href: "/admin/media", label: "Media", icon: Image },
	{ href: "/admin/pages", label: "Pages", icon: FileText },
	{ href: "/admin/testimonials", label: "Testimonials", icon: FileText },
	{ href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
	const pathname = usePathname();
	return (
		<aside className="hidden md:flex flex-col w-64 min-h-screen bg-white shadow-lg border-r border-gray-100 p-6 mt-16" aria-label="Admin Sidebar">
			<div className="mb-10 text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2 select-none">
				<span className="inline-block w-3 h-3 rounded-full bg-linear-to-r from-primary to-secondary mr-2" />
				Phoenix Creative
			</div>
			<nav className="flex flex-col gap-2" aria-label="Admin navigation">
				{adminLinks.map(({ href, label, icon: Icon }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							aria-current={active ? 'page' : undefined}
							className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all font-semibold text-base focus:outline-none focus:ring-2 focus:ring-primary/30
								${active
									? 'bg-linear-to-r from-primary to-secondary text-white shadow-md'
									: 'text-gray-700 hover:bg-gray-50 hover:text-primary'}
							`}
						>
							<span className={`flex items-center justify-center w-7 h-7 rounded-lg ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-primary'} transition-all`}>
								<Icon size={22} aria-hidden="true" />
							</span>
							{label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}