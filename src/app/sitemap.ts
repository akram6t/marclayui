import type { MetadataRoute } from "next";
import { DOCS_NAV } from "@/components/docs/nav";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://marclayui.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  DOCS_NAV.forEach((group) => {
    group.links.forEach((link) => {
      routes.push({
        url: `${SITE_URL}${link.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: link.href === "/docs" ? 0.9 : 0.8,
      });
    });
  });

  return routes;
}
