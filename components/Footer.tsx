import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const links = [
	{ name: 'Features', href: '#features', isInternal: false },
	{ name: 'Blog', href: '/blog', isInternal: true },
	{ name: 'Pricing', href: '#pricing', isInternal: false },
	{ name: 'About', href: '/about', isInternal: true },
	{ name: 'Policies', href: '/policies', isInternal: true },
	{ name: 'Contact', href: '#contact', isInternal: false }
];

const socialLinks = [
	{ icon: Twitter, href: 'https://x.com/Phoenixtech5683' },
	{ icon: Github, href: 'https://github.com/Alven5683' },
	{ icon: Linkedin, href: 'https://www.linkedin.com/company/phoenix-tech-group-1/?viewAsMember=true' },
	{ icon: Mail, href: 'mailto:phoenixtechgroup1998@gmail.com' }
];

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					{/* Logo */}
					<div className="flex items-center justify-center space-x-3 mb-8">
						<Zap className="h-8 w-8 text-white" />
						<span className="text-2xl font-bold">Phoenix Creative Group</span>
					</div>

					{/* Navigation Links */}
					<nav className="flex flex-wrap justify-center space-x-8 mb-8">
						{links.map((link) => (
							link.isInternal ? (
								<Link
									key={link.name}
									href={link.href}
									className="text-gray-300 hover:text-white transition-colors"
								>
									{link.name}
								</Link>
							) : (
								<a
									key={link.name}
									href={link.href}
									className="text-gray-300 hover:text-white transition-colors"
								>
									{link.name}
								</a>
							)
						))}
					</nav>

					{/* Social Links */}
					<div className="flex justify-center space-x-6 mb-8">
						{socialLinks.map((social, index) => (
							<a
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<social.icon className="h-6 w-6" />
							</a>
						))}
					</div>

					{/* Copyright */}
					<div className="border-t border-gray-800 pt-8">
						<p className="text-gray-400">
							© {new Date().getFullYear()} Phoenix Creative Group. All rights reserved. Built with passion for the future of AI.
						</p>
						<p className="text-gray-400 mt-2">
							Phoenix Creative Group – Registered U.S. LLC, EIN: 39-3674390
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}