import { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import type { MDXComponents } from "mdx/types";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1
      className="text-2xl font-bold dark:text-white text-zinc-900"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-xl dark:text-white text-zinc-900" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-lg dark:text-white text-zinc-900" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-base dark:text-white text-zinc-900" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="dark:text-neutral-400 text-neutral-600" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="flex list-disc ml-4 flex-col gap-2" {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className="dark:text-neutral-400 text-neutral-600" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    return (
      <Link
        href={href || "/"}
        target="_blank"
        rel="noopener noreferrer"
        className="dark:text-white text-zinc-900 relative overflow-hidden"
        {...props}
      >
        <span className="hover-animation">{children}</span>
      </Link>
    );
  },
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function SubSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl dark:text-white text-zinc-900">{title}</h2>

        {children}
      </div>
    </section>
  );
}

export function Video({
  src,
  poster,
  autoPlay = false,
}: {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <video
        controls
        playsInline
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        poster={poster}
        className="w-full h-auto object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export function useMDXComponents(otherComponens: MDXComponents) {
  return {
    ...components,
    ...otherComponens,
    SubSection,
    Video
  };
}
