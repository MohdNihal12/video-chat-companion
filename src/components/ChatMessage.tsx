import { User, Sparkles } from "lucide-react";
import { Citation } from "@/lib/types";
import { CitationsList } from "./CitationsList";

interface ChatMessageProps {
  role: "user" | "model";
  content: string;
  citations?: Citation[];
}

export const ChatMessage = ({ role, content, citations }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : ""} animate-fade-in`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg ring-2 ring-emerald-400/20 shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}

      <div className={`flex flex-col gap-3 max-w-[85%] ${isUser ? "items-end" : ""}`}>
        <div
          className={`px-6 py-4 rounded-2xl shadow-sm ${isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-card/50 backdrop-blur-md border border-border/50 rounded-tl-none"
            }`}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>

        {/* Display citations if available */}
        {!isUser && citations && citations.length > 0 && (
          <div className="w-full">
            <CitationsList citations={citations} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-primary/20 shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};
