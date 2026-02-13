"use client";
import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
	className?: string;
	children: ReactNode;
}

export default function GlassCard({ className = "", children }: GlassCardProps) {
	const ref = useRef<HTMLDivElement>(null);

	// 3D tilt effect (desktop only)
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (typeof window === 'undefined' || window.innerWidth < 1024) return;
		const card = ref.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		card.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
	};
	const handleMouseLeave = () => {
		if (ref.current) ref.current.style.transform = '';
	};

	return (
		<motion.div
			ref={ref}
			className={`bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-glassBorder shadow-glass rounded-lg p-6 transition-all duration-300 ${className}`}
			initial={{ opacity: 0, y: 40, rotateX: 10 }}
			whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.7, ease: 'easeOut' }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</motion.div>
	);
}