import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Disc3, ArrowRight } from "lucide-react";
import { artworks, exhibition, musician, tracks, visualArtist } from "@/lib/mock-data";
import { useLang, useT } from "@/lib/i18n";
import { useMockPlayer, PlayerBar } from "./AudioPlayer";
import { Comments, EngagementBar, FollowButton, InquiryModal } from "./Engagement";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

export function ExhibitionView({
  preview = false,
  warm = false,
  minimal = false,
  reordered = false,
  emphasizeMusic = false,
}: {
  preview?: boolean;
  warm?: boolean;
  minimal?: boolean;
  reordered?: boolean;
  emphasizeMusic?: boolean;
}) {
  const t = useT();
  const { lang } = useLang();
  const player = useMockPlayer(tracks);
  const [inquiry, setInquiry] = useState(false);
  const works = reordered ? [...artworks].reverse() : artworks;

  return (
    <div className={cn(warm && "[--primary:#ff9d5c]")}>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden">
          <img src={exhibition.cover} alt={exhibition.title} className="h-full w-full object-cover" width={1024} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </div>
        <div className="mx-auto -mt-28 max-w-3xl px-4 sm:px-6">
          <p className="eyebrow">Online exhibition · {exhibition.year}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
            {lang === "ko" ? exhibition.titleKo : exhibition.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            {lang === "ko" ? exhibition.statementKo : exhibition.statement}
          </p>
        </div>
      </section>

      {/* Artist */}
      <section className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
        <div className="panel flex items-center gap-4 p-4">
          <img src={visualArtist.avatar} alt={visualArtist.name} className="h-14 w-14 rounded-full object-cover" width={768} height={768} loading="lazy" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{lang === "ko" ? visualArtist.nameKo : visualArtist.name}</p>
            <p className="text-[12px] text-ink-muted">{visualArtist.role} · {visualArtist.base}</p>
          </div>
          {!preview && <FollowButton who="visual" />}
        </div>
      </section>

      {/* Music player added to the exhibition */}
      <section className={cn("mx-auto mt-6 max-w-3xl px-4 sm:px-6", emphasizeMusic && "order-first")}>
        <p className="eyebrow mb-2">{t("nowPlaying")} · Sound for this exhibition</p>
        <PlayerBar player={player} subtitle={`${musician.name} — ${player.track?.performer}`} />
        <Link
          to="/album"
          className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
        >
          <Disc3 className="h-4 w-4" />
          {t("viewAlbum")}: Room Tone <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* Archive */}
      <section className="mx-auto mt-14 max-w-3xl space-y-16 px-4 sm:px-6">
        {works.map((w, i) => (
          <figure key={w.id} className="space-y-4">
            <div className={cn("overflow-hidden", minimal ? "rounded-none" : "rounded-2xl border border-stroke-panel p-2 sm:p-3")}>
              <img
                src={w.src}
                alt={w.title}
                loading="lazy"
                width={1024}
                height={1280}
                className={cn("w-full object-cover", minimal ? "" : "rounded-xl")}
              />
            </div>
            <figcaption className={cn("space-y-1.5", minimal && "text-center")}>
              <p className="eyebrow">Room {i + 1}</p>
              <h3 className="text-lg font-bold">{w.title}</h3>
              <p className="text-[12px] text-ink-muted">
                {w.year} · {w.medium}
              </p>
              <p className="pt-1 text-sm leading-relaxed text-ink-muted">{w.description}</p>
              <p className="text-[11px] text-ink-muted/70">© {w.credit}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* Credits */}
      <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
        <div className="panel space-y-2 p-5 text-sm text-ink-muted">
          <p className="eyebrow mb-2">{t("credits")}</p>
          <p>Works and photography — {visualArtist.name}</p>
          <p>Sound — {musician.name}, from the digital album “Room Tone”</p>
          <p>Curation, sequencing and lighting — POCO</p>
        </div>
      </section>

      {!preview && (
        <section className="mx-auto mt-10 max-w-3xl space-y-8 px-4 pb-4 sm:px-6">
          <EngagementBar pageKey="exhibition" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setInquiry(true)}>
              {t("inqCollab")}
            </Button>
            <Link
              to="/collaboration"
              className="inline-flex h-11 items-center rounded-full border border-stroke-panel px-5 text-sm font-semibold transition hover:bg-elev-2"
            >
              {t("viewCollab")}
            </Link>
          </div>
          <Comments pageKey="exhibition" />
          <InquiryModal open={inquiry} onClose={() => setInquiry(false)} title={t("inqCollab")} />
        </section>
      )}
    </div>
  );
}
