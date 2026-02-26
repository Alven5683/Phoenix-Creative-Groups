import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, staticServices } from "@/lib/staticServices";

export function generateStaticParams() {
  return staticServices.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <section className="rounded-3xl bg-[#eceff4] p-8 md:p-12">
        <Link href="/services" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
          Back to Services
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{service.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{service.heroDescription}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-md bg-white px-3 py-2 font-medium text-slate-700">Timeline: {service.timeline}</span>
          <span className="rounded-md bg-white px-3 py-2 font-medium text-slate-700">Investment: {service.investment}</span>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        {service.process.map((step, index) => (
          <div key={step} className="rounded-2xl bg-slate-900 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-300">Step {index + 1}</p>
            <h2 className="mt-3 text-xl font-semibold">{step}</h2>
          </div>
        ))}
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">Deliverables</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">Expected Outcomes</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {service.outcomes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-14 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-center text-white md:p-10">
        <h3 className="text-3xl font-bold">Need this service for your business?</h3>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          Book a discovery call and we will map scope, milestones, and delivery priorities.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
