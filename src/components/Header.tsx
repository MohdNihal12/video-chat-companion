import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg">
            <span className="gradient-text">EXPLAINIFY</span>{" "}
            <span className="text-muted-foreground">AI</span>
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
