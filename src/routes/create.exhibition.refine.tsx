import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FlowShell } from "@/components/poco/FlowShell";
import { exhibitionSteps, StepFooter } from "@/components/poco/Steps";
import { RefineChat } from "@/components/poco/RefineChat";
import { SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { artworks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create/exhibition/refine")({
  head: () => ({
    meta: [
      { title: "Refine your exhibition by chat — POCO" },
      { name: "description", content: "Ask POCO to warm the mood, change the viewing order, emphasize the music, or use a more minimal layout." },
      { property: "og:title", content: "Refine your exhibition by chat — POCO" },
      { property: "og:description", content: "Chat-based refinement of the AI curation." },
    ],
  }),
  component: Refine,
});

function Refine() {
  const t = useT();
  const navigate = useNavigate();

  return (
    <FlowShell steps={exhibitionSteps} current={3}>
      <SectionTitle eyebrow="Step 04" title={t("refT")} sub={t("refB")} />
      <div className="mt-6">
        <RefineChat suggestions={["ref1", "ref2", "ref3", "ref4"]}>
          {(applied) => {
            const warm = applied.includes("ref1");
            const minimal = applied.includes("ref4");
            const list = applied.includes("ref2") ? [...artworks].reverse() : artworks;
            return (
              <div className={cn("p-4", warm && "bg-[#221b16]")}>
                <p className="eyebrow mb-3">Live preview</p>
                <div className={cn("grid grid-cols-2 gap-2", minimal && "gap-6")}>
                  {list.slice(0, 4).map((w) => (
                    <img
                      key={w.id}
                      src={w.src}
                      alt={w.title}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className={cn(
                        "aspect-[4/5] w-full object-cover transition-all duration-500",
                        minimal ? "rounded-none" : "rounded-lg border border-stroke-panel",
                        warm && "saturate-125 sepia-[.25]",
                      )}
                    />
                  ))}
                </div>
                {applied.includes("ref3") && (
                  <div className="mt-3 rounded-lg bg-primary/15 px-3 py-2 text-[12px] font-semibold text-primary rise">
                    ♪ Room Tone — Doyun Park · player pinned to the top of the exhibition
                  </div>
                )}
              </div>
            );
          }}
        </RefineChat>
      </div>
      <StepFooter nextLabel={t("next")} onNext={() => navigate({ to: "/create/exhibition/preview" })} />
    </FlowShell>
  );
}
