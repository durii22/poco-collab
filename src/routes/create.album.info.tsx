import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { MockDropzone } from "@/components/poco/MockUpload";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { album } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/album/info")({
  head: () => ({
    meta: [
      { title: "Album information — POCO digital album builder" },
      { name: "description", content: "Enter album title, introduction, release type, genre, mood, cover art and overall credits." },
      { property: "og:title", content: "Album information — POCO digital album builder" },
      { property: "og:description", content: "Set up the album details for your POCO digital album." },
    ],
  }),
  component: Info,
});

function Info() {
  const t = useT();
  const navigate = useNavigate();
  const { state, set } = usePoco();
  const a = state.albumInfo;
  const upd = (k: keyof typeof a) => (v: string) => set({ albumInfo: { ...a, [k]: v } });

  return (
    <FlowShell steps={albumSteps} current={1}>
      <SectionTitle eyebrow="Step 02" title={t("albT")} />
      <div className="mt-8 space-y-4">
        <Field label={t("fAlbTitle")} value={a.title} onChange={upd("title")} placeholder="Room Tone" />
        <Field label={t("fAlbIntro")} value={a.intro} onChange={upd("intro")} textarea placeholder="Five pieces for cello, recorded inside an emptied building…" />
        <Field label={t("fAlbArtist")} value={a.artist} onChange={upd("artist")} placeholder="Doyun Park" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={t("fRelease")} value={a.release} onChange={upd("release")} placeholder="EP" />
          <Field label={t("fGenre")} value={a.genre} onChange={upd("genre")} placeholder="Modern classical" />
          <Field label={t("fMood")} value={a.mood} onChange={upd("mood")} placeholder="Still, blue, patient" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-ink-muted">{t("fCover")}</p>
          {state.coverUploaded ? (
            <div className="panel flex items-center gap-4 p-4">
              <img src={album.cover} alt="Album cover" width={1024} height={1024} className="h-20 w-20 rounded-lg object-cover" />
              <div className="text-sm">
                <p className="font-semibold">room-tone-cover.jpg</p>
                <p className="text-[11px] text-ink-muted">3000 × 3000 · mock file</p>
              </div>
              <button onClick={() => set({ coverUploaded: false })} className="ml-auto text-[12px] text-ink-muted hover:text-foreground">
                Replace
              </button>
            </div>
          ) : (
            <MockDropzone label="Upload album cover" onDrop={() => set({ coverUploaded: true })} />
          )}
        </div>

        <Field label={t("fCredits")} value={a.credits} onChange={upd("credits")} textarea placeholder="Recording & mix — Nari Cho…" />
      </div>
      <StepFooter nextLabel={t("next")} onNext={() => navigate({ to: "/create/album/tracks" })} />
    </FlowShell>
  );
}
