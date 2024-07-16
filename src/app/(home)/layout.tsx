import SmoothScroll from "@/components/SmoothScroll";
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
      <Hamburger />
      <Navbar />
      {children}
    </SmoothScroll>
  );
}
