import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { fmt, type Track } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/**
 * Mock audio player — no real audio file. Progress is simulated with a timer
 * so the prototype behaves like a real player (play / pause / seek / prev / next).
 */
export function useMockPlayer(tracks: Track[]) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = tracks[index]?.duration ?? 1;

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (playing) {
      timer.current = setInterval(() => {
        setTime((tm) => {
          if (tm + 1 >= duration) {
            setIndex((i) => (i + 1) % tracks.length);
            return 0;
          }
          return tm + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, duration, tracks.length]);

  return {
    index,
    playing,
    time,
    duration,
    track: tracks[index],
    toggle: () => setPlaying((p) => !p),
    play: (i: number) => {
      setIndex(i);
      setTime(0);
      setPlaying(true);
    },
    prev: () => {
      setIndex((i) => (i - 1 + tracks.length) % tracks.length);
      setTime(0);
    },
    next: () => {
      setIndex((i) => (i + 1) % tracks.length);
      setTime(0);
    },
    seek: (v: number) => setTime(v),
  };
}

export type Player = ReturnType<typeof useMockPlayer>;

export function PlayerBar({ player, subtitle, className }: { player: Player; subtitle: string; className?: string }) {
  const pct = (player.time / player.duration) * 100;
  return (
    <div className={cn("panel flex items-center gap-4 p-4", className)}>
      <button
        onClick={player.toggle}
        aria-label={player.playing ? "Pause" : "Play"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110 glow-primary"
      >
        {player.playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{player.track?.title}</p>
        <p className="truncate text-[11px] text-ink-muted">{subtitle}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="w-8 text-[10px] tabular-nums text-ink-muted">{fmt(player.time)}</span>
          <input
            type="range"
            min={0}
            max={player.duration}
            value={player.time}
            onChange={(e) => player.seek(Number(e.target.value))}
            aria-label="Seek"
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-elev-2 accent-primary"
            style={{ background: `linear-gradient(to right, var(--primary) ${pct}%, var(--elev-2) ${pct}%)` }}
          />
          <span className="w-8 text-[10px] tabular-nums text-ink-muted">{fmt(player.duration)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button onClick={player.prev} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-elev-2 hover:text-foreground">
          <SkipBack className="h-4 w-4 fill-current" />
        </button>
        <button onClick={player.next} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-elev-2 hover:text-foreground">
          <SkipForward className="h-4 w-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
