import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiOpenAiLogoThin } from "react-icons/pi";
import { ChevronDown } from "lucide-react";

// Define available models
const AVAILABLE_MODELS = [
  // OpenAI Models
  { id: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { id: "gpt-4", label: "GPT-4" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { id: "gpt-3.5-turbo-16k", label: "GPT-3.5 Turbo 16K" },

  // Anthropic Claude Models
  { id: "claude-3-opus", label: "Claude 3 Opus" },
  { id: "claude-3-sonnet", label: "Claude 3 Sonnet" },
  { id: "claude-3-haiku", label: "Claude 3 Haiku" },
  { id: "claude-2.1", label: "Claude 2.1" },
  { id: "claude-2", label: "Claude 2" },
  { id: "claude-instant", label: "Claude Instant" },

  // Google Models
  { id: "gemini-pro", label: "Gemini Pro" },
  { id: "gemini-ultra", label: "Gemini Ultra" },
  { id: "palm-2", label: "PaLM 2" },

  // Amazon Titan Models
  { id: "titan-text-express", label: "Titan Text Express" },
  { id: "titan-text-lite", label: "Titan Text Lite" },
  { id: "titan-embed", label: "Titan Embeddings" },

  // Meta Models
  { id: "llama-2-70b", label: "Llama 2 70B" },
  { id: "llama-2-13b", label: "Llama 2 13B" },
  { id: "llama-2-7b", label: "Llama 2 7B" },

  // Mistral Models
  { id: "mistral-large", label: "Mistral Large" },
  { id: "mistral-medium", label: "Mistral Medium" },
  { id: "mistral-small", label: "Mistral Small" },

  // Cohere Models
  { id: "cohere-command", label: "Command" },
  { id: "cohere-command-light", label: "Command Light" },
  { id: "cohere-command-nightly", label: "Command Nightly" },

  // AI21 Models
  { id: "j2-ultra", label: "Jurassic-2 Ultra" },
  { id: "j2-mid", label: "Jurassic-2 Mid" },
] as const;

type ModelType = (typeof AVAILABLE_MODELS)[number]["id"];

interface ModelSelectorProps {
  onModelChange?: (model: ModelType) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  onModelChange,
}) => {
  const [selectedModel, setSelectedModel] = useState<ModelType>("gpt-4");

  const handleModelSelect = (modelId: ModelType) => {
    setSelectedModel(modelId);
    onModelChange?.(modelId);
  };

  // Find the current model label
  const currentModel = AVAILABLE_MODELS.find(
    (model) => model.id === selectedModel
  )?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500/30 rounded-md px-3 py-2">
          <PiOpenAiLogoThin size={16} />
          <p className="text-sm">{currentModel}</p>
          <ChevronDown size={15} className="mt-0.5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className=" h-[200px] overflow-y-scroll hideScrollbar">
          {AVAILABLE_MODELS.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => handleModelSelect(model.id)}
              className={`cursor-pointer ${
                selectedModel === model.id
                  ? "bg-gray-100 dark:bg-gray-700/40"
                  : ""
              }`}
            >
              {model.label}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
