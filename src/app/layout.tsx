import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GrainyFilter from "@/components/grainy-filter";
import SmoothScroll from "@/components/smooth-scroll";

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Shivam Taneja",
  description: "Personal portfolio website for Shivam Taneja",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg'
      },
    ],
  }
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
