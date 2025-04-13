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
    {
      url: 'https://shivamtaneja.com/project/career-guidance',
      lastModified: new Date(),
    },
    {
      url: 'https://shivamtaneja.com/project/chat-bot',
      lastModified: new Date(),
    },
    {
      url: 'https://shivamtaneja.com/project/chat-mingle',
      lastModified: new Date(),
    },
    {
      url: 'https://shivamtaneja.com/project/circle-catcher',
      lastModified: new Date(),
    },
    {
      url: 'https://shivamtaneja.com/project/tilt-bot',
      lastModified: new Date(),
    },
  ]
}