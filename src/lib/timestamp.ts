/**
 * Convert seconds to MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "02:14")
 */
export const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Create YouTube URL with timestamp parameter
 * @param videoId - YouTube video ID
 * @param startSeconds - Start time in seconds
 * @returns YouTube URL with timestamp (e.g., "https://youtube.com/watch?v=abc123&t=134s")
 */
export const createTimestampUrl = (videoId: string, startSeconds: number): string => {
    const seconds = Math.floor(startSeconds);
    return `https://youtube.com/watch?v=${videoId}&t=${seconds}s`;
};

/**
 * Format timestamp range for display
 * @param start - Start time in seconds
 * @param end - End time in seconds
 * @returns Formatted range string (e.g., "02:14 – 03:05")
 */
export const formatTimestampRange = (start: number, end: number): string => {
    return `${formatTimestamp(start)} – ${formatTimestamp(end)}`;
};

/**
 * Get YouTube thumbnail URL
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality ('default', 'medium', 'high', 'maxres')
 * @returns Thumbnail URL
 */
export const getYouTubeThumbnail = (
    videoId: string,
    quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'
): string => {
    const qualityMap = {
        default: 'default',
        medium: 'mqdefault',
        high: 'hqdefault',
        maxres: 'maxresdefault'
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};
