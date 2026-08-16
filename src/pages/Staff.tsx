import { Link } from "react-router-dom";
import { COACHES, IMG, LEADERSHIP, SUPPORT } from "../data";
import { PageHead, Reveal, SectionHead } from "../lib";
import { ArrowIcon, WhistleIcon } from "../components/Icons";

export default function Staff() {
  const [head, ...rest] = COACHES;

  return (
    <>
      <PageHead
        crumb="Staff"
        kicker="5+ Coaches · CAF Licensed"
        title="Our Coaching Staff"
        sub="Meet the dedicated professionals who shape the next generation of Ghanaian football talent."
      />

      {/* leadership */}
      <section className="relative bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            kicker="Experienced Leaders"
            title="Leadership Team"
            sub="Experienced leaders guiding our academy's vision."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.role} delay={i * 120} variant={i === 0 ? "left" : "right"}>
                <article className="group grid grid-cols-[38%_1fr] gap-0 overflow-hidden border-2 border-ink/10 bg-lav-50 transition-all duration-300 hover:-translate-y-1 hover:border-royal-500 hover:shadow-[0_18px_44px_rgba(126,1,183,0.15)]">
                  <div className="overflow-hidden">
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-full min-h-52 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-col p-6">
                    <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-royal-500">{l.role}</p>
                    <h3 className="mt-2 font-display text-xl uppercase leading-snug tracking-wide sm:text-2xl">{l.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{l.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* head coach feature */}
      <section className="relative overflow-hidden bg-royal-950 py-24 text-paper lg:py-28">
        <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-royal-500/25 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold-500/60" aria-hidden="true" />
              <figure className="relative overflow-hidden border-2 border-paper/15">
                <img src={head.img} alt={head.name} className="anim-kenburns aspect-[4/5] w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-royal-950/90 px-5 py-3 backdrop-blur-sm">
                  <p className="font-display text-xl uppercase">{head.name}</p>
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-500">
                    {head.role} · {head.qual}
                  </p>
                </figcaption>
              </figure>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHead
              onDark
              kicker="Head Coach · CAF License A · 15+ Years"
              title="The Man in Charge of the Badge"
              sub={head.bio}
            />
            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {head.tags.map((t) => (
                  <span key={t} className="border border-gold-500/40 bg-royal-900/70 px-3.5 py-2 font-cond text-xs font-bold uppercase tracking-[0.16em] text-gold-500">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* coaching staff */}
      <section className="relative bg-lav-50 py-24 lg:py-28">
        <span
          className="text-outline-royal pointer-events-none absolute right-0 top-6 select-none font-display text-[16vw] uppercase leading-none opacity-40 lg:text-[180px]"
          aria-hidden="true"
        >
          Coaches
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            kicker="Qualified & Specialized"
            title="Coaching Staff"
            sub="Qualified coaches specializing in different aspects of the game — technique, fitness and the art of goalkeeping."
          />
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c, i) => (
              <Reveal key={c.name} delay={i * 110}>
                <article className="group flex h-full flex-col border-2 border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-500 hover:shadow-[0_20px_50px_rgba(126,1,183,0.16)]">
                  {c.img ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-royal-900">
                      <span className="font-display text-8xl text-royal-400/50 transition-colors duration-300 group-hover:text-gold-500/70">
                        {c.initials}
                      </span>
                      <span className="diagonal-stripes absolute bottom-0 left-0 h-10 w-full" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="bg-royal-500 px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.14em] text-paper">
                        {c.qual}
                      </span>
                      <span className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
                        {c.years}
                      </span>
                    </p>
                    <h3 className="mt-3 font-display text-2xl uppercase tracking-wide">{c.name}</h3>
                    <p className="font-cond text-sm font-bold uppercase tracking-[0.18em] text-royal-500">{c.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{c.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="border border-royal-500/25 bg-lav-100 px-2.5 py-1 font-cond text-[11px] font-bold uppercase tracking-[0.12em] text-royal-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* team photo card */}
            <Reveal delay={330}>
              <article className="group flex h-full flex-col overflow-hidden border-2 border-royal-950 bg-royal-950 text-paper">
                <div className="relative overflow-hidden">
                  <img
                    src={IMG.team}
                    alt="Ahenkan Football Academy coaching and support team"
                    className="aspect-[4/3] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-0 top-4 bg-gold-500 px-3 py-1 font-cond text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                    The Full Team
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl uppercase tracking-wide">Support Team</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/65">
                    A complete support system for player development — from the classroom to the treatment table.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {SUPPORT.map((s) => (
                      <li key={s.title} className="flex items-baseline gap-3 text-sm">
                        <WhistleIcon className="h-4 w-4 shrink-0 text-gold-500" />
                        <span>
                          <strong className="font-semibold text-paper">{s.title}</strong>
                          <span className="text-paper/55"> — {s.desc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-2 border-ink/10 bg-paper px-7 py-6">
              <p className="font-display text-2xl uppercase sm:text-3xl">
                Think you can coach at <span className="text-royal-500">world-class level?</span>
              </p>
              <Link to="/contact" className="group inline-flex items-center gap-3 bg-royal-500 px-7 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-royal-700">
                Join our coaching team
                <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
