import { useState, type ReactNode } from "react";
import { Heart, Sparkles, Share2, Send, UserPlus, UserCheck, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { usePoco } from "@/lib/poco-store";
import { cn } from "@/lib/utils";
import { Button } from "./ui";

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="w-full max-w-md rounded-t-3xl border border-stroke-panel bg-popover p-6 sm:rounded-3xl">
        <div className="mb-4 flex justify-end">
          <button onClick={onClose} className="text-ink-muted transition hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function InquiryModal({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  const t = useT();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const input =
    "w-full rounded-xl border border-stroke-panel bg-surface-note px-3.5 py-3 text-sm outline-none focus:border-primary/70";

  return (
    <Modal
      open={open}
      onClose={() => {
        setSent(false);
        onClose();
      }}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      {sent ? (
        <p className="mt-4 rounded-xl bg-primary/10 p-4 text-sm text-primary">{t("sent")}</p>
      ) : (
        <div className="mt-4 space-y-3">
          <input className={input} placeholder="Name / organisation" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={input} placeholder="Email" />
          <textarea
            rows={4}
            className={input}
            placeholder="Tell the artist what you have in mind…"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button className="w-full" onClick={() => setSent(true)}>
            {t("submit")}
          </Button>
          <p className="text-center text-[11px] text-ink-muted">Prototype only — nothing is stored or sent.</p>
        </div>
      )}
    </Modal>
  );
}

export function EngagementBar({ pageKey }: { pageKey: string }) {
  const t = useT();
  const { state, toggleLike, addCheer } = usePoco();
  const e = state.engagement[pageKey];
  const [shared, setShared] = useState(false);
  const [burst, setBurst] = useState(false);

  const chip = "inline-flex h-11 items-center gap-2 rounded-full border border-stroke-panel px-4 text-sm font-semibold transition";

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => toggleLike(pageKey)} className={cn(chip, e?.liked ? "border-primary/60 bg-primary/15 text-primary" : "text-ink-strong hover:bg-elev-2")}>
        <Heart className={cn("h-4 w-4", e?.liked && "fill-current")} />
        {t("like")} · {e?.likes ?? 0}
      </button>
      <button
        onClick={() => {
          addCheer(pageKey);
          setBurst(true);
          setTimeout(() => setBurst(false), 600);
        }}
        className={cn(chip, "text-ink-strong hover:bg-elev-2", burst && "border-primary/60 bg-primary/15 text-primary")}
      >
        <Sparkles className={cn("h-4 w-4", burst && "animate-ping")} />
        {t("cheer")} · {e?.cheers ?? 0}
      </button>
      <button
        onClick={() => {
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        }}
        className={cn(chip, "text-ink-strong hover:bg-elev-2")}
      >
        <Share2 className="h-4 w-4" />
        {shared ? t("linkCopied") : t("share")}
      </button>
    </div>
  );
}

export function FollowButton({ who }: { who: string }) {
  const t = useT();
  const { state, toggleFollow } = usePoco();
  const on = !!state.following[who];
  return (
    <button
      onClick={() => toggleFollow(who)}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition",
        on ? "bg-elev-2 text-ink-strong" : "bg-primary text-primary-foreground hover:brightness-110",
      )}
    >
      {on ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
      {on ? t("following") : t("follow")}
    </button>
  );
}

export function Comments({ pageKey }: { pageKey: string }) {
  const t = useT();
  const { state, addComment } = usePoco();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const list = state.engagement[pageKey]?.comments ?? [];

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-bold tracking-wide text-ink-strong">
        {t("comments")} · {list.length}
      </h3>
      <div className="panel space-y-3 p-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl border border-stroke-panel bg-surface-note px-3.5 py-2.5 text-sm outline-none focus:border-primary/70"
        />
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("commentPh")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim()) {
                addComment(pageKey, name, text.trim());
                setText("");
              }
            }}
            className="flex-1 rounded-xl border border-stroke-panel bg-surface-note px-3.5 py-2.5 text-sm outline-none focus:border-primary/70"
          />
          <Button
            size="sm"
            className="h-auto px-4"
            disabled={!text.trim()}
            onClick={() => {
              addComment(pageKey, name, text.trim());
              setText("");
            }}
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">{t("post")}</span>
          </Button>
        </div>
      </div>
      <ul className="space-y-3">
        {list.map((c) => (
          <li key={c.id} className="panel rise p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-ink-strong">{c.name}</span>
              <span className="text-[11px] text-ink-muted">{c.when}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
