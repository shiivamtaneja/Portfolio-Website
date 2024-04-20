import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import GrainyFilter from "@/components/GrainyFilter";
import "../globals.css";
import Navbar from "./_components/Navbar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <Navbar />
        <GrainyFilter />
        {children}
      </body>
    </html>
  );
}
