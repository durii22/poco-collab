import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminShell, AdminFooterNav } from "@/components/poco/AdminShell";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/new/configure")({
  head: () => ({
    meta: [
      { title: "Configure the collaboration — POCO Pilot Admin" },
      { name: "description", content: "Set the collaboration title, story, exhibition and album titles, credits, inquiry link and display order." },
      { property: "og:title", content: "Configure the collaboration — POCO Pilot Admin" },
      { property: "og:description", content: "Collaboration configuration for a POCO-managed pilot." },
    ],
  }),
  component: Configure,
});

function Configure() {
  const t = useT();
  const navigate = useNavigate();
  const { state, setPilotConfig } = usePoco();
  const c = state.pilot.config;
  const orders = ["Exhibition first", "Album first", "Collaboration page first"];

  return (
    <AdminShell current={2}>
      <SectionTitle eyebrow="Step 03" title={t("paStep3")} sub="Everything here is written into the three generated outputs." />
      <div className="mt-8 space-y-4">
        <Field label="Collaboration title" value={c.collabTitle} onChange={(v) => setPilotConfig({ collabTitle: v })} placeholder="Quiet Hours × Room Tone" />
        <Field label="Short collaboration story" value={c.story} onChange={(v) => setPilotConfig({ story: v })} textarea placeholder="Neither project was made for the other…" />
        <Field label="Exhibition title" value={c.exhibitionTitle} onChange={(v) => setPilotConfig({ exhibitionTitle: v })} placeholder="Quiet Hours" />
        <Field label="Digital-album title" value={c.albumTitle} onChange={(v) => setPilotConfig({ albumTitle: v })} placeholder="Room Tone" />
        <Field label="Artist credits" value={c.artistCredits} onChange={(v) => setPilotConfig({ artistCredits: v })} textarea placeholder="Seoyeon Han (visual) · Doyun Park (music)" />
        <Field label="Artwork credits" value={c.artworkCredits} onChange={(v) => setPilotConfig({ artworkCredits: v })} textarea placeholder="© Seoyeon Han, 'Room Without a Window' (2025)" />
        <Field label="Music credits" value={c.musicCredits} onChange={(v) => setPilotConfig({ musicCredits: v })} textarea placeholder="Composed & performed by Doyun Park" />
        <Field label="Collaboration inquiry link" value={c.inquiryLink} onChange={(v) => setPilotConfig({ inquiryLink: v })} placeholder="poco.app/inquiry/quiet-hours" />
        <div className="space-y-2">
          <span className="text-xs font-medium text-ink-muted">Display order</span>
          <div className="flex flex-wrap gap-2">
            {orders.map((o) => (
              <button
                key={o}
                onClick={() => setPilotConfig({ order: o })}
                className={cn(
                  "rounded-full px-4 py-2 text-[12px] font-semibold transition",
                  c.order === o ? "bg-primary text-primary-foreground" : "bg-elev-2 text-ink-muted hover:text-foreground",
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>
      <AdminFooterNav nextLabel={t("next")} disabled={!c.collabTitle} onNext={() => navigate({ to: "/admin/new/previews" })} />
    </AdminShell>
  );
}
