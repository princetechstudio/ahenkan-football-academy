import { useEffect, useState } from "react";
import { IMG, NEWS, TESTIMONIALS } from "../data";
import { Reveal, SectionHead, usePrefersReducedMotion } from "../lib";
import { ArrowIcon, QuoteIcon, StarSolid } from "./Icons";

export function News() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [lead, ...others] = NEWS;

  return (
    <section id="news" className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            dark
            kicker="Announcements"
            title="From the Touchline"
            sub="Fundraising nights, development insights and everything happening at the academy — straight from our own blog."
          />
          <Reveal delay={180}>
            <a
              href="https://ahenkanfootballacademy.com/blog"
              target="_blank"
              rel="noreferrer"
              className="group mb-2 inline-flex items-center gap-2 border-l-4 border-clay-500 bg-bone-50 px-4 py-3 font-cond text-sm font-bold uppercase tracking-[0.16em] text-pitch-800/80 transition-colors hover:text-clay-600"
            >
              View all on the blog
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* featured story */}
          <Reveal variant="left" className="lg:col-span-7">
            <article className="group flex h-full flex-col border-2 border-pitch-900 bg-bone-50">
              <div className="relative overflow-hidden">
                <img
                  src={lead.img}
                  alt={lead.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-0 top-5 bg-gold-500 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-950">
                  ★ Featured · {lead.cat}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <p className="tabular font-cond text-sm font-bold uppercase tracking-[0.2em] text-pitch-800/55">
                  {lead.date}
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide sm:text-3xl">
                  {lead.title}
                </h3>
                <p className="mt-4 leading-relaxed text-pitch-800/80">
                  {expanded === 0 ? lead.full : lead.excerpt}
                </p>
                <button
                  onClick={() => setExpanded(expanded === 0 ? null : 0)}
                  className="group/btn mt-6 inline-flex items-center gap-3 self-start font-cond text-base font-bold uppercase tracking-[0.16em] text-clay-500 transition-colors hover:text-clay-600"
                >
                  {expanded === 0 ? "Show less" : "Read full report"}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          </Reveal>

          {/* secondary stories */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {others.map((n, i) => (
              <Reveal key={n.title} variant="right" delay={120 + i * 130} className="flex-1">
                <article className="group grid h-full grid-cols-[38%_1fr] border-2 border-pitch-900 bg-bone-50 transition-transform duration-300 hover:-translate-y-1">
                  <div className="overflow-hidden">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="h-full min-h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-col p-5 sm:p-6">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="bg-pitch-900 px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400">
                        {n.cat}
                      </span>
                      <span className="tabular font-cond text-xs font-semibold uppercase tracking-widest text-pitch-800/55">
                        {n.date}
                      </span>
                    </p>
                    <h3 className="mt-3 font-display text-lg uppercase leading-snug tracking-wide">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-pitch-800/75">
                      {expanded === i + 1 ? n.full : n.excerpt}
                    </p>
                    <button
                      onClick={() => setExpanded(expanded === i + 1 ? null : i + 1)}
                      className="mt-auto inline-flex items-center gap-2 self-start pt-3 font-cond text-sm font-bold uppercase tracking-[0.14em] text-clay-500 transition-colors hover:text-clay-600"
                    >
                      {expanded === i + 1 ? "Show less" : "Read more"}
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </button>
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

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const t = TESTIMONIALS[idx];

  return (
    <section
      className="relative overflow-hidden bg-pitch-900 py-24 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <QuoteIcon className="pointer-events-none absolute -top-8 left-8 h-56 w-56 text-gold-500/10" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="font-cond text-sm font-bold uppercase tracking-[0.3em] text-gold-400">
            What People Say About Us
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-bone-50/60">
            Hear from parents, community members, and professionals about the impact of Ahenkan Football Academy.
          </p>
        </Reveal>

        <div className="mt-10 min-h-[260px] sm:min-h-[220px]" aria-live="polite">
          <blockquote key={idx} className="reveal is-in">
            <div className="flex items-center justify-center gap-1 text-gold-500">
              {[...Array(5)].map((_, i) => (
                <StarSolid key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-2xl font-medium leading-snug text-bone-50 sm:text-3xl">
              “{t.quote}”
            </p>
            <footer className="mt-8 flex items-center justify-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pitch-500 to-gold-500 font-display text-sm text-pitch-950">
                {t.initials}
              </span>
              <span className="text-left">
                <span className="block font-display text-lg uppercase tracking-wide text-bone-50">{t.name}</span>
                <span className="block font-cond text-sm font-semibold uppercase tracking-[0.2em] text-bone-50/55">
                  {t.role}
                </span>
              </span>
            </footer>
          </blockquote>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial from ${x.name}`}
              className={`h-2 transition-all duration-300 ${
                i === idx ? "w-10 bg-gold-500" : "w-5 bg-bone-50/25 hover:bg-bone-50/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const GALLERY = [
  { src: IMG.team, cap: "The Ahenkan family" },
  { src: IMG.fundraiser, cap: "Building Dreams Together" },
  { src: IMG.drill, cap: "Training day at Adeiso" },
  { src: IMG.match, cap: "Matchday intensity" },
  { src: IMG.pitch, cap: "Our grounds from above" },
  { src: IMG.keeper, cap: "The last line" },
];

export function Gallery() {
  return (
    <section className="relative bg-pitch-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl uppercase text-bone-50 sm:text-4xl">
              Life at <span className="text-gold-500">Ahenkan</span>
            </h2>
            <a
              href="https://ahenkanfootballacademy.com/blog"
              target="_blank"
              rel="noreferrer"
              className="hidden font-cond text-sm font-semibold uppercase tracking-[0.22em] text-bone-50/50 transition-colors hover:text-gold-400 sm:block"
            >
              Follow the journey →
            </a>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY.map((g, i) => (
            <Reveal key={g.cap} delay={i * 70} variant="scale">
              <figure className="group relative overflow-hidden border border-bone-50/10">
                <img
                  src={g.src}
                  alt={g.cap}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-pitch-950/90 px-3 py-2.5 font-cond text-xs font-bold uppercase tracking-[0.14em] text-gold-400 transition-transform duration-300 group-hover:translate-y-0">
                  {g.cap}
                </figcaption>
                <span className="absolute right-2 top-2 h-2 w-2 bg-gold-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
