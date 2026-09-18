import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vidarbhaindustrialassociates.com";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: baseUrl + "/privacy-policy", lastModified: new Date() },
    { url: baseUrl + "/terms-and-conditions", lastModified: new Date() }
  ];
}
