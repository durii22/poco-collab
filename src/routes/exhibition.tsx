import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/poco/Header";
import { ExhibitionView } from "@/components/poco/ExhibitionView";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/exhibition")({
  head: () => ({
    meta: [
      { title: "Quiet Hours — an online exhibition by Seoyeon Han | POCO" },
      {
        name: "description",
        content:
          "Six rooms about the last forty minutes of daylight, curated by POCO, with sound by cellist Doyun Park from the digital album Room Tone.",
      },
      { property: "og:title", content: "Quiet Hours — an online exhibition by Seoyeon Han" },
      { property: "og:description", content: "A POCO-curated online exhibition with a music player, comments, cheers and collaboration inquiries." },
    ],
  }),
  component: ExhibitionPage,
});

function ExhibitionPage() {
  const { state } = usePoco();
  const r = state.refinements;
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ExhibitionView
          warm={r.includes("ref1")}
          reordered={r.includes("ref2")}
          emphasizeMusic={r.includes("ref3")}
          minimal={r.includes("ref4")}
        />
      </main>
      <Footer />
    </div>
  );
}
