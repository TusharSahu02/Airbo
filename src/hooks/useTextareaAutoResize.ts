// src/hooks/useTextareaAutoResize.ts
import { useRef, useEffect } from "react";
import { adjustTextareaHeight } from "@/lib/utils/textareaUtils";

export const useTextareaAutoResize = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => adjustTextareaHeight(textarea);
    textarea.addEventListener("input", handleInput);
    handleInput();

    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  return textareaRef;
};
