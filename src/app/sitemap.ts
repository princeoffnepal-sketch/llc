import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/digital-solutions", priority: 0.8 },
  { path: "/commerce", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
