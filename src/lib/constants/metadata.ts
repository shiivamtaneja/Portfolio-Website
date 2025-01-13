import { Metadata } from "next";

export const defaultMetadata: Partial<Metadata> = {
  openGraph: {
    type: "website",
    url: "https://shivamtaneja.com/contact",
    images: [
      {
        url: "/og-image.png",
        alt: "Contact Shivam Taneja - Full Stack Developer",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  keywords: [
    "Shivam Taneja",
    "Full Stack Developer Portfolio",
    "Web Developer Portfolio",
    "Full Stack Developer",
    "Shivam Taneja Projects",
    "Hire Shivam Taneja",
    "Full Stack Development",
    "React Developer Portfolio",
  ],
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
      },
    ],
  },
  alternates: {
    canonical: "https://shivamtaneja.com",
  },
  robots: "index, follow",
}