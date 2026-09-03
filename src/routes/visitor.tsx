import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/poco/Header";
import { SectionTitle } from "@/components/poco/ui";
import { useLang, useT } from "@/lib/i18n";
import { album, artworks, collaboration, exhibition, musician, visualArtist } from "@/lib/mock-data";

export const Route = createFileRoute("/visitor")({
  head: () => ({
    meta: [
      { title: "Now open — visit POCO exhibitions and albums" },
      { name: "description", content: "Walk into POCO online exhibitions, digital albums and artist collaborations as a visitor." },
      { property: "og:title", content: "Now open — visit POCO exhibitions and albums" },
      { property: "og:description", content: "Browse currently open exhibitions, albums and collaborations on POCO." },
    ],
  }),
  component: Visitor,
});

function Visitor() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="min-h-screen">
      <Header back />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <SectionTitle eyebrow="Visitor entrance" title={t("visT")} sub={t("visB")} />

        <Link to="/collaboration" className="group mt-8 block overflow-hidden rounded-2xl border border-stroke-panel">
          <img src={collaboration.hero} alt={collaboration.title} width={1600} height={1000} className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-72" />
          <div className="space-y-1.5 p-5">
            <p className="eyebrow">{t("visCollab")}</p>
            <h2 className="text-xl font-bold">{collaboration.title}</h2>
            <p className="text-[13px] text-ink-muted">
              {visualArtist.name} × {musician.name}
            </p>
            <span className="inline-flex items-center gap-1.5 pt-1 text-[13px] font-semibold text-primary">
              {t("viewCollab")} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Link to="/exhibition" className="group block space-y-3">
            <img src={exhibition.cover} alt={exhibition.title} loading="lazy" width={1024} height={1280} className="aspect-[4/3] w-full rounded-2xl border border-stroke-panel object-cover transition duration-700 group-hover:scale-[1.02]" />
            <p className="eyebrow">Online exhibition</p>
            <h3 className="text-lg font-bold">{lang === "ko" ? exhibition.titleKo : exhibition.title}</h3>
            <p className="text-[13px] text-ink-muted">{lang === "ko" ? visualArtist.nameKo : visualArtist.name}</p>
          </Link>
          <Link to="/album" className="group block space-y-3">
            <img src={album.cover} alt={album.title} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-2xl border border-stroke-panel object-cover transition duration-700 group-hover:scale-[1.02]" />
            <p className="eyebrow">Digital album</p>
            <h3 className="text-lg font-bold">{lang === "ko" ? album.titleKo : album.title}</h3>
            <p className="text-[13px] text-ink-muted">{lang === "ko" ? musician.nameKo : musician.name}</p>
          </Link>
        </div>

        <div className="mt-10">
          <p className="eyebrow mb-3">Works on view</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {artworks.map((w) => (
              <Link key={w.id} to="/exhibition" className="block">
                <img src={w.src} alt={w.title} loading="lazy" width={1024} height={1280} className="aspect-square w-full rounded-xl object-cover transition hover:opacity-80" />
                <p className="mt-2 text-[11px] text-ink-muted">{w.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
