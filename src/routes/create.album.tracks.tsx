import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Music2 } from "lucide-react";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { UploadOptions } from "@/components/poco/MockUpload";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { fmt, tracks } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/album/tracks")({
  head: () => ({
    meta: [
      { title: "Upload tracks — POCO digital album builder" },
      { name: "description", content: "Mock-upload MP3 or M4A files, add YouTube performance links, and write track stories, composer, lyricist and performer credits." },
      { property: "og:title", content: "Upload tracks — POCO digital album builder" },
      { property: "og:description", content: "Track upload and credits for your digital album." },
    ],
  }),
  component: TracksPage,
});

type D = { title: string; story: string; composer: string; lyricist: string; performer: string; art: string };

function TracksPage() {
  const t = useT();
  const navigate = useNavigate();
  const { set } = usePoco();
  const [count, setCount] = useState(2);
  const [drafts, setDrafts] = useState<Record<number, D>>({});

  const get = (i: number): D =>
    drafts[i] ?? {
      title: tracks[i]?.title ?? "",
      story: tracks[i]?.story ?? "",
      composer: tracks[i]?.composer ?? "",
      lyricist: tracks[i]?.lyricist ?? "",
      performer: tracks[i]?.performer ?? "",
      art: tracks[i]?.artCredit ?? "",
    };
  const upd = (i: number, k: keyof D) => (v: string) => setDrafts((d) => ({ ...d, [i]: { ...get(i), [k]: v } }));

  return (
    <FlowShell steps={albumSteps} current={2}>
      <SectionTitle eyebrow="Step 03" title={t("trT")} sub={t("upB")} />

      <div className="mt-6">
        <UploadOptions
          options={[
            { key: "audio", label: t("trMp3") },
            { key: "youtube", label: t("trYt") },
            { key: "manual", label: t("upManual") },
          ]}
        />
      </div>

      <div className="mt-8 space-y-5">
        {Array.from({ length: count }).map((_, i) => {
          const d = get(i);
          return (
            <div key={i} className="panel space-y-4 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-elev-2 text-[12px] font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 items-center gap-2 rounded-full bg-surface-note px-3 py-2 text-[12px] text-ink-muted">
                  <Music2 className="h-3.5 w-3.5 text-primary" />
                  track-{i + 1}.mp3 · {fmt(tracks[i % tracks.length]!.duration)} · mock file
                </div>
              </div>
              <Field label={t("fTrackTitle")} value={d.title} onChange={upd(i, "title")} />
              <Field label={t("fStory")} value={d.story} onChange={upd(i, "story")} textarea />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t("fComposer")} value={d.composer} onChange={upd(i, "composer")} />
                <Field label={t("fLyricist")} value={d.lyricist} onChange={upd(i, "lyricist")} />
                <Field label={t("fPerformer")} value={d.performer} onChange={upd(i, "performer")} />
                <Field label={t("fArtCredit")} value={d.art} onChange={upd(i, "art")} />
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-stroke-panel px-4 py-2 text-[12px] font-medium text-ink-muted transition hover:text-foreground">
                {t("trYt")}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setCount((c) => Math.min(tracks.length, c + 1))}
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-stroke-panel px-5 text-sm font-semibold text-ink-muted transition hover:border-primary/60 hover:text-foreground"
      >
        <Plus className="h-4 w-4" /> {t("trAdd")}
      </button>

      <StepFooter
        nextLabel={t("next")}
        onNext={() => {
          set({ uploadedTracks: count });
          navigate({ to: "/create/album/visual" });
        }}
      />
    </FlowShell>
  );
}
