import { Metadata } from "next";
import Link from "next/link";

import { RESUME_LINK } from "@/lib/constants/about-me";
import { defaultMetadata } from "@/lib/constants/metadata";

import ContactForm from "@/components/contact-form";
import Wrapper from "@/components/wrapper";
import { FileText, MailIcon, MapPin } from "lucide-react";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Contact Me | Shivam Taneja - Full Stack Developer",
  description:
    "Get in touch with Shivam Taneja. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  alternates: {
    canonical: "https://www.shivamtaneja.com/contact",
  },
  openGraph: {
    title: "Contact Me | Shivam Taneja - Full Stack Developer",
    description:
      "Get in touch with Shivam Taneja. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Contact Me | Shivam Taneja",
    description:
      "Get in touch with Shivam Taneja. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ...defaultMetadata.twitter,
  },
};

const ContactPage = () => {
  return (
    <Wrapper>
      <section>
        <div>
          <div className="grid md:grid-cols-2 md:gap-0 gap-10">
            <div className="space-y-6 md:text-start text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold dark:text-white text-zinc-900">
                  Stay Connected.
                </h1>
                <p className="dark:text-muted-foreground text-neutral-600">
                  Bring your ideas to life, together. ✨
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex md:justify-start justify-center w-full items-center gap-3 dark:text-muted-foreground text-neutral-600">
                  <MailIcon
                    className="h-5 w-5 dark:text-white text-zinc-900 shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="mailto:business.shivamtaneja@gmail.com"
                    className="dark:text-white text-zinc-900 relative overflow-hidden"
                  >
                    <span className="hover-animation">
                      business.shivamtaneja@gmail.com
                    </span>
                  </a>
                </div>

                <div className="flex md:justify-start justify-center w-full items-center gap-3 dark:text-muted-foreground text-neutral-600">
                  <MapPin
                    className="h-5 w-5 dark:text-white text-zinc-900 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="dark:text-white text-zinc-900">
                    New Delhi, India
                  </span>
                </div>

                <Link
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex md:justify-start justify-center w-full items-center gap-3 dark:text-muted-foreground text-neutral-600"
                >
                  <FileText
                    className="h-5 w-5 dark:text-white text-zinc-900 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="dark:text-white text-zinc-900 relative overflow-hidden">
                    <span className="hover-animation">Download Resume</span>
                  </p>
                </Link>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default ContactPage;
