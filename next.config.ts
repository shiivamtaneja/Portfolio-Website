import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],

  async redirects() {
    return [
      {
        source: "/project/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
      { source: "/resume", destination: "/resume.pdf", permanent: true },
      { source: "/cv", destination: "/resume.pdf", permanent: true },
      { source: "/shivam-resume", destination: "/resume.pdf", permanent: true },

      {
        source: "/github",
        destination: "https://github.com/shivam-taneja",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/shivam-taneja/",
        permanent: true,
      },
      {
        source: "/in",
        destination: "https://www.linkedin.com/in/shivam-taneja/",
        permanent: true,
      },

      {
        source: "/x",
        destination: "https://twitter.com/codesbyshivam",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/codesbyshivam",
        permanent: true,
      },

      {
        source: "/yt",
        destination: "https://www.youtube.com/@codesbyshivam",
        permanent: true,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@codesbyshivam",
        permanent: true,
      },

      {
        source: "/ig",
        destination: "https://www.instagram.com/codesbyshivam/",
        permanent: true,
      },
      {
        source: "/insta",
        destination: "https://www.instagram.com/codesbyshivam/",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/codesbyshivam/",
        permanent: true,
      },

      {
        source: "/leetcode",
        destination: "https://leetcode.com/shivam-taneja/",
        permanent: true,
      },
      {
        source: "/lc",
        destination: "https://leetcode.com/shivam-taneja/",
        permanent: true,
      },

      {
        source: "/kaggle",
        destination: "https://www.kaggle.com/shiivamtaneja",
        permanent: true,
      },

      {
        source: "/huggingface",
        destination: "https://huggingface.co/shivamtaneja",
        permanent: true,
      },
      {
        source: "/hf",
        destination: "https://huggingface.co/shivamtaneja",
        permanent: true,
      },

      {
        source: "/docker",
        destination: "https://hub.docker.com/u/codesbyshiv",
        permanent: true,
      },
      {
        source: "/gist",
        destination: "https://gist.github.com/shivam-taneja",
        permanent: true,
      },

      {
        source: "/aboutme",
        destination: "https://about.me/codesbyshivam",
        permanent: true,
      },
      {
        source: "/about.me",
        destination: "https://about.me/codesbyshivam",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
