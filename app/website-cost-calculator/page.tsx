// Modern Website Cost Configurator (2026 UX)
// This file implements a SaaS-style, interactive website cost calculator as described in the modern UX vision.
// Tech: Next.js (App Router), Tailwind CSS, Framer Motion

'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
// Count-up animation hook for price
function useCountUp(value: number, duration = 600) {
	const [display, setDisplay] = useState(value);
	const raf = useRef<number | null>(null);
	const prev = useRef(value);

	useEffect(() => {
		const start = prev.current;
		const end = value;
		const startTime = performance.now();
		function animate(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);
			setDisplay(Math.round(start + (end - start) * progress));
			if (progress < 1) {
				raf.current = requestAnimationFrame(animate);
			} else {
				prev.current = end;
			}
		}
		if (raf.current !== null) cancelAnimationFrame(raf.current);
		raf.current = requestAnimationFrame(animate);
		return () => {
			if (raf.current !== null) cancelAnimationFrame(raf.current);
		};
	}, [value, duration]);
	return display;
}
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const WEBSITE_TYPES = [
	{
		key: 'business',
		label: 'Business Website',
		desc: 'Services, SEO-ready',
		price: 600,
		default: true,
	},
	{
		key: 'basic',
		label: 'Basic Website',
		desc: 'Landing page, portfolio',
		price: 300,
	},
	{
		key: 'ecommerce',
		label: 'eCommerce',
		desc: 'Payments, products',
		price: 1000,
	},
];

const PAGE_OPTIONS = [
	{ key: '1-5', label: '1-5 pages', price: 0, weeks: 2 },
	{ key: '6-10', label: '6-10 pages', price: 100, weeks: 3 },
	{ key: '11-20', label: '11-20 pages', price: 200, weeks: 4 },
	{ key: '20+', label: '20+ pages', price: 300, weeks: 6 },
];

const DESIGN_OPTIONS = [
	{ key: 'template', label: 'Template', price: 0 },
	{ key: 'custom', label: 'Custom Design', price: 500 },
];

const FEATURES = [
	{ key: 'responsive', label: 'Responsive Design', price: 150, alwaysOn: true },
	{ key: 'seo', label: 'SEO Optimization', price: 250 },
	{ key: 'cms', label: 'CMS Integration', price: 200 },
	{ key: 'content', label: 'Content Writing', price: 50, perPage: true },
	{ key: 'ecommerce', label: 'eCommerce Functionality', price: 1000, requires: 'ecommerce' },
	{ key: 'database', label: 'Database Integration', price: 300 },
];

const INCLUDED = [
	'Responsive design',
	'SEO-ready structure',
	'Deployment support',
];

function getDefaultType(): string {
	return WEBSITE_TYPES.find((t) => t.default)?.key || WEBSITE_TYPES[0].key;
}

function getDefaultFeatures(type: string): string[] {
	return FEATURES.filter(f => f.alwaysOn || (f.requires && f.requires === type)).map(f => f.key);
}

function getTimeline(pages: string): number {
	return PAGE_OPTIONS.find(p => p.key === pages)?.weeks || 2;
}

function getFeaturePrice(feature: typeof FEATURES[number], pages: string): number {
	if (feature.perPage) {
		const pageCount = pages === '1-5' ? 5 : pages === '6-10' ? 10 : pages === '11-20' ? 20 : 25;
		return feature.price * pageCount;
	}
	return feature.price;
}

