import Image from "next/image";

import { pageInformations } from "@/lib/constants";

const AboutSection = () => {
  return (
    <>
      <div className="flex min-h-svh max-w-screen-2xl mx-auto px-4 flex-col gap-4 py-12">
        <div className="w-full flex gap-1 items-center">
          <div className="rounded-[50%] w-2 h-2 bg-[#f2f2f2] shadow-[0_0_20px_#fff]"></div>
          <h2 className="text-cream/50 uppercase">About me</h2>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <h3 className="font-semibold text-heading-2 self-start">
            Innovating at the Intersection of <span className="italic glow">Code</span>, <span className="italic glow">Creativity</span>, and <span className="italic glow">Purpose</span>.
          </h3>

          <div className="max-w-screen-lg pt-8 flex flex-col 840:gap-20 gap-10">
            {pageInformations.aboutpageDescription.myJourney.map((d, idx) => (
              <div className="grid grid-cols-1 840:grid-cols-2 gap-x-12" key={idx}>
                {/* Has No Offset Data */}
                <div className="flex 840:flex-col flex-col-reverse 840:gap-6 gap-8 order-2 840:order-1 840:pt-0 pt-6">
                  <div className="840:w-96 w-full flex flex-col gap-1">
                    <Image
                      src={d.hasNoOffset.image}
                      width={1920}
                      height={1080}
                      className='rounded-md text-stagger aspect-[433/667]'
                      alt={d.hasNoOffset.imageAlt}
                    />
                    <p className="items-center text-sm w-full text-cream/60">({d.hasNoOffset.imageText})</p>
                  </div>

                  <div className="flex flex-col gap-4 text-underline">
                    {d.hasNoOffset.sub_heading ?
                      <div className="flex flex-col gap-4">
                        <p className="text-xl">{d.hasNoOffset.sub_heading}</p>

                        <p className="text-cream/70 flex flex-col gap-2">
                          {d.hasNoOffset.content.map((content, idx) => (
                            <span key={idx} dangerouslySetInnerHTML={{ __html: content.text }}></span>
                          ))}
                        </p>
                      </div>
                      :
                      <div>
                        {d.hasOffset.content.map((content, idx) => (
                          <span key={idx} dangerouslySetInnerHTML={{ __html: content.text }}></span>
                        ))}
                      </div>
                    }
                  </div>
                </div>

                {/* Has Offset Data */}
                <div className="flex flex-col 840:pt-6 840:gap-6 gap-8 order-1 840:order-2">
                  {d.hasOffset.sub_heading ?
                    <div className="flex flex-col gap-4">
                      <p className="text-xl">{d.hasOffset.sub_heading}</p>

                      <p className="text-cream/70 flex flex-col gap-2">
                        {d.hasOffset.content.map((content, idx) => (
                          <span key={idx} dangerouslySetInnerHTML={{ __html: content.text }}></span>
                        ))}
                      </p>
                    </div>
                    :
                    <div>
                      {d.hasOffset.content.map((content, idx) => (
                        <span key={idx} dangerouslySetInnerHTML={{ __html: content.text }}></span>
                      ))}
                    </div>
                  }

                  <div className="840:w-96 w-full flex flex-col gap-1">
                    <Image
                      src={d.hasOffset.image}
                      width={1920}
                      height={1080}
                      className='rounded-md text-stagger aspect-[433/667]'
                      alt={d.hasOffset.imageAlt}
                    />
                    <p className="items-center text-sm w-full text-cream/60">({d.hasOffset.imageText})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;