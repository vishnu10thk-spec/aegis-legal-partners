import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aegis-legal-partners.vercel.app").origin;
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/consultation`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.86
    }
  ];
}
