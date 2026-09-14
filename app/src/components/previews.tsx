import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, MoreVertical, Search, Flame, BarChart3, Settings, CornerDownLeft, Lightbulb, Check } from "lucide-react";
import { useInView, useOnScreen, useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { StatusBar } from "./phone";
import { LOGO, type Hue } from "./brand";

/* ------------------------------------------------------------------------------------------
   Faithful recreations of the app's screens, built from the same classes the app uses, so the
   site shows the product as it is. Everything is laid out at 390 px and scaled by <Phone>.
------------------------------------------------------------------------------------------ */

const TINT: Record<Hue | "home", string> = {
  rose: "bg-rose-50 dark:bg-slate-950",
  emerald: "bg-emerald-50 dark:bg-slate-950",
  violet: "bg-violet-50 dark:bg-slate-950",
  sky: "bg-sky-50 dark:bg-slate-950",
  home: "bg-slate-50 dark:bg-slate-950",
};

export function Screen({ hue, children, className }: { hue: Hue | "home"; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex h-[844px] w-[390px] flex-col overflow-hidden text-slate-900 dark:text-white", TINT[hue], className)}>
      <StatusBar />
      {children}
    </div>
  );
}

const Counter = ({ label, value, id }: { label: string; value: string; id?: string }) => (
  <div className="text-center" id={id}>
    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</p>
    <p className="font-mono text-base font-bold tabular-nums text-slate-800 dark:text-white">{value}</p>
  </div>
);

const Round = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("grid h-11 w-11 place-items-center rounded-full text-slate-700 dark:text-slate-200", className)}>{children}</span>
);

export function AppHeader({ time, tries, hints, extra }: { time: string; tries: string; hints?: string; extra?: React.ReactNode }) {
  return (
    <div className="z-30 flex w-full shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white/80 px-4 pb-3 pt-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="w-11 shrink-0"><Round><ChevronLeft className="h-6 w-6" strokeWidth={2.75} /></Round></div>
      <div className="flex min-w-0 flex-1 items-center justify-center gap-6">
        <Counter label="Timer" value={time} />
        <Counter label="Tries" value={tries} />
        {hints && <Counter label="Hints" value={hints} />}
        {extra}
      </div>
      <div className="flex w-11 shrink-0 justify-end"><Round><MoreVertical className="h-5 w-5" strokeWidth={2.5} /></Round></div>
    </div>
  );
}

const HintPill = ({ label = "Hint" }: { label?: string }) => (
  <span className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border-2 border-amber-200 bg-amber-50 px-3.5 text-[0.6875rem] font-black uppercase tracking-widest text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
    <Lightbulb className="h-4 w-4" strokeWidth={2.5} /> {label}
  </span>
);

/* ---------------------------------- Syndrome ---------------------------------- */

const Presentation = ({ text }: { text: string }) => (
  <div className="w-full rounded-2xl border-l-4 border-indigo-500 bg-indigo-50 px-4 py-3 dark:bg-indigo-950/40">
    <span className="mb-0.5 block text-[0.6875rem] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-300">Presentation</span>
    <p className="text-base font-bold leading-snug text-slate-800 dark:text-slate-100">{text}</p>
  </div>
);

const SCOPES = ["Symptoms", "Labs", "Vitals", "Imaging"];
const PLACEHOLDERS = ["Ask about a symptom…", "Order a lab…", "Check a vital…", "Order imaging…"];

const ScopeTabs = ({ active }: { active: number }) => (
  <div className="grid grid-cols-4 gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800" role="presentation">
    {SCOPES.map((s, i) => (
      <span key={s} className={cn("flex min-h-[40px] items-center justify-center rounded-xl text-[0.6875rem] font-black uppercase tracking-wider transition-colors", i === active ? "bg-white text-rose-600 shadow-sm dark:bg-slate-900 dark:text-rose-300" : "text-slate-500 dark:text-slate-400")}>
        {s}
      </span>
    ))}
  </div>
);

function SearchField({ placeholder, value, focus, accent = "rose" }: { placeholder: string; value: string; focus?: boolean; accent?: Hue }) {
  const ring = { rose: "border-rose-400 ring-2 ring-rose-500/20", emerald: "border-emerald-400 ring-2 ring-emerald-500/20", violet: "border-violet-400 ring-2 ring-violet-500/20", sky: "border-sky-400 ring-2 ring-sky-500/20" }[accent];
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={2.5} />
      <div className={cn("flex min-h-[44px] w-full items-center rounded-2xl border-2 bg-white pl-10 pr-3 text-sm font-bold text-slate-800 dark:bg-slate-900 dark:text-white", focus ? ring : "border-slate-200 dark:border-slate-700")}>
        {value ? <span>{value}{focus && <span className="caret" />}</span> : <span className="text-slate-400 dark:text-slate-500">{placeholder}</span>}
      </div>
    </div>
  );
}

