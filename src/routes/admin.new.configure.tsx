import { useState } from "react";
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

function normalizeLink(v: string) {
  const s = v.trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s.replace(/^\/+/, "")}`;
}

function linkError(v: string) {
  const s = v.trim();
  if (!s) return null;
  try {
    const u = new URL(normalizeLink(s));
    if (!u.hostname.includes(".")) return "Enter a valid link, e.g. poco.app/inquiry/quiet-hours";
    return null;
  } catch {
    return "Enter a valid link, e.g. poco.app/inquiry/quiet-hours";
  }
}

function Configure() {
  const t = useT();
  const navigate = useNavigate();
  const { state, setPilotConfig } = usePoco();
  const [showErrors, setShowErrors] = useState(false);
  const c = state.pilot.config;
  const orders = ["Exhibition first", "Album first", "Collaboration page first"];

  const errors = {
    collabTitle: c.collabTitle.trim() ? null : "Collaboration title is required.",
    inquiryLink: linkError(c.inquiryLink),
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const onNext = () => {
    setShowErrors(true);
    if (hasErrors) return;
    setPilotConfig({
      collabTitle: c.collabTitle.trim(),
      story: c.story.trim(),
      exhibitionTitle: c.exhibitionTitle.trim(),
      albumTitle: c.albumTitle.trim(),
      artistCredits: c.artistCredits.trim(),
      artworkCredits: c.artworkCredits.trim(),
      musicCredits: c.musicCredits.trim(),
      inquiryLink: normalizeLink(c.inquiryLink),
    });
    navigate({ to: "/admin/new/previews" });
  };

  return (
    <AdminShell current={2}>
      <SectionTitle eyebrow="Step 03" title={t("paStep3")} sub="Everything here is written into the three generated outputs." />
      <div className="mt-8 space-y-4">
        <Field
          label="Collaboration title"
          value={c.collabTitle}
          onChange={(v) => setPilotConfig({ collabTitle: v })}
          placeholder="Quiet Hours × Room Tone"
          error={showErrors ? errors.collabTitle : null}
        />
        <Field label="Short collaboration story" value={c.story} onChange={(v) => setPilotConfig({ story: v })} textarea placeholder="Neither project was made for the other…" />
        <Field label="Exhibition title" value={c.exhibitionTitle} onChange={(v) => setPilotConfig({ exhibitionTitle: v })} placeholder="Quiet Hours" />
        <Field label="Digital-album title" value={c.albumTitle} onChange={(v) => setPilotConfig({ albumTitle: v })} placeholder="Room Tone" />
        <Field label="Artist credits" value={c.artistCredits} onChange={(v) => setPilotConfig({ artistCredits: v })} textarea placeholder="Seoyeon Han (visual) · Doyun Park (music)" />
        <Field label="Artwork credits" value={c.artworkCredits} onChange={(v) => setPilotConfig({ artworkCredits: v })} textarea placeholder="© Seoyeon Han, 'Room Without a Window' (2025)" />
        <Field label="Music credits" value={c.musicCredits} onChange={(v) => setPilotConfig({ musicCredits: v })} textarea placeholder="Composed & performed by Doyun Park" />
        <Field
          label="Collaboration inquiry link"
          value={c.inquiryLink}
          onChange={(v) => setPilotConfig({ inquiryLink: v })}
          onBlur={() => setPilotConfig({ inquiryLink: normalizeLink(c.inquiryLink) })}
          placeholder="poco.app/inquiry/quiet-hours"
          error={showErrors ? errors.inquiryLink : null}
        />
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
      <AdminFooterNav nextLabel={t("next")} onNext={onNext} />
    </AdminShell>
  );
}

