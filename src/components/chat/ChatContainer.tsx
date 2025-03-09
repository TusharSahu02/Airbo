import React, { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useTextareaAutoResize } from "@/hooks/useTextareaAutoResize";
import { BlockTypeDropdown } from "../ui/dropdowns/BlockTypeDropdown";
import { ModelSelector } from "../ui/dropdowns/ModelSelector";
import useChatStore from "@/stores/chatStore";
import ChatLoader from "./ChatLoader";

export const ChatContainer: React.FC = () => {
  const { chatMessages, message, setMessage, handleSendMessage } =
    useChatMessages();
  const textareaRef = useTextareaAutoResize();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useChatStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return; // Allow new line
      } else {
        event.preventDefault();
        await handleSendMessage();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!chatMessages.length ? (
        <div className="lg:max-w-5xl w-full h-full relative  mx-auto flex items-center justify-center flex-col">
          {/* LOGO  */}
          <div className=" absolute border size-20 bg-gray-500/50 border-white rounded-full top-40 left-1/2 -translate-x-1/2 "></div>
          <div className="border max-w-3xl lg:w-[65%] w-[90%] mx-auto bg-[#3e3e3e] rounded-2xl flex flex-col items-end justify-between p-3">
            <div className=" w-full">
              {/* Input Text field or Text area */}
              <textarea
                ref={textareaRef}
                className="w-full outline-none overflow-y-auto resize-none hideScrollbar"
                rows={1}
                placeholder="Ask anything"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
            <div className="flex items-center w-full justify-between mt-4">
              <BlockTypeDropdown />
              <ModelSelector />
            </div>
          </div>
          <div className=" absolute bottom-3 left-1/2 -translate-x-1/2">
            <p className=" text-sm text-gray-400 text-center">
              can make mistakes. <br className=" lg:hidden" /> Check important
              information
            </p>
          </div>
        </div>
      ) : (
        <div className="lg:max-w-5xl w-full h-full relative gap-4 mx-auto flex flex-col py-2">
          <div className="border size-20 bg-gray-500/50 border-white rounded-full mx-auto"></div>

          <div
            ref={messagesContainerRef}
            className="2xl:h-[90%]  mdh-[65%] h-[80%] max-w-3xl lg:w-[65%] w-[90%] relative mx-auto overflow-y-scroll space-y-4 hideScrollbar flex flex-col"
          >
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && (
              <ChatLoader />
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border max-w-3xl lg:w-[65%] w-[90%] mx-auto bg-[#3e3e3e] rounded-2xl flex flex-col items-end justify-between p-3">
            <div className="w-full">
              <textarea
                ref={textareaRef}
                className="w-full outline-none overflow-y-auto resize-none hideScrollbar"
                rows={1}
                placeholder="Ask anything"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>

            <div className="flex items-center w-full justify-between mt-4">
              <BlockTypeDropdown />
              <ModelSelector />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
