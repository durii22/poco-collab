import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ko";

type Dict = Record<string, { en: string; ko: string }>;

export const dict: Dict = {
  // header / global
  signIn: { en: "Sign in", ko: "로그인" },
  back: { en: "Back", ko: "뒤로" },
  next: { en: "Continue", ko: "계속하기" },
  saveDraft: { en: "Save draft", ko: "임시저장" },
  draftSaved: { en: "Draft saved", ko: "임시저장되었습니다" },
  skip: { en: "Skip for now", ko: "나중에 하기" },
  close: { en: "Close", ko: "닫기" },
  submit: { en: "Submit", ko: "보내기" },

  // landing
  heroLine: {
    en: "Your photos, artwork, music, and creative projects,",
    ko: "당신의 사진, 작품, 음악, 창작 프로젝트를",
  },
  heroAccent: { en: "opened as an online experience", ko: "온라인 경험으로 열다" },
  ctaCurate: { en: "Curate my work", ko: "내 작업 큐레이션하기" },
  ctaVisitor: { en: "Enter as a visitor →", ko: "관람객으로 입장 →" },
  s1t: { en: "Upload your work", ko: "작업을 올리세요" },
  s1b: {
    en: "Drop in photos, artwork, tracks, or creative projects — POCO reads their colors, mood, and relationships.",
    ko: "사진, 작품, 음원, 창작 프로젝트를 올리면 POCO가 색, 무드, 관계를 읽습니다.",
  },
  s2t: { en: "POCO curates", ko: "POCO가 큐레이션합니다" },
  s2b: {
    en: "It chooses frames and spacing, orders the viewing journey, and designs the lighting and atmosphere.",
    ko: "프레임과 여백을 고르고 관람 동선을 정하고 조명과 분위기를 설계합니다.",
  },
  s3t: { en: "Refine by chat", ko: "대화로 다듬으세요" },
  s3b: {
    en: "Adjust the arrangement through chat, then open your exhibition or album with a single link.",
    ko: "대화로 배치를 조정하고, 링크 하나로 전시나 앨범을 공개하세요.",
  },
  finalT: { en: "Open your first exhibition today", ko: "오늘 첫 전시를 열어보세요" },
  finalB: { en: "About five minutes from your first upload.", ko: "첫 업로드부터 약 5분." },
  getStarted: { en: "Get started free", ko: "무료로 시작하기" },

  // project type
  ptTitle: { en: "What would you like to create?", ko: "무엇을 만들고 싶으신가요?" },
  ptSub: {
    en: "This choice applies to this project only — your account is never locked to one artist type.",
    ko: "이 선택은 이번 프로젝트에만 적용됩니다. 계정이 하나의 유형으로 고정되지 않습니다.",
  },
  ptExT: { en: "Online Exhibition", ko: "온라인 전시" },
  ptExB: {
    en: "For photographers, painters, illustrators, designers, and visual storytellers.",
    ko: "사진가, 화가, 일러스트레이터, 디자이너, 비주얼 스토리텔러를 위해.",
  },
  ptExCta: { en: "Create an exhibition", ko: "전시 만들기" },
  ptAlT: { en: "Digital Album", ko: "디지털 앨범" },
  ptAlB: {
    en: "For musicians, vocalists, performers, composers, and instrumentalists.",
    ko: "음악가, 보컬, 연주자, 작곡가를 위해.",
  },
  ptAlCta: { en: "Create a digital album", ko: "디지털 앨범 만들기" },

  // about you
  aboutT: { en: "About you", ko: "당신에 대하여" },
  aboutSubV: { en: "Artist profile and biography", ko: "작가 프로필과 소개" },
  aboutSubM: { en: "Musician profile and biography", ko: "음악가 프로필과 소개" },
  fName: { en: "Name", ko: "이름" },
  fTitleRole: { en: "Practice / role", ko: "활동 분야" },
  fBase: { en: "Based in", ko: "활동 지역" },
  fBio: { en: "Short biography", ko: "짧은 소개" },
  fLinks: { en: "Link (website or social)", ko: "링크 (웹사이트 또는 SNS)" },

  // upload
  upT: { en: "Upload artwork", ko: "작품 업로드" },
  upB: { en: "Add works to this exhibition. Everything here is a prototype mock.", ko: "이 전시에 담을 작품을 추가하세요. 모두 프로토타입 목업입니다." },
  upFile: { en: "File upload", ko: "파일 업로드" },
  upDrive: { en: "Google Drive", ko: "구글 드라이브" },
  upManual: { en: "Manual entry", ko: "직접 입력" },
  addWork: { en: "Add another work", ko: "작품 더 추가" },
  fArtTitle: { en: "Artwork title", ko: "작품명" },
  fYear: { en: "Year", ko: "제작연도" },
  fMedium: { en: "Medium", ko: "매체" },
  fDesc: { en: "Short description", ko: "짧은 설명" },
  fCredit: { en: "Artist credit", ko: "작가 크레딧" },

  // album setup
  albT: { en: "Album information", ko: "앨범 정보" },
  fAlbTitle: { en: "Album title", ko: "앨범 제목" },
  fAlbIntro: { en: "Short album introduction", ko: "앨범 소개" },
  fAlbArtist: { en: "Musician or group name", ko: "음악가 / 팀 이름" },
  fRelease: { en: "Release type", ko: "발매 형태" },
  fGenre: { en: "Genre", ko: "장르" },
  fMood: { en: "Mood", ko: "무드" },
  fCover: { en: "Album cover", ko: "앨범 커버" },
  fCredits: { en: "Overall credits", ko: "전체 크레딧" },

  // tracks
  trT: { en: "Upload tracks", ko: "트랙 업로드" },
  trMp3: { en: "Upload MP3 or M4A", ko: "MP3 · M4A 업로드" },
  trYt: { en: "Add YouTube performance link", ko: "유튜브 공연 링크 추가" },
  trAdd: { en: "Add another track", ko: "트랙 더 추가" },
  fTrackTitle: { en: "Track title", ko: "트랙 제목" },
  fStory: { en: "Track story / program note", ko: "트랙 노트" },
  fComposer: { en: "Composer", ko: "작곡" },
  fLyricist: { en: "Lyricist", ko: "작사" },
  fPerformer: { en: "Performer / vocalist", ko: "연주 / 보컬" },
  fArtCredit: { en: "Visual artwork credit", ko: "비주얼 크레딧" },

  // visual collaboration
  vcT: { en: "How would you like to add visual artwork?", ko: "비주얼 작품은 어떻게 더할까요?" },
  vc1: { en: "Upload my own image", ko: "내 이미지 업로드" },
  vc2: { en: "Use a collaborating visual artist's work", ko: "협업 작가의 작품 사용" },
  vc3: { en: "Invite a visual artist", ko: "비주얼 아티스트 초대" },
  vc4: { en: "Decide later", ko: "나중에 정하기" },

  // curation
  curT: { en: "POCO is curating", ko: "POCO가 큐레이션 중입니다" },
  curB: { en: "Reading color, mood, rhythm, and relationships", ko: "색, 무드, 리듬, 관계를 읽는 중" },
  curDone: { en: "Curation complete", ko: "큐레이션 완료" },

  // refine
  refT: { en: "Refine by chat", ko: "대화로 다듬기" },
  refB: { en: "Ask POCO to adjust the curation.", ko: "POCO에게 조정을 요청하세요." },
  ref1: { en: "Make the mood warmer", ko: "무드를 더 따뜻하게" },
  ref2: { en: "Change the viewing order", ko: "관람 순서 바꾸기" },
  ref3: { en: "Emphasize the music", ko: "음악을 더 강조하기" },
  ref4: { en: "Use a more minimal layout", ko: "더 미니멀한 레이아웃" },
  refApplied: { en: "Applied", ko: "적용됨" },

  // preview / signin / publish
  prevT: { en: "Final preview", ko: "최종 미리보기" },
  prevB: { en: "This is how visitors will see it.", ko: "관람객에게 보이는 모습입니다." },
  toSignIn: { en: "Continue to sign in", ko: "로그인하고 계속하기" },
  siT: { en: "Sign in to publish", ko: "공개하려면 로그인하세요" },
  siB: { en: "You only sign in at the very last step.", ko: "로그인은 마지막 단계에서만 필요합니다." },
  siGoogle: { en: "Continue with Google", ko: "구글로 계속하기" },
  siApple: { en: "Continue with Apple", ko: "애플로 계속하기" },
  siEmail: { en: "Continue with email", ko: "이메일로 계속하기" },
  cfT: { en: "Confirm and publish", ko: "확인하고 공개하기" },
  publish: { en: "Publish now", ko: "지금 공개하기" },

  // published / engagement
  like: { en: "Like", ko: "좋아요" },
  cheer: { en: "Cheer", ko: "응원" },
  share: { en: "Share", ko: "공유" },
  follow: { en: "Follow", ko: "팔로우" },
  following: { en: "Following", ko: "팔로잉" },
  comments: { en: "Comments", ko: "댓글" },
  commentPh: { en: "Leave a note for the artist…", ko: "작가에게 남기는 메모…" },
  post: { en: "Post", ko: "등록" },
  linkCopied: { en: "Link copied (mock)", ko: "링크가 복사되었습니다 (목업)" },
  inqCollab: { en: "Collaboration inquiry", ko: "협업 문의" },
  inqPerf: { en: "Performance inquiry", ko: "공연 문의" },
  joinPilot: { en: "Join the next POCO collaboration", ko: "다음 POCO 협업에 참여하기" },
  sent: { en: "Sent — the artist will reply soon. (Prototype only)", ko: "전송되었습니다. 곧 회신드립니다. (프로토타입)" },
  credits: { en: "Credits", ko: "크레딧" },
  nowPlaying: { en: "Now playing", ko: "재생 중" },
  viewAlbum: { en: "Listen to the digital album", ko: "디지털 앨범 듣기" },
  viewExhibition: { en: "View the exhibition", ko: "전시 보기" },
  viewCollab: { en: "View the collaboration page", ko: "협업 페이지 보기" },
  trackList: { en: "Tracks", ko: "트랙" },
  perfVideo: { en: "Performance video", ko: "공연 영상" },

  // visitor
  visT: { en: "Now open", ko: "지금 열려 있는 전시" },
  visB: { en: "Walk into a POCO exhibition, album, or collaboration.", ko: "POCO 전시, 앨범, 협업을 둘러보세요." },
  visCollab: { en: "Featured collaboration", ko: "이 달의 협업" },

  // collaboration step (both artist types)
  coT: { en: "Would you like to create this project alone or with another artist?", ko: "이 프로젝트를 혼자 만드시겠어요, 다른 아티스트와 함께 만드시겠어요?" },
  coSub: { en: "You can change this at any time before publishing.", ko: "공개 전에는 언제든 변경할 수 있습니다." },
  coAlone: { en: "Create alone", ko: "혼자 만들기" },
  coWith: { en: "Collaborate with another artist", ko: "다른 아티스트와 협업하기" },
  coLater: { en: "Decide later", ko: "나중에 정하기" },
  coPocoPicked: { en: "Collaborator already selected by POCO", ko: "POCO가 이미 협업 아티스트를 매칭했습니다" },
  coPocoPickedB: { en: "For the concierge pilot, POCO has already arranged this pairing.", ko: "컨시어지 파일럿에서는 POCO가 이미 짝을 정해두었습니다." },
  coPickMusician: { en: "Select or invite a musician", ko: "음악가 선택 또는 초대" },
  coPickVisual: { en: "Select or invite a visual artist", ko: "비주얼 아티스트 선택 또는 초대" },
  coPickTrack: { en: "Choose a track or soundtrack", ko: "트랙 또는 사운드트랙 선택" },
  coPickArtwork: { en: "Choose artwork for the album cover or track visuals", ko: "앨범 커버 또는 트랙 비주얼로 쓸 작품 선택" },
  coStatus: { en: "Collaboration status", ko: "협업 상태" },
  coDraft: { en: "Draft", ko: "초안" },
  coInvited: { en: "Invitation sent", ko: "초대 전송됨" },
  coAccepted: { en: "Accepted", ko: "수락됨" },
  coInvite: { en: "Send invitation", ko: "초대 보내기" },
  coSimAccept: { en: "Simulate acceptance", ko: "수락 시뮬레이션" },
  coSelect: { en: "Select", ko: "선택" },
  coSelected: { en: "Selected", ko: "선택됨" },
  coViewProfile: { en: "View profile", ko: "프로필 보기" },

  // pilot admin
  paEntry: { en: "Pilot Admin", ko: "파일럿 관리자" },
  paDash: { en: "POCO Pilot Admin", ko: "POCO 파일럿 관리자" },
  paDashB: { en: "Create and manage concierge collaborations for the first pilot.", ko: "첫 파일럿을 위한 컨시어지 협업을 만들고 관리합니다." },
  paNew: { en: "New collaboration pilot", ko: "새 협업 파일럿" },
  paDrafts: { en: "Draft pilots", ko: "진행 중인 초안" },
  paWaiting: { en: "Waiting for artist approval", ko: "아티스트 승인 대기" },
  paPublished: { en: "Published collaborations", ko: "공개된 협업" },
  paStep1: { en: "Select two artists", ko: "두 아티스트 선택" },
  paStep2: { en: "Select creative works", ko: "작품 선택" },
  paStep3: { en: "Configure the collaboration", ko: "협업 구성" },
  paStep4: { en: "Preview the three outputs", ko: "세 가지 결과 미리보기" },
  paStep5: { en: "Request artist approval", ko: "아티스트 승인 요청" },
  paStep6: { en: "Publish", ko: "공개" },
  paPublishCta: { en: "Publish collaboration", ko: "협업 공개하기" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("poco-lang");
    if (saved === "ko" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("poco-lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useLang();
  return (key: keyof typeof dict | string) => {
    const entry = dict[key as string];
    return entry ? entry[lang] : (key as string);
  };
}
