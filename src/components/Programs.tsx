import { useState } from "react";
import { PROGRAMS, SCHEDULE } from "../data";
import { Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon, ChevronIcon } from "./Icons";

const TAG_COLORS: Record<string, string> = {
  grassroots: "border-gold-600/50 text-gold-700",
  development: "border-pitch-600/50 text-pitch-700",
  youth: "border-clay-500/50 text-clay-500",
  elite: "border-pitch-900/50 text-pitch-900",
  queens: "border-[#d16ba0]/60 text-[#b04a80]",
  gk: "border-[#4a7db5]/60 text-[#3a6694]",
};

const DOT_COLORS: Record<string, string> = {
  Grassroots: "bg-gold-500",
  Development: "bg-pitch-500",
  "Youth Comp.": "bg-clay-400",
  Elite: "bg-bone-300",
  Queens: "bg-[#d16ba0]",
  Goalkeepers: "bg-[#7ba3d4]",
};

export function Programs() {
  const [openId, setOpenId] = useState<string | null>("youth");

  return (
    <section id="programs" className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute right-0 top-6 select-none font-display text-[20vw] uppercase leading-none opacity-60 lg:text-[200px]"
        aria-hidden="true"
      >
        Programs
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            dark
            kicker="Six pathways, one standard"
            title="Academy Programs"
            sub="From a six-year-old's first session to an 18-year-old's pro trial — every age group trains on a structured, GFA-aligned curriculum."
          />
          <Reveal delay={200}>
            <p className="mb-2 border-l-4 border-gold-500 bg-bone-50 px-4 py-3 text-sm font-semibold text-pitch-800">
              Scholarships cover 1 in 3 players.
              <span className="block font-normal text-pitch-800/70">
                No child is ever turned away for lack of funds.
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t-2 border-pitch-900">
          {PROGRAMS.map((p, i) => {
            const open = openId === p.id;
            return (
              <Reveal key={p.id} delay={i * 60}>
                <article
                  className={`border-b-2 border-pitch-900 transition-colors duration-300 ${
                    open ? "bg-pitch-900 text-bone-50" : "hover:bg-bone-50"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(open ? null : p.id)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-5 px-4 py-6 text-left sm:gap-8 sm:px-8"
                  >
                    <span
                      className={`hidden font-display text-2xl sm:block ${
                        open ? "text-gold-500" : "text-pitch-900/25"
                      }`}
                    >
                      {p.no}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-2xl uppercase tracking-wide sm:text-3xl">
                        {p.name}
                      </span>
                      <span
                        className={`mt-1 block font-cond text-sm font-semibold uppercase tracking-[0.18em] ${
                          open ? "text-gold-400" : "text-pitch-800/60"
                        }`}
                      >
                        {p.ages} · {p.tag}
                      </span>
                    </span>
                    <span
                      className={`hidden shrink-0 border-2 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-[0.16em] md:block ${
                        TAG_COLORS[p.id] ?? "border-pitch-900/30 text-pitch-900/70"
                      }`}
                    >
                      {p.tag}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 transition-all duration-300 ${
                        open
                          ? "rotate-180 border-gold-500 bg-gold-500 text-pitch-950"
                          : "border-pitch-900/30 text-pitch-900"
                      }`}
                    >
                      <ChevronIcon className="h-5 w-5" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.2,1)] ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 gap-10 px-4 pb-8 pt-2 sm:px-8 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                          <p className="text-base leading-relaxed text-bone-50/80">{p.desc}</p>
                          <ul className="mt-6 space-y-2.5">
                            {p.focus.map((f) => (
                              <li key={f} className="flex items-start gap-3 text-sm text-bone-50/85">
                                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="lg:col-span-4">
                          <dl className="grid grid-cols-1 gap-px bg-bone-50/15">
                            {p.meta.map(([k, v]) => (
                              <div key={k} className="flex items-baseline justify-between gap-4 bg-pitch-900 px-4 py-3">
                                <dt className="font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                                  {k}
                                </dt>
                                <dd className="text-right text-sm font-medium text-bone-50/90">{v}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                        <div className="flex items-end lg:col-span-3">
                          <a
                            href="#trials"
                            className="group inline-flex items-center gap-3 border-2 border-gold-500 px-6 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-gold-400 transition-all duration-200 hover:bg-gold-500 hover:text-pitch-950"
                          >
                            Trial this squad
                            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  return (
    <section id="schedule" className="relative bg-pitch-900 py-24 lg:py-28">
      <span
        className="text-outline pointer-events-none absolute bottom-0 left-0 select-none font-display text-[18vw] uppercase leading-none opacity-40 lg:text-[180px]"
        aria-hidden="true"
      >
        Matchday
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Weekly rhythm"
          title="Training Schedule"
          sub="Six days a week across three pitches. Elite Pathway athletes add a morning block; matchday Saturdays belong to the league."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
          {SCHEDULE.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`border px-4 py-3 font-cond text-base font-bold uppercase tracking-[0.14em] transition-colors ${
                activeDay === i
                  ? "border-gold-500 bg-gold-500 text-pitch-950"
                  : "border-bone-50/20 text-bone-50/75"
              }`}
            >
              {d.day}
              {d.note && <span className="ml-2 text-[10px] text-clay-400">●</span>}
            </button>
          ))}
        </div>

        <div className="mt-4 border border-bone-50/12 bg-pitch-950/60 lg:hidden">
          <div className="space-y-3 p-5">
            {SCHEDULE[activeDay].sessions.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border border-bone-50/10 bg-pitch-900 px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <span className={`h-2 w-2 ${DOT_COLORS[s.program]}`} />
                  <span className="font-cond text-base font-semibold uppercase tracking-widest text-bone-50">
                    {s.program}
                  </span>
                </span>
                <span className="tabular font-cond text-sm text-gold-400">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 hidden grid-cols-6 gap-px border border-bone-50/12 bg-bone-50/10 lg:grid">
          {SCHEDULE.map((d, di) => (
            <Reveal key={d.day} delay={di * 70}>
              <div className="group flex h-full min-h-[340px] flex-col bg-pitch-950 p-5 transition-colors duration-300 hover:bg-pitch-900">
                <div className="flex items-baseline justify-between border-b-2 border-gold-500/70 pb-3">
                  <h3 className="font-display text-xl uppercase text-bone-50">{d.day}</h3>
                  {d.note && (
                    <span className="bg-clay-500 px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.14em] text-bone-50">
                      {d.note}
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-3">
                  {d.sessions.map((s, i) => (
                    <li
                      key={i}
                      className="border border-bone-50/10 bg-pitch-900/70 px-3 py-2.5 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <p className="tabular font-cond text-sm font-bold uppercase tracking-widest text-gold-400">
                        {s.time}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-bone-50">
                        <span className={`h-1.5 w-1.5 shrink-0 ${DOT_COLORS[s.program]}`} />
                        {s.program}
                      </p>
                      <p className="mt-0.5 text-xs text-bone-50/55">{s.pitch}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-bone-50/60">
            <span className="text-gold-400">All sessions</span> Ahenkan Grounds, Spintex Road, Accra
            <span className="hidden h-1 w-1 bg-bone-50/30 sm:block" />
            Gates open 30 min before each block
          </p>
        </Reveal>
      </div>
    </section>
  );
}
