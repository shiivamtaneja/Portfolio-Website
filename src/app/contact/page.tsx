import { Metadata } from 'next';

import ContactForm from '@/components/contact-form';
import CustomWrapper from '@/components/custom-wrapper';
import { MailIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact Me | Shivam Taneja",
  description: "Personal portfolio website for Shivam Taneja",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg'
      },
    ],
  }
};

const ContactPage = () => {
  return (
    <CustomWrapper>
      <section>
        <div className="py-6">
          <div className="grid md:grid-cols-2 md:gap-0 gap-10">
            <div className="space-y-4 md:text-start text-center">
              <h1 className="text-4xl font-bold">Let&apos;s chat.</h1>

              <p className="text-muted-foreground">Let&apos;s create something together ✨</p>

              <div className="flex md:justify-start justify-center w-full items-center gap-2 text-muted-foreground group">
                <MailIcon className="h-5 w-5 text-white" />
                <a
                  href="mailto:business.shivamtaneja@gmail.com"
                  className="text-white relative overflow-hidden"
                >
                  <span className="hover-animation">
                    business.shivamtaneja@gmail.com
                  </span>
                </a>
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