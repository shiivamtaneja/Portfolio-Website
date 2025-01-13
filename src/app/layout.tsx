import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { defaultMetadata } from "@/lib/constants/metadata";

import GrainyFilter from "@/components/grainy-filter";
import SmoothScroll from "@/components/smooth-scroll";

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Shivam Taneja - Full Stack Developer | Portfolio",
  description: "Welcome to Shivam Taneja's portfolio. Explore my projects, skills, and journey as a full-stack developer passionate about building innovative digital experiences.",
  openGraph: {
    title: "Shivam Taneja - Full Stack Developer | Portfolio",
    description: "Explore Shivam Taneja's portfolio and discover innovative projects and cutting-edge web development solutions.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Shivam Taneja - Full Stack Developer | Portfolio",
    description: "Explore Shivam Taneja's portfolio and discover innovative projects and cutting-edge web development solutions.",
    ...defaultMetadata.twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased bg-zinc-900`}
      >
        <GrainyFilter />
        <ToastContainer theme="dark" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
