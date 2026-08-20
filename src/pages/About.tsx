import { Link } from "react-router-dom";
import { IMG, LEADERSHIP, TIMELINE, VALUES } from "../data";
import { PageHead, Reveal, SectionHead } from "../lib";
import { ArrowIcon, StarIcon } from "../components/Icons";

function Story() {
  return (
    <section className="relative bg-bone-50 py-24 text-pitch-900 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-36">
            <SectionHead
              kicker="Est. 2025 · Adeiso, Upper West Akyem"
              title="Unearthing Talent, Building People"
              sub="At Ahenkan Football Academy, we discover and develop football talent, guiding young players to become world-class champions through expert training and dedicated mentorship."
            />
            <Reveal delay={220}>
              <div className="mt-8 grid grid-cols-1 gap-px border-2 border-pitch-900/15 bg-pitch-900/15 sm:grid-cols-2">
                <div className="bg-bone-100 p-6">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.24em] text-pitch-600">Our Mission</p>
                  <p className="mt-2 font-display text-xl uppercase leading-snug">
                    To become one of the best academies in the world
                  </p>
                </div>
                <div className="bg-pitch-900 p-6 text-bone-50">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.24em] text-gold-500">Our Home</p>
                  <p className="mt-2 font-display text-xl uppercase leading-snug">
                    The Ahenkan Grounds, Adeiso
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <figure className="group relative mt-8 overflow-hidden border-2 border-pitch-900/15">
                <img
                  src={IMG.pitch}
                  alt="Aerial view of the Ahenkan training grounds"
                  className="aspect-[16/10] w-full bg-pitch-900 object-contain"
                />
                <figcaption className="absolute bottom-0 left-0 bg-pitch-950 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
                  Our grounds · Adeiso, Upper West Akyem
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* the triad */}
        <div className="lg:col-span-6">
          <p className="font-cond text-sm font-bold uppercase tracking-[0.26em] text-pitch-900/50">
            Three words on our badge
          </p>
          <div className="mt-6 space-y-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.word} delay={i * 110}>
                <article
                  className={`group border-2 border-pitch-900/15 bg-bone-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-600 hover:bg-bone-50 hover:shadow-[0_18px_44px_rgba(8,32,21,0.14)] ${
                    i === 1 ? "lg:translate-x-8" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-6xl leading-none text-pitch-900/12 transition-colors duration-300 group-hover:text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-3xl uppercase tracking-wide text-pitch-700 sm:text-4xl">
                      {v.word}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-pitch-900/70">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="relative overflow-hidden bg-pitch-950 py-24 text-bone-50 lg:py-32">
      <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <span
        className="text-outline pointer-events-none absolute right-0 top-6 select-none font-display text-[16vw] uppercase leading-none opacity-30 lg:text-[180px]"
        aria-hidden="true"
      >
        Our Story
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          onDark
          kicker="From One Pitch to a Movement"
          title="The Ahenkan Journey"
          sub="Founded in 2025 with a single pitch and a royal blessing — this is how the academy has grown, season by season."
        />
        <div className="relative mt-16 ml-3 border-l-2 border-gold-500/40 sm:ml-6">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.title} delay={i * 100}>
              <div className="group relative pb-12 pl-8 last:pb-0 sm:pl-12">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rotate-45 bg-gold-500 transition-transform duration-300 group-hover:scale-125" />
                <p className="font-cond text-sm font-bold uppercase tracking-[0.26em] text-gold-500">{t.when}</p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-wide sm:text-3xl">{t.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-bone-50/70">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leaders() {
  return (
    <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Guided by Vision & Heritage"
          title="Academy Leadership"
          sub="The President sets the vision; the Life Patron grounds it in the heritage of Akyem."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {LEADERSHIP.map((l, i) => (
            <Reveal key={l.role} delay={i * 130} variant={i === 0 ? "left" : "right"}>
              <article className="group relative border-2 border-pitch-900/15 bg-bone-50 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-600 hover:shadow-[0_24px_60px_rgba(8,32,21,0.16)]">
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-2 border-pitch-900 bg-pitch-900 px-7 py-6">
            <p className="font-display text-2xl uppercase text-bone-50 sm:text-3xl">
              Write the next chapter <span className="text-gold-500">with us.</span>
            </p>
            <Link to="/contact" className="group inline-flex items-center gap-3 bg-gold-500 px-7 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-pitch-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400">
              Join the academy
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center font-cond text-sm font-semibold uppercase tracking-[0.2em] text-pitch-900/45">
            <StarIcon className="h-4 w-4 text-gold-600" />
            Talent · Wisdom · Knowledge at Work
            <StarIcon className="h-4 w-4 text-gold-600" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHead
        crumb="About"
        kicker="Developing Ghana's Future Stars"
        title="About the Academy"
        sub="Our story, our values and the leadership behind Ahenkan Football Academy — a world-class ambition rooted in Adeiso."
      />
      <Story />
      <Timeline />
      <Leaders />
    </>
  );
}
