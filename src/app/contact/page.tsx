import { Metadata } from 'next';
import Link from 'next/link';

import { defaultMetadata } from '@/lib/constants';

import ContactForm from '@/components/contact-form';
import CustomWrapper from '@/components/custom-wrapper';
import { FileText, MailIcon, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Contact Me | Shivam Taneja - Full Stack Developer",
  description: "Get in touch with Shivam Taneja. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  openGraph: {
    title: "Contact Me | Shivam Taneja - Full Stack Developer",
    description: "Get in touch with Shivam Taneja. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Contact Me | Shivam Taneja",
    description: "Get in touch with Shivam Taneja. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    ...defaultMetadata.twitter
  },
};

const ContactPage = () => {
  return (
    <CustomWrapper>
      <section>
        <div className="py-6">
          <div className="grid md:grid-cols-2 md:gap-0 gap-10">
            <div className="space-y-6 md:text-start text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Stay Connected.</h1>
                <p className="text-muted-foreground">Bring your ideas to life, together. ✨</p>
              </div>

              <div className="space-y-4">
                <div className="flex md:justify-start justify-center w-full items-center gap-3 text-muted-foreground">
                  <MailIcon className="h-5 w-5 text-white shrink-0" />
                  <a
                    href="mailto:business.shivamtaneja@gmail.com"
                    className="text-white relative overflow-hidden"
                  >
                    <span className="hover-animation">
                      business.shivamtaneja@gmail.com
                    </span>
                  </a>
                </div>

                <div className="flex md:justify-start justify-center w-full items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-white shrink-0" />
                  <span className="text-white">New Delhi, India</span>
                </div>

                <Link href={""} target='_blank' className="flex md:justify-start justify-center w-full items-center gap-3 text-muted-foreground">
                  <FileText className="h-5 w-5 text-white shrink-0" />
                  <span className="text-white">Download Resume</span>
                </Link>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </CustomWrapper>
  )
}

export default ContactPage