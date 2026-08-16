import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BLOGS, IMG, LEADERSHIP, PROGRAMS, STATS, TESTIMONIALS, TICKER, WHY } from "../data";
import {
  Kicker,
  Reveal,
  SectionHead,
  useCountUp,
  useInView,
  usePrefersReducedMotion,
  useScramble,
} from "../lib";
import { ArrowIcon, QuoteIcon, StarIcon, WHY_ICONS } from "../components/Icons";

/* ---------------- HERO: the club leaders ---------------- */
function Hero() {
  const { ref, inView } = useInView<HTMLParagraphElement>(0.1);
  const decoded = useScramble("TALENT · WISDOM · KNOWLEDGE AT WORK", inView);
  const [president, patron] = LEADERSHIP;

  return (
    <section className="relative overflow-hidden bg-ink pt-24 lg:pt-32">
      <div className="pitch-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-royal-500/30 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-royal-700/40 blur-[130px]"
        aria-hidden="true"
      />
      <svg
        className="absolute -right-44 -top-44 h-[680px] w-[680px] text-paper/[0.05]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 0v200" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        {/* left copy */}
        <div className="lg:col-span-6">
          <p className="flex flex-wrap items-center gap-3 font-cond text-sm font-semibold uppercase tracking-[0.28em] text-gold-500">
            <img src={IMG.flag} alt="Ahenkan Academy flag" className="h-6 w-9 border border-paper/30 object-cover" />
            Est. 2025 · Adeiso, Upper West Akyem
          </p>

          <h1 className="mt-6 font-display uppercase leading-[0.9] text-paper">
            <span className="mask-line text-[13vw] sm:text-7xl lg:text-[84px]">
              <span style={{ animationDelay: "0.1s" }}>Unearthing</span>
            </span>
            <span className="mask-line text-[10.5vw] sm:text-6xl lg:text-[68px]">
              <span style={{ animationDelay: "0.26s" }}>Ghana's</span>
            </span>
            <span className="mask-line text-[12vw] text-gold-500 sm:text-7xl lg:text-[80px]">
              <span style={{ animationDelay: "0.4s" }}>World-Class</span>
            </span>
            <span className="mask-line text-[12vw] text-outline-gold sm:text-7xl lg:text-[80px]">
              <span style={{ animationDelay: "0.52s" }}>Talent</span>
            </span>
          </h1>

          <p ref={ref} className="mt-5 font-cond text-lg font-semibold tracking-[0.2em] text-royal-300">
            {decoded || "\u00A0"}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            At Ahenkan Football Academy, we discover and develop football talent, guiding young
            players to become world-class champions through expert training and dedicated
            mentorship.
          </p>

          <div className="mt-8 flex items-stretch gap-4 border-2 border-gold-500/60 bg-royal-900/60 px-5 py-4">
            <span className="hidden w-1.5 self-stretch bg-gold-500 sm:block" aria-hidden="true" />
            <div>
              <p className="font-cond text-xs font-bold uppercase tracking-[0.26em] text-gold-500">Our Mission</p>
              <p className="mt-1 text-lg font-semibold text-paper">
                To become one of the best academies in the world
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/contact" className="btn-gold group">
              Join Our Academy
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link to="/training" className="btn-ghost-light">
              Training Programs
            </Link>
          </div>

          <HeroStats />
        </div>

        {/* right: the leaders */}
        <div className="relative lg:col-span-6">
          <div className="diagonal-stripes absolute -right-6 -top-6 h-40 w-40" aria-hidden="true" />

          <div className="relative mx-auto max-w-xl">
            {/* Royal Patron — back frame */}
            <Reveal variant="right" delay={150}>
              <figure className="group relative ml-auto w-[78%] overflow-hidden border-2 border-paper/20 bg-royal-900">
                <img
                  src={patron.img}
                  alt={patron.name}
                  className="anim-kenburns aspect-[4/5] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/85 px-4 py-3 backdrop-blur-sm">
                  <p className="font-display text-base uppercase leading-tight text-paper">{patron.name}</p>
                  <p className="mt-0.5 font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {patron.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            {/* President — front frame */}
            <Reveal variant="left" delay={300}>
              <figure className="group absolute -bottom-10 -left-2 w-[62%] overflow-hidden border-2 border-gold-500 bg-ink shadow-[0_30px_70px_rgba(0,0,0,0.6)] sm:-left-6">
                <img
                  src={president.img}
                  alt={president.name}
                  className="anim-kenburns aspect-[4/5] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/85 px-4 py-3 backdrop-blur-sm">
                  <p className="font-display text-base uppercase leading-tight text-paper">{president.name}</p>
                  <p className="mt-0.5 font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {president.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            {/* floating flag + badge */}
            <div className="anim-drift absolute -top-4 left-4 z-10 border border-paper/25 bg-ink/90 px-3 py-2 shadow-lg backdrop-blur-sm">
              <img src={IMG.flag} alt="" className="h-8 w-12 object-cover" />
            </div>
            <div className="absolute -bottom-14 right-2 z-10 bg-gold-500 px-4 py-3 text-ink shadow-[0_16px_40px_rgba(255,255,0,0.25)]">
              <p className="font-display text-3xl leading-none">EST.</p>
              <p className="font-display text-4xl leading-none">2025</p>
            </div>
          </div>
          <div className="h-20 lg:h-24" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function HeroStats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="mt-12 grid max-w-xl grid-cols-3 gap-px border-t border-paper/15 pt-8">
      {STATS.map((s) => (
        <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} start={inView} />
      ))}
    </div>
  );
}

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const n = useCountUp(value, 1600, start);
  return (
    <div className="group pr-4">
      <p className="tabular font-display text-4xl text-gold-500 transition-transform duration-300 group-hover:-translate-y-1 sm:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-1 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-paper/70">{label}</p>
    </div>
  );
}

