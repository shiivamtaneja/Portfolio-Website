import React from "react";

import { aboutMeContent } from "@/lib/constants/about-me";

const AboutMeSection = () => {
  return (
    <section aria-labelledby="about-heading">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h1
            className="text-2xl font-bold dark:text-white text-zinc-900"
            id="about-heading"
          >
            Hi, I&apos;m Shivam Taneja
          </h1>
        </div>

        <ul className="flex list-disc ml-4 flex-col gap-2">
          {aboutMeContent.map((item) => (
            <li
              className="dark:text-neutral-500 text-neutral-600 font-semibold"
              key={item}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutMeSection;
