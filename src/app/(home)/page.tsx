import Loader from "@/components/Loader";
import Description from "./_components/Description";
import HeroBg from "./_components/HeroBg";

export default function Home() {
  return (
    <>
      <main>
        {/* <Loader /> */}
        
        <section className="bg-secondary-100" id="hero">
          <div className="flex justify-center items-center h-svh">
            <HeroBg />
            <Description />
          </div>
        </section>

      </main>
    </>
  );
}
