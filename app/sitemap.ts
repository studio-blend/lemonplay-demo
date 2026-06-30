import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lemonpay.tech";
  const routes = [
    "",
    "/about",
    "/contact",
    "/pricing",
    "/partner-network",
    "/careers",
    "/products/cube",
    "/legal-policies/terms",
    "/legal-policies/privacy",
    "/legal-policies/grievance",
    "/legal-policies/press"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/products") ? 0.9 : 0.7
  }));
}
