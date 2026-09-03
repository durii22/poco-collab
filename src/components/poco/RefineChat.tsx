import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export type RefineKey = "ref1" | "ref2" | "ref3" | "ref4";

const replies: Record<RefineKey, string> = {
  ref1: "Warmed the lighting temperature and softened the frame shadows.",
  ref2: "Reordered the journey — the quietest work now opens the sequence.",
  ref3: "The player is pinned to the top and track notes now sit beside each work.",
  ref4: "Removed frames and widened the margins for a more minimal read.",
};

export function RefineChat({
  suggestions,
  children,
}: {
  suggestions: RefineKey[];
  children: (applied: RefineKey[]) => React.ReactNode;
}) {
  const t = useT();
  const { state, set } = usePoco();
  const [log, setLog] = useState<{ me: string; poco: string }[]>([]);
  const applied = state.refinements as RefineKey[];

  const apply = (k: RefineKey) => {
    setLog((l) => [...l, { me: t(k), poco: replies[k] }]);
    if (!applied.includes(k)) set({ refinements: [...applied, k] });
  };

  return (
    <div className="space-y-5">
      <div className="panel overflow-hidden p-0">{children(applied)}</div>

      <div className="space-y-3">
        {log.map((m, i) => (
          <div key={i} className="space-y-2 rise">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              {m.me}
            </p>
            <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-elev-2 px-4 py-2.5 text-sm text-ink-strong">
              <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
              {m.poco}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => apply(s)}
            className={cn(
              "rounded-full border border-stroke-panel px-4 py-2 text-[13px] font-medium transition hover:border-primary/60 hover:bg-elev-2",
              applied.includes(s) && "border-primary/60 bg-primary/10 text-primary",
            )}
          >
            {t(s)}
            {applied.includes(s) ? ` · ${t("refApplied")}` : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
