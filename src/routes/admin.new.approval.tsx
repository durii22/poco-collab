import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Copy, Send } from "lucide-react";
import { AdminShell, AdminFooterNav, Toast, useToast } from "@/components/poco/AdminShell";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { directory } from "@/lib/mock-data";
import { usePoco, type PilotApproval } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/new/approval")({
  head: () => ({
    meta: [
      { title: "Request artist approval — POCO Pilot Admin" },
      { name: "description", content: "Send mock approval links and track review, change-request and approved states for both artists." },
      { property: "og:title", content: "Request artist approval — POCO Pilot Admin" },
      { property: "og:description", content: "Prototype approval workflow for a POCO collaboration pilot." },
    ],
  }),
  component: Approval,
});

const statusLabel: Record<PilotApproval, string> = {
  none: "Not sent",
  review: "Review requested",
  changes: "Changes requested",
  approved: "Approved",
};

const checklist = ["Review preview", "Confirm profile", "Confirm selected work", "Confirm usage permission", "Confirm credits"];

function Approval() {
  const t = useT();
  const navigate = useNavigate();
  const { state, setPilot } = usePoco();
  const p = state.pilot;
  const { msg, toast } = useToast();

  const card = (role: "visual" | "musician") => {
    const artist = directory.find((a) => a.id === (role === "visual" ? p.visualId : p.musicianId));
    const status = p.approvals[role];
    const set = (s: PilotApproval) => setPilot({ approvals: { ...p.approvals, [role]: s } });
    return (
      <div key={role} className="panel p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">{role === "visual" ? "Visual artist approval" : "Musician approval"}</p>
            <p className="mt-1 text-base font-bold">{artist?.name ?? "—"}</p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[11px] font-bold",
              status === "approved"
                ? "bg-primary/15 text-primary"
                : status === "changes"
                  ? "bg-amber-400/15 text-amber-300"
                  : "bg-elev-2 text-ink-muted",
            )}
          >
            {statusLabel[status]}
          </span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {checklist.map((c) => (
            <li key={c} className="flex items-center gap-2 text-[12px] text-ink-muted">
              <Check className={cn("h-3.5 w-3.5", status === "approved" ? "text-primary" : "text-ink-muted/40")} />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setPilot({ approvals: { ...p.approvals, [role]: "review" }, sent: { ...p.sent, [role]: true } });
              toast(`Approval link sent to ${artist?.name ?? "artist"} (prototype)`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-elev-2 px-3.5 py-2 text-[12px] font-semibold transition hover:brightness-125"
          >
            <Send className="h-3.5 w-3.5" /> {role === "visual" ? "Send approval link to visual artist" : "Send approval link to musician"}
          </button>
          <button
            onClick={() => toast("Approval link copied (prototype)")}
            className="inline-flex items-center gap-1.5 rounded-full bg-elev-2 px-3.5 py-2 text-[12px] font-semibold transition hover:brightness-125"
          >
            <Copy className="h-3.5 w-3.5" /> Copy approval link
          </button>
          <button
            onClick={() => {
              set("changes");
              toast("Changes requested (prototype)");
            }}
            className="rounded-full bg-elev-2 px-3.5 py-2 text-[12px] font-semibold transition hover:brightness-125"
          >
            Request changes
          </button>
          <button
            onClick={() => {
              set("approved");
              toast(`${artist?.name ?? "Artist"} approved (prototype)`);
            }}
            className="rounded-full bg-primary px-3.5 py-2 text-[12px] font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Approve
          </button>
        </div>
      </div>
    );
  };

  return (
    <AdminShell current={4}>
      <SectionTitle eyebrow="Step 05" title={t("paStep5")} sub="Mock buttons only — no real messages are sent." />
      <div className="mt-8 space-y-4">{card("visual")}{card("musician")}</div>
      <AdminFooterNav nextLabel={t("next")} onNext={() => navigate({ to: "/admin/new/publish" })} />
      <Toast msg={msg} />
    </AdminShell>
  );
}
