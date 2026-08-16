import { useState } from "react";
import { Link } from "react-router-dom";
import { BRING, CAMPS, IMG, SCHEDULE, STEPS } from "../data";
import { PageHead, Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon } from "../components/Icons";

const DOT: Record<string, string> = {
  "Ball Mastery": "bg-gold-500",
  "Position Play": "bg-pitch-400",
  "Team Tactics": "bg-clay-400",
  "Physical Foundations": "bg-bone-300",
  "Small-Sided Games": "bg-gold-400",
  "Finishing & Striking": "bg-clay-400",
  "School Support": "bg-pitch-300",
  "Match Simulation": "bg-pitch-400",
  "Set Pieces & GK Unit": "bg-gold-500",
  "Recovery & Mobility": "bg-bone-300",
  "Team Activation": "bg-gold-400",
  "League Fixtures": "bg-clay-400",
};

function WeekGrid() {
  const [activeDay, setActiveDay] = useState(0);
  return (
    <section className="relative bg-pitch-950 py-24 text-bone-50 lg:py-28">
      <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <span
        className="text-outline pointer-events-none absolute bottom-0 left-0 select-none font-display text-[16vw] uppercase leading-none opacity-40 lg:text-[180px]"
        aria-hidden="true"
      >
        Weekly
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          onDark
          kicker="The Ahenkan Week · 9am – 3pm"
          title="Weekly Training Schedule"
          sub="Six days a week at our Adeiso grounds — technique in the morning, tactics and match simulation in the afternoon, schooling support in between."
        />

        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:hidden">
          {SCHEDULE.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`border px-3 py-3 font-cond text-base font-bold uppercase tracking-[0.14em] transition-colors ${
                activeDay === i
                  ? "border-gold-500 bg-gold-500 text-pitch-950"
                  : "border-bone-50/20 text-bone-50/75 hover:border-gold-500/60"
              }`}
            >
              {d.day}
              {d.note && <span className="ml-1.5 text-[10px] text-clay-400">●</span>}
            </button>
          ))}
        </div>

        <div className="mt-4 border border-bone-50/12 bg-pitch-900/70 lg:hidden">
          <div className="space-y-3 p-5">
            {SCHEDULE[activeDay].sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-3 border border-bone-50/10 bg-pitch-950 px-4 py-3.5">
                <span className="flex items-center gap-3">
                  <span className={`h-2 w-2 ${DOT[s.program] ?? "bg-gold-500"}`} />
                  <span>
                    <span className="block font-cond text-base font-semibold uppercase tracking-widest">{s.program}</span>
                    <span className="text-xs text-bone-50/55">{s.pitch}</span>
                  </span>
                </span>
                <span className="tabular font-cond text-sm font-bold text-gold-500">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden grid-cols-6 gap-px border border-bone-50/12 bg-bone-50/10 lg:grid">
          {SCHEDULE.map((d, di) => (
            <Reveal key={d.day} delay={di * 70} className="h-full">
              <div className="group flex h-full min-h-[300px] flex-col bg-pitch-950 p-5 transition-colors duration-300 hover:bg-pitch-900">
                <div className="flex items-baseline justify-between border-b-2 border-gold-500/70 pb-3">
                  <h3 className="font-display text-xl uppercase">{d.day}</h3>
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
                      <p className="tabular font-cond text-sm font-bold uppercase tracking-widest text-gold-500">{s.time}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                        <span className={`h-1.5 w-1.5 shrink-0 ${DOT[s.program] ?? "bg-gold-500"}`} />
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
      </div>
    </section>
  );
}

function Camps() {
  return (
    <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute right-0 top-6 select-none font-display text-[16vw] uppercase leading-none opacity-60 lg:text-[180px]"
        aria-hidden="true"
      >
        Camps
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Elite Training Camps"
          title="Intensives That Build Champions"
          sub="Short, sharp camps that take players beyond the weekly rhythm — residential work, specialist coaching and real player assessment."
        />

        <div className="mt-14 space-y-6">
          {CAMPS.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <article className="group grid grid-cols-1 gap-6 border-2 border-pitch-900/15 bg-bone-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-600 hover:shadow-[0_20px_50px_rgba(8,32,21,0.14)] sm:p-9 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-1">
                  <p className="font-display text-5xl text-pitch-900/15 transition-colors duration-300 group-hover:text-gold-600 lg:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-pitch-600">
                    {c.length} · {c.who}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase tracking-wide sm:text-3xl">{c.name}</h3>
                  <p className="mt-3 leading-relaxed text-pitch-900/70">{c.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:col-span-4">
                  {c.tags.map((t) => (
                    <span key={t} className="border border-pitch-700/30 bg-pitch-900/5 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-[0.14em] text-pitch-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <Link to="/contact" className="btn-green px-5! py-3! text-sm">
                    Enquire
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="relative bg-bone-50 py-24 text-pitch-900 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold-600/60" aria-hidden="true" />
            <div className="relative overflow-hidden">
              <img src={IMG.drill} alt="Academy players working a passing drill with cones" className="anim-kenburns aspect-[4/3] w-full object-cover" />
            </div>
            <div className="diagonal-stripes absolute -right-5 -bottom-5 h-28 w-28" aria-hidden="true" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <figure className="group overflow-hidden border-2 border-pitch-900/15">
              <img src={IMG.keeper} alt="Ahenkan goalkeeper diving to save" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </figure>
            <figure className="group mt-8 overflow-hidden border-2 border-pitch-900/15">
              <img src={IMG.match} alt="Youth league matchday action" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </figure>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-36">
            <SectionHead
              kicker="How We Train"
              title="Built on Repetition, Rest & Respect"
              sub="Every session follows a proven rhythm: technical repetition in the morning, tactical understanding in the afternoon, and recovery plus schooling woven through the week."
            />
            <div className="mt-10 space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.no} delay={i * 100}>
                  <div className="group flex gap-5 border-l-2 border-pitch-600/40 pl-5 transition-all duration-300 hover:border-gold-600 hover:pl-6">
                    <span className="font-display text-3xl text-pitch-400 transition-colors duration-300 group-hover:text-gold-600">{s.no}</span>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-wide">{s.title}</h3>
                      <p className="mt-1.5 max-w-md leading-relaxed text-pitch-900/70">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <div className="mt-10 border-2 border-pitch-900/15 bg-bone-100 p-7">
                <h3 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-pitch-600">
                  What to bring to training
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {BRING.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-pitch-900/75">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Training() {
  return (
    <>
      <PageHead
        crumb="Training"
        kicker="Talent, Wisdom & Knowledge at Work"
        title="Training at Ahenkan"
        sub="Our weekly schedule, elite training camps and the coaching philosophy that shapes every session at the Ahenkan Grounds in Adeiso."
      />
      <WeekGrid />
      <Camps />
      <Philosophy />
      <section className="bg-gold-500 py-14 text-pitch-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
          <p className="font-display text-2xl uppercase sm:text-3xl">
            Ready to train with us? <span className="text-pitch-700">Trials are open.</span>
          </p>
          <Link to="/contact" className="group inline-flex items-center gap-3 bg-pitch-950 px-7 py-4 font-cond text-base font-bold uppercase tracking-[0.14em] text-gold-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(5,19,12,0.4)]">
            Book a trial day
            <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
