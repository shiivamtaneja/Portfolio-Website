import { MetadataRoute } from "next";

export default async function sitemaps(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://shivamtaneja.com/',
      lastModified: new Date(),
      priority: 1.0
    },
    {
      url: 'https://shivamtaneja.com/contact',
      lastModified: new Date(),
    },
  ]
}