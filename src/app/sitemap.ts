import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ubbi-tickets.com";

  const routes = [
    "",
    "/events",
    "/organizers",
    "/about",
    "/contact",
    "/access-control",
    "/login",
    "/register",
    "/organizers/create",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" || route === "/events" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/events" ? 0.9 : 0.7,
  }));
}
