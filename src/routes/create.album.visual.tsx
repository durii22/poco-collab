import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ImagePlus, Users, Mail, Clock } from "lucide-react";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { artworks, visualArtist } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create/album/visual")({
  head: () => ({
    meta: [
      { title: "Add visual artwork — POCO digital album builder" },
      { name: "description", content: "Upload your own image, use a collaborating visual artist's work, invite an artist, or decide later." },
      { property: "og:title", content: "Add visual artwork — POCO digital album builder" },
      { property: "og:description", content: "Connect visual artwork to your digital album." },
    ],
  }),
  component: Visual,
});

function Visual() {
  const t = useT();
  const navigate = useNavigate();
  const { state, set } = usePoco();
  const choice = state.visualChoice;

  const options = [
    { key: "own", icon: ImagePlus, label: t("vc1") },
    { key: "collab", icon: Users, label: t("vc2") },
    { key: "invite", icon: Mail, label: t("vc3") },
    { key: "later", icon: Clock, label: t("vc4") },
  ];

  return (
    <FlowShell steps={albumSteps} current={3}>
      <SectionTitle eyebrow="Step 04" title={t("vcT")} />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => set({ visualChoice: o.key })}
            className={cn(
              "panel flex items-center gap-3 p-4 text-left transition hover:border-primary/50",
              choice === o.key && "border-primary/70 bg-primary/10",
            )}
          >
            <span className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-elev-2 text-ink-muted", choice === o.key && "bg-primary/20 text-primary")}>
              {choice === o.key ? <Check className="h-4 w-4" /> : <o.icon className="h-4 w-4" />}
            </span>
            <span className="text-sm font-semibold">{o.label}</span>
          </button>
        ))}
      </div>

      {choice === "own" && (
        <div className="panel mt-5 flex gap-3 overflow-x-auto p-4 rise">
          {artworks.map((w) => (
            <img key={w.id} src={w.src} alt={w.title} loading="lazy" width={1024} height={1280} className="h-28 w-24 shrink-0 rounded-lg object-cover" />
          ))}
        </div>
      )}
      {choice === "collab" && (
        <div className="panel mt-5 flex items-center gap-4 p-4 rise">
          <img src={visualArtist.avatar} alt={visualArtist.name} loading="lazy" width={768} height={768} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <p className="text-sm font-bold">{visualArtist.name}</p>
            <p className="text-[12px] text-ink-muted">Quiet Hours · 4 works linked to this album</p>
          </div>
          <span className="ml-auto rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary">Linked</span>
        </div>
      )}
      {choice === "invite" && (
        <div className="panel mt-5 space-y-3 p-4 rise">
          <p className="text-sm font-semibold">Invitation sent (mock)</p>
          <p className="text-[12px] text-ink-muted">
            POCO will notify you when the artist accepts. You can keep building in the meantime.
          </p>
        </div>
      )}
      {choice === "later" && (
        <p className="mt-5 rounded-xl bg-elev-2 p-4 text-[13px] text-ink-muted rise">
          No problem — POCO will use a generated cover-derived visual until you add artwork.
        </p>
      )}

      <StepFooter nextLabel={t("next")} onNext={() => navigate({ to: "/create/album/curating" })} disabled={!choice} />
    </FlowShell>
  );
}
