import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { exhibitionSteps, StepFooter } from "@/components/poco/Steps";
import { CollaborationChoice, collabComplete } from "@/components/poco/CollaborationChoice";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/exhibition/collaborate")({
  head: () => ({
    meta: [
      { title: "Alone or with another artist — POCO exhibition builder" },
      { name: "description", content: "Choose to create your online exhibition alone, with a musician, or decide later." },
      { property: "og:title", content: "Alone or with another artist — POCO exhibition builder" },
      { property: "og:description", content: "Select or invite a musician and choose a track for your exhibition." },
    ],
  }),
  component: Collaborate,
});

function Collaborate() {
  const t = useT();
  const navigate = useNavigate();
  const { state } = usePoco();
  const c = state.collab;

  return (
    <FlowShell steps={exhibitionSteps} current={1}>
      <CollaborationChoice role="visual" />
      <StepFooter
        nextLabel={t("next")}
        disabled={!collabComplete(c.mode, c.partnerId, c.workId)}
        onNext={() => navigate({ to: "/create/exhibition/upload" })}
      />
    </FlowShell>
  );
}
