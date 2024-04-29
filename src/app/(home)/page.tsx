import Loader from "@/components/Loader";

import Description from "./_components/Description";
// import HeroBg from "./_components/HeroBg";

export default function Home() {
  return (
    <>
      <main>
        <Loader />
        <section className="" id="hero">
          <div className="h-svh sticky top-0 flex justify-center items-center z-[-1]">
            <Description />
          </div>
          <div className="h-svh"></div>
        </section>

        <section className="text-white rounded-3xl z-20 bg-black mt-[-100svh]" id="about">
          <div className="flex h-svh max-w-screen-2xl mx-auto px-4">

            about me
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
      </main>
    </>
  );
}
