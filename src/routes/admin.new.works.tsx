import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Star, Video } from "lucide-react";
import { AdminShell, AdminFooterNav } from "@/components/poco/AdminShell";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { artworks, directory, fmt, tracks } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/new/works")({
  head: () => ({
    meta: [
      { title: "Select creative works — POCO Pilot Admin" },
      { name: "description", content: "Choose the cover artwork, exhibition works, album tracks, featured track and optional performance video." },
      { property: "og:title", content: "Select creative works — POCO Pilot Admin" },
      { property: "og:description", content: "Placeholder work selection for a POCO collaboration pilot." },
    ],
  }),
  component: Works,
});

function Works() {
  const t = useT();
  const navigate = useNavigate();
  const { state, setPilot } = usePoco();
  const p = state.pilot;
  const visual = directory.find((a) => a.id === p.visualId);
  const musician = directory.find((a) => a.id === p.musicianId);

  const toggleArt = (id: string) =>
    setPilot({
      exhibitionArtworkIds: p.exhibitionArtworkIds.includes(id)
        ? p.exhibitionArtworkIds.filter((x) => x !== id)
        : [...p.exhibitionArtworkIds, id],
    });

  const toggleTrack = (id: string) =>
    setPilot({ trackIds: p.trackIds.includes(id) ? p.trackIds.filter((x) => x !== id) : [...p.trackIds, id] });

  return (
    <AdminShell current={1}>
      <SectionTitle
        eyebrow="Step 02"
        title={t("paStep2")}
        sub={`Placeholder files only — no uploads or storage. ${visual?.name ?? "Visual artist"} × ${musician?.name ?? "Musician"}`}
      />

      <section className="mt-8 space-y-3">
        <p className="eyebrow">Main cover artwork</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {artworks.map((w) => (
            <button
              key={w.id}
              onClick={() => setPilot({ coverArtworkId: w.id })}
              className={cn(
                "relative overflow-hidden rounded-xl border transition",
                p.coverArtworkId === w.id ? "border-primary ring-1 ring-primary/40" : "border-stroke-panel hover:brightness-110",
              )}
            >
              <img src={w.src} alt={w.title} loading="lazy" width={400} height={500} className="aspect-[4/5] w-full object-cover" />
              {p.coverArtworkId === w.id ? (
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Star className="h-3.5 w-3.5 fill-current" />
                </span>
              ) : null}
              <span className="block truncate px-2 py-1.5 text-left text-[11px] font-semibold">{w.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <p className="eyebrow">Additional exhibition artwork</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {artworks.map((w) => (
            <button
              key={w.id}
              onClick={() => toggleArt(w.id)}
              className={cn(
                "panel flex items-center gap-3 p-3 text-left transition",
                p.exhibitionArtworkIds.includes(w.id) ? "border-primary/70 ring-1 ring-primary/30" : "hover:bg-elev-2",
              )}
            >
              <img src={w.src} alt={w.title} loading="lazy" width={100} height={100} className="h-11 w-11 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">{w.title}</span>
                <span className="block text-[11px] text-ink-muted">{w.year} · {w.medium}</span>
              </span>
              {p.exhibitionArtworkIds.includes(w.id) ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <p className="eyebrow">Tracks</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {tracks.map((tr) => (
            <div
              key={tr.id}
              className={cn(
                "panel flex items-center gap-3 p-3",
                p.trackIds.includes(tr.id) && "border-primary/70 ring-1 ring-primary/30",
              )}
            >
              <button onClick={() => toggleTrack(tr.id)} className="min-w-0 flex-1 text-left">
                <span className="block truncate text-[13px] font-semibold">{tr.title}</span>
                <span className="block text-[11px] text-ink-muted">{tr.performer} · {fmt(tr.duration)}</span>
              </button>
              <button
                onClick={() => setPilot({ featuredTrackId: tr.id, trackIds: p.trackIds.includes(tr.id) ? p.trackIds : [...p.trackIds, tr.id] })}
                aria-label="Set as featured track"
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition",
                  p.featuredTrackId === tr.id ? "bg-primary text-primary-foreground" : "bg-elev-2 text-ink-muted hover:text-foreground",
                )}
              >
                <Star className={cn("h-3.5 w-3.5", p.featuredTrackId === tr.id && "fill-current")} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-ink-muted/70">Tap a track to include it; tap the star to set the featured track.</p>
      </section>

      <section className="mt-10">
        <button
          onClick={() => setPilot({ performanceVideo: !p.performanceVideo })}
          className={cn("panel flex w-full items-center gap-3 p-4 text-left transition", p.performanceVideo && "border-primary/70 ring-1 ring-primary/30")}
        >
          <Video className={cn("h-5 w-5", p.performanceVideo ? "text-primary" : "text-ink-muted")} />
          <span className="flex-1 text-sm font-semibold">Include performance video (optional)</span>
          {p.performanceVideo ? <Check className="h-4 w-4 text-primary" /> : null}
        </button>
      </section>

      <AdminFooterNav
        nextLabel={t("next")}
        disabled={!p.coverArtworkId || p.trackIds.length === 0 || !p.featuredTrackId}
        onNext={() => navigate({ to: "/admin/new/configure" })}
      />
    </AdminShell>
  );
}