function Dropdown({ items, up, accent = "rose" }: { items: [string, string?][]; up?: boolean; accent?: Hue }) {
  const pill = { rose: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300", emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300", violet: "bg-violet-50 text-violet-700", sky: "bg-sky-50 text-sky-700" }[accent];
  return (
    <ul className={cn("absolute left-0 right-0 z-40 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white text-slate-800 shadow-2xl animate-[pop_0.2s_ease-out] dark:border-slate-700 dark:bg-slate-800 dark:text-white", up ? "bottom-full mb-2" : "mt-1")}>
      {items.map(([label, tag]) => (
        <li key={label} className="flex min-h-[44px] items-center justify-between gap-3 border-b border-slate-100 px-4 text-sm font-bold last:border-0 dark:border-slate-700">
          <span>{label}</span>
          {tag && <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-widest", pill)}>{tag}</span>}
        </li>
      ))}
    </ul>
  );
}

type Tone = "positive" | "neutral";
const TONES: Record<Tone, { box: string; label: string; status: string }> = {
  positive: { box: "bg-emerald-50 border-emerald-500 dark:bg-emerald-950/30 dark:border-emerald-500", label: "text-emerald-700 dark:text-emerald-300", status: "text-emerald-600 dark:text-emerald-400" },
  neutral: { box: "bg-white border-slate-300 dark:bg-slate-900 dark:border-slate-700", label: "text-slate-500 dark:text-slate-400", status: "text-slate-400 dark:text-slate-500" },
};

export function FindingRow({ tone = "positive", label, value, status, highlight, animate }: { tone?: Tone; label: string; value: string; status: string; highlight?: boolean; animate?: boolean }) {
  const t = TONES[tone];
  return (
    <div className={cn("flex items-center justify-between gap-3 rounded-xl border-l-4 px-3 py-2.5", t.box, highlight && "ring-2 ring-slate-900/15 dark:ring-white/25", animate && "animate-[rise_0.4s_ease-out]")}>
      <div className="flex min-w-0 flex-col text-left">
        <span className={cn("text-[0.6875rem] font-bold uppercase tracking-widest", t.label)}>{label}</span>
        <span className="text-sm font-bold leading-snug text-slate-800 dark:text-slate-100">{value}</span>
      </div>
      <span className={cn("shrink-0 text-[0.6875rem] font-black uppercase tracking-wider", t.status)}>{status}</span>
    </div>
  );
}

function DiagnosisField({ value, focus, placeholder = "Final diagnosis…", accent = "rose" }: { value: string; focus?: boolean; placeholder?: string; accent?: Hue }) {
  const look = {
    rose: focus ? "border-rose-500 ring-2 ring-rose-500/20" : "border-rose-300 dark:border-rose-800",
    emerald: focus ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-emerald-300 dark:border-emerald-800",
    violet: "border-violet-300 dark:border-violet-800",
    sky: "border-sky-300 dark:border-sky-800",
  }[accent];
  return (
    <div className={cn("flex min-h-[48px] w-full items-center rounded-2xl border-2 bg-white px-4 text-sm font-bold text-slate-800 shadow-sm dark:bg-slate-900 dark:text-white", look)}>
      {value ? <span>{value}{focus && <span className="caret" />}</span> : <span className="text-slate-400 dark:text-slate-500">{placeholder}</span>}
    </div>
  );
}

const GameBtn = ({ variant, children, size = "md", disabled }: { variant: "game" | "secondary" | "ghost" | "dark"; children: React.ReactNode; size?: "md" | "lg"; disabled?: boolean }) => (
  <span className={cn(
    "flex w-full items-center justify-center rounded-2xl px-4 text-xs font-black uppercase tracking-widest",
    size === "lg" ? "min-h-[52px]" : "min-h-[44px]",
    variant === "game" && "bg-rose-600 text-white shadow-lg shadow-rose-500/25",
    variant === "dark" && "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
    variant === "secondary" && "border-2 border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
    variant === "ghost" && "text-slate-600 dark:text-slate-300",
    disabled && "opacity-50",
  )}>{children}</span>
);

function ResultSheet({ time, tries, hints }: { time: string; tries: string; hints: string }) {
  return (
    <>
      <div className="scrim-in absolute inset-0 z-40 bg-slate-950/45" />
      <div className="sheet-in absolute inset-x-0 bottom-0 z-50 rounded-t-[2rem] border-t-4 border-emerald-500 bg-white px-5 pb-8 pt-4 shadow-2xl dark:bg-slate-900">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
        <h3 className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white"><Check className="h-4 w-4" strokeWidth={4} /></span>
          Solved!
        </h3>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800"><p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">Time</p><p className="text-xl font-bold tabular-nums">{time}</p></div>
          <div className="rounded-xl bg-rose-50 p-2 text-center dark:bg-rose-950/40"><p className="text-[0.6875rem] font-bold uppercase tracking-widest text-rose-500">Tries</p><p className="text-xl font-bold tabular-nums">{tries}</p></div>
          <div className="rounded-xl bg-slate-50 p-2 text-center dark:bg-slate-800"><p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">Hints</p><p className="text-xl font-bold tabular-nums">{hints}</p></div>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          <b className="text-slate-900 dark:text-white">Pulmonary embolism.</b> Pleuritic chest pain with hypoxia, a raised D-dimer and a filling defect on CT angiography.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <GameBtn variant="game" size="lg">Share results</GameBtn>
          <div className="grid grid-cols-2 gap-2"><GameBtn variant="secondary">View board</GameBtn><GameBtn variant="ghost">Menu</GameBtn></div>
        </div>
      </div>
    </>
  );
}

type Finding = { label: string; value: string; status: string };
type Frame = { scope: number; q: string; focus: boolean; dd: string[]; rows: Finding[]; dq: string; dfocus: boolean; ddd: [string, string?][]; result: boolean };
const INITIAL: Frame = { scope: 0, q: "", focus: false, dd: [], rows: [], dq: "", dfocus: false, ddd: [], result: false };
const CASE_ROWS: Finding[] = [
  { label: "Symptom", value: "Chest pain", status: "Present" },
  { label: "Vital", value: "Oxygen saturation", status: "Abnormal" },
  { label: "Lab", value: "D-dimer", status: "High" },
  { label: "Imaging", value: "CT angiography", status: "Abnormal" },
];
const FINAL: Frame = { ...INITIAL, rows: CASE_ROWS, result: true };

type Ev = { at: number; fn: (f: Frame) => Frame };
function timeline(): { events: Ev[]; total: number } {
  const events: Ev[] = [];
  let t = 0;
  const at = (dt: number, fn: Ev["fn"]) => { t += dt; events.push({ at: t, fn }); };
  const investigate = (scope: number, text: string, options: string[], row: Finding) => {
    at(520, (f) => ({ ...f, scope, q: "", dd: [], focus: true }));
    for (let i = 1; i <= text.length; i++) { const q = text.slice(0, i); const show = i >= 3; at(85, (f) => ({ ...f, q, dd: show ? options : [] })); }
    at(720, (f) => ({ ...f, q: "", dd: [], focus: false, rows: [...f.rows, row] }));
  };
  investigate(0, "chest", ["Chest pain", "Chest tightness"], CASE_ROWS[0]);
  investigate(2, "oxyg", ["Oxygen saturation"], CASE_ROWS[1]);
  investigate(1, "d-di", ["D-dimer"], CASE_ROWS[2]);
  investigate(3, "ct a", ["CT angiography", "CT abdomen"], CASE_ROWS[3]);
  at(650, (f) => ({ ...f, dfocus: true }));
  const dx = "pulmonary e";
  for (let i = 1; i <= dx.length; i++) { const q = dx.slice(0, i); const show = i >= 5; at(75, (f) => ({ ...f, dq: q, ddd: show ? [["Pulmonary embolism", "Cardiology"], ["Pulmonary hypertension", "Cardiology"]] : [] })); }
  at(820, (f) => ({ ...f, dq: "", ddd: [], dfocus: false, result: true }));
  at(4600, (f) => ({ ...f, result: false }));
  return { events, total: t + 350 };
}

const fmt = (ms: number) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

/** The hero: a real case being worked up in the real Syndrome screen, on a loop. */
export function SyndromeLive() {
  const reduced = useReducedMotion();
  const [ref, onScreen] = useOnScreen<HTMLDivElement>();
  const [frame, setFrame] = useState<Frame>(INITIAL);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);
  const frozenRef = useRef<number | null>(null);
  const active = onScreen && !reduced;

  useEffect(() => {
    if (!active) return;
    const { events, total } = timeline();
    let timers: number[] = [];
    const run = () => {
      timers.forEach(clearTimeout); timers = [];
      startRef.current = performance.now(); frozenRef.current = null;
      setFrame(INITIAL); setElapsed(0);
      for (const e of events) {
        timers.push(window.setTimeout(() => setFrame((f) => {
          const n = e.fn(f);
          if (n.result && !f.result) frozenRef.current = performance.now() - startRef.current;
          if (!n.result && f.result) frozenRef.current = null;
          return n;
        }), e.at));
      }
      timers.push(window.setTimeout(run, total));
    };
    run();
    const tick = window.setInterval(() => setElapsed(frozenRef.current ?? performance.now() - startRef.current), 250);
    return () => { timers.forEach(clearTimeout); window.clearInterval(tick); };
  }, [active]);

  const f = reduced ? FINAL : frame;
  const time = reduced ? "0:47" : fmt(elapsed);
  return (
    <div ref={ref}>
      <Screen hue="rose">
        <AppHeader time={time} tries={`${f.result ? 1 : 0}/6`} hints="0/2" />
        <div className="relative z-20 flex flex-col gap-3 px-4 pt-3">
          <Presentation text="A 58-year-old woman presents with shortness of breath." />
          <ScopeTabs active={f.scope} />
          <div className="relative">
            <SearchField placeholder={PLACEHOLDERS[f.scope]} value={f.q} focus={f.focus} />
            {f.dd.length > 0 && <Dropdown items={f.dd.map((d) => [d] as [string])} />}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-4">
          {f.rows.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-xs font-bold text-slate-400 dark:border-slate-800 dark:text-slate-600">Findings land here as you investigate.</div>
          ) : f.rows.map((r, i) => <FindingRow key={r.value} {...r} highlight={i === f.rows.length - 1} animate={!reduced} />)}
        </div>
        <div className="relative z-20 flex items-center gap-2 px-4 pb-7">
          <div className="relative flex-1">
            {f.ddd.length > 0 && <Dropdown up items={f.ddd} />}
            <DiagnosisField value={f.dq} focus={f.dfocus} />
          </div>
          <HintPill />
        </div>
        {f.result && <ResultSheet time={time} tries="1" hints="0" />}
      </Screen>
    </div>
  );
}

