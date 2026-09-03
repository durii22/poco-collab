import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import albumCover from "@/assets/album-cover.jpg";
import collabHero from "@/assets/collab-hero.jpg";
import artistVisual from "@/assets/artist-visual.jpg";
import artistMusician from "@/assets/artist-musician.jpg";

export { art1, art2, art3, art4, albumCover, collabHero, artistVisual, artistMusician };

export type Artwork = {
  id: string;
  src: string;
  title: string;
  year: string;
  medium: string;
  description: string;
  credit: string;
};

export type Track = {
  id: string;
  no: number;
  title: string;
  duration: number; // seconds (mock)
  story: string;
  composer: string;
  lyricist: string;
  performer: string;
  artCredit: string;
  video?: string;
};

export const visualArtist = {
  name: "Seoyeon Han",
  nameKo: "한서연",
  role: "Photographer · Installation",
  base: "Seoul, KR",
  bio: "Seoyeon works with the light that survives at the end of a day. Her practice moves between analogue photography and small architectural interventions.",
  bioKo: "서연은 하루의 끝에 남은 빛을 다룹니다. 아날로그 사진과 작은 건축적 개입 사이를 오가며 작업합니다.",
  avatar: artistVisual,
};

export const musician = {
  name: "Doyun Park",
  nameKo: "박도윤",
  role: "Cellist · Composer",
  base: "Seoul, KR",
  bio: "Doyun writes short pieces for cello and room tone. He performs in unfinished buildings, libraries, and other places that were not built for music.",
  bioKo: "도윤은 첼로와 공간의 소리를 위한 짧은 곡을 씁니다. 음악을 위해 지어지지 않은 장소에서 연주합니다.",
  avatar: artistMusician,
};

export const exhibition = {
  slug: "quiet-hours",
  title: "Quiet Hours",
  titleKo: "고요한 시간",
  statement:
    "Six rooms about the last forty minutes of daylight. POCO arranged the works so the light falls, then returns.",
  statementKo: "해가 지기 전 마지막 40분에 관한 여섯 개의 방. POCO는 빛이 지고 다시 돌아오도록 작품을 배치했습니다.",
  year: "2026",
  cover: art1,
};

export const artworks: Artwork[] = [
  {
    id: "w1",
    src: art1,
    title: "Room Without a Window",
    year: "2025",
    medium: "Archival pigment print, 90 × 120 cm",
    description: "A concrete room photographed forty minutes before the light left it.",
    credit: "Seoyeon Han",
  },
  {
    id: "w2",
    src: art2,
    title: "Blue Fault Line",
    year: "2025",
    medium: "Oil and pigment on canvas, 60 × 80 cm",
    description: "Painted over three winters; the blue line is the only thing never repainted.",
    credit: "Seoyeon Han",
  },
  {
    id: "w3",
    src: art3,
    title: "City, Through Rain",
    year: "2024",
    medium: "Archival pigment print, 75 × 100 cm",
    description: "Shot from a rehearsal room window while a cello was tuning behind the camera.",
    credit: "Seoyeon Han",
  },
  {
    id: "w4",
    src: art4,
    title: "Folded Light",
    year: "2026",
    medium: "Silver gelatin print, 40 × 50 cm",
    description: "A single piece of raw silk, folded once a day for a month.",
    credit: "Seoyeon Han",
  },
];

export const album = {
  slug: "room-tone",
  title: "Room Tone",
  titleKo: "룸 톤",
  artist: musician.name,
  intro:
    "Five pieces for cello, recorded inside the same emptied building that Seoyeon Han photographed. Nothing was added afterwards except the room.",
  introKo:
    "한서연이 촬영한 바로 그 빈 건물 안에서 녹음한 첼로 다섯 곡. 공간의 울림 외에는 아무것도 더하지 않았습니다.",
  releaseType: "EP",
  genre: "Modern classical",
  mood: "Still, blue, patient",
  cover: albumCover,
  credits: [
    "Composed & performed by Doyun Park",
    "Recording & mix — Nari Cho, Studio Bansong",
    "Mastering — Ilwoo Kim",
    "Cover artwork — Seoyeon Han, 'Room Without a Window' (2025)",
    "Curation — POCO",
  ],
};

export const tracks: Track[] = [
  {
    id: "t1",
    no: 1,
    title: "Forty Minutes of Daylight",
    duration: 212,
    story: "Recorded at 18:40, in one take, as the light crossed the west wall.",
    composer: "Doyun Park",
    lyricist: "—",
    performer: "Doyun Park (cello)",
    artCredit: "Seoyeon Han, 'Room Without a Window'",
  },
  {
    id: "t2",
    no: 2,
    title: "Fault Line",
    duration: 178,
    story: "A response to a single blue line in Seoyeon's painting — one note held under everything.",
    composer: "Doyun Park",
    lyricist: "—",
    performer: "Doyun Park (cello), Nari Cho (room mics)",
    artCredit: "Seoyeon Han, 'Blue Fault Line'",
  },
  {
    id: "t3",
    no: 3,
    title: "Rain Through the Rehearsal Window",
    duration: 245,
    story: "The rain in the recording is real; it arrived halfway through the second take.",
    composer: "Doyun Park",
    lyricist: "Jieun Seo",
    performer: "Doyun Park (cello), Jieun Seo (voice)",
    artCredit: "Seoyeon Han, 'City, Through Rain'",
    video: "Live at Bansong Hall, 2026",
  },
  {
    id: "t4",
    no: 4,
    title: "Folded Once a Day",
    duration: 191,
    story: "Four bars, repeated thirty times, each repetition one degree quieter.",
    composer: "Doyun Park",
    lyricist: "—",
    performer: "Doyun Park (cello)",
    artCredit: "Seoyeon Han, 'Folded Light'",
  },
  {
    id: "t5",
    no: 5,
    title: "Room Tone",
    duration: 264,
    story: "The building alone, for two minutes, before the cello agrees to enter.",
    composer: "Doyun Park",
    lyricist: "—",
    performer: "Doyun Park (cello)",
    artCredit: "Seoyeon Han",
    video: "Live at Bansong Hall, 2026",
  },
];

