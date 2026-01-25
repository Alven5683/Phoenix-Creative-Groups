"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap } from "lucide-react";
import { useState, memo } from "react";

type NavLink = {
	href: string;
	label: string;
};

const navLinks: NavLink[] = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/services", label: "Services" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/blog", label: "Blog" },
	{ href: "/website-cost-calculator", label: "Cost Calculator" },
	{ href: "/contact", label: "Contact" },
	{ href: "/feedback", label: "Feedback" },
];

const NavLinkItem = memo(function NavLinkItem({ link, active, onClick, className = "" }: {
	link: NavLink;
	active: boolean;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<Link
			key={link.href}
			href={link.href}
			aria-current={active ? "page" : undefined}
			tabIndex={0}
			className={`transition-colors px-3 py-1 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-glassBorder ${
				active
					? "bg-glass text-black border border-glassBorder"
					: "text-black hover:bg-glass/60 hover:text-black"
			} ${className}`}
			onClick={onClick}
		>
			{link.label}
		</Link>
	);
});

export default function Navbar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	return (
		<nav
			className="fixed top-0 left-0 w-full h-16 z-30 backdrop-blur-xl bg-glass/100 border-glassBorder/40"
			role="navigation"
			aria-label="Main navigation"
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
				   <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-black">
					   <Zap size={28} className="text-black" aria-hidden="true" />
					   PHOENIX
				   </Link>
				<div className="hidden md:flex gap-6">
					{navLinks.map((link) => (
						<NavLinkItem
							key={link.href}
							link={link}
							active={pathname === link.href}
						/>
					))}
				</div>
				<button
					className="md:hidden p-2 rounded-lg bg-glass border border-glassBorder text-black focus:outline-none focus:ring-2 focus:ring-glassBorder"
					onClick={() => setOpen((v) => !v)}
					aria-label="Open menu"
				>
					<Menu size={22} />
				</button>
			</div>
			{open && (
				<div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-glassBorder px-6 py-4 flex flex-col gap-4">
					{navLinks.map((link) => (
						<NavLinkItem
							key={link.href}
							link={link}
							active={pathname === link.href}
							onClick={() => setOpen(false)}
							className="px-3 py-2 text-base"
						/>
					))}
				</div>
			)}
		</nav>
	);
}