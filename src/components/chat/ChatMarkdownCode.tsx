import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ComponentPropsWithRef } from "react";

interface CodeProps extends ComponentPropsWithRef<"code"> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMarkdownCode = ({ children }: { children: string }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  // Track code block indices to manage which one was copied
  let codeBlockIndex = -1;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline = false, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || "");
          const codeContent = String(children).replace(/\n$/, "");

          if (!inline && match) {
            codeBlockIndex++;
            const currentIndex = codeBlockIndex;
            return (
              <div className="relative">
                <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-lg -mb-2 text-xs">
                  <span>{match[1]}</span>
                  <button
                    onClick={() => copyToClipboard(codeContent, currentIndex)}
                    className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
                  >
                    {copiedIndex === currentIndex ? "Copied!" : "Copy code"}
                  </button>
                </div>
                <SyntaxHighlighter
                  // @ts-expect-error - Ignoring the type error for style prop
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-t-none"
                  {...props}
                >
                  {codeContent}
                </SyntaxHighlighter>
                <div className="flex justify-between items-center bg-[#1e1e1e] h-2 rounded-b-xl -mt-[10px] text-xs"></div>
              </div>
            );
          }
          return (
            <code
              className={`${className} px-1 py-0.5 bg-gray-800 rounded`}
              {...props}
            >
              {children}
            </code>
          );
        },
        // Headings
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-bold mt-3 mb-2">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-base font-bold mt-2 mb-1">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-sm font-bold mt-2 mb-1">{children}</h6>
        ),

        // Text elements
        p: ({ children }) => <p className="mb-3">{children}</p>,
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        del: ({ children }) => <del className="line-through">{children}</del>,

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-3">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-3">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,

        // Other elements
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 py-1 mb-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="max-w-full h-auto my-2 rounded" />
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto mb-3">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
            {children}
          </td>
        ),

        // Horizontal rule
        hr: () => (
          <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
        ),

        // Preformatted text (non-code blocks)
        pre: ({ children }) => (
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3 overflow-x-auto">
            {children}
          </pre>
        ),

        // Definition lists
        dl: ({ children }) => <dl className="mb-3">{children}</dl>,
        dt: ({ children }) => <dt className="font-bold mt-2">{children}</dt>,
        dd: ({ children }) => <dd className="ml-4 mb-1">{children}</dd>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default ChatMarkdownCode;
