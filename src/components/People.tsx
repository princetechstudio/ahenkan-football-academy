import { COACHES, RESULTS } from "../data";
import { Reveal, SectionHead } from "../lib";
import { WhistleIcon } from "./Icons";

export function Coaches() {
  const [head, ...rest] = COACHES;
  return (
    <section id="coaches" className="relative overflow-hidden bg-bone-50 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute -bottom-6 right-0 select-none font-display text-[20vw] uppercase leading-none opacity-60 lg:text-[200px]"
        aria-hidden="true"
      >
        Coaches
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            dark
            kicker="The touchline"
            title="Coaching Staff"
            sub="Nine CAF- and GFA-licensed coaches, one shared standard. These are the three who set the tone."
          />
          <Reveal delay={200}>
            <p className="mb-2 flex items-center gap-3 font-cond text-base font-bold uppercase tracking-[0.18em] text-pitch-800/70">
              <WhistleIcon className="h-5 w-5 text-gold-600" />
              Player : coach ratio — 14 : 1
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* head coach */}
          <Reveal variant="left" className="lg:col-span-6">
            <article className="group flex h-full flex-col border-2 border-pitch-900 bg-bone-100">
              <div className="relative overflow-hidden">
                <img
                  src={head.img}
                  alt={`Portrait of ${head.name}`}
                  className="aspect-[4/4.4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-0 top-6 bg-gold-500 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-950">
                  {head.badge}
                </span>
                <span className="absolute bottom-0 left-0 h-1.5 w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl uppercase tracking-wide">{head.name}</h3>
                <p className="mt-1 font-cond text-base font-bold uppercase tracking-[0.2em] text-gold-600">
                  {head.role}
                </p>
                <p className="mt-4 leading-relaxed text-pitch-800/80">{head.bio}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {head.creds.map((c) => (
                    <li
                      key={c}
                      className="border border-pitch-900/25 px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.14em] text-pitch-800/75"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* staff */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1">
            {rest.map((c, i) => (
              <Reveal key={c.name} delay={120 + i * 120}>
                <article className="group grid h-full grid-cols-1 border-2 border-pitch-900 bg-bone-100 transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-[38%_1fr]">
                  <div className="relative overflow-hidden">
                    <img
                      src={c.img}
                      alt={`Portrait of ${c.name}`}
                      className="h-full min-h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute bottom-0 left-0 h-1.5 w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                  <div className="flex flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl uppercase tracking-wide">{c.name}</h3>
                    </div>
                    <p className="mt-0.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-gold-600">
                      {c.role} · {c.badge}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-pitch-800/80">{c.bio}</p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                      {c.creds.slice(0, 2).map((cr) => (
                        <li
                          key={cr}
                          className="border border-pitch-900/25 px-2.5 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.12em] text-pitch-800/75"
                        >
                          {cr}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const RES_STYLES: Record<"W" | "D" | "L", string> = {
  W: "bg-gold-500 text-pitch-950",
  D: "bg-bone-200 text-pitch-900",
  L: "bg-clay-500 text-bone-50",
};

export function Results() {
  return (
    <section id="results" className="relative bg-pitch-950 py-24 lg:py-28">
      <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHead
              kicker="Season 2025/26"
              title="Recent Results"
              sub="GFA Greater Accra Youth League, Colts League and GWPL Colts — every fixture, published for parents and scouts alike."
            />
          </div>
          <Reveal delay={200} className="lg:col-span-4">
            <div className="border border-gold-500/40 bg-pitch-900/80 p-6">
              <p className="font-cond text-sm font-bold uppercase tracking-[0.22em] text-gold-400">
                League standing
              </p>
              <p className="mt-2 font-display text-5xl text-bone-50">
                2<span className="text-gold-500">nd</span>
                <span className="ml-3 text-xl text-bone-50/50">of 12 · U17 Youth League</span>
              </p>
              <p className="mt-3 text-sm text-bone-50/60">
                W8 · D2 · L2 — 34 goals scored, 12 conceded. Three games left to make it count.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-bone-50/15">
          {RESULTS.map((r, i) => (
            <Reveal key={r.date + r.opp} delay={i * 60}>
              <div className="group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 border-b border-bone-50/10 px-2 py-4 transition-all duration-300 hover:bg-pitch-900 hover:pl-5 sm:grid-cols-[130px_1fr_auto_auto_auto] sm:gap-x-8">
                <p className="tabular order-4 font-cond text-sm font-semibold uppercase tracking-widest text-bone-50/55 sm:order-none">
                  {r.date}
                </p>
                <p className="order-1 col-span-2 font-cond text-sm font-semibold uppercase tracking-wider text-bone-50/70 sm:order-none sm:col-span-1 sm:text-base">
                  {r.comp}
                </p>
                <p className="order-2 font-semibold text-bone-50 sm:order-none">
                  Ahenkan <span className="text-bone-50/40">vs</span> {r.opp}
                </p>
                <p className="tabular order-3 border-2 border-bone-50/25 bg-pitch-900 px-3.5 py-1 text-center font-display text-xl text-bone-50 transition-colors duration-300 group-hover:border-gold-500 sm:order-none">
                  {r.score}
                </p>
                <span
                  className={`order-5 flex h-9 w-9 justify-self-end font-display text-lg leading-9 text-center sm:order-none sm:justify-self-auto ${RES_STYLES[r.res]}`}
                  title={r.res === "W" ? "Win" : r.res === "D" ? "Draw" : "Loss"}
                >
                  {r.res}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-bone-50/50">
            Full fixture list and live scores on matchdays via our{" "}
            <a href="#contact" className="text-gold-400 underline-offset-4 hover:underline">
              matchday broadcast list
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
