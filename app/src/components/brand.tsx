import { cn } from "@/lib/utils";

export const APP_STORE_URL = "https://apps.apple.com/us/app/stat-medical-minigames/id6764444936";
export const WEB_PLAY_URL = "https://playstat.blottergames.com/";
export const SUPPORT_EMAIL = "stat@blottergames.com";

export type Game = "syndrome" | "traits" | "associations" | "tangent";
export type Hue = "rose" | "emerald" | "violet" | "sky";
export const HUE: Record<Game, Hue> = { syndrome: "rose", traits: "emerald", associations: "violet", tangent: "sky" };
export const LOGO: Record<Game, string> = {
  syndrome: "./assets/logo-syndrome.svg",
  traits: "./assets/logo-traits.svg",
  associations: "./assets/logo-associations.svg",
  tangent: "./assets/logo-tangent.svg",
};

/** The app's wordmark, exactly as the home screen draws it: Inter 900, rose "Stat", ink "!". */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-block font-black leading-none tracking-tighter text-rose-600", className)}>
      Stat<span className="text-slate-900 dark:text-white">!</span>
    </span>
  );
}

/** Blotter Games: an ink blot. */
export function BlotMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 3c3.2 0 4.3 2.6 6.4 3.6 2.4 1.1 6.1.4 6.6 3.9.4 2.6-2.4 3.8-2.4 6.3 0 2.7 3.1 4.4 1.6 7.1-1.4 2.5-4.8 1.3-7.2 2.6C19 27.7 18.5 30 15.6 30c-3 0-3.3-2.5-5.6-3.6-2.4-1.2-6 .1-7.1-2.6-1-2.5 1.9-4.2 1.6-6.9C4.2 14.2.9 12.8 2 10.1c1-2.5 4.4-1.4 6.8-2.6C11 6.4 12.6 3 16 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.36 12.78c-.02-2.06 1.68-3.05 1.76-3.1-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.64 0-1.64-.73-2.7-.71-1.39.02-2.67.81-3.38 2.05-1.44 2.5-.37 6.2 1.04 8.23.69 1 1.5 2.11 2.57 2.07 1.03-.04 1.42-.66 2.66-.66 1.24 0 1.59.66 2.68.64 1.11-.02 1.81-1.01 2.49-2.01.78-1.15 1.1-2.27 1.12-2.32-.02-.01-2.15-.82-2.17-3.27zM14.3 6.6c.56-.69.94-1.64.84-2.6-.81.03-1.8.54-2.39 1.22-.52.6-.98 1.57-.86 2.49.91.07 1.84-.46 2.41-1.11z" />
    </svg>
  );
}
