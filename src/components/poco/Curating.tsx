import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const phases = [
  { en: "Reading color and light", ko: "색과 빛을 읽는 중" },
  { en: "Reading mood and rhythm", ko: "무드와 리듬을 읽는 중" },
  { en: "Finding relationships between works", ko: "작품 사이의 관계를 찾는 중" },
  { en: "Ordering the viewing journey", ko: "관람 동선을 정하는 중" },
  { en: "Designing lighting and spacing", ko: "조명과 여백을 설계하는 중" },
];

export function CuratingScreen({ nextTo }: { nextTo: string }) {
  const t = useT();
  const { lang } = useLang();
  const navigate = useNavigate();
  const [p, setP] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setPct((v) => Math.min(100, v + 2)), 90);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    setP(Math.min(phases.length - 1, Math.floor((pct / 100) * phases.length)));
    if (pct < 100) return undefined;
    const to = setTimeout(() => navigate({ to: nextTo }), 900);
    return () => clearTimeout(to);
  }, [pct, navigate, nextTo]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/15" />
        <span className="absolute inset-3 rounded-full bg-primary/10" />
        <span className="relative text-2xl font-black tracking-[0.18em] text-primary">POCO</span>
      </div>
      <h1 className="mt-8 text-xl font-bold">{pct >= 100 ? t("curDone") : t("curT")}</h1>
      <p className="mt-2 text-sm text-ink-muted">{t("curB")}</p>

      <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-elev-2">
        <div className="h-full rounded-full bg-primary transition-all duration-200" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 self-end text-[11px] tabular-nums text-ink-muted">{pct}%</p>

      <ul className="mt-8 w-full space-y-2 text-left">
        {phases.map((ph, i) => (
          <li
            key={ph.en}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm transition",
              i < p && "text-ink-muted",
              i === p && "border-stroke-panel bg-elev-1 font-semibold text-foreground",
              i > p && "text-ink-muted/40",
            )}
          >
            <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border border-stroke-panel", i < p && "border-primary bg-primary/20")}>
              {i < p ? <Check className="h-3 w-3 text-primary" /> : null}
            </span>
            {lang === "ko" ? ph.ko : ph.en}
          </li>
        ))}
      </ul>
    </div>
  );
}
