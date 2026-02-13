import { LogOut } from "lucide-react";

export default function AdminTopbar() {
	// Placeholder for admin user info and logout
	 return (
	   <header className="w-full bg-glass/80 backdrop-blur-xl border-b border-glassBorder/40 px-2 py-2 flex items-center justify-between">
	     <div className="text-lg font-semibold text-foreground tracking-tight">Phoenix Admin</div>
	     <button
	       type="button"
	       className="flex items-center gap-2 px-3 py-1 rounded-lg bg-glass border border-glassBorder text-foreground hover:text-background hover:bg-glass/60 transition-colors focus:outline-none focus:ring-2 focus:ring-glassBorder"
	       aria-label="Logout"
	     >
	       <LogOut size={18} aria-hidden="true" />
	       <span>Logout</span>
	     </button>
	   </header>
	);
}