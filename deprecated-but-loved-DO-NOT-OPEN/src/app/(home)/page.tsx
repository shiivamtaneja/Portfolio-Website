import AboutSection from "./_components/about-section";
import HeroSection from "./_components/home-hero-section";

export default function Home() {
  return (
    <>
      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section className="text-white rounded-3xl z-20 bg-black mt-[-100svh]" id="about">
          <AboutSection />
        </section>

        <section>
          <AboutSection />
        </section>
      </main>
    </>
  );
}
