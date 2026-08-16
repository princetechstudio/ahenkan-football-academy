import { IMG, LEADERS } from "../data";
import { Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon } from "./Icons";

export function Leadership() {
  return (
    <section id="leadership" className="relative overflow-hidden bg-pitch-950 py-24 lg:py-32">
      <div className="pitch-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <span
        className="text-outline pointer-events-none absolute left-0 top-8 select-none font-display text-[17vw] uppercase leading-none opacity-40 lg:text-[180px]"
        aria-hidden="true"
      >
        Leadership
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            kicker="Guided by Vision & Heritage"
            title="Our Leadership"
            sub="A president with a founder's fire, and a Life Patron whose royal heritage grounds everything we build."
          />
          <Reveal delay={200}>
            <p className="mb-2 flex items-center gap-3 border-l-4 border-gold-500 bg-pitch-900 px-4 py-3 font-cond text-sm font-bold uppercase tracking-[0.16em] text-bone-50/75">
              <img src={IMG.flag} alt="" className="h-6 w-9 object-cover" aria-hidden="true" />
              Akyem Abuakwa heritage · Est. 2025
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {LEADERS.map((l, i) => (
            <Reveal key={l.name} variant={i === 0 ? "left" : "right"} delay={i * 120} className={i === 1 ? "lg:mt-16" : ""}>
              <article className="group">
                <div className="relative overflow-hidden border-2 border-bone-50/12 transition-colors duration-300 group-hover:border-gold-500/70">
                  <div className="absolute -left-3 -top-3 h-full w-full border border-gold-500/40 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  <img
                    src={l.img}
                    alt={l.name}
                    className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/85 via-pitch-950/10 to-transparent" />
                  <span className="absolute left-0 top-6 bg-gold-500 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-950">
                    {l.note}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-bone-50 sm:text-3xl">
                      {l.name}
                    </h3>
                    <p className="mt-1.5 font-cond text-base font-bold uppercase tracking-[0.2em] text-gold-400">
                      {l.role}
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-lg border-l-2 border-gold-500/50 pl-5 leading-relaxed text-bone-50/70">
                  {l.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const OUTREACH = [
  "Free monthly open training days for every child in the community",
  "Coaching visits to schools across Upper West Akyem",
  "A facility expansion funded entirely by community support",
  "Players taught to lead, serve and give back — on and off the pitch",
];

export function Community() {
  return (
    <section id="community" className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute left-0 top-6 select-none font-display text-[18vw] uppercase leading-none opacity-50 lg:text-[190px]"
        aria-hidden="true"
      >
        Community
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <Reveal variant="left" className="lg:col-span-6">
          <figure className="group relative">
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-pitch-900" aria-hidden="true" />
            <div className="diagonal-stripes absolute -right-5 -bottom-5 h-32 w-32" aria-hidden="true" />
            <div className="relative overflow-hidden">
              <img
                src={IMG.fundraiser}
                alt="Ahenkan Academy Fundraising Ceremony — Building Dreams Together"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 bg-pitch-950/90 px-5 py-3.5">
                <span className="font-cond text-sm font-bold uppercase tracking-[0.18em] text-gold-400">
                  Building Dreams Together
                </span>
                <span className="tabular font-cond text-xs font-semibold uppercase tracking-widest text-bone-50/60">
                  Fundraising Night · Jan 2024
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHead
            dark
            kicker="Community First"
            title="More Than a Football Club"
            sub="A memorable evening of community support — supporters from across Upper West Akyem came together to raise funds to expand our facilities and provide more opportunities for young Ghanaian footballers."
          />

          <ul className="mt-9 space-y-3.5">
            {OUTREACH.map((o, i) => (
              <Reveal key={o} delay={i * 90}>
                <li className="flex items-start gap-4 border-2 border-pitch-900/12 bg-bone-50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-pitch-700 text-bone-50">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="font-medium leading-relaxed text-pitch-800/90">{o}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={360}>
            <a
              href="https://ahenkanfootballacademy.com/blog"
              target="_blank"
              rel="noreferrer"
              className="group mt-9 inline-flex items-center gap-3 bg-pitch-900 px-6 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pitch-800 hover:shadow-[0_14px_34px_rgba(8,32,21,0.25)]"
            >
              Read the full story
              <ArrowIcon className="h-4 w-4 text-gold-400 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
