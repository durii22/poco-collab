import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { modeLabel, projectTypeLabel, useProjectMode } from "@/lib/project-mode";

/** Visible summary of the two project-level states, shown on final previews. */
export function ProjectSummary() {
  const p = useProjectMode();
  const rows: [string, string][] = [
    ["Project type", projectTypeLabel(p.projectType)],
    ["Creation mode", modeLabel(p.mode)],
  ];
  if (p.isCollaboration && p.partner) {
    rows.push(["Collaborator", `${p.partner.name} · ${p.partner.role}`]);
    rows.push(["Selected work", p.track?.title ?? p.artwork?.title ?? "Not selected"]);
    rows.push(["Collaboration status", p.status]);
  }

  return (
    <div className="panel mt-6 space-y-2 p-5">
      <p className="eyebrow flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5" /> Project summary
      </p>
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-4 text-[13px]">
          <span className="text-ink-muted">{k}</span>
          <span className="font-semibold capitalize">{v}</span>
        </div>
      ))}
      {p.isLater ? (
        <p className="pt-1 text-[12px] text-ink-muted">Collaboration not selected yet — you can add a collaborator later.</p>
      ) : null}
    </div>
  );
}

/** Small status chip + optional CTA used on published solo / decide-later pages. */
export function CollaboratorSlot({ kind }: { kind: "musician" | "visual" }) {
  const p = useProjectMode();
  if (p.isDemo || p.isCollaboration) return null;
  const to = kind === "musician" ? "/create/exhibition/collaborate" : "/create/album/collaborate";
  return (
    <section className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
      <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          {p.isLater ? <p className="text-sm font-semibold">Collaboration not selected yet</p> : null}
          <p className="text-[12px] text-ink-muted">
            {kind === "musician"
              ? "This exhibition is published on its own — no musician is attached."
              : "This album is published on its own — no visual artist is attached."}
          </p>
        </div>
        <Link
          to={to}
          className="shrink-0 rounded-full border border-stroke-panel px-4 py-2 text-[12px] font-semibold transition hover:bg-elev-2"
        >
          {kind === "musician" ? "Add a musical collaborator later" : "Add a visual collaborator later"}
        </Link>
      </div>
    </section>
  );
}
