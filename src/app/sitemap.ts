import { MetadataRoute } from "next";

export default async function sitemaps(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://www.shivamtaneja.com/',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'https://www.shivamtaneja.com/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/resume.pdf',
      lastModified: new Date(),
    },

    // projects
    {
      url: 'https://www.shivamtaneja.com/projects/career-guidance',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/chat-bot',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/chat-mingle',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/circle-catcher',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/collab-write',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/decode-mycode',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/eznotify',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/nagar-iq',
      lastModified: new Date(),
    },
    {
      url: 'https://www.shivamtaneja.com/projects/tilt-bot',
      lastModified: new Date(),
    },
  ];
}