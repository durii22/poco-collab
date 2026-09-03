import { useEffect, useState, type ReactNode } from "react";
import { Header, Footer } from "./Header";
import { ProgressBar } from "./Steps";

export const pilotSteps = [
  { label: { en: "Artists", ko: "아티스트" }, to: "/admin/new/artists" },
  { label: { en: "Works", ko: "작품" }, to: "/admin/new/works" },
  { label: { en: "Configure", ko: "구성" }, to: "/admin/new/configure" },
  { label: { en: "Previews", ko: "미리보기" }, to: "/admin/new/previews" },
  { label: { en: "Approval", ko: "승인" }, to: "/admin/new/approval" },
  { label: { en: "Publish", ko: "공개" }, to: "/admin/new/publish" },
];

export function AdminShell({ current, children }: { current?: number; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header back />
      <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
        <p className="eyebrow">POCO Pilot Admin · prototype</p>
        {typeof current === "number" ? (
          <div className="mt-3">
            <ProgressBar steps={pilotSteps} current={current} />
          </div>
        ) : null}
      </div>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">{children}</main>
      <Footer />
    </div>
  );
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2600);
    return () => clearTimeout(id);
  }, [msg]);
  return { msg, toast: setMsg };
}

export function Toast({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="panel max-w-sm px-4 py-3 text-center text-[13px] font-medium shadow-2xl">{msg}</div>
    </div>
  );
}

export function AdminFooterNav({
  backTo,
  nextTo,
  nextLabel,
  disabled,
  onNext,
}: {
  backTo?: string;
  nextTo?: string;
  nextLabel: string;
  disabled?: boolean;
  onNext: () => void;
}) {
  void backTo;
  void nextTo;
  return (
    <div className="sticky bottom-0 -mx-4 mt-10 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-4xl items-center justify-end">
        <button
          onClick={onNext}
          disabled={disabled}
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
