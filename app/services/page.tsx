import Link from "next/link";
import { staticServices } from "@/lib/staticServices";
import { CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <section className="grid items-center gap-10 rounded-3xl bg-[#eceff4] p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">Services</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Full-Service
            <br />
            Digital Agency
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            We help brands plan, design, build, and grow. Every service is productized for clarity, speed,
            and measurable outcomes.
          </p>
        </div>
        <div className="relative mx-auto h-72 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-300/40 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-300/40 blur-2xl" />
          <div className="relative flex h-full items-center justify-center p-8 text-center">
            <p className="text-2xl font-semibold text-slate-900">Strategy, Design, Development, and Growth</p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {["Discover", "Strategy", "Execute", "Launch"].map((step) => (
          <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
            <h2 className="text-xl font-semibold">{step}</h2>
            <p className="mt-3 text-sm text-slate-600">
              Structured collaboration and clear deliverables for each phase of execution.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-14 grid items-center gap-10 rounded-3xl bg-[#eceff4] p-8 md:grid-cols-2 md:p-12">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-slate-300 bg-white p-6 shadow-sm">
            <svg viewBox="0 0 420 300" className="h-auto w-full" role="img" aria-label="Web design illustration">
              <rect x="18" y="18" width="384" height="264" rx="24" fill="#f8fafc" />
              <circle cx="78" cy="78" r="34" fill="#ef4444" opacity="0.9" />
              <rect x="132" y="60" width="220" height="18" rx="9" fill="#1e293b" opacity="0.9" />
              <rect x="132" y="92" width="178" height="12" rx="6" fill="#94a3b8" />
              <rect x="48" y="142" width="304" height="16" rx="8" fill="#cbd5e1" />
              <rect x="48" y="172" width="270" height="16" rx="8" fill="#cbd5e1" />
              <rect x="48" y="202" width="220" height="16" rx="8" fill="#cbd5e1" />
              <circle cx="330" cy="204" r="26" fill="#ef4444" opacity="0.85" />
              <path d="M318 204l9 9 15-18" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Web Design & Integration</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Simply put we help companies plan, design and launch websites.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 text-slate-700 sm:grid-cols-2">
            {[
              "Product & Service Websites",
              "Brand Identity Development",
              "eCommerce Sites",
              "Logo Creation",
              "UX Design",
              "Graphic Design",
              "Front Development",
              "Brand Guidelines",
              "Back-end Development",
              "Corporate Stationery",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-base">
                <CheckCircle2 className="h-5 w-5 text-slate-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
        {staticServices.map((service) => (
          <article key={service.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
            <p className="mt-3 text-slate-600">{service.shortDescription}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {service.deliverables.slice(0, 3).map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="mt-5 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Learn More
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
