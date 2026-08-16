import { IMG } from "../data";
import { useInView, useScramble } from "../lib";
import { ArrowIcon, ClockIcon, PinIcon } from "./Icons";

const TICKER = [
  "Discipline",
  "Technique",
  "Education",
  "Character",
  "Exposure",
  "Brotherhood",
  "Miracle Mentality",
];

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 border-y border-gold-500/30 bg-gold-500 py-2.5 text-pitch-950">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {items.slice(0, TICKER.length).map((t, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-cond text-lg font-bold uppercase tracking-[0.24em]"
              >
                <span className="px-6">{t}</span>
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                  <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { ref, inView } = useInView<HTMLParagraphElement>(0.1);
  const decoded = useScramble("A·HEN·KAN — TWI FOR “MIRACLE”", inView);

  return (
    <section id="top" className="relative overflow-hidden bg-pitch-950">
      {/* pitch line backdrop */}
      <div className="pitch-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <svg
        className="absolute -right-40 -top-40 h-[640px] w-[640px] text-bone-50/[0.05]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 0v200" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-pitch-950 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        {/* left */}
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-cond text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
            <span className="h-px w-10 bg-gold-500" />
            Spintex Road, Accra — Est. 2014
          </p>

          <h1 className="mt-6 font-display uppercase leading-[0.9] text-bone-50">
            <span className="mask-line text-[17vw] sm:text-8xl lg:text-[104px]">
              <span style={{ animationDelay: "0.1s" }}>Ahenkan</span>
            </span>
            <span className="mask-line text-[9.5vw] tracking-[0.02em] text-outline sm:text-6xl lg:text-[72px]">
              <span style={{ animationDelay: "0.28s" }}>Football</span>
            </span>
            <span className="mask-line text-[9.5vw] tracking-[0.02em] text-outline sm:text-6xl lg:text-[72px]">
              <span style={{ animationDelay: "0.42s" }}>Academy</span>
            </span>
          </h1>

          <p
            ref={ref}
            className="mt-5 font-cond text-lg font-semibold tracking-[0.22em] text-gold-500"
          >
            {decoded || "\u00A0"}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-50/75">
            We develop complete footballers from the communities of Greater
            Accra — technique forged on our pitches, character built in our
            classrooms, and careers launched through the GFA league system.{" "}
            <span className="font-semibold text-bone-50">
              27 professional contracts since 2014.
            </span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#trials"
              className="group flex items-center gap-3 bg-gold-500 px-7 py-4 font-cond text-lg font-bold uppercase tracking-[0.14em] text-pitch-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_16px_40px_rgba(242,183,10,0.25)]"
            >
              Book an Open Trial
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#programs"
              className="group flex items-center gap-3 border border-bone-50/25 px-7 py-4 font-cond text-lg font-semibold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:border-gold-500 hover:text-gold-400"
            >
              Explore Programs
            </a>
          </div>

          {/* scoreboard card */}
          <div className="mt-12 inline-flex w-full max-w-xl items-stretch overflow-hidden border border-bone-50/12 bg-pitch-900/80">
            <div className="flex items-center gap-3 bg-clay-500 px-4 py-4 sm:px-5">
              <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-bone-50" />
              <span className="font-display text-lg uppercase text-bone-50">Next Trial</span>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3.5">
              <span className="flex items-center gap-2 font-cond text-base font-semibold uppercase tracking-widest text-bone-50/85">
                <ClockIcon className="h-4 w-4 text-gold-400" /> Sat 14 Mar · 07:00
              </span>
              <span className="flex items-center gap-2 font-cond text-base font-semibold uppercase tracking-widest text-bone-50/85">
                <PinIcon className="h-4 w-4 text-gold-400" /> Ahenkan Grounds, Spintex
              </span>
              <a
                href="#trials"
                className="ml-auto font-cond text-sm font-bold uppercase tracking-[0.18em] text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
              >
                Register →
              </a>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="relative lg:col-span-5">
          <div className="absolute -left-5 -top-5 h-full w-full border border-gold-500/50" aria-hidden="true" />
          <div className="diagonal-stripes absolute -right-4 -top-4 h-36 w-36" aria-hidden="true" />
          <div className="relative overflow-hidden">
            <img
              src={IMG.hero}
              alt="Ahenkan academy player juggling the ball at golden hour"
              className="anim-kenburns aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
              <p className="font-cond text-sm font-semibold uppercase tracking-[0.25em] text-bone-50/85">
                Evening ball-mastery · Pitch A
              </p>
            </div>
          </div>

          <div className="anim-drift absolute -left-6 bottom-16 hidden border border-bone-50/12 bg-pitch-900/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur sm:block lg:-left-14">
            <p className="font-display text-4xl text-gold-500">27</p>
            <p className="mt-1 font-cond text-xs font-semibold uppercase tracking-[0.2em] text-bone-50/70">
              Pro contracts
              <br />
              since 2014
            </p>
          </div>

          <p
            className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 font-cond text-xs font-semibold uppercase tracking-[0.5em] text-bone-50/40 xl:block"
            aria-hidden="true"
          >
            Miracle Mentality
          </p>
        </div>
      </div>

      <Ticker />
    </section>
  );
}
