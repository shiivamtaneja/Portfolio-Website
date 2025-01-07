import { Metadata } from 'next';

import CustomWrapper from '@/components/custom-wrapper';

export const metadata: Metadata = {
  title: "Not Found | Shivam Taneja",
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


export default function NotFound() {
  return (
    <CustomWrapper>
      <section>
        <div className="text-center flex flex-col gap-4 py-4">
          <div className='flex flex-col gap'>
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-xl">Page not found</h2>
          </div>
          <p className="text-muted-foreground">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </section>
    </CustomWrapper>
  )
}