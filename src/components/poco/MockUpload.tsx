import { useState } from "react";
import { Upload, HardDrive, PencilLine, Youtube, Music2, Check, ImagePlus } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const icons = { file: Upload, drive: HardDrive, manual: PencilLine, youtube: Youtube, audio: Music2, image: ImagePlus };

export function UploadOptions({
  options,
  onPick,
}: {
  options: { key: keyof typeof icons; label: string }[];
  onPick?: (key: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((o) => {
        const Icon = icons[o.key];
        const active = picked === o.key;
        return (
          <button
            key={o.key}
            onClick={() => {
              setPicked(o.key);
              onPick?.(o.key);
            }}
            className={cn(
              "flex flex-col items-start gap-3 rounded-xl border border-dashed border-stroke-panel bg-surface-note p-4 text-left transition hover:border-primary/60 hover:bg-elev-2",
              active && "border-solid border-primary/70 bg-primary/10",
            )}
          >
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-full bg-elev-2 text-ink-muted", active && "bg-primary/20 text-primary")}>
              {active ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </span>
            <span className="text-sm font-semibold">{o.label}</span>
            <span className="text-[11px] text-ink-muted">{active ? "Mock file attached" : "Tap to simulate"}</span>
          </button>
        );
      })}
    </div>
  );
}

export function MockDropzone({ label, onDrop, filled }: { label: string; onDrop: () => void; filled?: boolean }) {
  const t = useT();
  return (
    <button
      onClick={onDrop}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-stroke-panel bg-surface-note px-6 py-10 text-center transition hover:border-primary/60",
        filled && "border-solid border-primary/60 bg-primary/5",
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-elev-2 text-primary">
        {filled ? <Check className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
      </span>
      <span className="text-sm font-semibold">{filled ? "Mock file attached" : label}</span>
      <span className="text-[11px] text-ink-muted">{t("upB")}</span>
    </button>
  );
}
