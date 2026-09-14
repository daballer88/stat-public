import type React from "react";
import { cn } from "@/lib/utils";

/** iOS status bar, drawn at the app's own 390 px scale. */
export function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={cn("flex h-[54px] shrink-0 items-end justify-between px-8 pb-2 text-[15px] font-semibold tabular-nums", dark ? "text-white" : "text-slate-900 dark:text-white")} aria-hidden="true">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx=".8" /><rect x="5" y="5.5" width="3" height="6.5" rx=".8" /><rect x="10" y="3" width="3" height="9" rx=".8" /><rect x="15" y="0" width="3" height="12" rx=".8" /></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 9.5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM8 6c1.7 0 3.2.7 4.3 1.8l-1.4 1.4A4.1 4.1 0 0 0 8 8c-1.1 0-2.1.4-2.9 1.2L3.7 7.8A6.1 6.1 0 0 1 8 6zm0-3.5c2.6 0 5 1 6.8 2.8l-1.4 1.4A7.6 7.6 0 0 0 8 4.5c-2.1 0-4 .8-5.4 2.2L1.2 5.3A9.6 9.6 0 0 1 8 2.5z" /></svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" /><path d="M25 4.5v4a2 2 0 0 0 0-4z" fill="currentColor" opacity=".4" /></svg>
      </span>
    </div>
  );
}

/**
 * A phone around a 390 × 844 screen. The children are laid out at the app's real size and scaled
 * to fit, so every preview uses the app's own type sizes and spacing.
 */
export function Phone({ width = 320, children, className, screenClassName, clip }: { width?: number; children: React.ReactNode; className?: string; screenClassName?: string; clip?: number }) {
  const bezel = 10;
  const inner = width - bezel * 2;
  const scale = inner / 390;
  const screenH = 844 * scale;
  return (
    <div className={cn("relative shrink-0 rounded-[3.1rem] bg-slate-950 p-[10px] shadow-[0_30px_70px_-20px_rgba(2,6,23,0.55)] ring-1 ring-white/15 dark:bg-slate-800 dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] dark:ring-white/10", className)} style={{ width, height: clip ? clip : undefined, overflow: clip ? "hidden" : undefined }}>
      <div className={cn("relative overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-slate-950", screenClassName)} style={{ height: screenH }}>
        <div className="absolute left-1/2 top-[10px] z-30 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" style={{ transform: `translateX(-50%) scale(${scale})`, transformOrigin: "center top" }} />
        <div className="origin-top-left" style={{ width: 390, height: 844, transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
