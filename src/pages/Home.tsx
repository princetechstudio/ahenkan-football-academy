import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMG, LEADERSHIP, PROGRAMS, SPONSORS, STATS, TESTIMONIALS, TICKER, WHY } from "../data";
import { useBlogs } from "../hooks/useContent";
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
  const president = LEADERSHIP[0];
  const patron = LEADERSHIP[1] ?? LEADERSHIP[0];

  if (!president || !patron) return null;

  return (
    <section className="relative overflow-hidden bg-pitch-950 pt-24 lg:pt-28">
      <div className="pitch-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-pitch-500/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-pitch-700/40 blur-[130px]"
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

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-2 lg:pb-20">
        {/* left copy */}
        <div className="lg:col-span-6">
          <p className="flex flex-wrap items-center gap-3 font-cond text-sm font-semibold uppercase tracking-[0.28em] text-gold-400">
            <img src={IMG.flag} alt="Ahenkan Academy flag" className="h-6 w-9 border border-bone-50/30 object-cover" />
            Est. 2025 · Adeiso, Upper West Akyem
          </p>

          <h1 className="mt-6 font-display uppercase leading-[0.9] text-bone-50">
            <span className="mask-line text-[13vw] sm:text-7xl lg:text-[84px]">
              <span style={{ animationDelay: "0.1s" }}>Unearthing</span>
            </span>
            <span className="mask-line text-[10.5vw] sm:text-6xl lg:text-[68px]">
              <span style={{ animationDelay: "0.26s" }}>Ghana's</span>
            </span>
            <span className="mask-line text-[12vw] text-gold-500 sm:text-7xl lg:text-[80px]">
              <span style={{ animationDelay: "0.4s" }}>World-Class</span>
            </span>
            <span className="mask-line text-[12vw] text-gold-500 sm:text-7xl lg:text-[80px]">
              <span style={{ animationDelay: "0.4s" }}>Talent</span>
            </span>
           
          </h1>

          <p ref={ref} className="mt-5 font-cond text-lg font-semibold tracking-[0.2em] text-gold-500">
            {decoded || "\u00A0"}
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-50/75">
            At Ahenkan Football Academy, we discover and develop football talent, guiding young
            players to become world-class champions through expert training and dedicated
            mentorship.
          </p>

          <div className="mt-8 flex items-stretch gap-4 border-2 border-gold-500/70 bg-pitch-900/80 px-5 py-4">
            <span className="hidden w-1.5 self-stretch bg-gold-500 sm:block" aria-hidden="true" />
            <div>
              <p className="font-cond text-xs font-bold uppercase tracking-[0.26em] text-gold-500">Our Mission</p>
              <p className="mt-1 text-lg font-semibold text-bone-50">
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
          <div className="hero-flag-stage pointer-events-none absolute right-[-7%] top-[-138px] z-20 h-[135px] w-[52%] sm:right-[-5%] sm:top-[-166px] sm:h-[175px] sm:w-[49%]" aria-hidden="true">
            <span className="hero-flag-glow absolute inset-[12%] rounded-full" />
            <span className="hero-flag-sweep absolute inset-y-0 left-[-20%] w-1/3" />
            <img src={IMG.flag} alt="" className="hero-flag absolute inset-0 h-full w-full object-contain" />
          </div>
          <div className="diagonal-stripes absolute -right-6 -top-6 h-40 w-40" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid h-[470px] w-full max-w-[650px] -translate-y-10 grid-cols-2 items-end gap-3 sm:h-[560px] sm:gap-5">
            {/* Life Patron — right frame */}
            <Reveal variant="right" delay={150} className="col-start-2 w-full">
              <figure className="hero-photo-back group relative overflow-hidden border-2 border-gold-500/55 bg-pitch-900 shadow-[0_24px_70px_rgba(0,0,0,0.52)] transition-all duration-500 hover:-translate-y-2 hover:border-gold-500 hover:shadow-[0_30px_80px_rgba(231,184,87,0.2)]">
                <img
                  src={patron.img}
                  alt={patron.name}
                  className="aspect-[4/5] w-full bg-pitch-900 object-contain"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-pitch-950/90 px-4 py-3 backdrop-blur-sm">
                  <p className="font-display text-base uppercase leading-tight text-bone-50">{patron.name}</p>
                  <p className="mt-0.5 font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {patron.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            {/* President — left frame */}
            <Reveal variant="left" delay={300} className="col-start-1 row-start-1 w-full">
              <figure className="hero-photo-front group relative overflow-hidden border-2 border-gold-500 bg-pitch-950 shadow-[0_30px_80px_rgba(0,0,0,0.65)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_90px_rgba(231,184,87,0.24)]">
                <img
                  src={president.img}
                  alt={president.name}
                  className="aspect-[4/5] w-full bg-pitch-900 object-contain"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-pitch-950/90 px-4 py-3 backdrop-blur-sm">
                  <p className="font-display text-base uppercase leading-tight text-bone-50">{president.name}</p>
                  <p className="mt-0.5 font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {president.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="absolute -bottom-12 right-2 z-20 bg-gold-500 px-3 py-2 text-pitch-950 shadow-[0_16px_40px_rgba(242,183,10,0.25)]">
              <p className="font-display text-2xl leading-none">EST.</p>
              <p className="font-display text-3xl leading-none">2025</p>
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
    <div ref={ref} className="mt-12 grid max-w-xl grid-cols-3 gap-px border-t border-bone-50/15 pt-8">
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
      <p className="mt-1 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-bone-50/70">{label}</p>
    </div>
  );
}

