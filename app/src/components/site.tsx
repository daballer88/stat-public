import { StudioLockup, APP_STORE_URL } from "./brand";
import { Button } from "./ui/button";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="bg-grid absolute -inset-0.5" />
        <div className="bg-aurora absolute inset-0" />
      </div>
      <div className="bg-grain pointer-events-none fixed inset-0 -z-10" />
    </>
  );
}

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.36 12.78c-.02-2.06 1.68-3.05 1.76-3.1-.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.64 0-1.64-.73-2.7-.71-1.39.02-2.67.81-3.38 2.05-1.44 2.5-.37 6.2 1.04 8.23.69 1 1.5 2.11 2.57 2.07 1.03-.04 1.42-.66 2.66-.66 1.24 0 1.59.66 2.68.64 1.11-.02 1.81-1.01 2.49-2.01.78-1.15 1.1-2.27 1.12-2.32-.02-.01-2.15-.82-2.17-3.27zM14.3 6.6c.56-.69.94-1.64.84-2.6-.81.03-1.8.54-2.39 1.22-.52.6-.98 1.57-.86 2.49.91.07 1.84-.46 2.41-1.11z" />
    </svg>
  );
}

export function Nav({ links = true }: { links?: boolean }) {
  const scrolled = useScrolled();
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
      )}
    >
      <div className="container flex h-[76px] items-center justify-between">
        <StudioLockup />
        <div className="flex items-center gap-1">
          {links && (
            <div className="mr-1 hidden items-center gap-1 md:flex">
              {[
                ["#games", "Games"],
                ["#why", "Why Stat!"],
                ["#pro", "Pro"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="rounded-full px-4 py-2 text-[15px] font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  {label}
                </a>
              ))}
            </div>
          )}
          <Button asChild size="sm" className="h-10">
            <a href={APP_STORE_URL} target="_blank" rel="noopener">Get the app</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-border py-14">
      <div className="container">
        <div className="flex flex-wrap items-start justify-between gap-9">
          <div className="max-w-sm">
            <StudioLockup />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Stat! is a daily medical minigame built by Blotter Games — for students, trainees, and anyone who loves medicine.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["/#games", "Games"],
              ["/#pro", "Stat! Pro"],
              [APP_STORE_URL, "App Store"],
              ["/privacypolicy.html", "Privacy"],
              ["/supportfile.html", "Support"],
              ["mailto:stat@blottergames.com", "Contact"],
            ].map(([href, label]) => (
              <a key={label} href={href} className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-4 border-t border-border pt-6 font-mono text-[13px] text-muted-foreground">
          <span>© {year} Blotter Games</span>
          <span>Stat! is for education only — not medical advice.</span>
        </div>
      </div>
    </footer>
  );
}
