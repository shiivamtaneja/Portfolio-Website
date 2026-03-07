import Script from "next/script";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.shivamtaneja.com/#person",
        name: "Shivam Taneja",
        url: "https://www.shivamtaneja.com",
        image: "https://www.shivamtaneja.com/og-image.png",
        description:
          "Associate Software Development Engineer and Full Stack Developer specializing in modern web technologies.",
        jobTitle: "Associate Software Development Engineer",
        worksFor: {
          "@type": "Organization",
          name: "NTT Data",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "MRIIRS",
        },
        knowsAbout: [
          "Full Stack Development",
          "MERN Stack",
          "React",
          "Next.js",
          "Node.js",
          "MongoDB",
          "Microsoft Azure",
        ],
        sameAs: [
          "https://www.linkedin.com/in/shivam-taneja/",
          "https://github.com/shivam-taneja/",
          "https://twitter.com/codesbyshivam/",
          "https://www.youtube.com/@codesbyshivam",
        ],
      },

      {
        "@type": "WebSite",
        "@id": "https://www.shivamtaneja.com/#website",
        url: "https://www.shivamtaneja.com",
        name: "Shivam Taneja | Full Stack Developer Portfolio",
        description:
          "Portfolio of Shivam Taneja showcasing projects, skills, and experience in full stack web development.",
        publisher: {
          "@id": "https://www.shivamtaneja.com/#person",
        },
      },

      {
        "@type": "Organization",
        "@id": "https://www.shivamtaneja.com/#organization",
        name: "Shivam Taneja",
        url: "https://www.shivamtaneja.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.shivamtaneja.com/logo.svg",
        },
        sameAs: [
          "https://www.linkedin.com/in/shivam-taneja/",
          "https://github.com/shivam-taneja/",
        ],
      },
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
