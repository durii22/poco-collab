import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { albumSteps, StepFooter } from "@/components/poco/Steps";
import { RefineChat } from "@/components/poco/RefineChat";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { album, artworks, tracks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create/album/refine")({
  head: () => ({
    meta: [
      { title: "Refine your album by chat — POCO" },
      { name: "description", content: "Ask POCO to warm the mood, reorder the tracks, emphasize the music, or use a more minimal album layout." },
      { property: "og:title", content: "Refine your album by chat — POCO" },
      { property: "og:description", content: "Chat-based refinement of the curated digital album." },
    ],
  }),
  component: Refine,
});

function Refine() {
  const t = useT();
  const navigate = useNavigate();

  return (
    <FlowShell steps={albumSteps} current={4}>
      <SectionTitle eyebrow="Step 05" title={t("refT")} sub={t("refB")} />
      <div className="mt-6">
        <RefineChat suggestions={["ref1", "ref2", "ref3", "ref4"]}>
          {(applied) => {
            const warm = applied.includes("ref1");
            const minimal = applied.includes("ref4");
            const list = applied.includes("ref2") ? [...tracks].reverse() : tracks;
            return (
              <div className={cn("p-4", warm && "bg-[#221b16]")}>
                <p className="eyebrow mb-3">Live preview</p>
                <div className="flex gap-4">
                  <img
                    src={album.cover}
                    alt={album.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={cn("h-28 w-28 shrink-0 object-cover transition-all", minimal ? "rounded-none" : "rounded-xl", warm && "saturate-150 sepia-[.3]")}
                  />
                  <ol className="flex-1 space-y-1.5 text-[13px]">
                    {list.slice(0, 4).map((tr) => (
                      <li key={tr.id} className="flex items-center gap-2 text-ink-muted">
                        <span className="w-5 tabular-nums text-primary">{String(tr.no).padStart(2, "0")}</span>
                        {tr.title}
                      </li>
                    ))}
                  </ol>
                </div>
                {applied.includes("ref3") && (
                  <div className="mt-3 rounded-lg bg-primary/15 px-3 py-2 text-[12px] font-semibold text-primary rise">
                    ♪ Player enlarged · artworks moved below each track note
                  </div>
                )}
                {!applied.includes("ref4") && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {artworks.map((w) => (
                      <img key={w.id} src={w.src} alt={w.title} loading="lazy" width={1024} height={1280} className="aspect-square w-full rounded-md object-cover opacity-80" />
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        </RefineChat>
      </div>
      <StepFooter nextLabel={t("next")} onNext={() => navigate({ to: "/create/album/preview" })} />
    </FlowShell>
  );
}
