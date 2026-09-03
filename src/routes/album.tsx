import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components/poco/Header";
import { AlbumView } from "@/components/poco/AlbumView";
import { usePoco } from "@/lib/poco-store";

export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "Room Tone — a digital album by Doyun Park | POCO" },
      {
        name: "description",
        content:
          "Five pieces for cello recorded inside an emptied building, with track stories, performance video and artworks by Seoyeon Han, curated by POCO.",
      },
      { property: "og:title", content: "Room Tone — a digital album by Doyun Park" },
      { property: "og:description", content: "An editorial digital album with player, track stories, artwork, comments and inquiries." },
    ],
  }),
  component: AlbumPage,
});

function AlbumPage() {
  const { state } = usePoco();
  const r = state.refinements;
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AlbumView warm={r.includes("ref1")} reordered={r.includes("ref2")} minimal={r.includes("ref4")} />
      </main>
      <Footer />
    </div>
  );
}
