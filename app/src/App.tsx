import type React from "react";
import { useReveal } from "@/lib/hooks";
import { Atmosphere, Nav, Footer, AppleIcon } from "./components/site";
import { APP_STORE_URL } from "./components/brand";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { cn } from "./lib/utils";
import { Check, ChevronRight, Plus, Activity, CalendarDays, Zap, Brain, Layers, Trophy } from "lucide-react";

const ICON = "./assets/appicon.jpg";

const GAMES = [
  { key: "syndrome", n: "01", verb: "Diagnose", name: "Syndrome", logo: "./assets/syndromeLogo.png", tagline: "Uncover the diagnosis",
    desc: "Reveal the case step by step. Guess vitals, symptoms, labs, and imaging to learn what's normal, abnormal, present, or absent — then narrow your differential to the final diagnosis." },
  { key: "traits", n: "02", verb: "Deduce", name: "Traits", logo: "./assets/traitsLogo.png", tagline: "Guess by classification",
    desc: "Think strategically. Guess pathologies and compare them across a classification grid — system, type, acuity, treatment, and more. Each attempt eliminates possibilities until the answer locks in." },
  { key: "associations", n: "03", verb: "Connect", name: "Associations", logo: "./assets/associationsLogo.png", tagline: "Group the findings",
    desc: "Find five clinical findings that belong to the same disease. Inspired by connection-style puzzles, solve all three groups to crack the case and reveal the pathologies behind them." },
] as const;

const ACCENT: Record<string, string> = {
  syndrome: "syndrome", traits: "traits", associations: "associations", tangent: "tangent",
};

function Reveal({ as: Tag = "div", delay, className, children, ...rest }: any) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={cn("reveal", className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Atmosphere />
      <Nav />
      <Hero />
      <Games />
      <Why />
      <Pro />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <header className="relative pb-12 pt-16 md:pt-20">
      <div className="container grid items-center gap-12 md:grid-cols-[1.08fr_0.92fr] md:gap-16">
        <div className="text-center md:text-left">
          <Reveal as="div" className="animate-rise">
            <Badge className="mx-auto md:mx-0">
              <span className="h-2 w-2 animate-ping2 rounded-full bg-traits" />
              A fresh clinical challenge every day
            </Badge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.2rem]">
              Medicine, turned into the{" "}
              <span className="relative whitespace-nowrap">
                game
                <span className="absolute inset-x-0 bottom-[0.08em] h-[0.09em] rounded bg-gradient-to-r from-syndrome to-associations" />
              </span>{" "}
              you <em className="font-medium not-italic text-indigo-300 italic">actually</em> want to play.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:mx-0 md:text-xl">
              Stat! hands you a fresh diagnostic challenge every day — fast mini-games that sharpen your reasoning, pattern recognition, and recall. Built for students, trainees, and anyone who loves medicine.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start">
              <Button asChild>
                <a href={APP_STORE_URL} target="_blank" rel="noopener">
                  <AppleIcon className="size-5" />
                  Download on the App Store
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://playstat.blottergames.com/" target="_blank" rel="noopener">Play in browser →</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-border font-mono md:mx-0">
              {[
                ["3", "Live games", "text-syndrome"],
                ["Daily", "New challenge", "text-traits"],
                ["Free", "To play", "text-associations"],
              ].map(([v, l, c], i) => (
                <div key={l} className={cn("bg-card/65 px-5 py-4", i < 2 && "border-r border-border")}>
                  <div className={cn("text-[22px] font-semibold tracking-tight", c)}>{v}</div>
                  <div className="mt-1 text-[10.5px] uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="flex justify-center">
          <PhoneMock />
        </Reveal>
      </div>
    </header>
  );
}

/** A faithful rebuild of the real Stat! home screen (light app UI, real logos). */
function PhoneMock() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-[4%] -z-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(239_84%_67%/.4),transparent_65%)] blur-[50px]" />
      <div className="relative z-10 aspect-[9/19.5] w-[300px] animate-float rounded-[52px] bg-[linear-gradient(160deg,#1c2540,#05070f_60%)] p-3 shadow-[0_40px_110px_rgba(0,0,0,.65),inset_0_0_0_1.5px_rgba(255,255,255,.07)]">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[42px] bg-slate-50">
          <div className="absolute left-1/2 top-3 z-20 h-[26px] w-24 -translate-x-1/2 rounded-full bg-[#05070f]" />
          <div className="flex items-center justify-between px-5 pb-1.5 pt-[30px]">
            <div className="text-[26px] font-extrabold tracking-tighter text-slate-900">Stat<span className="text-primary">!</span></div>
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600">🔥 Day 1</div>
          </div>
          <div className="px-5 pb-3.5 text-[11.5px] font-medium text-slate-500">Today's clinical menu · pick a minigame</div>
          <div className="grid gap-2.5 px-4">
            {GAMES.map((g) => (
              <div key={g.key} className="flex items-center gap-3 rounded-[18px] border border-slate-100 bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,.05)]">
                <div className={cn("grid size-[42px] shrink-0 place-items-center rounded-xl", tileBg(g.key))}>
                  <img src={g.logo} alt="" className="size-[30px]" />
                </div>
                <div className="min-w-0">
                  <b className="block text-[14px] font-extrabold tracking-tight text-slate-900">{g.name}</b>
                  <span className="text-[10.5px] font-medium text-slate-500">{g.tagline}</span>
                </div>
                <ChevronRight className="ml-auto size-4 text-slate-300" />
              </div>
            ))}
            <div className="flex items-center gap-3 rounded-[18px] border border-slate-100 bg-white p-3 opacity-60 shadow-[0_4px_14px_rgba(15,23,42,.05)]">
              <div className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-amber-50 font-display text-xl text-amber-500">+</div>
              <div className="min-w-0"><b className="block text-[14px] font-extrabold tracking-tight text-slate-900">Tangent</b><span className="text-[10.5px] font-medium text-slate-500">A new way to play</span></div>
              <span className="ml-auto rounded-full bg-amber-100 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-amber-700">Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function tileBg(key: string) {
  return {
    syndrome: "bg-gradient-to-br from-rose-50 to-rose-100",
    traits: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    associations: "bg-gradient-to-br from-violet-50 to-violet-100",
  }[key]!;
}

