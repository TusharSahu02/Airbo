import { TextShimmer } from "../ui/text-shimmer";

function ChatLoader() {
  return (
    <TextShimmer className="font-mono text-sm" duration={1}>
      Generating code...
    </TextShimmer>
  );
}

export default ChatLoader;
