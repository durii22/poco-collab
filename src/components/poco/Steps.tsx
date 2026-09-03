import { useRouter } from "@tanstack/react-router";
import { Check, Save } from "lucide-react";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const exhibitionSteps = [
  { label: { en: "About you", ko: "소개" }, to: "/create/exhibition/about" },
  { label: { en: "Artwork", ko: "작품" }, to: "/create/exhibition/upload" },
  { label: { en: "Curation", ko: "큐레이션" }, to: "/create/exhibition/curating" },
  { label: { en: "Refine", ko: "다듬기" }, to: "/create/exhibition/refine" },
  { label: { en: "Preview", ko: "미리보기" }, to: "/create/exhibition/preview" },
  { label: { en: "Publish", ko: "공개" }, to: "/create/exhibition/confirm" },
];

export const albumSteps = [
  { label: { en: "About you", ko: "소개" }, to: "/create/album/about" },
  { label: { en: "Album", ko: "앨범" }, to: "/create/album/info" },
  { label: { en: "Tracks", ko: "트랙" }, to: "/create/album/tracks" },
  { label: { en: "Visuals", ko: "비주얼" }, to: "/create/album/visual" },
  { label: { en: "Curation", ko: "큐레이션" }, to: "/create/album/curating" },
  { label: { en: "Preview", ko: "미리보기" }, to: "/create/album/preview" },
  { label: { en: "Publish", ko: "공개" }, to: "/create/album/confirm" },
];

export function ProgressBar({
  steps,
  current,
}: {
  steps: { label: { en: string; ko: string } }[];
  current: number;
}) {
  const pct = ((current + 1) / steps.length) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] font-medium text-ink-muted">
        <span>
          {current + 1} / {steps.length}
        </span>
        <span className="hidden gap-3 sm:flex">
          {steps.map((s, i) => (
            <span key={s.label.en} className={cn(i === current && "font-semibold text-primary", i < current && "text-ink-strong")}>
              {s.label.en}
            </span>
          ))}
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-elev-2">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function SaveDraft() {
  const t = useT();
  const { set } = usePoco();
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        set({ draftSavedAt: new Date().toISOString() });
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition hover:text-foreground"
    >
      {done ? <Check className="h-3.5 w-3.5 text-primary" /> : <Save className="h-3.5 w-3.5" />}
      {done ? t("draftSaved") : t("saveDraft")}
    </button>
  );
}

export function StepFooter({ onNext, nextLabel, disabled }: { onNext: () => void; nextLabel: string; disabled?: boolean }) {
  const router = useRouter();
  const t = useT();
  return (
    <div className="sticky bottom-0 -mx-4 mt-10 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
        <button
          onClick={() => router.history.back()}
          className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition hover:text-foreground"
        >
          ← {t("back")}
        </button>
        <div className="flex items-center gap-4">
          <SaveDraft />
          <button
            onClick={onNext}
            disabled={disabled}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
