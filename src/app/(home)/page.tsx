import Loader from "@/components/Loader";

import Description from "./_components/Description";
// import HeroBg from "./_components/HeroBg";

export default function Home() {
  return (
    <>
      <main>
        <Loader />
        <section className="mb-[-100svh]" id="hero">
          <div className="h-svh flex md:items-center items-end fixed top-0">
            <Description />
          </div>
          <div className="h-svh"></div>
        </section>

        <section className="mt-[100svh] bg-black text-white" id="experience">
          <div className="flex justify-center items-center h-svh">
            exp
            {/* <HeroBg />
            <Description /> */}
          </div>
        </section>

        <section className="" id="skills">
          <div className="flex justify-center items-center h-svh">
            {/* <HeroBg /> */}
            skills
            {/* <Description /> */}
          </div>
        </section>

        <section className="" id="projects">
          <div className="flex justify-center items-center h-svh">
            {/* <HeroBg /> */}
            projects
            {/* <Description /> */}
          </div>
        </section>

        <section className="" id="about">
          <div className="flex justify-center items-center h-svh">
            {/* <HeroBg /> */}
            about
            {/* <Description /> */}
            {/* <Description /> */}

          </div>
        </section>

      </main>
    </>
  );
}
