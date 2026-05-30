import { ComponentPropsWithoutRef } from "react";

import type { MDXComponents } from "mdx/types";
import TrackedLink from "@/components/tracked-link";
import TrackedVideo from "@/components/tracked-video";
import { analyticsEvents } from "@/lib/analytics";

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
      <TrackedLink
        href={href || "/"}
        target="_blank"
        rel="noopener noreferrer"
        className="dark:text-white text-zinc-900 relative overflow-hidden"
        analyticsEvent={analyticsEvents.outboundLinkClicked}
        analyticsProperties={{
          href: href || "/",
          source: "project_detail",
        }}
        {...props}
      >
        <span className="hover-animation">{children}</span>
      </TrackedLink>
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
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl dark:text-white text-zinc-900" id={headingId}>
          {title}
        </h2>

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
  return <TrackedVideo src={src} poster={poster} autoPlay={autoPlay} />;
}

export function useMDXComponents(otherComponens: MDXComponents) {
  return {
    ...components,
    ...otherComponens,
    SubSection,
    Video,
  };
}
