import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FlowShell } from "@/components/poco/FlowShell";
import { exhibitionSteps, StepFooter } from "@/components/poco/Steps";
import { UploadOptions } from "@/components/poco/MockUpload";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { artworks } from "@/lib/mock-data";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/create/exhibition/upload")({
  head: () => ({
    meta: [
      { title: "Upload artwork — POCO exhibition builder" },
      { name: "description", content: "Add artworks with title, year, medium, description and credit. Mock upload from file, Google Drive or manual entry." },
      { property: "og:title", content: "Upload artwork — POCO exhibition builder" },
      { property: "og:description", content: "Mock upload interface for building an online exhibition." },
    ],
  }),
  component: UploadPage,
});

type Draft = { title: string; year: string; medium: string; desc: string; credit: string };

function UploadPage() {
  const t = useT();
  const navigate = useNavigate();
  const { set } = usePoco();
  const [count, setCount] = useState(2);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});

  const get = (i: number): Draft =>
    drafts[i] ?? {
      title: artworks[i]?.title ?? "",
      year: artworks[i]?.year ?? "",
      medium: artworks[i]?.medium ?? "",
      desc: artworks[i]?.description ?? "",
      credit: artworks[i]?.credit ?? "",
    };
  const upd = (i: number, k: keyof Draft) => (v: string) => setDrafts((d) => ({ ...d, [i]: { ...get(i), [k]: v } }));

  return (
    <FlowShell steps={exhibitionSteps} current={2}>
      <SectionTitle eyebrow="Step 02" title={t("upT")} sub={t("upB")} />

      <div className="mt-6">
        <UploadOptions
          options={[
            { key: "file", label: t("upFile") },
            { key: "drive", label: t("upDrive") },
            { key: "manual", label: t("upManual") },
          ]}
        />
      </div>

      <div className="mt-8 space-y-5">
        {Array.from({ length: count }).map((_, i) => {
          const d = get(i);
          return (
            <div key={i} className="panel space-y-4 p-5">
              <div className="flex gap-4">
                <img
                  src={artworks[i % artworks.length]!.src}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-24 w-20 shrink-0 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-3">
                  <Field label={t("fArtTitle")} value={d.title} onChange={upd(i, "title")} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label={t("fYear")} value={d.year} onChange={upd(i, "year")} />
                    <Field label={t("fMedium")} value={d.medium} onChange={upd(i, "medium")} />
                  </div>
                </div>
              </div>
              <Field label={t("fDesc")} value={d.desc} onChange={upd(i, "desc")} textarea />
              <Field label={t("fCredit")} value={d.credit} onChange={upd(i, "credit")} />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setCount((c) => Math.min(artworks.length, c + 1))}
        className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-stroke-panel px-5 text-sm font-semibold text-ink-muted transition hover:border-primary/60 hover:text-foreground"
      >
        <Plus className="h-4 w-4" /> {t("addWork")}
      </button>

      <StepFooter
        nextLabel={t("next")}
        onNext={() => {
          set({ uploadedWorks: count });
          navigate({ to: "/create/exhibition/curating" });
        }}
      />
    </FlowShell>
  );
}
