import { Citation } from "@/lib/types";
import { CitationCard } from "./CitationCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, BookOpen } from "lucide-react";
import { useState } from "react";

interface CitationsListProps {
    citations: Citation[];
    defaultExpanded?: boolean;
}

export const CitationsList = ({ citations, defaultExpanded = true }: CitationsListProps) => {
    const [isOpen, setIsOpen] = useState(defaultExpanded);

    if (!citations || citations.length === 0) {
        return null;
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card/30 hover:bg-card/50 border border-border/50 transition-colors group">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">Sources & Citations</span>
                    <Badge variant="secondary" className="ml-1">
                        {citations.length}
                    </Badge>
                </div>
                <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-3">
                <div className="space-y-3">
                    {citations.map((citation, index) => (
                        <CitationCard key={`${citation.video_id}-${index}`} citation={citation} index={index} />
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};
