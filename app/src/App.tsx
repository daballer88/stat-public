import type React from "react";
import { Bell, Moon, RotateCcw, Smartphone, Tablet, Globe, CalendarDays, Infinity as InfinityIcon, Users, Ban, Share2, Flame } from "lucide-react";
import { Nav, Footer, AppStoreBtn, WebPlayBtn, Btn } from "./components/site";
import { Phone } from "./components/phone";
import { SyndromeLive, SyndromeStill, TraitsPreview, AssociationsPreview, TangentPreview, HomePreview, StatsPreview, ArchiveStrip, ShareCard } from "./components/previews";
import { APP_STORE_URL, LOGO, type Game } from "./components/brand";
import { cn } from "./lib/utils";
import content from "./content-index.json";

const ICON = "./assets/appicon.jpg";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Games />
        <Daily />
        <Anywhere />
        <Pro />
        <Learn />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------ Hero ------------------------------------ */

function Hero() {
  return (
    <header className="relative">
      <div className="wrap grid items-center gap-14 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2.5">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" /></span>
            Daily medical minigames
          </p>
          <h1 className="display mt-6 text-[2.85rem] sm:text-6xl lg:text-[5.25rem]">
            A new case every day. <span className="text-rose-600 dark:text-rose-400">Four ways</span> to crack it.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed muted lg:text-xl">
            Stat! turns clinical reasoning into quick daily puzzles. Work up a presentation, narrow a diagnosis trait by trait, find the four findings that belong together, and home in on the hidden structure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AppStoreBtn size="lg" />
            <WebPlayBtn size="lg" />
          </div>
          <p className="mt-4 text-sm font-medium muted">Free on iPhone and iPad. Plays in any browser. Android soon.</p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[color:var(--line)] pt-6">
            {[["250", "Diseases"], ["349", "Structures"], ["00:00", "New puzzles"]].map(([v, l]) => (
              <div key={l}>
                <dt className="eyebrow text-[0.625rem]">{l}</dt>
                <dd className="display mt-1 text-2xl tabular-nums sm:text-3xl">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="ecg absolute -inset-x-16 -inset-y-10 lg:-inset-x-24" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/25 blur-3xl dark:bg-rose-500/10" aria-hidden="true" />
          <div className="relative">
            <Phone width={332}>
              <SyndromeLive />
            </Phone>
            <p className="eyebrow absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[0.625rem]">Syndrome · a case being worked up</p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------- Ticker ----------------------------------- */

const NAMES = [
  "Myocardial infarction", "Pulmonary embolism", "Aortic dissection", "Cardiac tamponade", "Infective endocarditis", "Pneumothorax", "Sarcoidosis", "Cystic fibrosis", "Epiglottitis",
  "Acute pancreatitis", "Hepatic encephalopathy", "Celiac disease", "Diverticulitis", "Pyelonephritis", "Nephrotic syndrome", "Testicular torsion", "Hyponatremia",
  "Diabetic ketoacidosis", "Graves disease", "Thyroid storm", "Pheochromocytoma", "Cushing syndrome", "Acromegaly", "Subarachnoid hemorrhage", "Status epilepticus", "Multiple sclerosis",
  "Meningitis", "Slipped capital femoral epiphysis", "Rotator cuff tear", "Fibromyalgia", "Hypertensive emergency", "Impetigo", "Peripheral neuropathy", "Nephrolithiasis", "Spinal cord compression",
];
const DOTS = ["bg-rose-500", "bg-emerald-500", "bg-violet-500", "bg-sky-500"];

// The loop needs the list twice. The second copy is drawn by CSS from data-name (.ticker-echo in
// index.css), so the page's HTML and screen readers get each name once.
function Ticker() {
  const item = (n: string, i: number, echo: boolean) => (
    <li key={echo ? `${n}-echo` : n} className={cn("flex items-center gap-7 whitespace-nowrap", echo && "ticker-echo")} aria-hidden={echo || undefined}>
      {echo ? <span data-name={n} /> : <span>{n}</span>}
      <span className={cn("h-1.5 w-1.5 rounded-full", DOTS[i % 4])} aria-hidden="true" />
    </li>
  );
  return (
    <div className="border-y border-[color:var(--line)] py-3.5">
      <div className="overflow-hidden">
        <ul role="list" aria-label="Some of the diseases in Stat!" className="marquee items-center gap-7 font-mono text-[13px] font-medium muted">
          {NAMES.map((n, i) => item(n, i, false))}
          {NAMES.map((n, i) => item(n, i, true))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------------- Games ----------------------------------- */

function SectionHead({ eyebrow, title, sub, id }: { eyebrow: string; title: React.ReactNode; sub?: string; id?: string }) {
  return (
    <div className="max-w-2xl" id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]">{title}</h2>
      {sub && <p className="mt-5 max-w-xl text-lg leading-relaxed muted">{sub}</p>}
    </div>
  );
}

type GameCardData = { key: Game; n: string; kind: string; title: string; desc: string; facts: string[]; look: string; preview: React.ReactNode };

const GAMES: GameCardData[] = [
  {
    key: "syndrome", n: "01", kind: "Workup", title: "Work up the case.",
    desc: "A presentation and a patient. Ask about symptoms, check vitals, order labs and imaging, and every answer lands in the chart as a finding. Name the diagnosis before your tries run out.",
    facts: ["6 diagnosis tries", "2 chart hints", "4 investigation tabs"],
    look: "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/40",
    preview: <SyndromeStill />,
  },
  {
    key: "traits", n: "02", kind: "Deduction", title: "Narrow it down, trait by trait.",
    desc: "Guess a disease and six traits light up: system, type, acuity, organs, how it is diagnosed, how it is treated. Green is exact, amber is partial, grey is a miss. Close in.",
    facts: ["6 traits per guess", "15 guesses", "2 hints"],
    look: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/40",
    preview: <TraitsPreview />,
  },
  {
    key: "associations", n: "03", kind: "Association", title: "Find the four that belong together.",
    desc: "Sixteen findings, four diseases. Pick the four that share a diagnosis and submit. A near miss tells you you are one away. Each group you solve reveals the disease behind it.",
    facts: ["16 findings", "4 groups of 4", "12 tries"],
    look: "bg-violet-50 border-violet-100 dark:bg-violet-950/20 dark:border-violet-900/40",
    preview: <AssociationsPreview />,
  },
  {
    key: "tangent", n: "04", kind: "Anatomy", title: "Home in on the hidden structure.",
    desc: "One organ, bone, muscle, vessel or nerve is the target. Each guess is plotted on the body and scored by how close it sits, so every miss narrows the map.",
    facts: ["349 structures", "3 tiers", "10 guesses"],
    look: "bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/40",
    preview: <TangentPreview />,
  },
];

function Games() {
  return (
    <section id="games" className="py-20 lg:py-28">
      <div className="wrap">
        <SectionHead eyebrow="The games" title="Four games. Four kinds of clinical thinking." sub="Each one trains a different move: the workup, the deduction, the association, the anatomy. Every game gets a fresh daily puzzle, a timer, and a result you can share." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
          {GAMES.map((g) => (
            <article key={g.key} className={cn("relative flex flex-col overflow-hidden rounded-[2rem] border p-7 sm:p-9", g.look)}>
              <div className="flex items-start gap-4">
                <img src={LOGO[g.key]} alt="" className="size-14 shrink-0" />
                <div>
                  <p className="eyebrow">{g.n} · {g.kind}</p>
                  <h3 className="display mt-1 text-[1.9rem] sm:text-[2.1rem]">{g.title}</h3>
                </div>
              </div>
              <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed muted">{g.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.facts.map((f) => <li key={f} className="rounded-full border border-[color:var(--line)] bg-[color:var(--card)] px-3 py-1 font-mono text-xs font-medium muted">{f}</li>)}
              </ul>
              <a href={`/how-to-play/${g.key}/`} className="mt-5 inline-flex w-fit items-center gap-1.5 text-[15px] font-bold text-slate-900 underline-offset-4 hover:underline dark:text-white">
                How to play {g.key[0].toUpperCase() + g.key.slice(1)} <span aria-hidden="true">→</span>
              </a>
              <div className="-mx-3 -mb-9 mt-9 flex justify-center sm:-mx-5">
                <Phone width={312} clip={430}>{g.preview}</Phone>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Daily ----------------------------------- */

function Tile({ title, children, className, icon }: { title: React.ReactNode; children?: React.ReactNode; className?: string; icon?: React.ReactNode }) {
  return (
    <div className={cn("card flex min-w-0 flex-col rounded-[2rem] p-6 sm:p-7", className)}>
      {icon && <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{icon}</div>}
      <h3 className="display text-2xl">{title}</h3>
      {children}
    </div>
  );
}

function Daily() {
  return (
    <section id="daily" className="border-t border-[color:var(--line)] py-20 lg:py-28">
      <div className="wrap">
        <SectionHead eyebrow="Every day" title="The same case for everyone. New at midnight." sub="Every daily puzzle is shared by every player (Tangent has three a day, one per tier), so a streak means something and a share card is a fair comparison. Missed one? The archive keeps them all." />
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          <div className="card relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] p-6 sm:p-7">
            <p className="eyebrow">Today's menu</p>
            <h3 className="display mt-2 text-2xl">Four cards, one status each.</h3>
            <p className="mt-2 text-[15px] leading-relaxed muted">Solved, missed, or resume where you left off. The streak and the stats are one tap away.</p>
            <div className="-mb-14 mt-7 flex flex-1 items-end justify-center"><Phone width={280}><HomePreview /></Phone></div>
          </div>

          <Tile title="Keep the streak. Watch the distribution." icon={<Flame className="size-5" strokeWidth={2.5} />}>
            <p className="mt-2 text-[15px] leading-relaxed muted">Every game keeps its own record: plays, solves, average time, and how many tries each solve took.</p>
            <div className="mt-5 flex flex-1 flex-col justify-end"><StatsPreview /></div>
          </Tile>

          <div className="flex min-w-0 flex-col gap-5">
            <Tile title="Every past case, on the calendar." icon={<CalendarDays className="size-5" strokeWidth={2.5} />}>
              <p className="mt-2 text-[15px] leading-relaxed muted">The archive holds every daily puzzle since launch. Free in the browser, and part of Pro in the app.</p>
              <div className="mt-6"><ArchiveStrip /></div>
              <p className="mt-4 font-mono text-xs muted"><span className="text-emerald-500">●</span> solved &nbsp; <span className="text-rose-500">●</span> missed &nbsp; <span className="text-slate-400">●</span> open</p>
            </Tile>
            <Tile title="Share the result, never the answer." icon={<Share2 className="size-5" strokeWidth={2.5} />} className="flex-1">
              <p className="mt-2 text-[15px] leading-relaxed muted">The share card is time, tries and hints. Your friends still get a fair go at the same case.</p>
              <div className="mt-6 flex flex-1 flex-col justify-end"><ShareCard /></div>
            </Tile>
          </div>

          <div className="card grid min-w-0 gap-7 rounded-[2rem] p-6 sm:grid-cols-3 sm:p-7 lg:col-span-3">
            {[
              { icon: <Bell className="size-5" strokeWidth={2.5} />, t: "A nudge at your hour.", d: "An optional daily reminder, at whatever time fits between rounds and lectures." },
              { icon: <Moon className="size-5" strokeWidth={2.5} />, t: "Dark mode, of course.", d: "Follows your system, or set it yourself. Every board, sheet and card has a night version." },
              { icon: <RotateCcw className="size-5" strokeWidth={2.5} />, t: "Pick up where you left off.", d: "Close the app mid-case and it is waiting when you come back, timer and all." },
            ].map((f) => (
              <div key={f.t} className="flex min-w-0 gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{f.icon}</span>
                <div><h3 className="display text-xl">{f.t}</h3><p className="mt-1.5 text-[15px] leading-relaxed muted">{f.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Anywhere --------------------------------- */

function Anywhere() {
  const items = [
    { icon: <Smartphone className="size-5" strokeWidth={2.25} />, t: "iPhone", d: "Free daily puzzles; archive, freeplay and online play with Pro." },
    { icon: <Tablet className="size-5" strokeWidth={2.25} />, t: "iPad", d: "Portrait or landscape, laid out for the larger screen." },
    { icon: <Globe className="size-5" strokeWidth={2.25} />, t: "Any browser", d: "Daily and archive, free, at playstat.blottergames.com." },
    { icon: <Smartphone className="size-5" strokeWidth={2.25} />, t: "Android", d: "Built and on its way to Google Play.", soon: true },
  ];
  return (
    <section className="border-t border-[color:var(--line)] py-16 lg:py-20">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHead eyebrow="Play anywhere" title="Same puzzle, whichever screen." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((it) => (
              <li key={it.t} className="card flex items-start gap-4 rounded-3xl p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{it.icon}</span>
                <div>
                  <p className="flex items-center gap-2 font-bold">{it.t}{it.soon && " "}{it.soon && <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">soon</span>}</p>
                  <p className="mt-1 text-[15px] leading-relaxed muted">{it.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ Pro ------------------------------------ */

const PRO = [
  { icon: <CalendarDays className="size-5" strokeWidth={2.5} />, t: "Full archive", d: "Play every case you missed." },
  { icon: <InfinityIcon className="size-5" strokeWidth={2.5} />, t: "Unlimited freeplay", d: "Practice any system, any time." },
  { icon: <Users className="size-5" strokeWidth={2.5} />, t: "Online play", d: "Race a friend on the same case." },
  { icon: <Ban className="size-5" strokeWidth={2.5} />, t: "No ads", d: "And unlimited hints." },
];

function Pro() {
  return (
    <section id="pro" className="py-8 lg:py-12">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-indigo-50 p-8 dark:border-indigo-900/50 dark:bg-indigo-950/30 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-indigo-600 dark:text-indigo-300">Stat! Pro</p>
              <h2 className="display mt-4 text-4xl sm:text-5xl">The daily puzzles stay free. Pro is for the rest.</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed muted">One subscription, yearly or monthly, managed by the App Store. Cancel whenever you like and the daily cases keep coming.</p>
              <Btn href={APP_STORE_URL} target="_blank" rel="noopener" size="lg" className="mt-8 bg-indigo-600 text-white shadow-indigo-600/25 hover:bg-indigo-500 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400">Get Pro in the app</Btn>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {PRO.map((p) => (
                <li key={p.t} className="flex items-start gap-4 rounded-3xl border border-indigo-100 bg-white/80 p-5 dark:border-indigo-900/40 dark:bg-slate-900/60">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white">{p.icon}</span>
                  <div><p className="font-bold">{p.t}</p><p className="mt-0.5 text-[15px] muted">{p.d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Closing ---------------------------------- */

/* ------------------------------------ Learn ------------------------------------ */

// Guides and articles are built from app/content by scripts/pages.mjs, which also writes content-index.json.
function Learn() {
  const featured = [...content.articles.filter((a) => a.featured), ...content.articles.filter((a) => !a.featured)].slice(0, 6);
  return (
    <section id="learn" className="border-t border-[color:var(--line)] py-20 lg:py-28">
      <div className="wrap">
        <SectionHead eyebrow="Learn" title="The medicine behind the games." sub="Plain-language guides to the reasoning, tests and anatomy the puzzles are built on, and a full how-to-play guide for every game." />
        <div className="mt-10 flex flex-wrap gap-2">
          {content.guides.map((g) => (
            <a key={g.url} href={g.url} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--card)] py-2 pl-2 pr-4 text-[15px] font-semibold transition-colors hover:border-slate-400 dark:hover:border-slate-500">
              <img src={LOGO[g.game as Game]} alt="" className="size-7" />
              {g.title}
            </a>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <a key={a.url} href={a.url} className="group flex flex-col rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card)] p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-500">
              <p className="eyebrow text-[0.6875rem]">{a.topic}</p>
              <h3 className="display mt-3 text-[1.35rem] leading-tight">{a.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed muted">{a.description}</p>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] muted">{a.minutes} min read <span aria-hidden="true">→</span></p>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn href="/learn/" variant="secondary">All articles</Btn>
          <Btn href="/how-to-play/" variant="ghost">How to play</Btn>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="py-20 lg:py-28">
      <div className="wrap flex flex-col items-center text-center">
        <img src={ICON} alt="Stat! app icon" className="size-24 rounded-[22%] border border-[color:var(--line)] shadow-xl shadow-slate-950/10" />
        <h2 className="display mt-8 max-w-2xl text-4xl sm:text-5xl lg:text-6xl">Today's cases are waiting.</h2>
        <p className="mt-5 max-w-md text-lg muted">No account, no sign-up. Open it and play.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <AppStoreBtn size="lg" />
          <WebPlayBtn size="lg" />
        </div>
      </div>
    </section>
  );
}
