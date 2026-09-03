import { Link, useRouter } from "@tanstack/react-router";
import { LogIn, ChevronLeft } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full bg-elev-2 p-0.5">
      {(["ko", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition",
            lang === l ? "bg-primary text-primary-foreground" : "text-ink-muted hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header({ back }: { back?: boolean }) {
  const router = useRouter();
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {back ? (
            <button
              onClick={() => router.history.back()}
              aria-label={t("back")}
              className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-elev-2 hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}
          <Link to="/" className="flex items-center gap-2">
            <span className="rounded-md bg-foreground px-2 py-1 text-[11px] font-black tracking-[0.18em] text-background">
              POCO
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LangToggle />
          <Link
            to="/signin"
            aria-label={t("signIn")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-elev-2 hover:text-foreground"
          >
            <LogIn className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-1 text-[12px] leading-relaxed text-ink-muted">
        <p className="font-semibold text-ink-strong">Pocotalk Inc.</p>
        <p>CEO Jubong Yoon · Business Reg. No. 339-88-03524</p>
        <p>hello@pocotalk.app · +82-70-8027-8402</p>
        <p className="pt-3">© 2026 Pocotalk Inc. Prototype build — content is placeholder.</p>
      </div>
    </footer>
  );
}
