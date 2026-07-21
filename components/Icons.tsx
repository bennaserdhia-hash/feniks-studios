import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

/* ---- Logo / wordmark mark (stylised phoenix / play) ---- */
export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="fx-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ecd39b" />
          <stop offset="0.5" stopColor="#deb267" />
          <stop offset="1" stopColor="#c2954c" />
        </linearGradient>
      </defs>
      <path
        d="M24 3c3 5 2 8-1 11 6-1 9 2 10 7-4-2-7-1-9 2 4 1 6 4 6 9-3-3-6-3-9-1 1 4-1 7-4 11-3-4-5-7-4-11-3-2-6-2-9 1 0-5 2-8 6-9-2-3-5-4-9-2 1-5 4-8 10-7-3-3-4-6-1-11 2 2 3 4 3 6 0-2 1-4 3-6Z"
        fill="url(#fx-g)"
        opacity="0.95"
      />
      <path d="M24 20v14" stroke="#0a0a0b" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 24l6 3-6 3" fill="#0a0a0b" />
    </svg>
  );
}

/* ---- Service icons ---- */
export function IconBuilding(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
      <path d="M15 9h4a1 1 0 0 1 1 1v11" />
      <path d="M2 21h20M7 8h1M11 8h1M7 12h1M11 12h1M7 16h1M11 16h1" />
    </svg>
  );
}
export function IconEvent(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2Z" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
export function IconBox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 8l-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </svg>
  );
}
export function IconMotion(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  );
}
export function IconMic(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
    </svg>
  );
}
export function IconLearning(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 9L12 4 2 9l10 5 10-5Z" />
      <path d="M6 11v5c0 1 2.7 3 6 3s6-2 6-3v-5M22 9v6" />
    </svg>
  );
}
export function IconPlay(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 9l5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconTv(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <path d="M7 3l5 3 5-3M8 22h8" />
    </svg>
  );
}
export function IconDrone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2" />
    </svg>
  );
}
export function IconShare(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" />
    </svg>
  );
}

export const serviceIcons: Record<string, (p: IconProps) => React.ReactElement> = {
  building: IconBuilding,
  event: IconEvent,
  box: IconBox,
  motion: IconMotion,
  mic: IconMic,
  learning: IconLearning,
  play: IconPlay,
  tv: IconTv,
  drone: IconDrone,
  share: IconShare,
};

/* ---- Social icons ---- */
export function SocialIcon({ name, ...props }: IconProps & { name: string }) {
  const p = { viewBox: "0 0 24 24", fill: "currentColor", ...props };
  switch (name.toLowerCase()) {
    case "linkedin":
      return (
        <svg {...p}>
          <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4V8Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24h-4V8Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p}>
          <path d="M23 12s0-3.6-.46-5.32a2.78 2.78 0 0 0-1.96-1.96C18.86 4.26 12 4.26 12 4.26s-6.86 0-8.58.46A2.78 2.78 0 0 0 1.46 6.68C1 8.4 1 12 1 12s0 3.6.46 5.32a2.78 2.78 0 0 0 1.96 1.96c1.72.46 8.58.46 8.58.46s6.86 0 8.58-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.6 23 12 23 12ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
        </svg>
      );
    case "vimeo":
      return (
        <svg {...p}>
          <path d="M22 7.42c-.1 2.14-1.6 5.07-4.48 8.8C14.44 20.1 11.9 22 9.86 22c-1.27 0-2.34-1.17-3.2-3.5-.59-2.16-1.17-4.32-1.76-6.48-.65-2.33-1.35-3.5-2.1-3.5-.17 0-.74.35-1.72 1.03L0 8.2c1.05-.92 2.08-1.84 3.1-2.77 1.4-1.2 2.45-1.84 3.15-1.9 1.66-.16 2.68.98 3.06 3.4.42 2.62.7 4.25.86 4.88.48 2.2 1.02 3.3 1.6 3.3.45 0 1.13-.72 2.03-2.15.9-1.43 1.38-2.52 1.45-3.27.14-1.32-.38-1.98-1.55-1.98-.55 0-1.13.13-1.72.38 1.14-3.74 3.32-5.55 6.54-5.45 2.39.07 3.52 1.62 3.38 4.65Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p}>
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...p}>
          <path d="M18.9 2h3.3l-7.2 8.26L23.5 22h-6.6l-5.18-6.78L5.8 22H2.5l7.7-8.84L1.5 2h6.77l4.68 6.19L18.9 2Zm-1.16 18h1.83L7.3 3.9H5.34L17.74 20Z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---- Misc UI icons ---- */
export function IconArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
export function IconDownload(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
