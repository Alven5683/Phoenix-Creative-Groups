import { CalendarDays, LogOut } from "lucide-react";

export default function AdminTopbar() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
      <div>
        <div className="text-lg font-semibold tracking-tight text-slate-900">Phoenix Admin</div>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
          <CalendarDays size={13} aria-hidden="true" />
          <span>{today}</span>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
        aria-label="Logout"
      >
        <LogOut size={16} aria-hidden="true" />
        <span>Logout</span>
      </button>
    </header>
  );
}
