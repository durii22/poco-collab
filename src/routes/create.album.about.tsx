import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/album/about")({
  head: () => ({
    meta: [
      { title: "About you — POCO digital album builder" },
      { name: "description", content: "Add your musician profile and biography before entering album information and tracks." },
      { property: "og:title", content: "About you — POCO digital album builder" },
      { property: "og:description", content: "Musician profile and biography for your digital album." },
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
    <FlowShell steps={albumSteps} current={0}>
      <SectionTitle eyebrow="Digital album" title={t("aboutT")} sub={t("aboutSubM")} />
      <div className="mt-8 space-y-4">
        <Field label={t("fName")} value={a.name} onChange={upd("name")} placeholder="Doyun Park" />
        <Field label={t("fTitleRole")} value={a.role} onChange={upd("role")} placeholder="Cellist · Composer" />
        <Field label={t("fBase")} value={a.base} onChange={upd("base")} placeholder="Seoul, KR" />
        <Field label={t("fBio")} value={a.bio} onChange={upd("bio")} textarea placeholder="I write short pieces for cello and room tone…" />
        <Field label={t("fLinks")} value={a.link} onChange={upd("link")} placeholder="youtube.com/@doyunpark" />
      </div>
      <StepFooter nextLabel={t("next")} onNext={() => navigate({ to: "/create/album/info" })} />
    </FlowShell>
  );
}
