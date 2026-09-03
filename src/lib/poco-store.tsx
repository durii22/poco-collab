import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedComments, seedCounts } from "./mock-data";

export type ProjectType = "exhibition" | "album" | null;

export type Comment = { id: string; name: string; text: string; when: string };

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
};

type Ctx = {
  state: PocoState;
  set: (patch: Partial<PocoState>) => void;
  toggleLike: (key: string) => void;
  addCheer: (key: string) => void;
  addComment: (key: string, name: string, text: string) => void;
  toggleFollow: (who: string) => void;
  reset: () => void;
};

const StoreContext = createContext<Ctx>({
  state: defaultState,
  set: () => {},
  toggleLike: () => {},
  addCheer: () => {},
  addComment: () => {},
  toggleFollow: () => {},
  reset: () => {},
});

const KEY = "poco-prototype-v1";

export function PocoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PocoState>(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
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
      toggleFollow: (who) => set({ following: { ...state.following, [who]: !state.following[who] } }),
      reset: () => persist(defaultState),
    };
  }, [state, persist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function usePoco() {
  return useContext(StoreContext);
}