/* ---------------------------------- Traits ---------------------------------- */

type CellState = "exact" | "partial" | "miss";
const TRAITS = ["System", "Type", "Acuity", "Organs", "Diagnosis", "Treatment"];
const TRAIT_ROWS: { name: string; cells: [string, CellState][] }[] = [
  { name: "Celiac disease", cells: [["Gastroenterology", "miss"], ["Autoimmune", "miss"], ["Acute", "exact"], ["Intestines", "miss"], ["Clinical, labs, biopsy", "partial"], ["Lifestyle", "miss"]] },
  { name: "Pulmonary embolism", cells: [["Cardiology", "exact"], ["Vascular", "exact"], ["Acute", "exact"], ["Lungs, blood vessels, heart", "partial"], ["Clinical, labs, imaging", "exact"], ["Meds, procedure, supportive", "partial"]] },
];
const cellClass = (s: CellState) => s === "exact" ? "bg-emerald-600 border-emerald-700 text-white shadow-sm" : s === "partial" ? "bg-amber-500 border-amber-600 text-white shadow-sm" : "bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800/85 dark:border-slate-700/80 dark:text-slate-300";
const StateMark = ({ state }: { state: CellState }) => {
  const c = "absolute top-1 right-1 w-3 h-3 opacity-90";
  if (state === "exact") return <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
  if (state === "partial") return <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M4 14c2.5-4 5.5-4 8 0s5.5 4 8 0" /></svg>;
  return <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>;
};

