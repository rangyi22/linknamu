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

export const profile: Profile = {
  name: "WK Bae",
  bio: "Full-stack developer | These days, I'm very interesting in using AI development.",
  avatarUrl: "https://placehold.co/150x150/orange/white",
  links: [
    {
      id: "github",
      label: "🐙 GitHub",
      url: "https://github.com/rangyi22",
    },
    {
      id: "linkedin",
      label: "💼 LinkedIn",
      url: "https://www.linkedin.com/in/wk-bae-344070100",
    },
    {
      id: "blog",
      label: "📝 Blog",
      url: "https://claude.ai/code/artifact/d5fbde4a-988c-4779-8b46-5ee4b3c73813",
    },
  ],
};
