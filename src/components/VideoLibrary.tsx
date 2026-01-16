import { VideoMetadata } from "@/lib/types";
import { getYouTubeThumbnail } from "@/lib/timestamp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Play, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface VideoLibraryProps {
    videos: VideoMetadata[];
    currentVideoId: string | null;
    onSelectVideo: (videoId: string) => void;
    onDeleteVideo?: (videoId: string) => void;
}

export const VideoLibrary = ({
    videos,
    currentVideoId,
    onSelectVideo,
    onDeleteVideo
}: VideoLibraryProps) => {
    if (videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Play className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">No Videos Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Upload your first video to start building your knowledge base
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {videos.map((video) => {
                const isActive = video.video_id === currentVideoId;
                const thumbnail = getYouTubeThumbnail(video.video_id, 'medium');
                const processedTime = video.processed_at
                    ? formatDistanceToNow(new Date(video.processed_at), { addSuffix: true })
                    : 'Recently';

                return (
                    <Card
                        key={video.video_id}
                        className={`overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''
                            }`}
                        onClick={() => onSelectVideo(video.video_id)}
                    >
                        <div className="flex gap-3 p-3">
                            {/* Thumbnail */}
                            <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                                <img
                                    src={thumbnail}
                                    alt={video.title || 'Video thumbnail'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="90"%3E%3Crect fill="%23374151" width="120" height="90"/%3E%3C/svg%3E';
                                    }}
                                />
                                {isActive && (
                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                        <Badge className="bg-primary text-primary-foreground">Active</Badge>
                                    </div>
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold line-clamp-2 leading-tight">
                                        {video.title || `Video ${video.video_id}`}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Calendar className="w-3 h-3" />
                                        <span>{processedTime}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                {onDeleteVideo && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteVideo(video.video_id);
                                            }}
                                        >
                                            <Trash2 className="w-3 h-3 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};
