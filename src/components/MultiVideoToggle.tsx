import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Video, Library } from "lucide-react";

interface MultiVideoToggleProps {
    isMultiVideoMode: boolean;
    onToggle: (enabled: boolean) => void;
    videoCount: number;
}

export const MultiVideoToggle = ({
    isMultiVideoMode,
    onToggle,
    videoCount
}: MultiVideoToggleProps) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50">
            <div className="flex items-center gap-3">
                {isMultiVideoMode ? (
                    <Library className="w-5 h-5 text-primary" />
                ) : (
                    <Video className="w-5 h-5 text-muted-foreground" />
                )}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="multi-video-mode" className="text-sm font-semibold cursor-pointer">
                        {isMultiVideoMode ? "Search All Videos" : "Search This Video"}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        {isMultiVideoMode
                            ? `Querying across ${videoCount} video${videoCount !== 1 ? 's' : ''}`
                            : "Querying current video only"
                        }
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {videoCount > 1 && (
                    <Badge variant="secondary" className="shrink-0">
                        {videoCount}
                    </Badge>
                )}
                <Switch
                    id="multi-video-mode"
                    checked={isMultiVideoMode}
                    onCheckedChange={onToggle}
                    disabled={videoCount <= 1}
                />
            </div>
        </div>
    );
};
