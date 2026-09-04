import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { exhibitionSteps, StepFooter } from "@/components/poco/Steps";
import { ExhibitionView } from "@/components/poco/ExhibitionView";
import { ProjectSummary } from "@/components/poco/ProjectSummary";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/exhibition/preview")({
  head: () => ({
    meta: [
      { title: "Final preview — POCO exhibition" },
      { name: "description", content: "See your curated online exhibition exactly as visitors will experience it before publishing." },
      { property: "og:title", content: "Final preview — POCO exhibition" },
      { property: "og:description", content: "Preview the curated exhibition before sign-in and publication." },
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
    <FlowShell steps={exhibitionSteps} current={5} wide>
      <SectionTitle eyebrow="Step 05" title={t("prevT")} sub={t("prevB")} />
      <ProjectSummary />
      <div className="mt-6 overflow-hidden rounded-2xl border border-stroke-panel">
        <div className="max-h-[70vh] overflow-y-auto">
          <ExhibitionView
            preview
            warm={r.includes("ref1")}
            reordered={r.includes("ref2")}
            emphasizeMusic={r.includes("ref3")}
            minimal={r.includes("ref4")}
          />
        </div>
      </div>
      <StepFooter nextLabel={t("toSignIn")} onNext={() => navigate({ to: "/create/exhibition/signin" })} />
    </FlowShell>
  );
}
