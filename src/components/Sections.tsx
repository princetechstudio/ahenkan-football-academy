import { IMG, STEPS, WHY } from "../data";
import { Reveal, SectionHead } from "../lib";
import { ArrowIcon, WHY_ICONS } from "./Icons";

export function Academy() {
  return (
    <section id="academy" className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute right-0 top-4 select-none font-display text-[19vw] uppercase leading-none opacity-50 lg:text-[190px]"
        aria-hidden="true"
      >
        Ahenkan
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        {/* sticky intro column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <SectionHead
              dark
              kicker="Why Choose Ahenkan Academy?"
              title="Champions in Every Aspect of Life"
              sub="We unearth talent and provide world-class training that goes beyond football skills, preparing our players to become champions in all aspects of life."
            />

            <Reveal delay={220}>
              <blockquote className="mt-8 border-l-4 border-gold-500 bg-bone-50 px-6 py-5">
                <p className="font-display text-xl uppercase tracking-wide text-pitch-800">
                  “To become one of the best academies in the world.”
                </p>
                <footer className="mt-2 font-cond text-sm font-semibold uppercase tracking-[0.22em] text-pitch-800/55">
                  — Our Mission
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={300} variant="scale">
              <figure className="group relative mt-8 hidden overflow-hidden border-2 border-pitch-900 lg:block">
                <img
                  src={IMG.pitch}
                  alt="Aerial view of the Ahenkan training grounds in Adeiso"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <figcaption className="absolute bottom-0 left-0 bg-pitch-900 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                  Our grounds · Adeiso, Upper West Akyem
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={340}>
              <a
                href="https://ahenkanfootballacademy.com/about"
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-3 font-cond text-base font-bold uppercase tracking-[0.16em] text-clay-500 transition-colors hover:text-clay-600"
              >
                More about the academy
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* eight reasons */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY.map((w, i) => {
              const Icon = WHY_ICONS[w.icon];
              return (
                <Reveal key={w.title} delay={(i % 2) * 110 + Math.floor(i / 2) * 40}>
                  <article
                    className={`group h-full border-2 border-pitch-900/15 bg-bone-50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_18px_40px_rgba(8,32,21,0.12)] ${
                      i % 3 === 1 ? "sm:translate-y-6" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center border-2 border-pitch-700/30 text-pitch-700 transition-all duration-300 group-hover:border-gold-600 group-hover:bg-gold-500 group-hover:text-pitch-950">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-2xl text-pitch-900/15 transition-colors duration-300 group-hover:text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl uppercase tracking-wide text-pitch-900">
                      {w.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-pitch-800/75">{w.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="relative overflow-hidden bg-pitch-900 py-24 lg:py-28">
      <span
        className="text-outline pointer-events-none absolute bottom-0 right-0 select-none font-display text-[16vw] uppercase leading-none opacity-40 lg:text-[170px]"
        aria-hidden="true"
      >
        Admissions
      </span>
      <div className="diagonal-stripes absolute left-0 top-0 h-2 w-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="The Road to the Badge"
          title="How Players Join Ahenkan"
          sub="Three simple steps separate you from world-class training. Our admissions team walks beside you through every one of them."
        />

        <div className="mt-14 grid grid-cols-1 gap-px border-2 border-bone-50/15 bg-bone-50/15 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 140} className="h-full">
              <div className="group relative h-full bg-pitch-900 p-8 transition-colors duration-300 hover:bg-pitch-850 lg:p-10">
                <p className="font-display text-6xl text-gold-500/25 transition-colors duration-300 group-hover:text-gold-500/60 lg:text-7xl">
                  {s.no}
                </p>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-bone-50">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-bone-50/70">{s.desc}</p>
                {i < 2 && (
                  <ArrowIcon className="absolute right-6 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-gold-500/50 md:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-2 border-gold-500/40 bg-pitch-950/60 px-6 py-5 sm:px-8">
            <p className="font-cond text-lg font-semibold uppercase tracking-[0.14em] text-bone-50/85">
              <span className="text-gold-400">Open Trial</span> · Registration GH₵200 · 9am – 3pm · Ages 15–16
            </p>
            <a
              href="#trials"
              className="group inline-flex items-center gap-3 bg-gold-500 px-6 py-3 font-cond text-base font-bold uppercase tracking-[0.14em] text-pitch-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              Start Application
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
