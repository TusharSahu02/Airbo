// src/lib/utils/textareaUtils.ts
export const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
  // Reset height to auto to correctly calculate scroll height
  textarea.style.height = "auto";

  // Set height based on scroll height
  textarea.style.height = `${textarea.scrollHeight}px`;
};

export const resizeTextarea = (
  textarea: HTMLTextAreaElement,
  minHeight: number = 40,
  maxHeight: number = 200
) => {
  textarea.style.height = "auto";
  const newHeight = Math.min(
    Math.max(textarea.scrollHeight, minHeight),
    maxHeight
  );
  textarea.style.height = `${newHeight}px`;
};
