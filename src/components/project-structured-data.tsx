import Script from "next/script";

type Props = {
  name: string;
  description: string;
  url: string;
  repo?: string;
  tech: string[];
};

export default function ProjectStructuredData({
  name,
  description,
  url,
  repo,
  tech,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": name,
    "description": description,
    "url": url,
    "author": {
      "@id": "https://www.shivamtaneja.com/#person"
    },
    "programmingLanguage": tech,
    ...(repo && { codeRepository: repo })
  };

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
