import { MetadataRoute } from "next";

export default async function siteMap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_BASE_URL!;
  return [
    {
      url: url,
      priority: 1,
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: `${url}/products`,
      priority: 0.9,
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: `${url}/contact`,
      priority: 0.8,
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: `${url}/favicon.ico`,
      priority: 0.6,
      lastModified: new Date().toISOString().split("T")[0],
    },
  ];
}
