import { IMG, STATS, TICKER } from "../data";
import { useCountUp, useInView, useScramble } from "../lib";
import { ArrowIcon, SparkIcon } from "./Icons";

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 border-y border-gold-500/40 bg-gold-500 py-2.5 text-pitch-950">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {items.map((t, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-cond text-lg font-bold uppercase tracking-[0.24em]"
              >
                <span className="px-6">{t}</span>
                <SparkIcon className="h-3 w-3" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
  start,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const n = useCountUp(value, 1600 + delay, start);
  return (
    <div className="group text-center transition-transform duration-300 hover:-translate-y-1">
      <p className="tabular font-display text-4xl text-bone-50 sm:text-5xl">
        {n}
        <span className="text-gold-500">{suffix}</span>
      </p>
      <p className="mt-1.5 font-cond text-sm font-semibold uppercase tracking-[0.22em] text-bone-50/60">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const { ref: lineRef, inView: lineIn } = useInView<HTMLDivElement>(0.1);
  const decoded = useScramble("TALENT · WISDOM · KNOWLEDGE AT WORK", lineIn);
  const { ref: statsRef, inView: statsIn } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="top" className="relative overflow-hidden bg-pitch-950">
      {/* ambient backdrop */}
      <div className="pitch-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-pitch-700/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-24 h-[420px] w-[420px] rounded-full bg-gold-500/8 blur-3xl"
        aria-hidden="true"
      />
      <svg
        className="absolute -right-44 -top-44 h-[680px] w-[680px] text-bone-50/[0.05]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 0v200" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:pt-40">
        {/* left */}
        <div className="lg:col-span-7" ref={lineRef}>
          <p className="flex flex-wrap items-center gap-3 font-cond text-sm font-semibold uppercase tracking-[0.28em] text-gold-400">
            <img
              src={IMG.flag}
              alt="Ahenkan Academy flag"
              className="h-8 w-11 border border-bone-50/25 object-cover"
            />
            Est. 2025 · Adeiso, Upper West Akyem
          </p>

          <h1 className="mt-6 font-display uppercase leading-[0.92] text-bone-50">
            <span className="mask-line text-[11vw] sm:text-7xl lg:text-[84px]">
              <span style={{ animationDelay: "0.1s" }}>Unearthing</span>
            </span>
            <span className="mask-line text-[11vw] text-outline sm:text-7xl lg:text-[84px]">
              <span style={{ animationDelay: "0.26s" }}>Ghana's</span>
            </span>
            <span className="mask-line text-[12.5vw] text-gold-500 sm:text-8xl lg:text-[100px]">
              <span style={{ animationDelay: "0.42s" }}>
                World-Class Talent
              </span>
            </span>
          </h1>

          <p className="mt-5 min-h-6 font-cond text-lg font-semibold tracking-[0.22em] text-bone-50/80">
            {decoded || "\u00A0"}
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-50/75">
            At Ahenkan Football Academy, we discover and develop football talent,
            guiding young players to become world-class champions through expert
            training and dedicated mentorship.
          </p>

          {/* mission card */}
          <div className="mt-8 max-w-xl border-l-4 border-gold-500 bg-pitch-900/80 px-6 py-5 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-pitch-900">
            <h3 className="font-cond text-sm font-bold uppercase tracking-[0.26em] text-gold-400">
              Our Mission
            </h3>
            <p className="mt-2 text-xl font-medium text-bone-50">
              To become one of the best academies in the world.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#trials"
              className="group inline-flex items-center gap-3 bg-gold-500 px-7 py-4 font-cond text-lg font-bold uppercase tracking-[0.14em] text-pitch-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_16px_40px_rgba(242,183,10,0.25)]"
            >
              Join Our Academy
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-3 border border-bone-50/25 bg-transparent px-7 py-4 font-cond text-lg font-semibold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-400"
            >
              View Programs
            </a>
          </div>

          {/* stats */}
          <div
            ref={statsRef}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-8 border-t border-bone-50/15 pt-8 sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <Stat key={s.label} {...s} start={statsIn} delay={i * 220} />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="relative lg:col-span-5">
          <div className="absolute -left-5 -top-5 h-full w-full border border-gold-500/50" aria-hidden="true" />
          <div className="diagonal-stripes absolute -right-4 -top-4 h-36 w-36" aria-hidden="true" />
          <div className="relative overflow-hidden">
            <img
              src={IMG.team}
              alt="Ahenkan Football Academy players and staff"
              className="anim-kenburns aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-cond text-sm font-semibold uppercase tracking-[0.25em] text-bone-50/85">
                The Ahenkan Family · Adeiso Grounds
              </p>
            </div>
          </div>

          {/* crest badge */}
          <div className="absolute -top-5 right-4 h-20 w-20 overflow-hidden rounded-full border-4 border-gold-500/80 shadow-[0_18px_40px_rgba(0,0,0,0.55)] sm:h-24 sm:w-24">
            <img src={IMG.logo} alt="Ahenkan Academy crest" className="h-full w-full object-cover" />
          </div>

          <div className="anim-drift absolute -left-6 bottom-20 hidden border border-bone-50/12 bg-pitch-900/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur sm:block lg:-left-12">
            <p className="font-display text-3xl text-gold-500">100%</p>
            <p className="mt-1 font-cond text-xs font-semibold uppercase tracking-[0.2em] text-bone-50/70">
              Dedication,
              <br />
              every single session
            </p>
          </div>

          <p
            className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 font-cond text-xs font-semibold uppercase tracking-[0.5em] text-bone-50/40 xl:block"
            aria-hidden="true"
          >
            Developing Ghana's Future Stars
          </p>
        </div>
      </div>

      <Ticker />
    </section>
  );
}