/* ---------------- Ticker ---------------- */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 bg-royal-500 py-3">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {items.slice(0, TICKER.length).map((t, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-cond text-lg font-bold uppercase tracking-[0.24em] text-gold-500"
              >
                <span className="px-6">{t}</span>
                <StarIcon className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Why choose ---------------- */
function WhyChoose() {
  return (
    <section className="relative bg-lav-50 py-24 lg:py-32">
      <span
        className="text-outline-royal pointer-events-none absolute right-0 top-4 select-none font-display text-[18vw] uppercase leading-none opacity-40 lg:text-[190px]"
        aria-hidden="true"
      >
        Ahenkan
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Why Choose Ahenkan Academy?"
          title="Champions in Every Aspect of Life"
          sub="We unearth talent and provide world-class training that goes beyond football skills, preparing our players to become champions in all aspects of life."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {WHY.map((w, i) => {
            const Icon = WHY_ICONS[w.icon];
            return (
              <Reveal key={w.title} delay={(i % 2) * 110 + Math.floor(i / 2) * 40}>
                <article
                  className={`group h-full border-2 border-ink/10 bg-paper p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-500 hover:shadow-[0_18px_44px_rgba(126,1,183,0.16)] ${
                    i % 3 === 1 ? "sm:translate-y-6" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center border-2 border-royal-500/30 text-royal-500 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-royal-500 group-hover:text-gold-500">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-2xl text-ink/15 transition-colors duration-300 group-hover:text-royal-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl uppercase tracking-wide">{w.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{w.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Programs ---------------- */
function Programs() {
  return (
    <section className="relative overflow-hidden bg-royal-950 py-24 text-paper lg:py-32">
      <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <span
        className="text-outline pointer-events-none absolute left-0 top-6 select-none font-display text-[17vw] uppercase leading-none opacity-30 lg:text-[180px]"
        aria-hidden="true"
      >
        Programs
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            onDark
            kicker="What We Offer"
            title="Academy Programs"
            sub="Three pathways, one standard — youth development, elite training camps and community outreach across Upper West Akyem."
          />
          <Reveal delay={200}>
            <Link
              to="/training"
              className="group mb-2 inline-flex items-center gap-3 font-cond text-base font-bold uppercase tracking-[0.16em] text-gold-500"
            >
              See training schedules
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 border-t-2 border-gold-500/60">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.no} delay={i * 90}>
              <article className="group grid grid-cols-1 gap-6 border-b-2 border-paper/10 px-2 py-8 transition-colors duration-300 hover:bg-royal-900/60 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10">
                <p className="font-display text-5xl text-royal-400/60 transition-colors duration-300 group-hover:text-gold-500 lg:col-span-1 lg:text-6xl">
                  {p.no}
                </p>
                <div className="lg:col-span-5">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {p.tag} · {p.ages}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase tracking-wide sm:text-3xl">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-paper/70">{p.desc}</p>
                </div>
                <ul className="space-y-2 lg:col-span-4">
                  {p.focus.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-paper/80">
                      <StarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="lg:col-span-2 lg:text-right">
                  <Link
                    to="/contact"
                    className="btn-gold px-5! py-3! text-sm"
                  >
                    Enrol
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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

/* ---------------- Leadership ---------------- */
function Leadership() {
  return (
    <section className="relative bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="The Men Behind the Badge"
          title="Academy Leadership"
          sub="Vision from our President, heritage from our Royal Patron — the foundation on which every Ahenkan player stands."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {LEADERSHIP.map((l, i) => (
            <Reveal key={l.role} delay={i * 140} variant={i === 0 ? "left" : "right"}>
              <article className="group relative border-2 border-ink/10 bg-lav-50 transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-500 hover:shadow-[0_24px_60px_rgba(126,1,183,0.18)]">
                <div className="relative overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-0 top-5 bg-ink px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.2em] text-gold-500">
                    {l.role}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl uppercase tracking-wide">{l.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{l.bio}</p>
                  <Link
                    to="/about"
                    className="group/a mt-5 inline-flex items-center gap-2 font-cond text-sm font-bold uppercase tracking-[0.16em] text-royal-500 transition-colors hover:text-royal-700"
                  >
                    About the academy
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/a:translate-x-1" />
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

/* ---------------- Testimonials ---------------- */
function Testimonials() {
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
      className="relative overflow-hidden bg-royal-700 py-24 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <QuoteIcon className="pointer-events-none absolute -top-10 left-8 h-56 w-56 text-royal-500/60" />
      <div className="pitch-lines absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <Kicker>What People Say About Us</Kicker>
        </Reveal>
        <div className="mt-8 min-h-[240px] sm:min-h-[200px]" aria-live="polite">
          <blockquote key={idx} className="reveal is-in">
            <p className="mx-auto max-w-3xl text-2xl font-medium leading-snug text-paper sm:text-3xl">
              “{t.quote}”
            </p>
            <footer className="mt-8">
              <div className="flex items-center justify-center gap-1 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-3 font-display text-xl uppercase tracking-wide text-paper">{t.name}</p>
              <p className="mt-1 font-cond text-sm font-semibold uppercase tracking-[0.2em] text-paper/60">
                {t.role}
              </p>
            </footer>
          </blockquote>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setIdx(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2 transition-all duration-300 ${
                i === idx ? "w-10 bg-gold-500" : "w-5 bg-paper/30 hover:bg-paper/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- News ---------------- */
function News() {
  const posts = BLOGS.slice(0, 3);
  const [lead, ...rest] = posts;
  return (
    <section className="relative bg-lav-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            kicker="Announcements"
            title="From the Touchline"
            sub="Fundraising, development and life at the grounds — the latest from Ahenkan Football Academy."
          />
          <Reveal delay={200}>
            <Link
              to="/blogs"
              className="group mb-2 inline-flex items-center gap-3 font-cond text-base font-bold uppercase tracking-[0.16em] text-royal-500 transition-colors hover:text-royal-700"
            >
              View all blogs
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-7">
            <Link to="/blogs" className="group flex h-full flex-col border-2 border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-500 hover:shadow-[0_24px_60px_rgba(126,1,183,0.16)]">
              <div className="relative overflow-hidden">
                <img
                  src={lead.img}
                  alt={lead.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-0 top-5 bg-gold-500 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-ink">
                  Featured
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="tabular font-cond text-sm font-bold uppercase tracking-[0.2em] text-ink/50">
                  {lead.cat} · {lead.date}
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide sm:text-3xl">
                  {lead.title}
                </h3>
                <p className="mt-4 line-clamp-3 leading-relaxed text-ink/70">{lead.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-3 pt-6 font-cond text-base font-bold uppercase tracking-[0.16em] text-royal-500 transition-colors group-hover:text-royal-700">
                  Read full story
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((n, i) => (
              <Reveal key={n.title} variant="right" delay={120 + i * 120}>
                <Link
                  to="/blogs"
                  className="group grid grid-cols-[36%_1fr] border-2 border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-royal-500"
                >
                  <div className="overflow-hidden">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="h-full min-h-40 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <p className="flex items-center gap-3">
                      <span className="bg-royal-500 px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.16em] text-paper">
                        {n.cat}
                      </span>
                      <span className="tabular font-cond text-xs font-semibold uppercase tracking-widest text-ink/50">
                        {n.date}
                      </span>
                    </p>
                    <h3 className="mt-3 font-display text-lg uppercase leading-snug tracking-wide">{n.title}</h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 font-cond text-sm font-bold uppercase tracking-[0.14em] text-royal-500 group-hover:text-royal-700">
                      Read more <ArrowIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA band ---------------- */
function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-24">
      <div
        className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-royal-500/30 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl lg:text-6xl">
              Ready to become a
              <span className="block text-gold-500">world-class player?</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">
              Join Ahenkan Football Academy and let us unearth your talent, guide your development,
              and train you to become a world-class football champion.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="group flex items-center justify-between border-2 border-gold-500 bg-gold-500 px-6 py-4 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(255,255,0,0.25)]"
              >
                <span>
                  <span className="block font-display text-xl uppercase">Join Our Academy</span>
                  <span className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-ink/70">
                    Start your application today
                  </span>
                </span>
                <ArrowIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                to="/fixtures"
                className="group flex items-center justify-between border-2 border-paper/20 px-6 py-4 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-500"
              >
                <span>
                  <span className="block font-display text-xl uppercase">Matchday Fixtures</span>
                  <span className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-paper/55 group-hover:text-gold-500/70">
                    Follow our squads week by week
                  </span>
                </span>
                <ArrowIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                to="/blogs"
                className="group flex items-center justify-between border-2 border-paper/20 px-6 py-4 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-royal-400 hover:text-royal-300"
              >
                <span>
                  <span className="block font-display text-xl uppercase">Academy Blogs</span>
                  <span className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-paper/55 group-hover:text-royal-300/70">
                    Stories from the grounds
                  </span>
                </span>
                <ArrowIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <WhyChoose />
      <Programs />
      <Leadership />
      <Testimonials />
      <News />
      <CtaBand />
    </>
  );
}
