import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { AdminShell, AdminFooterNav, Toast, useToast } from "@/components/poco/AdminShell";
import { ArtistCard } from "@/components/poco/ArtistCard";
import { Field, SectionTitle } from "@/components/poco/ui";
import { useT } from "@/lib/i18n";
import { musicians, visualArtists } from "@/lib/mock-data";
import { usePoco, type ManualArtist } from "@/lib/poco-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/new/artists")({
  head: () => ({
    meta: [
      { title: "Select two artists — POCO Pilot Admin" },
      { name: "description", content: "Pick one visual artist and one musician for a POCO-managed collaboration pilot." },
      { property: "og:title", content: "Select two artists — POCO Pilot Admin" },
      { property: "og:description", content: "Mock artist directory with region, medium and collaboration availability." },
    ],
  }),
  component: Artists,
});

function ManualForm({ type, onAdd }: { type: "visual" | "musician"; onAdd: (a: ManualArtist) => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", role: "", region: "", tag: "" });
  return (
    <div className="panel p-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-[13px] font-semibold text-primary"
      >
        <UserPlus className="h-4 w-4" />
        {type === "visual" ? "Add a new visual artist manually" : "Add a new musician manually"}
      </button>
      {open ? (
        <div className="mt-4 space-y-3">
          <Field label="Name" value={f.name} onChange={(v) => setF({ ...f, name: v })} placeholder="Artist name" />
          <Field label="Practice / role" value={f.role} onChange={(v) => setF({ ...f, role: v })} placeholder="Painter" />
          <Field label="Region" value={f.region} onChange={(v) => setF({ ...f, region: v })} placeholder="Seoul, KR" />
          <Field label={type === "visual" ? "Medium" : "Genre"} value={f.tag} onChange={(v) => setF({ ...f, tag: v })} placeholder="Oil on canvas" />
          <button
            disabled={!f.name}
            onClick={() => {
              onAdd({ id: `manual-${Date.now()}`, type, name: f.name, role: f.role, region: f.region, tag: f.tag });
              setF({ name: "", role: "", region: "", tag: "" });
              setOpen(false);
            }}
            className="rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground disabled:opacity-40"
          >
            Add to directory (prototype)
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Artists() {
  const t = useT();
  const navigate = useNavigate();
  const { state, setPilot } = usePoco();
  const p = state.pilot;
  const { msg, toast } = useToast();

  const manual = (type: "visual" | "musician") => p.manualArtists.filter((m) => m.type === type);

  const addManual = (a: ManualArtist) => {
    setPilot({ manualArtists: [...p.manualArtists, a] });
    toast(`${a.name} added to the prototype directory`);
  };

  const ManualRow = ({ a, selected, onSelect }: { a: ManualArtist; selected: boolean; onSelect: () => void }) => (
    <div className={cn("panel flex items-center gap-3 p-4", selected && "border-primary/70 ring-1 ring-primary/30")}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-elev-2 text-sm font-bold">
        {a.name.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{a.name}</p>
        <p className="truncate text-[12px] text-ink-muted">{a.role || "—"} · {a.region || "—"} · {a.tag || "—"}</p>
      </div>
      <button
        onClick={onSelect}
        className={cn(
          "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold",
          selected ? "bg-primary text-primary-foreground" : "bg-elev-2 hover:brightness-125",
        )}
      >
        {selected ? t("coSelected") : t("coSelect")}
      </button>
    </div>
  );

  return (
    <AdminShell current={0}>
      <SectionTitle eyebrow="Step 01" title={t("paStep1")} sub="Exactly one visual artist and one musician must be selected." />

      <section className="mt-8 space-y-3">
        <p className="eyebrow">Select a visual artist</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {visualArtists.map((a) => (
            <ArtistCard key={a.id} artist={a} selected={p.visualId === a.id} onSelect={() => setPilot({ visualId: a.id })} />
          ))}
          {manual("visual").map((a) => (
            <ManualRow key={a.id} a={a} selected={p.visualId === a.id} onSelect={() => setPilot({ visualId: a.id })} />
          ))}
        </div>
        <ManualForm type="visual" onAdd={addManual} />
      </section>

      <section className="mt-10 space-y-3">
        <p className="eyebrow">Select a musician</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {musicians.map((a) => (
            <ArtistCard key={a.id} artist={a} selected={p.musicianId === a.id} onSelect={() => setPilot({ musicianId: a.id })} />
          ))}
          {manual("musician").map((a) => (
            <ManualRow key={a.id} a={a} selected={p.musicianId === a.id} onSelect={() => setPilot({ musicianId: a.id })} />
          ))}
        </div>
        <ManualForm type="musician" onAdd={addManual} />
      </section>

      <AdminFooterNav
        nextLabel={t("next")}
        disabled={!p.visualId || !p.musicianId}
        onNext={() => navigate({ to: "/admin/new/works" })}
      />
      <Toast msg={msg} />
    </AdminShell>
  );
}
