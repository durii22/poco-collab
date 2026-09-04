import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Image as ImageIcon, Disc3, ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/poco/Header";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a project — POCO" },
      { name: "description", content: "Choose whether to create an online exhibition or a digital album for this project." },
      { property: "og:title", content: "Start a project — POCO" },
      { property: "og:description", content: "Online exhibition or digital album — this choice applies to this project only." },
    ],
  }),
  component: Start,
});

function Start() {
  const t = useT();
  const navigate = useNavigate();
  const { resetProject } = usePoco();

  const cards = [
    {
      key: "exhibition" as const,
      icon: ImageIcon,
      title: t("ptExT"),
      body: t("ptExB"),
      cta: t("ptExCta"),
      to: "/create/exhibition/about",
    },
    {
      key: "album" as const,
      icon: Disc3,
      title: t("ptAlT"),
      body: t("ptAlB"),
      cta: t("ptAlCta"),
      to: "/create/album/about",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header back />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionTitle eyebrow="New project" title={t("ptTitle")} sub={t("ptSub")} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                set({ projectType: c.key });
                navigate({ to: c.to });
              }}
              className="panel group flex flex-col items-start gap-4 p-6 text-left transition hover:border-primary/50 hover:bg-elev-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold">{c.title}</h2>
              <p className="text-sm leading-relaxed text-ink-muted">{c.body}</p>
              <span className="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition group-hover:brightness-110">
                {c.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