export default function WebsiteCostConfigurator() {
	// State
	const [type, setType] = useState<string | null>(null);
	const [pages, setPages] = useState<string | null>(null);
	const [design, setDesign] = useState<string | null>(null);
	const [features, setFeatures] = useState<string[]>([]);
	const [showContact, setShowContact] = useState(false);
	const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
	const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// Derived
	const selectedType = WEBSITE_TYPES.find(t => t.key === type);
	const selectedPages = PAGE_OPTIONS.find(p => p.key === pages);
	const selectedDesign = DESIGN_OPTIONS.find(d => d.key === design);
	const selectedFeatures = FEATURES.filter(f => features.includes(f.key));

	// Price Calculation
	const total = useMemo(() => {
		if (!type || !pages || !design) return 0;
		let sum = 0;
		sum += selectedType?.price || 0;
		sum += selectedPages?.price || 0;
		sum += selectedDesign?.price || 0;
		for (const f of selectedFeatures) {
			sum += getFeaturePrice(f, pages);
		}
		return sum;
	}, [type, pages, design, features]);
	const animatedTotal = useCountUp(total);

	// Glow effect on price card
	const [glow, setGlow] = useState(false);
	const prevTotal = useRef(total);
	useEffect(() => {
		if (prevTotal.current !== total) {
			setGlow(true);
			const timeout = setTimeout(() => setGlow(false), 500);
			prevTotal.current = total;
			return () => clearTimeout(timeout);
		}
	}, [total]);

	// Timeline Calculation
	const timeline = pages ? getTimeline(pages) : null;

	// Feature toggle logic
	function toggleFeature(key: string) {
		const feature = FEATURES.find(f => f.key === key);
		if (feature?.alwaysOn) return;
		if (feature?.requires && type !== feature.requires) return;
		setFeatures(f =>
			f.includes(key) ? f.filter(k => k !== key) : [...f, key]
		);
	}

	// Type change logic (smart defaults)
	function handleTypeChange(newType: string) {
		setType(newType);
		setPages(null);
		setDesign(null);
		setFeatures(FEATURES.filter(f => f.alwaysOn || (f.requires && f.requires === newType)).map(f => f.key));
	}

	// Page change logic
	function handlePagesChange(newPages: string) {
		setPages(newPages);
		setDesign(null);
	}

	// Design change logic
	function handleDesignChange(newDesign: string) {
		setDesign(newDesign);
	}

	// Contact form logic
	function handleContactChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setContact({ ...contact, [e.target.name]: e.target.value });
		setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
	}

	function validateContact() {
		const newErrors: { name?: string; email?: string } = {};
		if (!contact.name.trim()) newErrors.name = 'Name is required.';
		if (!contact.email.trim()) newErrors.email = 'Email is required.';
		else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) newErrors.email = 'Invalid email address.';
		return newErrors;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const validationErrors = validateContact();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		setSubmitting(true);
		try {
			const res = await fetch('/api/admin/requests', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: contact.name,
					email: contact.email,
					phone: contact.phone,
					message: contact.message,
					type: selectedType?.label,
					pages: selectedPages?.label,
					design: selectedDesign?.label,
					features: selectedFeatures.map(f => f.label),
					total,
				}),
			});
			if (res.ok) {
				setSubmitted(true);
				toast.success('Proposal sent!');
				setContact({ name: '', email: '', phone: '', message: '' });
			} else {
				const data = await res.json();
				toast.error(data?.error || 'Failed to send proposal.');
			}
		} catch (err) {
			toast.error('Failed to send proposal.');
		} finally {
			setSubmitting(false);
		}
	}

	// UI
	return (
		<div className="min-h-screen bg-[#F9FAFB] flex flex-col">
			<Toaster />
			<div className="w-full pt-12 pb-2">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 mt-8 tracking-tight">Build Your Website</h1>
			</div>
			<div className="flex flex-col md:flex-row w-full pb-8 px-2 md:px-6 gap-8 items-start">
				{/* Configurator (Left) */}
				<div className="flex-1 flex flex-col gap-8">
					<div className="space-y-8">
						{/* Website Type */}
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
							<div className="text-lg font-semibold mb-2">What kind of website do you need?</div>
							<div className="flex gap-4">
								{WEBSITE_TYPES.map(opt => (
									<motion.button
										key={opt.key}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => handleTypeChange(opt.key)}
										className={`relative flex-1 p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left shadow-sm
											${type === opt.key ? 'border-black bg-linear-to-br from-white to-gray-100 scale-105 ring-2 ring-black' : 'border-gray-200 bg-white'}
										`}
									>
										<div className="font-bold text-lg flex items-center gap-2">
											{opt.label}
											{type === opt.key && (
												<motion.span
													initial={{ scale: 0 }}   
													animate={{ scale: 1 }}
													className="ml-2 text-green-600"
												>
													<CheckCircleIcon className="w-5 h-5" />
												</motion.span>
											)}
										</div>
										<div className="text-gray-500 text-sm mt-1">{opt.desc}</div>
										<div className="absolute top-4 right-4 font-semibold">${opt.price}</div>
									</motion.button>
								))}
							</div>
						</motion.div>
						{/* Pages */}
						<AnimatePresence>
							{type && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.4 }}
								>
									<div className="text-lg font-semibold mb-2 mt-4">How big will your website be?</div>
									<div className="flex gap-4">
										{PAGE_OPTIONS.map(opt => (
											<motion.button
												key={opt.key}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												onClick={() => handlePagesChange(opt.key)}
												className={`flex-1 p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left shadow-sm
													${pages === opt.key ? 'border-black bg-linear-to-br from-white to-gray-100 scale-105 ring-2 ring-black' : 'border-gray-200 bg-white'}
												`}
											>
												<div className="font-bold text-lg">{opt.label}</div>
												<div className="absolute top-4 right-4 font-semibold">{opt.price > 0 ? `+$${opt.price}` : 'Included'}</div>
											</motion.button>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						{/* Design */}
						<AnimatePresence>
							{type && pages && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.4 }}
								>
									<div className="text-lg font-semibold mb-2 mt-4">What design style do you want?</div>
									<div className="flex gap-4">
										{DESIGN_OPTIONS.map(opt => (
											<motion.button
												key={opt.key}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												onClick={() => handleDesignChange(opt.key)}
												className={`flex-1 p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left shadow-sm
													${design === opt.key ? 'border-black bg-linear-to-br from-white to-gray-100 scale-105 ring-2 ring-black' : 'border-gray-200 bg-white'}
												`}
											>
												<div className="font-bold text-lg">{opt.label}</div>
												<div className="absolute top-4 right-4 font-semibold">{opt.price > 0 ? `+$${opt.price}` : 'Included'}</div>
											</motion.button>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						{/* Features */}
						<AnimatePresence>
							{type && pages && design && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 20 }}
									transition={{ duration: 0.4 }}
								>
									<div className="text-lg font-semibold mb-2 mt-4">Add features to your site</div>
									<div className="flex flex-wrap gap-3">
										{FEATURES.map(f => {
											if (f.requires && type !== f.requires) return null;
											const active = features.includes(f.key);
											return (
												<motion.button
													key={f.key}
													whileHover={{ scale: 1.03 }}
													whileTap={{ scale: 0.97 }}
													onClick={() => toggleFeature(f.key)}
													className={`px-4 py-2 rounded-full border transition-all duration-200 flex items-center gap-2
														${active ? 'bg-black text-white border-black shadow' : 'bg-white text-black border-gray-300'}
														${f.alwaysOn ? 'pointer-events-none opacity-70' : ''}
													`}
												>
													{f.label}
													<span className="ml-1 text-xs font-semibold">{f.perPage ? `+$${f.price}/page` : f.price > 0 ? `+$${f.price}` : 'Included'}</span>
													{active && (
														<motion.span
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															className="ml-1"
														>
															<CheckCircleIcon className="w-4 h-4 text-green-400" />
														</motion.span>
													)}
												</motion.button>
											);
										})}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
				{/* Live Result (Right) */}
				<div className="w-full md:w-96 md:sticky md:top-24 shrink-0">
					<motion.div
						layout
						className={`bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100 transition-shadow duration-300 ${glow ? 'ring-4 ring-yellow-300/60 shadow-yellow-200' : ''}`}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
					>
						<div className="text-lg font-semibold mb-1">Estimated Cost</div>
						<motion.div
							key={total}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ type: 'spring', stiffness: 200, damping: 20 }}
							className="text-4xl font-bold text-black mb-2 select-none"
						>
							${animatedTotal.toLocaleString()}
						</motion.div>
						<div className="flex items-center gap-2 text-gray-700">
							<span className="font-medium">Timeline:</span>
							<span>{timeline ? `${timeline}–${timeline + 2} weeks` : '--'}</span>
						</div>
						<div className="mt-2">
							<div className="font-medium mb-1">What’s Included:</div>
							<ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
								{INCLUDED.map((item, i) => (
									<li key={i}>✔ {item}</li>
								))}
								{selectedFeatures.map(f => (
									<li key={f.key}>✔ {f.label}</li>
								))}
							</ul>
						</div>
						<button
							className="mt-4 w-full bg-black text-white py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition"
							onClick={() => setShowContact(true)}
							disabled={!(type && pages && design)}
						>
							{submitted ? 'Proposal Sent!' : 'Get My Free Proposal'}
						</button>
						{/* Confidence Meter */}
						<div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
							<span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">Based on 127 similar projects</span>
						</div>
					</motion.div>
				</div>
			</div>
			{/* Contact Modal */}
			<AnimatePresence>
				{showContact && !submitted && (
					<motion.div
						className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.form
							onSubmit={handleSubmit}
							className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md flex flex-col gap-4"
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
						>
							<div className="text-xl font-bold mb-2">Let’s Get Your Proposal</div>
							<input
								name="name"
								placeholder="Your Name"
								required
								className={`w-full p-3 border rounded focus:ring-2 focus:ring-black ${errors.name ? 'border-red-500' : ''}`}
								onChange={handleContactChange}
								value={contact.name}
								aria-invalid={!!errors.name}
								aria-describedby={errors.name ? 'name-error' : undefined}
							/>
							{errors.name && <div id="name-error" className="text-red-500 text-sm mb-2">{errors.name}</div>}
							<input
								name="email"
								type="email"
								placeholder="Your Email"
								required
								className={`w-full p-3 border rounded focus:ring-2 focus:ring-black ${errors.email ? 'border-red-500' : ''}`}
								onChange={handleContactChange}
								value={contact.email}
								aria-invalid={!!errors.email}
								aria-describedby={errors.email ? 'email-error' : undefined}
							/>
							{errors.email && <div id="email-error" className="text-red-500 text-sm mb-2">{errors.email}</div>}
							<input
								name="phone"
								type="tel"
								placeholder="Mobile or WhatsApp Number (optional)"
								className="w-full p-3 border rounded focus:ring-2 focus:ring-black"
								onChange={handleContactChange}
								value={contact.phone}
								pattern="[0-9+\-() ]*"
								autoComplete="tel"
							/>
							<textarea
								name="message"
								placeholder="Anything else? (optional)"
								className="w-full p-3 border rounded focus:ring-2 focus:ring-black"
								onChange={handleContactChange}
								value={contact.message}
							/>
							<button
								type="submit"
								className="w-full bg-black text-white py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition mt-2"
								disabled={submitting}
							>
								{submitting ? 'Sending…' : 'See My Exact Cost'}
							</button>
							<button
								type="button"
								className="w-full mt-2 text-gray-500 hover:underline"
								onClick={() => setShowContact(false)}
								disabled={submitting}
							>
								Cancel
							</button>
						</motion.form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
// ...existing code from website-cost-calculator.tsx will be placed here...