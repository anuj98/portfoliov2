const ICONS = [
  {
    href: (linkedIn: string) => linkedIn,
    alt: "LinkedIn",
    src: "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/linkedin.svg",
    external: true,
  },
  {
    href: (email: string) => `mailto:${email}`,
    alt: "Email",
    src: "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/email.svg",
    external: false,
  },
  {
    href: (gitHub: string) => gitHub,
    alt: "GitHub",
    src: "https://vmdi8qakqy5un7sl.public.blob.vercel-storage.com/icons/github.svg",
    external: true,
  },
];

export default ICONS;