export const collaboration = {
  title: "Quiet Hours × Room Tone",
  hero: collabHero,
  story:
    "Seoyeon spent a month photographing an emptied office building in Seongsu. Doyun asked to record inside it before demolition. Neither project was made for the other, and they now cannot be separated.",
  storyKo:
    "서연은 성수동의 비워진 건물을 한 달간 촬영했고, 도윤은 철거 전 그 안에서 녹음하기를 청했습니다. 서로를 위해 만든 작업이 아니었지만 이제 분리할 수 없습니다.",
};

export const seedComments = {
  exhibition: [
    { id: "c1", name: "Minji", text: "Room 3 stopped me for a full minute. Thank you for opening this.", when: "2 days ago" },
    { id: "c2", name: "Aleks", text: "The order of the works does something — it really does fall and return.", when: "5 days ago" },
  ],
  album: [
    { id: "c3", name: "Haneul", text: "Track 5 with headphones, lights off. Extraordinary.", when: "1 day ago" },
    { id: "c4", name: "Théo", text: "Listened while scrolling the exhibition. They belong together.", when: "4 days ago" },
  ],
  collaboration: [
    { id: "c5", name: "Sora", text: "More of this please. Two artists, one room, one link.", when: "3 hours ago" },
  ],
};

export const seedCounts = {
  exhibition: { likes: 328, cheers: 94 },
  album: { likes: 512, cheers: 168 },
  collaboration: { likes: 741, cheers: 233 },
};

export function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ---------- Collaboration directory (mock) ---------- */

export type DirectoryArtist = {
  id: string;
  type: "visual" | "musician";
  name: string;
  nameKo: string;
  role: string;
  region: string;
  tag: string; // genre or medium
  availability: "Open to collaborate" | "Selectively open" | "Booked until Q4";
  avatar: string;
  bio: string;
};

export const directory: DirectoryArtist[] = [
  {
    id: "va-1",
    type: "visual",
    name: "Seoyeon Han",
    nameKo: "한서연",
    role: "Photographer · Installation",
    region: "Seoul, KR",
    tag: "Analogue photography",
    availability: "Open to collaborate",
    avatar: artistVisual,
    bio: "Works with the light that survives at the end of a day.",
  },
  {
    id: "va-2",
    type: "visual",
    name: "Mira Oyelaran",
    nameKo: "미라 오옐라란",
    role: "Painter",
    region: "Berlin, DE",
    tag: "Oil on canvas",
    availability: "Selectively open",
    avatar: art2,
    bio: "Large blue fields painted over several winters.",
  },
  {
    id: "va-3",
    type: "visual",
    name: "Junho Baek",
    nameKo: "백준호",
    role: "Illustrator · Type",
    region: "Busan, KR",
    tag: "Digital illustration",
    availability: "Booked until Q4",
    avatar: art4,
    bio: "Folded paper, folded light, one drawing a day.",
  },
  {
    id: "mu-1",
    type: "musician",
    name: "Doyun Park",
    nameKo: "박도윤",
    role: "Cellist · Composer",
    region: "Seoul, KR",
    tag: "Modern classical",
    availability: "Open to collaborate",
    avatar: artistMusician,
    bio: "Short pieces for cello and room tone.",
  },
  {
    id: "mu-2",
    type: "musician",
    name: "Nari Cho",
    nameKo: "조나리",
    role: "Producer · Ambient",
    region: "Seoul, KR",
    tag: "Ambient / electronic",
    availability: "Selectively open",
    avatar: art3,
    bio: "Field recordings folded into slow synth beds.",
  },
  {
    id: "mu-3",
    type: "musician",
    name: "Théo Marchand",
    nameKo: "테오 마르샹",
    role: "Vocalist · Guitar",
    region: "Lyon, FR",
    tag: "Folk",
    availability: "Open to collaborate",
    avatar: art1,
    bio: "Two microphones, one room, no overdubs.",
  },
];

export const visualArtists = directory.filter((a) => a.type === "visual");
export const musicians = directory.filter((a) => a.type === "musician");

export type PilotStatus = "draft" | "review" | "changes" | "approved";

export const samplePilots = [
  { id: "p-1", title: "Quiet Hours × Room Tone", state: "published", pair: "Seoyeon Han × Doyun Park", note: "Published 12 Mar 2026" },
  { id: "p-2", title: "Salt Field × Low Tide", state: "waiting", pair: "Mira Oyelaran × Nari Cho", note: "Waiting for musician approval" },
  { id: "p-3", title: "Paper Weather (untitled)", state: "draft", pair: "Junho Baek × Théo Marchand", note: "Draft — works not selected" },
] as const;
