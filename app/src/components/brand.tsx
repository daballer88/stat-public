import { cn } from "@/lib/utils";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/stat-medical-minigames/id6764444936";

/** Blotter Games studio mark — an EKG pulse tracing the letterform of play. */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="#0b1024" stroke="url(#bgs)" strokeWidth="1.5" />
      <path d="M6 25 H15 L18.5 14 L24 34 L29 19 L32 25 H42" stroke="url(#bgl)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="25" r="2.6" fill="hsl(158 64% 52%)" />
      <defs>
        <linearGradient id="bgs" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="bgl" x1="6" y1="24" x2="42" y2="24">
          <stop stopColor="#818cf8" />
          <stop offset=".6" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Studio lockup used in the nav + footer: small mark + "Blotter Games" tag. */
function StudioLockup({ className }: { className?: string }) {
  return (
    <a href="/" className={cn("inline-flex items-center gap-3 group", className)} aria-label="Stat! by Blotter Games — home">
      <BrandMark className="h-9 w-9 shrink-0 drop-shadow-[0_6px_16px_rgba(99,102,241,.5)] transition-transform group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <b className="font-display text-[19px] font-semibold tracking-tight text-foreground">Stat!</b>
        <span className="mt-[3px] font-mono text-[9.5px] uppercase tracking-[0.34em] text-muted-foreground">
          by Blotter Games
        </span>
      </span>
    </a>
  );
}

export { BrandMark, StudioLockup, APP_STORE_URL };
