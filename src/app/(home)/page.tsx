import AboutSection from "./_components/about/AboutSection";
import HeroSection from "./_components/hero/HeroSection";

export default function Home() {
  return (
    <>
      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section className="text-white rounded-t-3xl z-20 bg-black mt-[-100svh]" id="about">
          <AboutSection />
        </section>
      </main>
    </>
  );
}
