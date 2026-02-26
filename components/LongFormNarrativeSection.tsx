import { buildNarrativeContent } from "@/lib/pageNarrativeFactory";

type NarrativeVariant = "azure" | "sunset" | "mint" | "coral" | "indigo" | "slate";

type LongFormNarrativeSectionProps = {
  pageName: string;
  topic: string;
  audience: string;
  outcome: string;
  variant?: NarrativeVariant;
  className?: string;
};

const variantStyles: Record<NarrativeVariant, { wrap: string; title: string }> = {
  azure: {
    wrap: "bg-gradient-to-br from-[#e8f2ff] to-[#f6fbff] border-[#bfd9ff]",
    title: "text-[#123a75]",
  },
  sunset: {
    wrap: "bg-gradient-to-br from-[#fff2e8] to-[#fff8f2] border-[#ffd7b3]",
    title: "text-[#7a3a12]",
  },
  mint: {
    wrap: "bg-gradient-to-br from-[#e9fff8] to-[#f5fffb] border-[#bdf3de]",
    title: "text-[#0f5d49]",
  },
  coral: {
    wrap: "bg-gradient-to-br from-[#fff0f0] to-[#fff8f8] border-[#ffc8c8]",
    title: "text-[#8b2f2f]",
  },
  indigo: {
    wrap: "bg-gradient-to-br from-[#edf0ff] to-[#f7f8ff] border-[#c9d0ff]",
    title: "text-[#2f3f8b]",
  },
  slate: {
    wrap: "bg-gradient-to-br from-[#f1f4f8] to-[#fafbfd] border-[#d5dee8]",
    title: "text-[#24364a]",
  },
};

export default function LongFormNarrativeSection({
  pageName,
  topic,
  audience,
  outcome,
  variant = "azure",
  className = "",
}: LongFormNarrativeSectionProps) {
  const paragraphs = buildNarrativeContent({
    brand: "Phoenix Creative Group",
    pageName,
    topic,
    audience,
    outcome,
  });

  const current = variantStyles[variant];

  return (
    <section className={`mx-auto mt-16 max-w-6xl px-4 pb-16 ${className}`}>
      <div className={`rounded-3xl border p-8 shadow-[0_20px_45px_rgba(15,31,61,0.08)] ${current.wrap}`}>
        <h2 className={`text-3xl font-bold ${current.title}`}>{pageName} Strategy Narrative</h2>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#4d6284]">
          Long-form content block (600+ words)
        </p>
        <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[#1f3658]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
