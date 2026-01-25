import { ReactNode } from "react";

interface PageHeroProps {
	title: string;
	subtitle?: string;
	children?: ReactNode;
}

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
	return (
		<section className="w-full py-16 flex flex-col items-center justify-center">
			<div className="glass-card px-8 py-10 text-center max-w-2xl">
				<h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
					{title}
				</h1>
				{subtitle && <p className="text-lg text-gray-200 mb-4">{subtitle}</p>}
				{children}
			</div>
		</section>
	);
}