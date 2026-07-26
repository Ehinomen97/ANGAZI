import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://angaziconcepts.com";
  const routes = ["", "/find-workers", "/find-work", "/become-agent", "/about", "/contact", "/login", "/signup"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
