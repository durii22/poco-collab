import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Lock } from "lucide-react";
import { AdminShell } from "@/components/poco/AdminShell";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { directory } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/admin/new/publish")({
  head: () => ({
    meta: [
      { title: "Publish the collaboration — POCO Pilot Admin" },
      { name: "description", content: "Publish becomes available once both the visual artist and the musician have approved." },
      { property: "og:title", content: "Publish the collaboration — POCO Pilot Admin" },
      { property: "og:description", content: "Final publication step of a POCO-managed collaboration pilot." },
    ],
  }),
  component: Publish,
});

function Publish() {
  const t = useT();
  const navigate = useNavigate();
  const { state, setPilot } = usePoco();
  const p = state.pilot;
  const ready = p.approvals.visual === "approved" && p.approvals.musician === "approved";
  const visual = directory.find((a) => a.id === p.visualId);
  const musician = directory.find((a) => a.id === p.musicianId);

  return (
    <AdminShell current={5}>
      <SectionTitle eyebrow="Step 06" title={t("paStep6")} sub={`${visual?.name ?? "Visual artist"} × ${musician?.name ?? "Musician"}`} />

      <div className="panel mt-6 space-y-2 p-5 text-[13px]">
        <p className="flex items-center gap-2">
          <CheckCircle2 className={p.approvals.visual === "approved" ? "h-4 w-4 text-primary" : "h-4 w-4 text-ink-muted/40"} />
          Visual artist approval
        </p>
        <p className="flex items-center gap-2">
          <CheckCircle2 className={p.approvals.musician === "approved" ? "h-4 w-4 text-primary" : "h-4 w-4 text-ink-muted/40"} />
          Musician approval
        </p>
      </div>

      {p.published ? (
        <div className="panel mt-6 p-5">
          <p className="text-base font-bold">{p.config.collabTitle || "Collaboration"} is live (prototype)</p>
          <div className="mt-4 grid gap-2">
            <Link to="/exhibition" className="rounded-xl bg-elev-2 px-4 py-3 text-[13px] font-semibold transition hover:brightness-125">
              Visual exhibition →
            </Link>
            <Link to="/album" className="rounded-xl bg-elev-2 px-4 py-3 text-[13px] font-semibold transition hover:brightness-125">
              Digital album →
            </Link>
            <Link to="/collaboration" className="rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground transition hover:brightness-110">
              Shared collaboration page →
            </Link>
          </div>
        </div>
      ) : (
        <button
          disabled={!ready}
          onClick={() => {
            setPilot({ published: true });
            navigate({ to: "/collaboration" });
          }}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
        >
          {!ready ? <Lock className="h-4 w-4" /> : null}
          {t("paPublishCta")}
        </button>
      )}
      {!ready && !p.published ? (
        <p className="mt-3 text-center text-[12px] text-ink-muted">Both artists must show “Approved” before publishing.</p>
      ) : null}
    </AdminShell>
  );
}
