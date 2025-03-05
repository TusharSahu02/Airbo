// src/components/ui/textarea/AutoResizeTextarea.tsx
import React, { TextareaHTMLAttributes, useRef, useEffect } from "react";
import { adjustTextareaHeight } from "@/lib/utils/textareaUtils";

interface AutoResizeTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onHeightChange?: (height: number) => void;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  onHeightChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleResize = () => {
      adjustTextareaHeight(textarea);

      if (onHeightChange) {
        onHeightChange(textarea.scrollHeight);
      }
    };

    textarea.addEventListener("input", handleResize);
    handleResize(); // Initial resize

    return () => {
      textarea.removeEventListener("input", handleResize);
    };
  }, [onHeightChange]);

  return (
    <textarea
      ref={textareaRef}
      {...props}
      className={`
        w-full 
        outline-none 
        overflow-y-auto 
        resize-none 
        ${props.className || ""}
      `}
    />
  );
};
