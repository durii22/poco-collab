import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/poco/Header";
import { CuratingScreen } from "@/components/poco/Curating";
import { ProgressBar, exhibitionSteps } from "@/components/poco/Steps";

export const Route = createFileRoute("/create/exhibition/curating")({
  head: () => ({
    meta: [
      { title: "POCO is curating your exhibition" },
      { name: "description", content: "POCO reads color, mood, rhythm and relationships, then arranges your works into an exhibition." },
      { property: "og:title", content: "POCO is curating your exhibition" },
      { property: "og:description", content: "Simulated curation of your uploaded artworks." },
    ],
  }),
  component: Curating,
});

function Curating() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pt-5 sm:px-6">
        <ProgressBar steps={exhibitionSteps} current={2} />
      </div>
      <CuratingScreen nextTo="/create/exhibition/refine" />
    </div>
  );
}
