import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedComments, seedCounts } from "./mock-data";

export type ProjectType = "exhibition" | "album" | null;

export type Comment = { id: string; name: string; text: string; when: string };

export type CollabMode = "alone" | "collab" | "later" | null;
export type CollabStatus = "draft" | "invited" | "accepted";
export type PilotApproval = "none" | "review" | "changes" | "approved";

export type ManualArtist = { id: string; type: "visual" | "musician"; name: string; role: string; region: string; tag: string };

export type CollabState = {
  mode: CollabMode;
  partnerId: string | null;
  workId: string | null; // track id (visual artist flow) or artwork id (musician flow)
  status: CollabStatus;
  pocoArranged: boolean;
};

export type PilotState = {
  visualId: string | null;
  musicianId: string | null;
  coverArtworkId: string | null;
  exhibitionArtworkIds: string[];
  trackIds: string[];
  featuredTrackId: string | null;
  performanceVideo: boolean;
  manualArtists: ManualArtist[];
  config: {
    collabTitle: string;
    story: string;
    exhibitionTitle: string;
    albumTitle: string;
    artistCredits: string;
    artworkCredits: string;
    musicCredits: string;
    inquiryLink: string;
    order: string;
  };
  approvals: { visual: PilotApproval; musician: PilotApproval };
  sent: { visual: boolean; musician: boolean };
  published: boolean;
};

export type PocoState = {
  projectType: ProjectType;
  artist: { name: string; role: string; base: string; bio: string; link: string };
  uploadedWorks: number;
  albumInfo: { title: string; intro: string; artist: string; release: string; genre: string; mood: string; credits: string };
  uploadedTracks: number;
  coverUploaded: boolean;
  visualChoice: string | null;
  refinements: string[];
  signedIn: boolean;
  published: { exhibition: boolean; album: boolean };
  engagement: Record<string, { likes: number; cheers: number; liked: boolean; cheered: boolean; comments: Comment[] }>;
  following: Record<string, boolean>;
  draftSavedAt: string | null;
  collab: CollabState;
  pilot: PilotState;
};

export const defaultCollab: CollabState = {
  mode: null,
  partnerId: null,
  workId: null,
  status: "draft",
  pocoArranged: false,
};

export const defaultPilot: PilotState = {
  visualId: null,
  musicianId: null,
  coverArtworkId: null,
  exhibitionArtworkIds: [],
  trackIds: [],
  featuredTrackId: null,
  performanceVideo: false,
  manualArtists: [],
  config: {
    collabTitle: "",
    story: "",
    exhibitionTitle: "",
    albumTitle: "",
    artistCredits: "",
    artworkCredits: "",
    musicCredits: "",
    inquiryLink: "",
    order: "Exhibition first",
  },
  approvals: { visual: "none", musician: "none" },
  sent: { visual: false, musician: false },
  published: false,
};

const defaultState: PocoState = {
  projectType: null,
  artist: { name: "", role: "", base: "", bio: "", link: "" },
  uploadedWorks: 0,
  albumInfo: { title: "", intro: "", artist: "", release: "EP", genre: "", mood: "", credits: "" },
  uploadedTracks: 0,
  coverUploaded: false,
  visualChoice: null,
  refinements: [],
  signedIn: false,
  published: { exhibition: false, album: false },
  engagement: {
    exhibition: { ...seedCounts.exhibition, liked: false, cheered: false, comments: [...seedComments.exhibition] },
    album: { ...seedCounts.album, liked: false, cheered: false, comments: [...seedComments.album] },
    collaboration: { ...seedCounts.collaboration, liked: false, cheered: false, comments: [...seedComments.collaboration] },
  },
  following: {},
  draftSavedAt: null,
  collab: defaultCollab,
  pilot: defaultPilot,
};

type Ctx = {
  state: PocoState;
  set: (patch: Partial<PocoState>) => void;
  toggleLike: (key: string) => void;
  addCheer: (key: string) => void;
  addComment: (key: string, name: string, text: string) => void;
  toggleFollow: (who: string) => void;
  setCollab: (patch: Partial<CollabState>) => void;
  setPilot: (patch: Partial<PilotState>) => void;
  setPilotConfig: (patch: Partial<PilotState["config"]>) => void;
  reset: () => void;
};

const StoreContext = createContext<Ctx>({
  state: defaultState,
  set: () => {},
  toggleLike: () => {},
  addCheer: () => {},
  addComment: () => {},
  toggleFollow: () => {},
  setCollab: () => {},
  setPilot: () => {},
  setPilotConfig: () => {},
  reset: () => {},
});

const KEY = "poco-prototype-v1";

export function PocoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PocoState>(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PocoState>;
        setState({
          ...defaultState,
          ...saved,
          collab: { ...defaultCollab, ...(saved.collab ?? {}) },
          pilot: {
            ...defaultPilot,
            ...(saved.pilot ?? {}),
            config: { ...defaultPilot.config, ...(saved.pilot?.config ?? {}) },
            approvals: { ...defaultPilot.approvals, ...(saved.pilot?.approvals ?? {}) },
            sent: { ...defaultPilot.sent, ...(saved.pilot?.sent ?? {}) },
          },
        });
      }
    } catch {
      /* prototype only */
    }
  }, []);

  const persist = useCallback((next: PocoState) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* prototype only */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const set = (patch: Partial<PocoState>) => persist({ ...state, ...patch });
    const eng = (key: string) =>
      state.engagement[key] ?? { likes: 0, cheers: 0, liked: false, cheered: false, comments: [] };

    return {
      state,
      set,
      toggleLike: (key) => {
        const e = eng(key);
        set({
          engagement: {
            ...state.engagement,
            [key]: { ...e, liked: !e.liked, likes: e.likes + (e.liked ? -1 : 1) },
          },
        });
      },
      addCheer: (key) => {
        const e = eng(key);
        set({ engagement: { ...state.engagement, [key]: { ...e, cheers: e.cheers + 1, cheered: true } } });
      },
      addComment: (key, name, text) => {
        const e = eng(key);
        const c: Comment = { id: `${Date.now()}`, name: name || "Guest", text, when: "just now" };
        set({ engagement: { ...state.engagement, [key]: { ...e, comments: [c, ...e.comments] } } });
      },
      setCollab: (patch) => set({ collab: { ...state.collab, ...patch } }),
      setPilot: (patch) => set({ pilot: { ...state.pilot, ...patch } }),
      setPilotConfig: (patch) => set({ pilot: { ...state.pilot, config: { ...state.pilot.config, ...patch } } }),
      toggleFollow: (who) => set({ following: { ...state.following, [who]: !state.following[who] } }),
      reset: () => persist(defaultState),
    };
  }, [state, persist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function usePoco() {
  return useContext(StoreContext);
}
