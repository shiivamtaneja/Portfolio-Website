import Loader from "@/components/Loader";

import Description from "./_components/Description";
// import HeroBg from "./_components/HeroBg";

export default function Home() {
  return (
    <>
      <main>
        <Loader />
        <section className="" id="hero">
          <div className="flex justify-center items-center h-svh">
            {/* <HeroBg /> */}
            <Description />
          </div>
        </section>

        <section className="" id="experience">
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
