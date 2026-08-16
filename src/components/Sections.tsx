import { IMG, PATHWAY, PILLARS, STATS } from "../data";
import { Reveal, SectionHead, useCountUp, useInView } from "../lib";
import { ArrowIcon, PILLAR_ICONS, PATH_ICONS } from "./Icons";

function Stat({
  value,
  suffix,
  label,
  note,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  start: boolean;
}) {
  const n = useCountUp(value, 1700, start);
  return (
    <div className="group border-l-2 border-gold-500/40 py-2 pl-6 transition-colors duration-300 hover:border-gold-400">
      <p className="tabular font-display text-6xl leading-none text-bone-50 transition-colors duration-300 group-hover:text-gold-400 lg:text-7xl">
        {n}
        <span className="text-gold-500">{suffix}</span>
      </p>
      <p className="mt-3 font-cond text-base font-bold uppercase tracking-[0.22em] text-bone-50">
        {label}
      </p>
      <p className="mt-1 text-sm text-bone-50/55">{note}</p>
    </div>
  );
}

export function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section className="relative bg-pitch-900 py-20">
      <div className="diagonal-stripes absolute inset-y-0 left-0 w-24 opacity-60" aria-hidden="true" />
      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8"
      >
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <Stat {...s} start={inView} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Way() {
  return (
    <section id="way" className="relative overflow-hidden bg-bone-50 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute -top-8 left-0 select-none font-display text-[22vw] uppercase leading-none opacity-70 lg:text-[220px]"
        aria-hidden="true"
      >
        Miracle
      </span>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              dark
              kicker="Our philosophy"
              title="The Ahenkan Way"
              sub="Four pillars hold up everything we do on and off the pitch. A player who graduates from Ahenkan leaves with more than a football education — they leave ready for life."
            />
            <Reveal delay={220}>
              <div className="mt-10 overflow-hidden">
                <img
                  src={IMG.drill}
                  alt="Academy players working a rondo drill with coaches"
                  className="aspect-[16/10] w-full border-4 border-pitch-900 object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 font-cond text-sm font-semibold uppercase tracking-[0.2em] text-pitch-800/60">
                Morning rondo block · Development squad
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col">
            {PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[p.icon];
              return (
                <Reveal key={p.no} delay={i * 110}>
                  <article className="group relative grid grid-cols-[auto_1fr] gap-6 border-b border-pitch-900/15 py-9 transition-all duration-300 hover:bg-pitch-900/[0.03] hover:pl-4 sm:gap-9">
                    <div className="flex flex-col items-center gap-4">
                      <span className="font-display text-2xl text-pitch-900/25 transition-colors duration-300 group-hover:text-gold-600">
                        {p.no}
                      </span>
                      <span className="h-full w-px bg-pitch-900/10" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex h-13 w-13 shrink-0 items-center justify-center border-2 border-pitch-900 bg-bone-50 p-3 text-pitch-900 transition-all duration-300 group-hover:-rotate-6 group-hover:border-gold-500 group-hover:bg-gold-500">
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="font-display text-2xl uppercase tracking-wide text-pitch-900 sm:text-3xl">
                          {p.title}
                        </h3>
                      </div>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-pitch-800/80">
                        {p.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={150}>
            <a
              href="#trials"
              className="group mt-10 inline-flex items-center gap-3 bg-pitch-900 px-7 py-4 font-cond text-lg font-bold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pitch-800"
            >
              Join the next intake
              <ArrowIcon className="h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Pathway() {
  return (
    <section className="relative overflow-hidden bg-pitch-950 py-24 lg:py-28">
      <div className="pitch-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          align="center"
          kicker="Player development"
          title="From First Touch to First Contract"
          sub="A single, honest road map. Every player walks the same five stages — no shortcuts, no pay-to-play."
        />

        <div className="relative mt-16">
          <div
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent lg:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PATHWAY.map((s, i) => {
              const Icon = PATH_ICONS[s.icon];
              return (
                <Reveal key={s.step} delay={i * 120}>
                  <div className="group relative text-center lg:px-2">
                    <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center border-2 border-gold-500/60 bg-pitch-900 text-gold-400 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-pitch-950">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="text-outline-gold mt-5 font-display text-5xl leading-none">
                      {s.step}
                    </p>
                    <h3 className="mt-2 font-display text-xl uppercase tracking-wide text-bone-50">
                      {s.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-bone-50/60">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