export function TraitsPreview() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  let k = 0;
  return (
    <div ref={ref} className={cn("demo", inView && "in")}>
      <Screen hue="emerald">
        <AppHeader time="1:12" tries="2/15" hints="0/2" />
        <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
          {TRAIT_ROWS.map((row) => (
            <div key={row.name} className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="-mt-0.5 flex justify-center">
                <span className="rounded-xl border border-emerald-100 bg-emerald-50 px-[1.125rem] py-1 text-xs font-extrabold uppercase tracking-wide text-emerald-800 shadow-sm dark:border-emerald-800/40 dark:bg-emerald-950/45 dark:text-emerald-400">{row.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {row.cells.map(([value, state], i) => (
                  <div key={TRAITS[i]} className={cn("a-flip relative flex min-h-[4.2rem] flex-col items-center justify-center rounded-xl border-2 p-1.5 text-center", cellClass(state))} style={{ "--i": k++ } as React.CSSProperties}>
                    <StateMark state={state} />
                    <span className="mb-0.5 block text-[0.6875rem] font-black uppercase tracking-widest opacity-80">{TRAITS[i]}</span>
                    <span className="text-[0.6875rem] font-bold leading-tight">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-auto"><DiagnosisField value="" placeholder="Guess a disease…" accent="emerald" /></div>
        </div>
      </Screen>
    </div>
  );
}

/* ------------------------------- Associations ------------------------------- */

const SOLVED = ["Muscle pain", "Normal reflexes", "Diffuse tender points", "Normal strength"];
const SELECTED = ["Papilledema", "S4 gallop", "Retinal hemorrhages"];
const ASSOC_GRID = [
  "Painful arc", "Muscle pain", "Papilledema", "Hemoglobin: low",
  "Normal reflexes", "Weight: Positive", "S4 gallop", "Reduced range of motion",
  "Dermatitis herpetiformis", "Diffuse tender points", "CT head: Abnormal", "Supraspinatus weakness",
  "Retinal hemorrhages", "Extremity X-ray: Abnormal", "Normal strength", "Albumin: low",
];

export function AssociationsPreview() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn("demo", inView && "in")}>
      <Screen hue="violet">
        <AppHeader time="2:05" tries="1/12" extra={<HintPill label="Hint · 3" />} />
        <div className="flex flex-1 flex-col gap-1 overflow-hidden p-4">
          <div className="a-pop mb-1 rounded-xl border-2 border-sky-300 bg-sky-100 p-2.5 text-center text-sm font-black tracking-wide text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200">Fibromyalgia</div>
          <div className="grid grid-cols-4 gap-1.5">
            {ASSOC_GRID.map((t, i) => {
              const locked = SOLVED.includes(t);
              const sel = SELECTED.includes(t);
              return (
                <div key={t} className={cn(
                  "flex h-[5.75rem] items-center justify-center rounded-xl border-2 p-1.5 text-center text-[12px] font-bold leading-tight shadow-sm",
                  locked ? "border-sky-500 bg-emerald-500 text-white" : sel ? "a-pop border-indigo-600 bg-indigo-50 text-indigo-900 dark:border-indigo-400 dark:bg-indigo-900/40 dark:text-white" : "border-slate-100 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200",
                )} style={{ "--i": SELECTED.indexOf(t) + 2 } as React.CSSProperties}>
                  <span className="[hyphens:auto]">{t}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <p className="text-center text-[0.6875rem] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">3 selected · pick 1 more</p>
            <div className="grid grid-cols-2 gap-2"><GameBtn variant="secondary">Deselect all</GameBtn><GameBtn variant="secondary">Shuffle</GameBtn></div>
            <GameBtn variant="dark" size="lg" disabled>Submit</GameBtn>
          </div>
        </div>
      </Screen>
    </div>
  );
}

/* ---------------------------------- Tangent ---------------------------------- */

type Guess = { name: string; score: number; xLeft: number; xRight: number; y: number };
// Real structures from the app's anatomy data, scored against the pituitary gland the way the game does.
const GUESSES: Guess[] = [
  { name: "Thyroid gland", score: 78, xLeft: 0.44, xRight: 0.56, y: 0.82 },
  { name: "Heart", score: 73, xLeft: 0.42, xRight: 0.58, y: 0.68 },
  { name: "Liver", score: 62, xLeft: 0.52, xRight: 0.88, y: 0.56 },
  { name: "Kidney", score: 40, xLeft: 0.28, xRight: 0.72, y: 0.48 },
];
const scoreHex = (s: number) => (s >= 90 ? "#10b981" : s >= 70 ? "#14b8a6" : s >= 45 ? "#f59e0b" : s >= 25 ? "#f97316" : "#f43f5e");
const scoreText = (s: number) => (s >= 90 ? "text-emerald-600 dark:text-emerald-400" : s >= 70 ? "text-teal-600 dark:text-teal-400" : s >= 45 ? "text-amber-600 dark:text-amber-400" : s >= 25 ? "text-orange-600 dark:text-orange-400" : "text-rose-600 dark:text-rose-400");
const scoreBg = (s: number) => (s >= 90 ? "bg-emerald-500" : s >= 70 ? "bg-teal-500" : s >= 45 ? "bg-amber-500" : s >= 25 ? "bg-orange-500" : "bg-rose-500");

export function BodyMap({ guesses, latest, className, dots = true }: { guesses: Guess[]; latest: string; className?: string; dots?: boolean }) {
  const W = 120, H = 220;
  const px = (x: number) => 14 + x * (W - 28);
  const py = (y: number) => 10 + (1 - y) * (H - 20);
  const pts = (g: Guess) => (Math.abs(g.xLeft - g.xRight) < 0.02 ? [(g.xLeft + g.xRight) / 2] : [g.xLeft, g.xRight]).map((x) => ({ x: px(x), y: py(g.y) }));
  let k = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <g className="fill-slate-100 stroke-slate-300 dark:fill-slate-800 dark:stroke-slate-700" strokeWidth="2">
        <circle cx={W / 2} cy={22} r={14} />
        <path d={`M${W / 2 - 8} 36 h16 v8 c22 4 30 18 30 40 v34 c0 6 -6 10 -12 10 v78 c0 6 -5 10 -11 10 h-4 c-4 0 -7 -3 -7 -7 v-60 h-8 v60 c0 4 -3 7 -7 7 h-4 c-6 0 -11 -4 -11 -10 v-78 c-6 0 -12 -4 -12 -10 v-34 c0 -22 8 -36 30 -40 z`} />
      </g>
      {dots && [...guesses].reverse().map((g) => pts(g).map((d, i) => (
        <circle key={`${g.name}-${i}`} className="a-drop" style={{ "--i": k++, transformOrigin: `${d.x}px ${d.y}px` } as React.CSSProperties} cx={d.x} cy={d.y} r={g.name === latest ? 6 : 4.5} fill={scoreHex(g.score)} stroke="white" strokeWidth={g.name === latest ? 2 : 1.5} opacity={0.95} />
      )))}
    </svg>
  );
}

export function TangentPreview() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const latest = GUESSES[0];
  return (
    <div ref={ref} className={cn("demo", inView && "in")}>
      <Screen hue="sky">
        <AppHeader time="0:58" tries="4/10" />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-4 overflow-hidden p-4">
          <div className="flex w-full items-center justify-center rounded-[2rem] border-2 border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <BodyMap guesses={GUESSES} latest={latest.name} className="h-52 w-auto" />
          </div>
          <div className="flex flex-col gap-3 rounded-[2rem] border-2 border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[0.6875rem] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Proximity spectrum</span>
              <span className={cn("text-xs font-bold", scoreText(latest.score))}>{latest.name}</span>
            </div>
            <div className="relative h-4 w-full rounded-full border bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-800">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-rose-500/80 via-amber-500/80 to-emerald-500/80 opacity-[0.85]" />
              <div className="pin absolute -top-1.5 flex h-8 w-8 -translate-x-1/2 flex-col items-center" style={{ left: inView ? `${latest.score}%` : "0%" }}>
                <div className={cn("h-4 w-4 scale-125 rounded-full border-2 border-white shadow-sm dark:border-slate-800", scoreBg(latest.score))} />
                <div className="mt-0.5 h-0 w-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-amber-500" />
              </div>
            </div>
            <div className="flex justify-between px-0.5 text-[0.6875rem] font-black uppercase leading-none tracking-wider">
              <span className="text-rose-500/90">Very far</span><span className="text-amber-500/90">Approaching</span><span className="text-emerald-500/90">Super close</span>
            </div>
          </div>
          <div className="flex items-center rounded-3xl border-2 border-slate-100 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Search className="ml-3.5 h-[1.125rem] w-[1.125rem] shrink-0 text-slate-400" />
            <span className="px-3 py-2.5 text-sm font-bold text-slate-400 dark:text-slate-600">Search organs…</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[0.6875rem] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Guessed matches ({GUESSES.length})</span>
              <span className="text-[0.6875rem] font-bold text-slate-400">Closest is always at top</span>
            </div>
            {GUESSES.map((g, i) => (
              <div key={g.name} className="a-rise flex items-center justify-between rounded-2xl border border-slate-200 p-3.5 dark:border-slate-800" style={{ "--i": i + 2 } as React.CSSProperties}>
                <h4 className={cn("text-sm font-extrabold leading-none", scoreText(g.score))}>{g.name}</h4>
                <div className="relative flex h-2 w-20 items-center rounded-full bg-slate-200/50 dark:bg-slate-800">
                  <div className="h-1 w-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 opacity-[0.85]" />
                  <div className={cn("absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-white shadow-sm dark:border-slate-900", scoreBg(g.score))} style={{ left: `${g.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Screen>
    </div>
  );
}

/* ---------------------------------- Home ---------------------------------- */

const HOME_CARDS = [
  { key: "syndrome", title: "Syndrome", desc: "Work up a case", look: "bg-rose-50 border-rose-100 text-rose-700 dark:bg-slate-900 dark:border-rose-900/30 dark:text-rose-500", tag: <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[0.6875rem] font-black uppercase tracking-widest text-white">Solved · 1</span> },
  { key: "traits", title: "Traits", desc: "Narrow it down trait by trait", look: "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-slate-900 dark:border-emerald-900/30 dark:text-emerald-500", tag: <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[0.6875rem] font-black uppercase tracking-widest text-white">Resume</span> },
  { key: "associations", title: "Associations", desc: "Find the four that belong together", look: "bg-violet-50 border-violet-100 text-violet-700 dark:bg-slate-900 dark:border-violet-900/30 dark:text-violet-500", tag: null },
  { key: "tangent", title: "Tangent", desc: "Home in on the hidden structure", look: "bg-sky-50 border-sky-100 text-sky-700 dark:bg-slate-900 dark:border-sky-900/30 dark:text-sky-500", tag: null },
] as const;

export function HomePreview() {
  return (
    <Screen hue="home">
      <div className="pb-3 pt-6 text-center">
        <h1 className="flex flex-col items-center text-[6rem] font-black leading-none tracking-tighter">
          <span className="text-rose-600 leading-none">Stat<span className="text-slate-900 dark:text-white">!</span></span>
          <span className="-mt-1 text-[0.6875rem] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Medical Minigames</span>
        </h1>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 pt-2">
        {HOME_CARDS.map((c) => (
          <div key={c.key} className={cn("relative flex h-24 w-full items-center overflow-hidden rounded-[2rem] border-2 text-left", c.look)}>
            <div className="z-10 w-[64%] py-2 pl-5">
              <div className="mb-0.5 flex items-center gap-2"><h3 className="text-xl font-extrabold leading-tight">{c.title}</h3>{c.tag}</div>
              <p className="text-sm font-medium leading-tight text-slate-700 opacity-80 dark:text-slate-300">{c.desc}</p>
            </div>
            <div className="pointer-events-none absolute right-4 top-1/2 flex aspect-square h-[70%] -translate-y-1/2 items-center justify-center"><img src={LOGO[c.key]} alt="" className="h-full w-full object-contain" /></div>
          </div>
        ))}
      </div>
      <div className="flex w-full shrink-0 justify-center px-6 pb-8 pt-2">
        <div className="flex w-full max-w-sm items-center gap-3 rounded-full border-2 border-slate-100 bg-white/80 p-2 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <Round><Settings className="h-5 w-5" strokeWidth={2.25} /></Round>
          <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-indigo-600 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/25">Upgrade to Pro</span>
          <Round><BarChart3 className="h-5 w-5" strokeWidth={2.5} /></Round>
        </div>
      </div>
    </Screen>
  );
}

/* ------------------------------ Stats & archive ------------------------------ */

const DIST: [string, number][] = [["1", 4], ["2", 9], ["3", 8], ["4", 6], ["5", 3], ["6", 1], ["X", 7]];

export function StatsPreview() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const max = Math.max(...DIST.map((d) => d[1]));
  return (
    <div ref={ref} className={cn("demo min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white", inView && "in")}>
      <div className="flex items-end gap-4">
        <div>
          <p className="text-[0.6875rem] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Statistics</p>
          <h3 className="mt-1 text-2xl font-black uppercase leading-none tracking-tight">Syndrome</h3>
        </div>
        <div className="ml-auto flex items-center gap-2 text-amber-600 dark:text-amber-300">
          <Flame className="h-6 w-6" strokeWidth={2.5} />
          <div className="text-right leading-none"><div className="text-3xl font-black tabular-nums">12</div><div className="text-[0.6875rem] font-bold uppercase tracking-widest">day streak</div></div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["Syndrome", "Traits", "Associations", "Tangent"].map((m, i) => (
          <span key={m} className={cn("flex min-h-[32px] shrink-0 items-center rounded-full px-3 text-[0.6875rem] font-black uppercase tracking-widest", i === 0 ? "bg-rose-500 text-white shadow-sm" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400")}>{m}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {[["Played", "38"], ["Solved", "31"], ["Avg solve time", "1:42"], ["Avg hints", "0.6"]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-800">
            <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{l}</p>
            <p className="text-2xl font-black tabular-nums">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 mb-2 text-[0.6875rem] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Tries to solve</p>
      <div className="flex flex-col gap-1.5">
        {DIST.map(([label, n], i) => (
          <div key={label} className="flex items-center gap-2 font-mono text-xs font-bold tabular-nums">
            <span className="w-5 text-right text-slate-500">{label}</span>
            <div className="h-5 flex-1 rounded-md bg-slate-100 dark:bg-slate-800">
              <div className={cn("a-rise flex h-full items-center justify-end rounded-md px-2 text-white", label === "X" ? "bg-slate-400 dark:bg-slate-600" : "bg-rose-500")} style={{ width: `${Math.max(12, (n / max) * 100)}%`, "--i": i } as React.CSSProperties}>{n}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const WEEK: { d: string; n: number; s: "solved" | "missed" | "open" | "today" }[] = [
  { d: "Mon", n: 7, s: "solved" }, { d: "Tue", n: 8, s: "solved" }, { d: "Wed", n: 9, s: "missed" }, { d: "Thu", n: 10, s: "solved" }, { d: "Fri", n: 11, s: "solved" }, { d: "Sat", n: 12, s: "open" }, { d: "Sun", n: 13, s: "today" },
];

export function ArchiveStrip() {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {WEEK.map((w) => (
        <div key={w.n} className={cn("flex flex-col items-center gap-1 rounded-2xl border-2 py-2.5 text-center", w.s === "today" ? "border-rose-500 bg-white dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900")}>
          <span className="text-[0.625rem] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{w.d}</span>
          <span className="text-base font-black tabular-nums text-slate-900 dark:text-white">{w.n}</span>
          <span className={cn("h-2 w-2 rounded-full", w.s === "solved" && "bg-emerald-500", w.s === "missed" && "bg-rose-500", w.s === "open" && "bg-slate-300 dark:bg-slate-600", w.s === "today" && "bg-rose-500 ring-4 ring-rose-500/20")} />
        </div>
      ))}
    </div>
  );
}

export function ShareCard() {
  return (
    <div className="rounded-[1.5rem] rounded-bl-md bg-slate-900 px-5 py-4 font-mono text-[13px] leading-relaxed text-slate-100 shadow-lg dark:bg-slate-800">
      <div>Stat! Syndrome Daily - Solved</div>
      <div>Time: 0:47</div>
      <div>Guesses: 1</div>
      <div>Hints: 0</div>
    </div>
  );
}

/** A finding row outside a phone, for the Syndrome game card. */
export function SyndromeStill() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn("demo", inView && "in")}>
      <Screen hue="rose">
        <AppHeader time="0:39" tries="0/6" hints="1/2" />
        <div className="flex flex-col gap-3 px-4 pt-3">
          <Presentation text="A 58-year-old woman presents with shortness of breath." />
          <ScopeTabs active={1} />
          <SearchField placeholder="Order a lab…" value="" />
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-4">
          {[
            { label: "Symptom", value: "Chest pain", status: "Present", tone: "positive" as Tone },
            { label: "Symptom", value: "Calf pain", status: "Present", tone: "positive" as Tone },
            { label: "Vital", value: "Oxygen saturation", status: "Abnormal", tone: "positive" as Tone },
            { label: "Lab", value: "Troponin", status: "High", tone: "positive" as Tone },
            { label: "Imaging · revealed", value: "Chest X-ray", status: "Abnormal", tone: "positive" as Tone },
          ].map((r, i) => (
            <div key={r.value} className="a-rise" style={{ "--i": i } as React.CSSProperties}><FindingRow {...r} highlight={i === 4} /></div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 pb-7"><div className="flex-1"><DiagnosisField value="" /></div><HintPill /></div>
      </Screen>
    </div>
  );
}

export { CornerDownLeft };
