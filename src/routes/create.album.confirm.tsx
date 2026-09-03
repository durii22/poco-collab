import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { album, musician, tracks, visualArtist } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/album/confirm")({
  head: () => ({
    meta: [
      { title: "Confirm and publish your album — POCO" },
      { name: "description", content: "Review the digital album summary and publish it as a shareable link." },
      { property: "og:title", content: "Confirm and publish your album — POCO" },
      { property: "og:description", content: "Final confirmation before your digital album goes live." },
    ],
  }),
  component: Confirm,
});

function Confirm() {
  const t = useT();
  const navigate = useNavigate();
  const { state, set } = usePoco();

  const rows = [
    ["Album", state.albumInfo.title || album.title],
    ["Musician", state.artist.name || musician.name],
    ["Tracks", `${state.uploadedTracks || tracks.length} tracks`],
    ["Visuals", state.visualChoice === "later" ? "To be added" : `${visualArtist.name} — Quiet Hours`],
    ["Refinements", state.refinements.length ? `${state.refinements.length} applied` : "None"],
    ["Visibility", "Public link"],
  ];

  return (
    <FlowShell steps={albumSteps} current={6}>
      <SectionTitle eyebrow="Last step" title={t("cfT")} />
      <div className="panel mt-6 divide-y divide-border p-0">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
            <span className="text-ink-muted">{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-[13px] text-primary">
        <Check className="h-4 w-4" /> Signed in as {state.artist.name || musician.name} — ready to publish.
      </div>
      <StepFooter
        nextLabel={t("publish")}
        onNext={() => {
          set({ published: { ...state.published, album: true } });
          navigate({ to: "/album" });
        }}
      />
    </FlowShell>
  );
}
