import type { MetadataRoute } from "next";
import { wikis } from "@/lib/wikis";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lfdiego.xyz",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://lfdiego.xyz/claude/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://lfdiego.xyz/wiki/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...["impressum", "datenschutz"].map((page) => ({
      url: `https://lfdiego.xyz/${page}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    // Start pages of the engine-hosted wikis; the engine links everything else.
    ...wikis.map((wiki) => ({
      url: `https://lfdiego.xyz${wiki.path}/wiki/home`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
