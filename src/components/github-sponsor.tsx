import React from "react";

interface GithubSponsorProps {
  className?: string;
  variant?: "button" | "card";
}

const GithubSponsor = ({
  className = "",
  variant = "card",
}: GithubSponsorProps) => {
  const username = "shivam-taneja";

  if (variant === "button") {
    return (
      <a
        href={`https://github.com/sponsors/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`overflow-hidden flex relative ${className}`}
      >
        <div className="absolute inset-0 z-10" />
        <iframe
          src={`https://github.com/sponsors/${username}/button`}
          title={`Sponsor ${username}`}
          height="32"
          width="114"
          style={{ border: 0, borderRadius: "6px" }}
        ></iframe>
      </a>
    );
  }

  return (
    <a
      href={`https://github.com/sponsors/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`overflow-hidden flex w-full max-w-xl relative ${className}`}
    >
      <div className="absolute inset-0 z-10" />
      <iframe
        src={`https://github.com/sponsors/${username}/card`}
        title={`Sponsor ${username}`}
        height="225"
        width="600"
        style={{ border: 0, borderRadius: "8px" }}
        className="w-full bg-zinc-50 dark:bg-zinc-900"
      ></iframe>
    </a>
  );
};

export default GithubSponsor;
