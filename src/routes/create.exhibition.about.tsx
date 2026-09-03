import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { exhibitionSteps, StepFooter } from "@/components/poco/Steps";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/exhibition/about")({
  head: () => ({
    meta: [
      { title: "About you — POCO exhibition builder" },
      { name: "description", content: "Add your artist profile and biography before uploading artwork to your POCO exhibition." },
      { property: "og:title", content: "About you — POCO exhibition builder" },
      { property: "og:description", content: "Artist profile and biography for your online exhibition." },
    ],
  }),
  component: About,
});

function About() {
  const t = useT();
  const navigate = useNavigate();
  const { state, set } = usePoco();
  const a = state.artist;
  const upd = (k: keyof typeof a) => (v: string) => set({ artist: { ...a, [k]: v } });

  return (
    <FlowShell steps={exhibitionSteps} current={0}>
      <SectionTitle eyebrow="Online exhibition" title={t("aboutT")} sub={t("aboutSubV")} />
      <div className="mt-8 space-y-4">
        <Field label={t("fName")} value={a.name} onChange={upd("name")} placeholder="Seoyeon Han" />
        <Field label={t("fTitleRole")} value={a.role} onChange={upd("role")} placeholder="Photographer · Installation" />
        <Field label={t("fBase")} value={a.base} onChange={upd("base")} placeholder="Seoul, KR" />
        <Field label={t("fBio")} value={a.bio} onChange={upd("bio")} textarea placeholder="I work with the light that survives at the end of a day…" />
        <Field label={t("fLinks")} value={a.link} onChange={upd("link")} placeholder="instagram.com/seoyeon" />
      </div>
      <StepFooter nextLabel={t("next")} onNext={() => navigate({ to: "/create/exhibition/collaborate" })} />
    </FlowShell>
  );
}
