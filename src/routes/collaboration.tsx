import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Header, Footer } from "@/components/poco/Header";
import { Comments, EngagementBar, FollowButton, InquiryModal } from "@/components/poco/Engagement";
import { PlayerBar, useMockPlayer } from "@/components/poco/AudioPlayer";
import { Button, SectionTitle } from "@/components/poco/ui";
import { useLang, useT } from "@/lib/i18n";
import { album, artworks, collaboration, exhibition, musician, tracks, visualArtist } from "@/lib/mock-data";

export const Route = createFileRoute("/collaboration")({
  head: () => ({
    meta: [
      { title: "Quiet Hours × Room Tone — a POCO collaboration" },
      {
        name: "description",
        content:
          "One page for the collaboration between photographer Seoyeon Han and cellist Doyun Park: exhibition, digital album, credits and fan engagement.",
      },
      { property: "og:title", content: "Quiet Hours × Room Tone — a POCO collaboration" },
      { property: "og:description", content: "The shared destination for a visual artist and a musician working in the same room." },
    ],
  }),
  component: Collab,
});

function Collab() {
  const t = useT();
  const { lang } = useLang();
  const player = useMockPlayer(tracks);
  const [modal, setModal] = useState<null | "collab" | "join">(null);

  const artistCard = (a: typeof visualArtist, role: string, to: string, who: string) => (
    <div className="panel space-y-3 p-5">
      <div className="flex items-center gap-4">
        <img src={a.avatar} alt={a.name} loading="lazy" width={768} height={768} className="h-14 w-14 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">{role}</p>
          <p className="text-sm font-bold">{lang === "ko" ? a.nameKo : a.name}</p>
          <p className="text-[12px] text-ink-muted">{a.role} · {a.base}</p>
        </div>
        <FollowButton who={who} />
      </div>
      <p className="text-[13px] leading-relaxed text-ink-muted">{lang === "ko" ? a.bioKo : a.bio}</p>
      <Link to={to} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline">
        {to === "/exhibition" ? t("viewExhibition") : t("viewAlbum")} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative">
          <img src={collaboration.hero} alt={collaboration.title} width={1600} height={1000} className="h-[52vh] min-h-[320px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="mx-auto -mt-24 max-w-3xl px-4 sm:px-6">
            <p className="eyebrow">POCO collaboration · 2026</p>
            <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">{collaboration.title}</h1>
            <p className="mt-3 text-sm text-ink-muted">
              {visualArtist.name} × {musician.name}
            </p>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
          <p className="text-[15px] leading-relaxed text-ink-muted">
            {lang === "ko" ? collaboration.storyKo : collaboration.story}
          </p>
        </section>

        <section className="mx-auto mt-8 grid max-w-3xl gap-4 px-4 sm:grid-cols-2 sm:px-6">
          {artistCard(visualArtist, "Visual artist", "/exhibition", "visual")}
          {artistCard(musician, "Musician", "/album", "musician")}
        </section>

        <section className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 px-4 sm:flex-row sm:px-6">
          <Link
            to="/exhibition"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110 glow-primary"
          >
            {t("viewExhibition")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/album"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-stroke-panel px-6 text-sm font-semibold transition hover:bg-elev-2"
          >
            <Play className="h-4 w-4 fill-current" /> {t("viewAlbum")}
          </Link>
        </section>

        {/* Previews */}
        <section className="mx-auto mt-12 max-w-3xl space-y-5 px-4 sm:px-6">
          <p className="eyebrow">Artwork preview</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {artworks.map((w) => (
              <img key={w.id} src={w.src} alt={w.title} loading="lazy" width={1024} height={1280} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
          <p className="eyebrow pt-4">Music preview</p>
          <PlayerBar player={player} subtitle={`${album.title} · ${musician.name}`} />
        </section>

        <section className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
          <div className="panel space-y-1.5 p-5 text-sm text-ink-muted">
            <p className="eyebrow mb-2">{t("credits")}</p>
            <p>Exhibition — “{exhibition.title}”, {visualArtist.name}</p>
            <p>Digital album — “{album.title}”, {musician.name}</p>
            {album.credits.map((c) => (
              <p key={c}>{c}</p>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-3xl space-y-8 px-4 sm:px-6">
          <EngagementBar pageKey="collaboration" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setModal("collab")}>{t("inqCollab")}</Button>
          </div>
          <Comments pageKey="collaboration" />
        </section>

        <section className="mx-auto mt-16 max-w-3xl px-4 text-center sm:px-6">
          <SectionTitle title={t("joinPilot")} sub="Two artists, one room, one link. POCO opens a new pilot pairing every month." />
          <Button className="mt-6" size="lg" onClick={() => setModal("join")}>
            {t("joinPilot")}
          </Button>
        </section>

        <InquiryModal
          open={modal !== null}
          onClose={() => setModal(null)}
          title={modal === "join" ? t("joinPilot") : t("inqCollab")}
        />
      </main>
      <Footer />
    </div>
  );
}