function SectionHead({ kicker, title, sub, center }: { kicker: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-16 max-w-2xl", center && "mx-auto text-center")}>
      <span className={cn("inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.32em] text-indigo-300 before:h-px before:w-6 before:bg-current before:opacity-60", center && "before:hidden")}>
        {kicker}
      </span>
      <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

function Games() {
  return (
    <section id="games" className="py-24 md:py-28">
      <div className="container">
        {/* Stat! spotlight strip */}
        <Reveal>
          <Card className="mb-16 grid items-center gap-6 p-7 sm:grid-cols-[auto_1fr] sm:p-8">
            <img src={ICON} alt="Stat! app icon" className="mx-auto size-24 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,.55)] sm:mx-0" />
            <div className="text-center sm:text-left">
              <h3 className="font-display text-2xl font-semibold">Stat! — Medical Minigames</h3>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground sm:justify-start">
                <span className="text-traits">● Live on the App Store</span>
                <span>iOS 15.0+</span>
                <span>Games · Education</span>
                <span>Free · Pro available</span>
              </div>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Each day, Stat! tests how well you connect symptoms, labs, imaging, vitals, and disease patterns — across three distinct mini-games.
              </p>
            </div>
          </Card>
        </Reveal>

        <SectionHead
          kicker="Inside Stat!"
          title="Three games. Three muscles of clinical reasoning."
          sub="Each minigame trains a different skill — from building a differential to spotting the patterns that tie a disease together."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {GAMES.map((g, i) => (
            <Reveal key={g.key} delay={(i % 2) * 80}>
              <GameCard game={g} />
            </Reveal>
          ))}
          <Reveal delay={80}>
            <TangentCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GameCard({ game: g }: { game: (typeof GAMES)[number] }) {
  const ac = ACCENT[g.key];
  return (
    <Card className={cn("group relative h-full overflow-hidden p-8 transition-all duration-300 hover:-translate-y-2")}
      style={{ ["--tw-accent" as any]: undefined }}>
      <div className={cn("pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-50 transition-opacity duration-300 group-hover:opacity-100",
        "[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude] p-px")}
        style={{ background: `linear-gradient(140deg, hsl(var(--${ac})), transparent 55%)` }} />
      <div className="mb-4 flex items-center gap-4">
        <div className="grid size-[58px] shrink-0 place-items-center rounded-2xl border border-border" style={{ background: `hsl(var(--${ac}) / 0.1)` }}>
          <img src={g.logo} alt={`${g.name} logo`} className="size-10" />
        </div>
        <div>
          <div className="font-mono text-xs tracking-wider text-muted-foreground">{g.n} — {g.verb}</div>
          <h3 className="font-display text-[27px] font-semibold leading-tight">{g.name}</h3>
          <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: `hsl(var(--${ac}))` }}>{g.tagline}</div>
        </div>
      </div>
      <p className="text-muted-foreground">{g.desc}</p>
    </Card>
  );
}

function TangentCard() {
  return (
    <Card className="group relative h-full overflow-hidden p-8 opacity-80">
      <Badge variant="soon" className="absolute right-6 top-6">Coming soon</Badge>
      <div className="mb-4 flex items-center gap-4">
        <div className="grid size-[58px] shrink-0 place-items-center rounded-2xl border border-border bg-tangent/10 font-display text-3xl text-tangent">+</div>
        <div>
          <div className="font-mono text-xs tracking-wider text-muted-foreground">04 — Next</div>
          <h3 className="font-display text-[27px] font-semibold leading-tight">Tangent</h3>
          <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-tangent">A new way to play</div>
        </div>
      </div>
      <p className="text-muted-foreground">The next mini-game in the Stat! lineup. A fresh angle on clinical reasoning — in the works and on the way.</p>
    </Card>
  );
}

const WHY = [
  { n: "/ 01", icon: CalendarDays, t: "A fresh daily case", d: "Show up each day to a new challenge that tests how you connect the clinical dots — and keep your streak alive." },
  { n: "/ 02", icon: Zap, t: "Fast, focused reps", d: "Quick rounds that fit between lectures, on the wards, or on the commute. Minutes in, sharper out." },
  { n: "/ 03", icon: Brain, t: "Reasoning, not rote", d: "Train differential building and pattern recognition the way you'll actually use them — not flashcard memorization." },
  { n: "/ 04", icon: Layers, t: "Real clinical depth", d: "Hundreds of pathologies with authentic symptoms, labs, and imaging findings woven into every case." },
  { n: "/ 05", icon: Trophy, t: "Built for exam season", d: "Review for boards and shelf exams — or just keep your edge sharp in the months between them." },
  { n: "/ 06", icon: Activity, t: "Genuinely fun", d: "Three game formats that make medicine feel interactive and memorable, not like another study chore." },
];

function Why() {
  return (
    <section id="why" className="py-24 md:py-28">
      <div className="container">
        <SectionHead center kicker="Why it works" title="Knowledge that actually sticks." />
        <div className="grid overflow-hidden rounded-[1.6rem] border border-border sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 80}>
              <div className="group h-full border-border bg-background/40 p-9 transition-colors duration-300 hover:bg-card/65 [&:not(:nth-child(3n))]:lg:border-r [&:not(:nth-child(odd))]:sm:max-lg:border-l border-t first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0">
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-associations/15 text-indigo-300">
                    <f.icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs tracking-wider text-indigo-300">{f.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{f.t}</h3>
                <p className="mt-2.5 text-[15px] text-muted-foreground">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRO = [
  ["Full archive access", "replay every past daily challenge."],
  ["Unlimited free play", "practice as much as you want, whenever."],
  ["Online multiplayer", "challenge friends and peers head-to-head."],
];

function Pro() {
  return (
    <section id="pro" className="py-12 md:py-16">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-input bg-[radial-gradient(120%_140%_at_0%_0%,hsl(239_84%_67%/.22),transparent_55%),linear-gradient(160deg,#0c1226,#070a14)] p-10 md:p-16">
            <div className="absolute -right-[8%] -top-[30%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,hsl(255_92%_76%/.4),transparent_65%)] blur-[50px]" />
            <div className="relative grid items-center gap-11 md:grid-cols-2">
              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.32em] text-indigo-300">Stat! Pro</span>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">Play free forever.<br />Or unlock everything.</h2>
                <p className="mt-5 max-w-md text-lg text-muted-foreground">
                  Every day is free. Upgrade to Stat! Pro the moment you want more reps, the full back catalogue, and head-to-head play.
                </p>
                <Button asChild className="mt-8">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener">Unlock Stat! Pro</a>
                </Button>
              </div>
              <ul className="grid gap-4">
                {PRO.map(([b, rest]) => (
                  <li key={b} className="flex items-start gap-3.5 text-[16.5px]">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-associations text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span><b className="font-bold text-foreground">{b}</b> <span className="text-muted-foreground">— {rest}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <Reveal>
          <Card className="overflow-hidden px-6 py-16 text-center md:py-20">
            <img src={ICON} alt="Stat! app icon" className="mx-auto size-[104px] rounded-[26px] shadow-[0_24px_60px_rgba(0,0,0,.55)]" />
            <h2 className="mx-auto mt-7 max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Make medicine your daily game.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
              Sharpen your clinical reasoning one challenge at a time. Free on the App Store — Pro when you're ready for more.
            </p>
            <div className="mt-9 flex justify-center">
              <Button asChild size="lg">
                <a href={APP_STORE_URL} target="_blank" rel="noopener">
                  <AppleIcon className="size-5" />
                  Download on the App Store
                </a>
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
