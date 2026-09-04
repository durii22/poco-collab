import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Video, ArrowRight, Image as ImageIcon } from "lucide-react";
import { album, artworks, fmt, musician, tracks, visualArtist } from "@/lib/mock-data";
import { useProjectMode } from "@/lib/project-mode";
import { useLang, useT } from "@/lib/i18n";
import { PlayerBar, useMockPlayer } from "./AudioPlayer";
import { Comments, EngagementBar, FollowButton, InquiryModal } from "./Engagement";
import { CollaboratorSlot } from "./ProjectSummary";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

export function AlbumView({
  preview = false,
  warm = false,
  minimal = false,
  reordered = false,
}: {
  preview?: boolean;
  warm?: boolean;
  minimal?: boolean;
  reordered?: boolean;
}) {
  const t = useT();
  const { lang } = useLang();
  const player = useMockPlayer(tracks);
  const [inquiry, setInquiry] = useState<null | "collab" | "perf">(null);
  const list = reordered ? [...tracks].reverse() : tracks;
  const p = useProjectMode();

  // A visual collaborator only exists in a real collaboration (or the visitor sample).
  const visual = p.isDemo
    ? { name: visualArtist.name, nameKo: visualArtist.nameKo, avatar: visualArtist.avatar }
    : p.isCollaboration && p.partner
      ? { name: p.partner.name, nameKo: p.partner.nameKo, avatar: p.partner.avatar }
      : null;
  const showArtworks = visual !== null;

  return (
    <div className={cn(warm && "[--primary:#ff9d5c]")}>
      <section className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <img
          src={album.cover}
          alt={album.title}
          width={1024}
          height={1024}
          className={cn("w-full rounded-2xl object-cover shadow-2xl", minimal && "rounded-none shadow-none")}
        />
        <p className="eyebrow mt-6">
          {album.releaseType} · {album.genre} · {album.mood}
        </p>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">{lang === "ko" ? album.titleKo : album.title}</h1>
        <p className="mt-1 text-base font-semibold text-ink-strong">{lang === "ko" ? musician.nameKo : musician.name}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{lang === "ko" ? album.introKo : album.intro}</p>
      </section>

      <section className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <div className="panel flex items-center gap-4 p-4">
          <img src={musician.avatar} alt={musician.name} loading="lazy" width={768} height={768} className="h-14 w-14 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{lang === "ko" ? musician.nameKo : musician.name}</p>
            <p className="text-[12px] text-ink-muted">{musician.role} · {musician.base}</p>
          </div>
          {!preview && <FollowButton who="musician" />}
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <PlayerBar player={player} subtitle={`${album.title} · ${musician.name}`} />
        <p className="mt-2 text-[11px] text-ink-muted">Press play to start — nothing plays automatically.</p>
      </section>

      {/* Visual artist credit — collaboration only */}
      {visual ? (
        <section className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
          <div className="panel flex items-center gap-4 p-4">
            <img src={visual.avatar} alt={visual.name} loading="lazy" width={200} height={200} className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="eyebrow">Visual artwork</p>
              <p className="text-sm font-bold">{lang === "ko" ? visual.nameKo : visual.name}</p>
              <p className="text-[11px] text-ink-muted">Cover and track visuals · © {visual.name}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Solo / decide-later: no visual artist, optional add-later CTA */}
      <CollaboratorSlot kind="visual" />

      {/* Track list with stories and artworks between tracks */}
      <section className="mx-auto mt-12 max-w-3xl space-y-10 px-4 sm:px-6">
        <h2 className="eyebrow">{t("trackList")}</h2>
        {list.map((tr, i) => (
          <div key={tr.id} className="space-y-6">
            <article className="panel p-5">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => player.play(tracks.findIndex((x) => x.id === tr.id))}
                  aria-label={`Play ${tr.title}`}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stroke-panel text-primary transition hover:bg-primary hover:text-primary-foreground",
                    player.track?.id === tr.id && "border-primary bg-primary/15",
                  )}
                >
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-bold">
                      <span className="mr-2 text-ink-muted">{String(tr.no).padStart(2, "0")}</span>
                      {tr.title}
                    </h3>
                    <span className="text-[11px] tabular-nums text-ink-muted">{fmt(tr.duration)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tr.story}</p>
                  <dl className="mt-3 grid gap-x-6 gap-y-1 text-[11px] text-ink-muted sm:grid-cols-2">
                    <div><dt className="inline font-semibold text-ink-strong">Composer </dt><dd className="inline">{tr.composer}</dd></div>
                    <div><dt className="inline font-semibold text-ink-strong">Lyricist </dt><dd className="inline">{tr.lyricist}</dd></div>
                    <div><dt className="inline font-semibold text-ink-strong">Performer </dt><dd className="inline">{tr.performer}</dd></div>
                    <div><dt className="inline font-semibold text-ink-strong">Artwork </dt><dd className="inline">{tr.artCredit}</dd></div>
                  </dl>
                  {tr.video ? (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-stroke-panel bg-surface-note p-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-elev-2 text-primary">
                        <Video className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold">{t("perfVideo")}</p>
                        <p className="text-[11px] text-ink-muted">{tr.video} · mock embed</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>

            {showArtworks && artworks[i] ? (
              <figure className="space-y-2">
                <img src={artworks[i].src} alt={artworks[i].title} loading="lazy" width={1024} height={1280} className={cn("w-full object-cover", minimal ? "rounded-none" : "rounded-2xl")} />
                <figcaption className="flex items-center gap-2 text-[11px] text-ink-muted">
                  <ImageIcon className="h-3.5 w-3.5" />
                  {artworks[i].title}, {artworks[i].year} — {artworks[i].credit}
                </figcaption>
              </figure>
            ) : null}
          </div>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-3xl px-4 sm:px-6">
        <div className="panel space-y-1.5 p-5 text-sm text-ink-muted">
          <p className="eyebrow mb-2">{t("credits")}</p>
          {album.credits
            .filter((c) => visual || !c.includes(visualArtist.name))
            .map((c) => (
              <p key={c}>{c}</p>
            ))}
        </div>
        {visual ? (
          <Link to="/exhibition" className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline">
            {t("viewExhibition")}: {visual.name} — Quiet Hours <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </section>

      {!preview && (
        <section className="mx-auto mt-10 max-w-3xl space-y-8 px-4 pb-4 sm:px-6">
          <EngagementBar pageKey="album" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setInquiry("perf")}>{t("inqPerf")}</Button>
            <Button variant="outline" onClick={() => setInquiry("collab")}>{t("inqCollab")}</Button>
            {p.isDemo || p.isCollaboration ? (
              <Link to="/collaboration" className="inline-flex h-11 items-center rounded-full border border-stroke-panel px-5 text-sm font-semibold transition hover:bg-elev-2">
                {t("viewCollab")}
              </Link>
            ) : null}
          </div>
          <Comments pageKey="album" />
          <InquiryModal
            open={inquiry !== null}
            onClose={() => setInquiry(null)}
            title={inquiry === "perf" ? t("inqPerf") : t("inqCollab")}
          />
        </section>
      )}
    </div>
  );
}
