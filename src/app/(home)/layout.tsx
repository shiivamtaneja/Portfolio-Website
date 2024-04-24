import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import GrainyFilter from "@/components/GrainyFilter";
import SmoothScroll from "@/components/SmoothScroll";
import Hamburger from "./_components/Hamburger";
import Navbar from "./_components/Navbar";
import "./home.css";

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
        <SmoothScroll>
          <Hamburger />
          <Navbar />
          <GrainyFilter />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
