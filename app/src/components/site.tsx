import type React from "react";
import { ArrowUpRight } from "lucide-react";
import { APP_STORE_URL, WEB_PLAY_URL, SUPPORT_EMAIL, AppleIcon, BlotMark, Wordmark } from "./brand";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type BtnProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "lg" };

export function Btn({ variant = "primary", size = "md", className, children, ...rest }: BtnProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]";
  const sizes = size === "lg" ? "h-14 px-7 text-base" : "h-12 px-6 text-[15px]";
  const variants = {
    primary: "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-none dark:hover:bg-slate-200",
    secondary: "bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-400 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:border-slate-500",
    ghost: "text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800",
  }[variant];
  return (
    <a className={cn(base, sizes, variants, className)} {...rest}>
      {children}
    </a>
  );
}

export function AppStoreBtn({ size = "md", label = "Download on the App Store", className }: { size?: "md" | "lg"; label?: string; className?: string }) {
  return (
    <Btn href={APP_STORE_URL} target="_blank" rel="noopener" size={size} className={className}>
      <AppleIcon className="size-5 -mt-0.5" />
      {label}
    </Btn>
  );
}

export function WebPlayBtn({ size = "md", className }: { size?: "md" | "lg"; className?: string }) {
  return (
    <Btn href={WEB_PLAY_URL} target="_blank" rel="noopener" variant="secondary" size={size} className={className}>
      Play in the browser
      <ArrowUpRight className="size-4" strokeWidth={2.5} />
    </Btn>
  );
}

export function Nav() {
  const scrolled = useScrolled();
  return (
    <nav className={cn("sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 border-b", scrolled ? "border-[color:var(--line)] bg-[color:var(--paper)]/90 backdrop-blur-xl" : "border-transparent")}>
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <a href="/" className="flex items-baseline gap-2.5 rounded" aria-label="Stat! by Blotter Games, home">
          <Wordmark className="text-[30px]" />
          <span className="eyebrow hidden sm:inline text-[0.6875rem] tracking-[0.2em]">by Blotter Games</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {[["/how-to-play/", "How to play"], ["/learn/", "Learn"], ["/about/", "About"], ["/supportfile.html", "Support"]].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-slate-600 transition-colors hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <Btn href={APP_STORE_URL} target="_blank" rel="noopener" className="h-10 px-4 text-sm">
          <AppleIcon className="size-4 -mt-0.5" />
          Get the app
        </Btn>
      </div>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--line)] py-14">
      <div className="wrap">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 text-slate-950 dark:text-white">
              <BlotMark className="size-7" />
              <span className="display text-xl tracking-tight">Blotter Games</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed muted">
              Stat! is a game for people who study medicine. It is for education only and is not medical advice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] font-medium sm:grid-cols-3">
            {[
              [WEB_PLAY_URL, "Play in the browser", false],
              [APP_STORE_URL, "App Store", true],
              ["/how-to-play/", "How to play", false],
              ["/learn/", "Learn", false],
              ["/about/", "About", false],
              ["/faq/", "FAQ", false],
              ["/supportfile.html", "Support", false],
              ["/privacypolicy.html", "Privacy policy", false],
              [`mailto:${SUPPORT_EMAIL}`, "Contact", false],
            ].map(([href, label, ext]) => (
              <a key={label as string} href={href as string} {...(ext ? { target: "_blank", rel: "noopener" } : {})} className="muted transition-colors hover:text-slate-950 dark:hover:text-white">
                {label as string}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--line)] pt-6 font-mono text-xs muted">
          <span>© {year} Blotter Games</span>
          <span>{SUPPORT_EMAIL}</span>
        </div>
      </div>
    </footer>
  );
}
