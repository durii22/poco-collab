import { Chrome, Apple, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";
import { SectionTitle } from "./ui";

export function SignInPanel({ onDone }: { onDone: () => void }) {
  const t = useT();
  const { set } = usePoco();

  const go = () => {
    set({ signedIn: true });
    onDone();
  };

  const opts = [
    { icon: Chrome, label: t("siGoogle") },
    { icon: Apple, label: t("siApple") },
    { icon: Mail, label: t("siEmail") },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Last step" title={t("siT")} sub={t("siB")} />
      <div className="space-y-3">
        {opts.map((o) => (
          <button
            key={o.label}
            onClick={go}
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-stroke-panel bg-elev-1 text-sm font-semibold transition hover:bg-elev-2"
          >
            <o.icon className="h-4 w-4" /> {o.label}
          </button>
        ))}
      </div>
      <p className="text-center text-[11px] text-ink-muted">
        Prototype only — no real authentication happens here.
      </p>
    </div>
  );
}
