import { useState } from "react";
import { Check, MapPin } from "lucide-react";
import type { DirectoryArtist } from "@/lib/mock-data";
import { useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ArtistCard({
  artist,
  selected,
  onSelect,
}: {
  artist: DirectoryArtist;
  selected: boolean;
  onSelect: () => void;
}) {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("panel p-4 transition", selected && "border-primary/70 ring-1 ring-primary/30")}>
      <div className="flex items-start gap-3">
        <img
          src={artist.avatar}
          alt={artist.name}
          loading="lazy"
          width={200}
          height={200}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{lang === "ko" ? artist.nameKo : artist.name}</p>
          <p className="truncate text-[12px] text-ink-muted">{artist.role}</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-muted">
            <MapPin className="h-3 w-3" /> {artist.region} · {artist.tag}
          </p>
          <p
            className={cn(
              "mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold",
              artist.availability === "Open to collaborate"
                ? "bg-primary/15 text-primary"
                : "bg-elev-2 text-ink-muted",
            )}
          >
            {artist.availability}
          </p>
        </div>
      </div>

      {open ? <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">{artist.bio}</p> : null}

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border border-stroke-panel px-3 py-1.5 text-[12px] font-semibold text-ink-muted transition hover:text-foreground"
        >
          {t("coViewProfile")}
        </button>
        <button
          onClick={onSelect}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition",
            selected ? "bg-primary text-primary-foreground" : "bg-elev-2 text-foreground hover:brightness-125",
          )}
        >
          {selected ? <Check className="h-3.5 w-3.5" /> : null}
          {selected ? t("coSelected") : t("coSelect")}
        </button>
      </div>
    </div>
  );
}
