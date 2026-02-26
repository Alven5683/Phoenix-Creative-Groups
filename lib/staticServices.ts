export type StaticService = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  process: string[];
  deliverables: string[];
  outcomes: string[];
  timeline: string;
  investment: string;
};

export const staticServices: StaticService[] = [
  {
    slug: "brand-strategy-identity",
    title: "Brand Strategy and Identity",
    shortDescription:
      "Position your brand with clear messaging, visual direction, and a system that supports growth.",
    heroDescription:
      "We align market positioning, voice, and visual identity to build a brand that is memorable and conversion focused.",
    process: ["Discovery", "Positioning", "Identity Design", "Launch Toolkit"],
    deliverables: [
      "Audience and competitor research",
      "Brand narrative and messaging architecture",
      "Logo and visual identity system",
      "Brand guidelines and reusable templates",
    ],
    outcomes: [
      "Clear differentiation in crowded markets",
      "Consistent messaging across all channels",
      "Higher trust during first contact and sales",
    ],
    timeline: "2-5 weeks",
    investment: "From $1,500",
  },
  {
    slug: "ux-ui-web-design",
    title: "UX and UI Web Design",
    shortDescription:
      "Design digital experiences that are intuitive, conversion driven, and built for real users.",
    heroDescription:
      "We design websites and platforms that reduce friction, improve clarity, and guide users to action.",
    process: ["Research", "Wireframes", "Visual Design", "Design QA"],
    deliverables: [
      "User flows and information architecture",
      "Responsive wireframes and prototypes",
      "High fidelity UI screens",
      "Design system and component library",
    ],
    outcomes: [
      "Improved user engagement and retention",
      "Lower drop-off on key conversion pages",
      "Faster build cycles with reusable components",
    ],
    timeline: "2-6 weeks",
    investment: "From $2,000",
  },
  {
    slug: "custom-web-development",
    title: "Custom Web Development",
    shortDescription:
      "Build fast, secure, scalable websites and web apps tailored to your business goals.",
    heroDescription:
      "Our engineering team delivers production-grade applications with modern architecture and long-term maintainability.",
    process: ["Architecture", "Development", "Testing", "Deployment"],
    deliverables: [
      "Next.js and React application development",
      "CMS and API integrations",
      "Performance optimization and SEO setup",
      "Deployment and monitoring handoff",
    ],
    outcomes: [
      "Better Core Web Vitals and page speed",
      "Higher reliability under growth traffic",
      "Clean codebase for future feature expansion",
    ],
    timeline: "3-10 weeks",
    investment: "From $3,000",
  },
  {
    slug: "seo-growth-systems",
    title: "SEO and Growth Systems",
    shortDescription:
      "Increase qualified traffic with technical SEO, content strategy, and performance analytics.",
    heroDescription:
      "We build end-to-end growth systems that combine search visibility, conversion strategy, and measurable reporting.",
    process: ["Audit", "Roadmap", "Execution", "Optimization"],
    deliverables: [
      "Technical SEO and content audit",
      "Keyword and topic cluster strategy",
      "On-page optimization and schema setup",
      "Monthly analytics and growth reporting",
    ],
    outcomes: [
      "Sustained increase in organic traffic",
      "Improved keyword rankings in core categories",
      "Clear ROI tracking from search channels",
    ],
    timeline: "Monthly engagement",
    investment: "From $1,200/month",
  },
  {
    slug: "conversion-optimization",
    title: "Conversion Optimization",
    shortDescription:
      "Turn more visitors into leads and customers through testing, UX improvements, and funnel tuning.",
    heroDescription:
      "We identify conversion blockers and improve the full funnel from first visit to checkout or lead capture.",
    process: ["Funnel Audit", "Hypothesis", "A/B Testing", "Iteration"],
    deliverables: [
      "Landing page and funnel diagnostics",
      "Conversion hypothesis backlog",
      "A/B test setup and tracking",
      "Performance review and recommendations",
    ],
    outcomes: [
      "Higher form completion and checkout rates",
      "Improved cost efficiency on paid campaigns",
      "Data-backed optimization decisions",
    ],
    timeline: "4-week sprints",
    investment: "From $1,000/month",
  },
  {
    slug: "ongoing-support-retainers",
    title: "Ongoing Support and Retainers",
    shortDescription:
      "Get a dedicated team for continuous improvements, feature delivery, and technical support.",
    heroDescription:
      "Our retainers provide predictable execution for design, development, and marketing priorities every month.",
    process: ["Planning", "Weekly Delivery", "Review", "Prioritization"],
    deliverables: [
      "Dedicated monthly execution capacity",
      "Task prioritization and sprint planning",
      "Maintenance, updates, and QA",
      "Strategic guidance and technical advisory",
    ],
    outcomes: [
      "Faster release cycles without hiring overhead",
      "Consistent quality and delivery rhythm",
      "Flexible support aligned to business changes",
    ],
    timeline: "Monthly retainer",
    investment: "From $2,500/month",
  },
];

export function getServiceBySlug(slug: string) {
  return staticServices.find((service) => service.slug === slug);
}
