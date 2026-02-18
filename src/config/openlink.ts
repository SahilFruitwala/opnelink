export type SocialType =
  | "twitter"
  | "github"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "newsletter"
  | "custom";

export type SocialLink = {
  type: SocialType;
  label: string;
  href: string;
};

export type FeaturedLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  highlightKey?: string;
  iconEmoji?: string;
  iconImageUrl?: string;
};

export type LinkItem = {
  label: string;
  href: string;
  description?: string;
  iconEmoji?: string;
  iconImageUrl?: string;
};

export type NewsletterConfig = {
  provider: "beehiiv" | "substack" | "custom";
  /** Required when provider is "custom"; ignored for "beehiiv" (uses API route). */
  action?: string;
  method?: "POST" | "GET";
  hiddenFields?: Record<string, string>;
};

export type EmbedType = "youtube" | "spotify" | "podcast" | "iframe";

export type EmbedItem = {
  type: EmbedType;
  title: string;
  src: string;
};

export const profile = {
  name: "Sahil Fruitwala",
  handle: "@SahilBeingSahil",
  role: "Developer & Creator",
  avatarUrl: "/profile.webp",
  bio: "Building the future of digital expression, one pixel at a time.",
};

export const socialLinks: SocialLink[] = [
  {
    type: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/SahilBeingSahil",
  },
  {
    type: "github",
    label: "GitHub",
    href: "https://github.com/SahilFruitwala",
  },
  {
    type: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@SahilBeingSahil",
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahilfruitwala",
  },
  {
    type: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/SahilBeingSahil",
  },
];

export const featuredLinks: FeaturedLink[] = [
  {
    label: "Personal Website",
    href: "https://sahilfruitwala.com/",
    description: "Blog & Thoughts",
    highlightKey: "blog",
    iconEmoji: "◈",
  },
];

export const links: LinkItem[] = [
  {
    label: "MicroPNG",
    href: "https://micropng.sahilfruitwala.com",
    description: "Compress, Convert & Resize Images",
    iconEmoji: "✦",
  },
  // {
  //   label: "1-on-1 Portfolio Review",
  //   href: "https://sahilfruitwala.com/projects",
  //   iconEmoji: "◍",
  // },
];

export const newsletter: NewsletterConfig = {
  provider: "beehiiv",
};

export const embeds: EmbedItem[] = [
  // {
  //   type: "youtube",
  //   title: "Latest YouTube video",
  //   src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  // },
];

