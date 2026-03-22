/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="text-sm break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node: _, ...props }) => (
            <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
          ),
          a: ({ node: _, ...props }) => (
            <a
              className="text-blue-500 dark:text-blue-400 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node: _, ...props }) => (
            <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />
          ),
          ol: ({ node: _, ...props }) => (
            <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />
          ),
          li: ({ node: _, ...props }) => <li className="" {...props} />,
          h1: ({ node: _, ...props }) => (
            <h1 className="text-xl font-bold mb-2 mt-4" {...props} />
          ),
          h2: ({ node: _, ...props }) => (
            <h2 className="text-lg font-bold mb-2 mt-3" {...props} />
          ),
          h3: ({ node: _, ...props }) => (
            <h3 className="text-md font-bold mb-2 mt-2" {...props} />
          ),
          strong: ({ node: _, ...props }) => (
            <strong className="font-semibold dark:text-zinc-100" {...props} />
          ),
          blockquote: ({ node: _, ...props }) => (
            <blockquote
              className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic my-2 text-zinc-600 dark:text-zinc-400"
              {...props}
            />
          ),
          pre: ({ node: _, ...props }) => (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg py-3 my-2 w-full overflow-x-auto">
              <pre
                className="text-sm font-mono text-zinc-100 m-0 p-0 bg-transparent min-w-full"
                {...(props as React.HTMLAttributes<HTMLPreElement>)}
              />
            </div>
          ),
          code: ({ node: _, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match && !className?.includes("language-");

            return isInline ? (
              <code
                className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-[0.85em] font-mono break-words"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
