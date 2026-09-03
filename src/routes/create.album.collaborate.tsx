import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { CollaborationChoice, collabComplete } from "@/components/poco/CollaborationChoice";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/album/collaborate")({
  head: () => ({
    meta: [
      { title: "Alone or with another artist — POCO album builder" },
      { name: "description", content: "Choose to create your digital album alone, with a visual artist, or decide later." },
      { property: "og:title", content: "Alone or with another artist — POCO album builder" },
      { property: "og:description", content: "Select or invite a visual artist and choose artwork for your album." },
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
    <FlowShell steps={albumSteps} current={1}>
      <CollaborationChoice role="musician" />
      <StepFooter
        nextLabel={t("next")}
        disabled={!collabComplete(c.mode, c.partnerId, c.workId)}
        onNext={() => navigate({ to: "/create/album/info" })}
      />
    </FlowShell>
  );
}
