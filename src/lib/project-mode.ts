import { artworks, directory, tracks } from "./mock-data";
import { usePoco } from "./poco-store";

export type ResolvedMode = "solo" | "collaboration" | "decide_later" | "demo";

/**
 * Single source of truth for the conditional flow.
 * `demo` is the untouched visitor sample (no project started in this browser).
 * A collaboration result is only ever produced when a partner AND a work exist.
 */
export function useProjectMode() {
  const { state } = usePoco();
  const c = state.collab;

  const partner = directory.find((a) => a.id === c.partnerId) ?? null;
  const track = tracks.find((tr) => tr.id === c.workId) ?? null;
  const artwork = artworks.find((w) => w.id === c.workId) ?? null;

  const mode: ResolvedMode =
    c.mode === null
      ? "demo"
      : c.mode === "alone"
        ? "solo"
        : c.mode === "later"
          ? "decide_later"
          : partner
            ? "collaboration"
            : "decide_later";

  const isCollaboration = mode === "collaboration";

  return {
    projectType: state.projectType,
    mode,
    isDemo: mode === "demo",
    isSolo: mode === "solo",
    isLater: mode === "decide_later",
    isCollaboration,
    partner: isCollaboration ? partner : null,
    track: isCollaboration ? track : null,
    artwork: isCollaboration ? artwork : null,
    status: c.status,
    pocoArranged: c.pocoArranged,
  };
}

export function modeLabel(mode: ResolvedMode) {
  return mode === "solo"
    ? "Solo"
    : mode === "collaboration"
      ? "Collaboration"
      : mode === "decide_later"
        ? "Decide later"
        : "Sample";
}

export function projectTypeLabel(t: string | null) {
  return t === "exhibition" ? "Online exhibition (visual_exhibition)" : t === "album" ? "Digital album (digital_album)" : "Not selected";
}
