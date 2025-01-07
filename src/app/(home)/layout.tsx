import SmoothScroll from "@/components/SmoothScroll";
import Blobity from "./_components/Blobity";
import Footer from "./_components/Footer";
import Hamburger from "./_components/Hamburger";
import Navbar from "./_components/Navbar";

import "./home.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      {/* <Blobity /> */}
      <Hamburger />
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
