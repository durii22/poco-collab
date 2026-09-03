import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminShell, AdminFooterNav } from "@/components/poco/AdminShell";
import { AlbumView } from "@/components/poco/AlbumView";
import { ExhibitionView } from "@/components/poco/ExhibitionView";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { collabHero, directory } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/new/previews")({
  head: () => ({
    meta: [
      { title: "Preview the three outputs — POCO Pilot Admin" },
      { name: "description", content: "Preview the visual artist's exhibition, the musician's digital album and the shared collaboration page." },
      { property: "og:title", content: "Preview the three outputs — POCO Pilot Admin" },
      { property: "og:description", content: "Three connected previews of a POCO collaboration pilot." },
    ],
  }),
  component: Previews,
});

function Previews() {
  const t = useT();
  const navigate = useNavigate();
  const { state } = usePoco();
  const p = state.pilot;
  const [tab, setTab] = useState<"ex" | "al" | "co">("ex");
  const visual = directory.find((a) => a.id === p.visualId);
  const musician = directory.find((a) => a.id === p.musicianId);

  const tabs = [
    { key: "ex", label: "Online exhibition" },
    { key: "al", label: "Digital album" },
    { key: "co", label: "Collaboration page" },
  ] as const;

  return (
    <AdminShell current={3}>
      <SectionTitle eyebrow="Step 04" title={t("paStep4")} sub="Music never autoplays — the visitor presses Play." />

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((x) => (
          <button
            key={x.key}
            onClick={() => setTab(x.key)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition",
              tab === x.key ? "bg-primary text-primary-foreground" : "bg-elev-2 text-ink-muted hover:text-foreground",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-stroke-panel bg-background">
        {tab === "ex" ? <ExhibitionView preview /> : null}
        {tab === "al" ? <AlbumView preview /> : null}
        {tab === "co" ? (
          <div className="p-4 sm:p-6">
            <img src={collabHero} alt="Collaboration" loading="lazy" width={1024} height={640} className="w-full rounded-xl object-cover" />
            <h2 className="mt-5 text-2xl font-black">{p.config.collabTitle || "Untitled collaboration"}</h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              {visual?.name ?? "Visual artist"} × {musician?.name ?? "Musician"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{p.config.story || "Collaboration story will appear here."}</p>
            <div className="panel mt-6 space-y-1 p-4 text-[12px] text-ink-muted">
              <p className="eyebrow mb-2">Credits</p>
              <p>{p.config.artistCredits || "—"}</p>
              <p>{p.config.artworkCredits || "—"}</p>
              <p>{p.config.musicCredits || "—"}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-semibold text-primary">
              <span className="rounded-full border border-stroke-panel px-3 py-1.5">{p.config.exhibitionTitle || "Exhibition"} →</span>
              <span className="rounded-full border border-stroke-panel px-3 py-1.5">{p.config.albumTitle || "Album"} →</span>
              <span className="rounded-full border border-stroke-panel px-3 py-1.5">{p.config.inquiryLink || "Inquiry link"}</span>
            </div>
          </div>
        ) : null}
      </div>

      <AdminFooterNav nextLabel={t("next")} onNext={() => navigate({ to: "/admin/new/approval" })} />
    </AdminShell>
  );
}
