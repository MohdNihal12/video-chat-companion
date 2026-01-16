import { Citation } from "@/lib/types";
import { createTimestampUrl } from "@/lib/timestamp";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Video, Clock } from "lucide-react";
import { useState } from "react";

interface CitationCardProps {
    citation: Citation;
    index: number;
}

export const CitationCard = ({ citation, index }: CitationCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleJumpToVideo = () => {
        const url = createTimestampUrl(citation.video_id, citation.timestamp_range.start);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Calculate relevance percentage and color
    const relevancePercent = Math.round(citation.relevance_score * 100);
    const getRelevanceColor = (score: number) => {
        if (score >= 0.8) return "text-emerald-500";
        if (score >= 0.6) return "text-blue-500";
        if (score >= 0.4) return "text-yellow-500";
        return "text-orange-500";
    };

    const getRelevanceBgColor = (score: number) => {
        if (score >= 0.8) return "bg-emerald-500/10 border-emerald-500/20";
        if (score >= 0.6) return "bg-blue-500/10 border-blue-500/20";
        if (score >= 0.4) return "bg-yellow-500/10 border-yellow-500/20";
        return "bg-orange-500/10 border-orange-500/20";
    };

    const truncatedText = citation.text.length > 150
        ? citation.text.substring(0, 150) + "..."
        : citation.text;

    return (
        <Card className={`p-4 border transition-all duration-300 hover:shadow-md ${getRelevanceBgColor(citation.relevance_score)}`}>
            <div className="space-y-3">
                {/* Header with citation number and relevance */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Badge variant="outline" className="shrink-0">
                            #{index + 1}
                        </Badge>
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <Video className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium truncate" title={citation.video_title}>
                                {citation.video_title}
                            </span>
                        </div>
                    </div>
                    <Badge className={`shrink-0 ${getRelevanceColor(citation.relevance_score)}`} variant="secondary">
                        {relevancePercent}%
                    </Badge>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">{citation.timestamp_range.formatted}</span>
                </div>

                {/* Citation text */}
                <div className="text-sm text-foreground/80 leading-relaxed">
                    {isExpanded ? citation.text : truncatedText}
                    {citation.text.length > 150 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="ml-2 text-primary hover:underline text-xs font-medium"
                        >
                            {isExpanded ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>

                {/* Jump to video button */}
                <Button
                    onClick={handleJumpToVideo}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Jump to Video
                </Button>
            </div>
        </Card>
    );
};
