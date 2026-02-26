import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/db";
import BlogPostModel from "@/models/BlogPost";
import Portfolio from "@/models/Portfolio";
import { staticServices } from "@/lib/staticServices";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/feedback`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/website-cost-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = staticServices.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  try {
    await dbConnect();

    const [posts, projects] = await Promise.all([
      BlogPostModel.find({ status: "published" }).select("slug updatedAt createdAt").lean(),
      Portfolio.find({}).select("_id updatedAt createdAt").lean(),
    ]);

    const blogRoutes: MetadataRoute.Sitemap = posts
      .filter((post: any) => typeof post.slug === "string" && post.slug.trim())
      .map((post: any) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.createdAt || now,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project: any) => ({
      url: `${base}/portfolio/${project._id}`,
      lastModified: project.updatedAt || project.createdAt || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...portfolioRoutes];
  } catch {
    return [...staticRoutes, ...serviceRoutes];
  }
}

