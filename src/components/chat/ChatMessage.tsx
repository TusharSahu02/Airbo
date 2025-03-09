import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user";
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
    <div
      className={`p-3 text-white rounded-lg w-fit whitespace-pre-wrap ${
        isUserMessage ? "bg-blue-500 self-end max-w-[75%]" : "w-full self-start"
      }`}
    >
      {isUserMessage ? (
        message.text
      ) : (
        <ReactMarkdown
          components={{
            code({  inline, className, children, ...props }) {
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
                        onClick={() =>
                          copyToClipboard(codeContent, currentIndex)
                        }
                        className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {copiedIndex === currentIndex ? "Copied!" : "Copy code"}
                      </button>
                    </div>
                    <SyntaxHighlighter
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
            h3: ({ children }) => (
              <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-bold mt-3 mb-2">{children}</h4>
            ),
            p: ({ children }) => <p className="mb-3">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-3">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-3">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
          }}
        >
          {message.text}
        </ReactMarkdown>
      )}
    </div>
  );
};
