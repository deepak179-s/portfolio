"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false); // Track intended state for visibility changes

  // Sync ref with state
  useEffect(() => {
    wasPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // Check if Audio is available (browser environment)
    if (typeof window === "undefined" || typeof Audio === "undefined") return;

    // Initialize audio only once
    if (!audioRef.current) {
      const audio = new Audio("/sunflower.mp3");
      audio.volume = 0.15; // Logarithmic perception makes 15-20% sound like 50%
      audio.loop = true;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    // Try autoplay on mount
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay prevented by browser. 
        // We will just stay paused until the user explicitly clicks the play button.
        setIsPlaying(false);
      }
    };

    playAudio();

    // Handle tab switching / minimizing
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        audioRef.current.pause();
      } else if (wasPlayingRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Cleanup
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-lg hover:border-accent hover:shadow-[0_0_15px_rgba(var(--accent-color),0.2)] transition-all duration-300 group cursor-pointer"
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75 animate-ping"></span>
            <Volume2 className="w-5 h-5 text-accent relative z-10" />
          </>
        ) : (
          <VolumeX className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors relative z-10" />
        )}
      </div>
    </button>
  );
}
