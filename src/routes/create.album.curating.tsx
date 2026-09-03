import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/poco/Header";
import { CuratingScreen } from "@/components/poco/Curating";
import { ProgressBar, albumSteps } from "@/components/poco/Steps";

export const Route = createFileRoute("/create/album/curating")({
  head: () => ({
    meta: [
      { title: "POCO is curating your digital album" },
      { name: "description", content: "POCO reads color, mood, rhythm and relationships, then sequences your tracks and artwork into a digital album." },
      { property: "og:title", content: "POCO is curating your digital album" },
      { property: "og:description", content: "Simulated curation of your tracks and visuals." },
    ],
  }),
  component: Curating,
});

function Curating() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pt-5 sm:px-6">
        <ProgressBar steps={albumSteps} current={4} />
      </div>
      <CuratingScreen nextTo="/create/album/refine" />
    </div>
  );
}
