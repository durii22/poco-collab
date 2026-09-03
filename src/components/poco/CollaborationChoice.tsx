import { Check, Sparkles, User, Users, Clock } from "lucide-react";
import { artworks, directory, fmt, musicians, tracks, visualArtists } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";
import { ArtistCard } from "./ArtistCard";
import { SectionTitle } from "./ui";

export function collabComplete(mode: string | null, partnerId: string | null, workId: string | null) {
  if (mode === "alone" || mode === "later") return true;
  if (mode === "collab") return Boolean(partnerId && workId);
  return false;
}

export function CollaborationChoice({ role }: { role: "visual" | "musician" }) {
  const t = useT();
  const { state, setCollab } = usePoco();
  const c = state.collab;
  const partners = role === "visual" ? musicians : visualArtists;
  const partner = directory.find((a) => a.id === c.partnerId) ?? null;

  const modes = [
    { key: "alone", icon: User, label: t("coAlone") },
    { key: "collab", icon: Users, label: t("coWith") },
    { key: "later", icon: Clock, label: t("coLater") },
  ] as const;

  const statusSteps = [
    { key: "draft", label: t("coDraft") },
    { key: "invited", label: t("coInvited") },
    { key: "accepted", label: t("coAccepted") },
  ] as const;

  const prearrange = () => {
    const p = role === "visual" ? "mu-1" : "va-1";
    const w = role === "visual" ? tracks[0]!.id : artworks[0]!.id;
    setCollab({ mode: "collab", partnerId: p, workId: w, status: "accepted", pocoArranged: true });
  };

  return (
    <div>
      <SectionTitle eyebrow="Collaboration" title={t("coT")} sub={t("coSub")} />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setCollab({ mode: m.key, ...(m.key === "collab" ? {} : { partnerId: null, workId: null, status: "draft", pocoArranged: false }) })}
            className={cn(
              "panel flex items-center gap-3 p-4 text-left transition",
              c.mode === m.key ? "border-primary/70 ring-1 ring-primary/30" : "hover:bg-elev-2",
            )}
          >
            <m.icon className={cn("h-5 w-5 shrink-0", c.mode === m.key ? "text-primary" : "text-ink-muted")} />
            <span className="text-sm font-semibold">{m.label}</span>
            {c.mode === m.key ? <Check className="ml-auto h-4 w-4 text-primary" /> : null}
          </button>
        ))}
      </div>

      {c.mode === "collab" ? (
        <div className="mt-8 space-y-8">
          {/* Concierge pilot shortcut */}
          <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <Sparkles className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t("coPocoPicked")}</p>
              <p className="text-[12px] text-ink-muted">{t("coPocoPickedB")}</p>
            </div>
            <button
              onClick={prearrange}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition",
                c.pocoArranged ? "bg-primary text-primary-foreground" : "bg-elev-2 hover:brightness-125",
              )}
            >
              {c.pocoArranged ? t("coAccepted") : "Use POCO's match"}
            </button>
          </div>

          {/* Partner selection */}
          <div className="space-y-3">
            <p className="eyebrow">{role === "visual" ? t("coPickMusician") : t("coPickVisual")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {partners.map((a) => (
                <ArtistCard
                  key={a.id}
                  artist={a}
                  selected={c.partnerId === a.id}
                  onSelect={() => setCollab({ partnerId: a.id, status: c.status === "accepted" ? "accepted" : "draft", pocoArranged: false })}
                />
              ))}
            </div>
          </div>

          {/* Work selection */}
          {c.partnerId ? (
            <div className="space-y-3">
              <p className="eyebrow">{role === "visual" ? t("coPickTrack") : t("coPickArtwork")}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {role === "visual"
                  ? tracks.map((tr) => (
                      <button
                        key={tr.id}
                        onClick={() => setCollab({ workId: tr.id })}
                        className={cn(
                          "panel flex items-center justify-between gap-3 p-3 text-left transition",
                          c.workId === tr.id ? "border-primary/70 ring-1 ring-primary/30" : "hover:bg-elev-2",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-semibold">{tr.title}</span>
                          <span className="block text-[11px] text-ink-muted">{tr.performer}</span>
                        </span>
                        <span className="text-[11px] tabular-nums text-ink-muted">{fmt(tr.duration)}</span>
                      </button>
                    ))
                  : artworks.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setCollab({ workId: w.id })}
                        className={cn(
                          "panel flex items-center gap-3 p-3 text-left transition",
                          c.workId === w.id ? "border-primary/70 ring-1 ring-primary/30" : "hover:bg-elev-2",
                        )}
                      >
                        <img src={w.src} alt={w.title} loading="lazy" width={120} height={120} className="h-12 w-12 rounded-lg object-cover" />
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-semibold">{w.title}</span>
                          <span className="block text-[11px] text-ink-muted">{w.year} · {w.credit}</span>
                        </span>
                      </button>
                    ))}
              </div>
            </div>
          ) : null}

          {/* Status */}
          <div className="panel space-y-4 p-4">
            <p className="eyebrow">{t("coStatus")}</p>
            <div className="flex items-center gap-2">
              {statusSteps.map((s, i) => {
                const idx = statusSteps.findIndex((x) => x.key === c.status);
                const done = i <= idx;
                return (
                  <div key={s.key} className="flex flex-1 items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[11px] font-semibold",
                        done ? "bg-primary/15 text-primary" : "bg-elev-2 text-ink-muted",
                      )}
                    >
                      {s.label}
                    </span>
                    {i < 2 ? <span className={cn("h-px flex-1", done ? "bg-primary/50" : "bg-elev-2")} /> : null}
                  </div>
                );
              })}
            </div>
            {partner ? (
              <p className="text-[12px] text-ink-muted">
                {partner.name} · {c.workId ? (role === "visual" ? tracks.find((x) => x.id === c.workId)?.title : artworks.find((x) => x.id === c.workId)?.title) : "no work selected yet"}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button
                disabled={!c.partnerId || c.status !== "draft"}
                onClick={() => setCollab({ status: "invited" })}
                className="rounded-full bg-elev-2 px-4 py-2 text-[12px] font-semibold transition hover:brightness-125 disabled:opacity-40"
              >
                {t("coInvite")}
              </button>
              <button
                disabled={c.status !== "invited"}
                onClick={() => setCollab({ status: "accepted" })}
                className="rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
              >
                {t("coSimAccept")}
              </button>
            </div>
            <p className="text-[11px] text-ink-muted/70">Prototype only — no invitation is actually sent.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
