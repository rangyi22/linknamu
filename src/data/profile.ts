export type LinkItem = {
  id: string;
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatarUrl?: string;
  links: LinkItem[];
};

// 더미 프로필 사진 (실제 사진 나오기 전까지 자리를 채워두는 플레이스홀더 아이콘)
const dummyAvatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="48" fill="#94a3b8" />
  <circle cx="48" cy="38" r="18" fill="#f1f5f9" />
  <path d="M12 90c4-22 22-34 36-34s32 12 36 34" fill="#f1f5f9" />
</svg>
`;
const dummyAvatarUrl = `data:image/svg+xml;utf8,${encodeURIComponent(dummyAvatarSvg)}`;

export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  avatarUrl: dummyAvatarUrl,
  links: [
    { id: "github", label: "GitHub", url: "https://github.com/example" },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/example",
    },
    { id: "blog", label: "Blog", url: "https://example.com/blog" },
  ],
};
