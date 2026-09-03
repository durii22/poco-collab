import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Upload, Wand2, MessagesSquare } from "lucide-react";
import { Header, Footer } from "@/components/poco/Header";
import { useLang, useT } from "@/lib/i18n";
import { album, artworks, exhibition, musician, visualArtist } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "POCO — open your work as an online exhibition or digital album" },
      {
        name: "description",
        content:
          "Upload photos, artwork, music or creative projects. POCO curates them into an online exhibition or digital album you can share with one link.",
      },
      { property: "og:title", content: "POCO — open your work as an online experience" },
      {
        property: "og:description",
        content: "Create, exhibit, share, engage, collaborate. POCO curates independent artists' work in about five minutes.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const t = useT();
  const { lang } = useLang();

  const steps = [
    { n: "01", icon: Upload, title: t("s1t"), body: t("s1b") },
    { n: "02", icon: Wand2, title: t("s2t"), body: t("s2b") },
    { n: "03", icon: MessagesSquare, title: t("s3t"), body: t("s3b") },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pt-20">
          <h1 className="text-[30px] font-black leading-[1.2] tracking-tight sm:text-5xl">
            {t("heroLine")}
            <br className="hidden sm:block" />{" "}
            <span className="text-primary">{t("heroAccent")}</span>.
          </h1>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/start"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition hover:brightness-110 glow-primary sm:w-auto"
            >
              {t("ctaCurate")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/visitor"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-elev-2 px-6 text-[15px] font-semibold text-ink-strong transition hover:brightness-125 sm:w-auto"
            >
              {t("ctaVisitor")}
            </Link>
          </div>
        </section>

        {/* Featured reveal — exhibition + album */}
        <section className="border-y border-border bg-elev-1/40 py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Link to="/exhibition" className="group block space-y-3">
                <div className="overflow-hidden rounded-2xl border border-stroke-panel">
                  <img
                    src={exhibition.cover}
                    alt={exhibition.title}
                    width={1024}
                    height={1280}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow">Online exhibition</p>
                <h3 className="text-lg font-bold">{lang === "ko" ? exhibition.titleKo : exhibition.title}</h3>
                <p className="text-[13px] text-ink-muted">{lang === "ko" ? visualArtist.nameKo : visualArtist.name}</p>
              </Link>
              <Link to="/album" className="group block space-y-3">
                <div className="overflow-hidden rounded-2xl border border-stroke-panel">
                  <img
                    src={album.cover}
                    alt={album.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow">Digital album</p>
                <h3 className="text-lg font-bold">{lang === "ko" ? album.titleKo : album.title}</h3>
                <p className="text-[13px] text-ink-muted">{lang === "ko" ? musician.nameKo : musician.name}</p>
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {artworks.map((w) => (
                <img key={w.id} src={w.src} alt={w.title} loading="lazy" width={1024} height={1280} className="aspect-square w-full rounded-lg object-cover opacity-70" />
              ))}
            </div>
            <Link to="/collaboration" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline">
              {t("visCollab")}: Quiet Hours × Room Tone <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Three explanation sections */}
        <section className="mx-auto max-w-3xl space-y-4 px-4 py-16 sm:px-6">
          {steps.map((s) => (
            <div key={s.n} className="panel p-6">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-primary">{s.n}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <s.icon className="h-4 w-4" />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-4 pb-8 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("finalT")}</h2>
          <p className="mt-3 text-sm text-ink-muted">{t("finalB")}</p>
          <Link
            to="/start"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition hover:brightness-110 glow-primary"
          >
            {t("getStarted")} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
