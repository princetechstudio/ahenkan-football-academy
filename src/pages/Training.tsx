import { useState } from "react";
import { Link } from "react-router-dom";
import { BRING, CAMPS, IMG, SCHEDULE, STEPS } from "../data";
import { PageHead, Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon } from "../components/Icons";

const DOT: Record<string, string> = {
  "Ball Mastery": "bg-gold-500",
  "Position Play": "bg-royal-400",
  "Team Tactics": "bg-loss",
  "Physical Foundations": "bg-royal-300",
  "Small-Sided Games": "bg-gold-400",
  "Finishing & Striking": "bg-loss",
  "School Support": "bg-paper",
  "Match Simulation": "bg-royal-400",
  "Set Pieces & GK Unit": "bg-gold-500",
  "Recovery & Mobility": "bg-royal-300",
  "Team Activation": "bg-gold-400",
  "League Fixtures": "bg-loss",
};

function WeekGrid() {
  const [activeDay, setActiveDay] = useState(0);
  return (
    <section className="relative bg-ink py-24 text-paper lg:py-28">
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
                  ? "border-gold-500 bg-gold-500 text-ink"
                  : "border-paper/20 text-paper/75 hover:border-gold-500/60"
              }`}
            >
              {d.day}
              {d.note && <span className="ml-1.5 text-[10px] text-loss">●</span>}
            </button>
          ))}
        </div>

        <div className="mt-4 border border-paper/12 bg-royal-950/70 lg:hidden">
          <div className="space-y-3 p-5">
            {SCHEDULE[activeDay].sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-3 border border-paper/10 bg-royal-900/70 px-4 py-3.5">
                <span className="flex items-center gap-3">
                  <span className={`h-2 w-2 ${DOT[s.program] ?? "bg-gold-500"}`} />
                  <span>
                    <span className="block font-cond text-base font-semibold uppercase tracking-widest">{s.program}</span>
                    <span className="text-xs text-paper/55">{s.pitch}</span>
                  </span>
                </span>
                <span className="tabular font-cond text-sm font-bold text-gold-500">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden grid-cols-6 gap-px border border-paper/12 bg-paper/10 lg:grid">
          {SCHEDULE.map((d, di) => (
            <Reveal key={d.day} delay={di * 70} className="h-full">
              <div className="group flex h-full min-h-[300px] flex-col bg-ink p-5 transition-colors duration-300 hover:bg-royal-950">
                <div className="flex items-baseline justify-between border-b-2 border-gold-500/70 pb-3">
                  <h3 className="font-display text-xl uppercase">{d.day}</h3>
                  {d.note && (
                    <span className="bg-loss px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.14em] text-paper">
                      {d.note}
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-3">
                  {d.sessions.map((s, i) => (
                    <li
                      key={i}
                      className="border border-paper/10 bg-royal-900/70 px-3 py-2.5 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <p className="tabular font-cond text-sm font-bold uppercase tracking-widest text-gold-500">{s.time}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                        <span className={`h-1.5 w-1.5 shrink-0 ${DOT[s.program] ?? "bg-gold-500"}`} />
                        {s.program}
                      </p>
                      <p className="mt-0.5 text-xs text-paper/55">{s.pitch}</p>
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
    <section className="relative bg-lav-50 py-24 lg:py-32">
      <span
        className="text-outline-royal pointer-events-none absolute right-0 top-6 select-none font-display text-[16vw] uppercase leading-none opacity-40 lg:text-[180px]"
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
              <article className="group grid grid-cols-1 gap-6 border-2 border-ink/10 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-royal-500 hover:shadow-[0_20px_50px_rgba(126,1,183,0.15)] sm:p-9 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-1">
                  <p className="font-display text-5xl text-royal-200 transition-colors duration-300 group-hover:text-gold-500 lg:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-royal-500">
                    {c.length} · {c.who}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase tracking-wide sm:text-3xl">{c.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{c.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:col-span-4">
                  {c.tags.map((t) => (
                    <span key={t} className="border border-royal-500/30 bg-lav-100 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-[0.14em] text-royal-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <Link to="/contact" className="btn-purple px-5! py-3! text-sm">
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
    <section className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-royal-500/50" aria-hidden="true" />
            <div className="relative overflow-hidden">
              <img src={IMG.drill} alt="Academy players working a passing drill with cones" className="anim-kenburns aspect-[4/3] w-full object-cover" />
            </div>
            <div className="diagonal-stripes absolute -right-5 -bottom-5 h-28 w-28" aria-hidden="true" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <figure className="group overflow-hidden border-2 border-ink/10">
              <img src={IMG.keeper} alt="Ahenkan goalkeeper diving to save" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </figure>
            <figure className="group mt-8 overflow-hidden border-2 border-ink/10">
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
                  <div className="group flex gap-5 border-l-2 border-royal-500/40 pl-5 transition-all duration-300 hover:border-gold-500 hover:pl-6">
                    <span className="font-display text-3xl text-royal-300 transition-colors duration-300 group-hover:text-royal-500">{s.no}</span>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-wide">{s.title}</h3>
                      <p className="mt-1.5 max-w-md leading-relaxed text-ink/65">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <div className="mt-10 border-2 border-ink/10 bg-lav-50 p-7">
                <h3 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-royal-500">
                  What to bring to training
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {BRING.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink/75">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-royal-500" />
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
      <section className="bg-royal-500 py-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
          <p className="font-display text-2xl uppercase text-paper sm:text-3xl">
            Ready to train with us? <span className="text-gold-500">Trials are open.</span>
          </p>
          <Link to="/contact" className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-cond text-base font-bold uppercase tracking-[0.14em] text-gold-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(1,1,1,0.4)]">
            Book a trial day
            <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
