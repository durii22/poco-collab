import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, FilePlus2, FileClock, Send, Globe } from "lucide-react";
import { AdminShell } from "@/components/poco/AdminShell";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { samplePilots } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Pilot Admin — POCO concierge collaborations" },
      { name: "description", content: "POCO Pilot Admin prototype: pair a visual artist with a musician, build the outputs, collect approvals and publish." },
      { property: "og:title", content: "Pilot Admin — POCO concierge collaborations" },
      { property: "og:description", content: "Create and manage POCO-managed collaboration pilots." },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const t = useT();
  const navigate = useNavigate();
  const { state } = usePoco();
  const p = state.pilot;

  const buckets = [
    { key: "draft", icon: FileClock, title: t("paDrafts") },
    { key: "waiting", icon: Send, title: t("paWaiting") },
    { key: "published", icon: Globe, title: t("paPublished") },
  ] as const;

  const currentState =
    p.published ? "published" : p.approvals.visual !== "none" || p.approvals.musician !== "none" ? "waiting" : p.visualId ? "draft" : null;

  return (
    <AdminShell>
      <SectionTitle eyebrow="Concierge pilot" title={t("paDash")} sub={t("paDashB")} />

      <button
        onClick={() => navigate({ to: "/admin/new/artists" })}
        className="panel mt-6 flex w-full items-center gap-4 p-5 text-left transition hover:bg-elev-2"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <FilePlus2 className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold">{t("paNew")}</span>
          <span className="block text-[12px] text-ink-muted">Select one visual artist and one musician, then build all three outputs.</span>
        </span>
        <ArrowRight className="h-4 w-4 text-ink-muted" />
      </button>

      <div className="mt-8 space-y-6">
        {buckets.map((b) => {
          const items = samplePilots.filter((s) => s.state === b.key);
          return (
            <section key={b.key} className="space-y-3">
              <p className="eyebrow flex items-center gap-2">
                <b.icon className="h-3.5 w-3.5" /> {b.title}
              </p>
              {currentState === b.key ? (
                <Link to="/admin/new/artists" className="panel block p-4 transition hover:bg-elev-2">
                  <p className="text-sm font-bold">{p.config.collabTitle || "Untitled pilot (yours)"}</p>
                  <p className="text-[12px] text-ink-muted">In progress in this prototype session</p>
                </Link>
              ) : null}
              {items.map((s) => (
                <div key={s.id} className="panel flex items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{s.title}</p>
                    <p className="truncate text-[12px] text-ink-muted">{s.pair}</p>
                    <p className="text-[11px] text-ink-muted/70">{s.note}</p>
                  </div>
                  {s.state === "published" ? (
                    <Link to="/collaboration" className="shrink-0 rounded-full bg-elev-2 px-3.5 py-1.5 text-[12px] font-semibold transition hover:brightness-125">
                      Open
                    </Link>
                  ) : (
                    <Link to="/admin/new/artists" className="shrink-0 rounded-full bg-elev-2 px-3.5 py-1.5 text-[12px] font-semibold transition hover:brightness-125">
                      Continue
                    </Link>
                  )}
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </AdminShell>
  );
}