/* ---------------- Ticker ---------------- */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative z-10 overflow-hidden bg-gold-500 py-3 text-pitch-950">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {items.slice(0, TICKER.length).map((t, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-cond text-lg font-bold uppercase tracking-[0.24em]"
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
    <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <span
        className="text-outline-dark pointer-events-none absolute right-0 top-4 select-none font-display text-[18vw] uppercase leading-none opacity-60 lg:text-[190px]"
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
                  className={`group h-full border-2 border-pitch-900/15 bg-bone-50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_18px_44px_rgba(8,32,21,0.14)] ${
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
                  <h3 className="mt-5 font-display text-xl uppercase tracking-wide">{w.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-pitch-900/70">{w.desc}</p>
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
    <section className="relative overflow-hidden bg-pitch-900 py-24 text-bone-50 lg:py-32">
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
              className="group mb-2 inline-flex items-center gap-3 font-cond text-base font-bold uppercase tracking-[0.16em] text-gold-400"
            >
              See training schedules
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 border-t-2 border-gold-500/60">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.no} delay={i * 90}>
              <article className="group grid grid-cols-1 gap-6 border-b-2 border-bone-50/10 px-2 py-8 transition-colors duration-300 hover:bg-pitch-850 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10">
                <p className="font-display text-5xl text-pitch-400/60 transition-colors duration-300 group-hover:text-gold-500 lg:col-span-1 lg:text-6xl">
                  {p.no}
                </p>
                <div className="lg:col-span-5">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {p.tag} · {p.ages}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase tracking-wide sm:text-3xl">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-bone-50/70">{p.desc}</p>
                </div>
                <ul className="space-y-2 lg:col-span-4">
                  {p.focus.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-bone-50/80">
                      <StarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="lg:col-span-2 lg:text-right">
                  <Link to="/contact" className="btn-gold px-5! py-3! text-sm">
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

/* ---------------- Sponsors ---------------- */
function Sponsors() {
  return (
    <section className="relative overflow-hidden bg-bone-50 py-20 text-pitch-900 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-1 bg-gold-500" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-pitch-900/10 pb-8">
          <SectionHead
            kicker="Community Support"
            title="Our Proud Sponsors"
            sub="The businesses and community partners helping Ahenkan create more opportunities for young players."
          />
          <p className="max-w-xs font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-900/45">
            Together, we build the next generation.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {SPONSORS.map((sponsor, i) => (
            <Reveal key={sponsor.name} delay={i * 70}>
              <figure className="group flex min-h-40 items-center justify-center border-2 border-pitch-900/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_18px_36px_rgba(29,18,48,0.12)] sm:min-h-44 sm:p-5">
                <img
                  src={sponsor.image}
                  alt={`${sponsor.name} logo`}
                  className="max-h-28 w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-105 sm:max-h-32"
                />
              </figure>
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
    <section className="relative bg-bone-50 py-24 text-pitch-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="The Men Behind the Badge"
          title="Academy Leadership"
          sub="Vision from our President, heritage from our Life Patron — the foundation on which every Ahenkan player stands."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {LEADERSHIP.map((l, i) => (
            <Reveal key={l.role} delay={i * 140} variant={i === 0 ? "left" : "right"}>
              <article className="group relative border-2 border-pitch-900/15 bg-bone-100 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_24px_60px_rgba(8,32,21,0.16)]">
                <div className="relative overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="aspect-[4/3] w-full bg-pitch-900 object-contain"
                  />
                  <span className="absolute left-0 top-5 bg-pitch-900 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.2em] text-gold-500">
                    {l.role}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl uppercase tracking-wide">{l.name}</h3>
                  <p className="mt-3 leading-relaxed text-pitch-900/70">{l.bio}</p>
                  <Link
                    to="/about"
                    className="group/a mt-5 inline-flex items-center gap-2 font-cond text-sm font-bold uppercase tracking-[0.16em] text-pitch-600 transition-colors hover:text-gold-700"
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

  if (TESTIMONIALS.length === 0) return null;

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  const t = TESTIMONIALS[idx];

  return (
    <section
      className="relative overflow-hidden bg-pitch-700 py-24 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <QuoteIcon className="pointer-events-none absolute -top-10 left-8 h-56 w-56 text-pitch-500/60" />
      <div className="pitch-lines absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <Kicker>What People Say About Us</Kicker>
        </Reveal>
        <div className="mt-8 min-h-[240px] sm:min-h-[200px]" aria-live="polite">
          <blockquote key={idx} className="reveal is-in">
            <p className="mx-auto max-w-3xl text-2xl font-medium leading-snug text-bone-50 sm:text-3xl">
              “{t.quote}”
            </p>
            <footer className="mt-8">
              <div className="flex items-center justify-center gap-1 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-3 font-display text-xl uppercase tracking-wide text-bone-50">{t.name}</p>
              <p className="mt-1 font-cond text-sm font-semibold uppercase tracking-[0.2em] text-bone-50/60">
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
                i === idx ? "w-10 bg-gold-500" : "w-5 bg-bone-50/30 hover:bg-bone-50/60"
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
  const blogs = useBlogs();

  if (blogs.length === 0) {
    return (
      <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <p className="text-pitch-600">No blog posts yet. Check back soon.</p>
        </div>
      </section>
    );
  }

  const posts = blogs.slice(0, 3);
  const lead = posts[0];
  const rest = posts.slice(1);

  return (
    <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
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
              className="group mb-2 inline-flex items-center gap-3 font-cond text-base font-bold uppercase tracking-[0.16em] text-pitch-600 transition-colors hover:text-gold-700"
            >
              View all blogs
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-7">
            <Link to="/blogs" className="group flex h-full flex-col border-2 border-pitch-900/15 bg-bone-50 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_24px_60px_rgba(8,32,21,0.14)]">
              <div className="relative overflow-hidden">
                <img
                  src={lead.img}
                  alt={lead.title}
                    className="aspect-[16/9] w-full bg-pitch-900 object-contain"
                />
                <span className="absolute left-0 top-5 bg-gold-500 px-4 py-1.5 font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-950">
                  Featured
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="tabular font-cond text-sm font-bold uppercase tracking-[0.2em] text-pitch-900/50">
                  {lead.cat} · {lead.date}
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide sm:text-3xl">
                  {lead.title}
                </h3>
                <p className="mt-4 line-clamp-3 leading-relaxed text-pitch-900/70">{lead.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-3 pt-6 font-cond text-base font-bold uppercase tracking-[0.16em] text-pitch-600 transition-colors group-hover:text-gold-700">
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
                  className="group grid grid-cols-[36%_1fr] border-2 border-pitch-900/15 bg-bone-50 transition-all duration-300 hover:-translate-y-1 hover:border-gold-600"
                >
                  <div className="overflow-hidden">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="h-full min-h-40 w-full bg-pitch-900 object-contain"
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <p className="flex items-center gap-3">
                      <span className="bg-pitch-700 px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.16em] text-bone-50">
                        {n.cat}
                      </span>
                      <span className="tabular font-cond text-xs font-semibold uppercase tracking-widest text-pitch-900/50">
                        {n.date}
                      </span>
                    </p>
                    <h3 className="mt-3 font-display text-lg uppercase leading-snug tracking-wide">{n.title}</h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 font-cond text-sm font-bold uppercase tracking-[0.14em] text-pitch-600 group-hover:text-gold-700">
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
    <section className="relative overflow-hidden bg-pitch-950 py-20 lg:py-24">
      <div className="pitch-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-pitch-500/25 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone-50 sm:text-5xl lg:text-6xl">
              Ready to become a
              <span className="block text-gold-500">world-class player?</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-50/70">
              Join Ahenkan Football Academy and let us unearth your talent, guide your development,
              and train you to become a world-class football champion.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="group flex items-center justify-between border-2 border-gold-500 bg-gold-500 px-6 py-4 text-pitch-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(242,183,10,0.25)]"
              >
                <span>
                  <span className="block font-display text-xl uppercase">Join Our Academy</span>
                  <span className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-pitch-950/70">
                    Start your application today
                  </span>
                </span>
                <ArrowIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                to="/fixtures"
                className="group flex items-center justify-between border-2 border-bone-50/20 px-6 py-4 text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-400"
              >
                <span>
                  <span className="block font-display text-xl uppercase">Matchday Fixtures</span>
                  <span className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-bone-50/55 group-hover:text-gold-400/70">
                    Follow our squads week by week
                  </span>
                </span>
                <ArrowIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <Link
                to="/blogs"
                className="group flex items-center justify-between border-2 border-bone-50/20 px-6 py-4 text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-pitch-400 hover:text-pitch-300"
              >
                <span>
                  <span className="block font-display text-xl uppercase">Academy Blogs</span>
                  <span className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-bone-50/55 group-hover:text-pitch-300/70">
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
      <Sponsors />
      <Leadership />
      <Testimonials />
      <News />
      <CtaBand />
    </>
  );
}
