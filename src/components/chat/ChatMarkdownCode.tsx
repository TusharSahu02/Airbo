import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ComponentPropsWithRef } from "react";

interface CodeProps extends ComponentPropsWithRef<"code"> {
  inline?: boolean; // Make inline optional
  className?: string; // Make className optional
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
              <div className="relative ">
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
                <div className=" bg-[#1e1e1e] h-2 rounded-b-xl -mt-[10px]"></div>
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
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mt-4 ">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-bold mt-3 ">{children}</h4>
        ),
        p: ({ children }) => <p className="">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-6 ">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 ">{children}</ol>
        ),
        li: ({ children }) => <li className="">{children}</li>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default ChatMarkdownCode;
