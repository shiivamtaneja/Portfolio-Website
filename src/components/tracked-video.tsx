"use client";

import { useRef } from "react";

import { analyticsEvents, captureEvent } from "@/lib/analytics";

const PROGRESS_MARKERS = [25, 50, 75, 100] as const;

export default function TrackedVideo({
  src,
  poster,
  autoPlay = false,
}: {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}) {
  const trackedMarkers = useRef(new Set<number>());

  return (
    <div className="relative z-[100] my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <video
        controls
        playsInline
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        poster={poster}
        className="w-full h-auto object-cover"
        onPlay={() => captureEvent(analyticsEvents.videoPlayed, { src })}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (!video.duration) return;

          const progress = Math.floor((video.currentTime / video.duration) * 100);
          const marker = PROGRESS_MARKERS.find(
            (value) => progress >= value && !trackedMarkers.current.has(value),
          );

          if (!marker) return;

          trackedMarkers.current.add(marker);
          captureEvent(analyticsEvents.videoProgress, {
            src,
            progress: marker,
          });
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
