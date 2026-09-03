import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { AlbumView } from "@/components/poco/AlbumView";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/album/preview")({
  head: () => ({
    meta: [
      { title: "Final preview — POCO digital album" },
      { name: "description", content: "See your curated digital album exactly as listeners will experience it before publishing." },
      { property: "og:title", content: "Final preview — POCO digital album" },
      { property: "og:description", content: "Preview the digital album before sign-in and publication." },
    ],
  }),
  component: Preview,
});

function Preview() {
  const t = useT();
  const navigate = useNavigate();
  const { state } = usePoco();
  const r = state.refinements;

  return (
    <FlowShell steps={albumSteps} current={5} wide>
      <SectionTitle eyebrow="Step 06" title={t("prevT")} sub={t("prevB")} />
      <div className="mt-6 overflow-hidden rounded-2xl border border-stroke-panel">
        <div className="max-h-[70vh] overflow-y-auto">
          <AlbumView preview warm={r.includes("ref1")} reordered={r.includes("ref2")} minimal={r.includes("ref4")} />
        </div>
      </div>
      <StepFooter nextLabel={t("toSignIn")} onNext={() => navigate({ to: "/create/album/signin" })} />
    </FlowShell>
  );
}
