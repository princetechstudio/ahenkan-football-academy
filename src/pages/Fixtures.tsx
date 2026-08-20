import { useMemo, useState } from "react";
import { STANDINGS } from "../data";
import { useFixtures, useResults } from "../hooks/useContent";
import { PageHead, Reveal, fmtDate, fmtTime, useCountdown } from "../lib";
import { PinIcon, StarIcon } from "../components/Icons";

type Filter = "All" | "U-15" | "U-17";

const RES_STYLE: Record<"W" | "D" | "L", string> = {
  W: "bg-gold-500 text-pitch-950",
  D: "bg-pitch-500 text-bone-50",
  L: "bg-clay-500 text-bone-50",
};

function Countdown() {
  const fixtures = useFixtures();
  const next = useMemo(() => {
    const now = Date.now();
    return [...fixtures]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .find((f) => new Date(f.date).getTime() > now);
  }, [fixtures]);

  const { d, h, m, s, past } = useCountdown(next?.date ?? "2026-01-01T00:00:00");

  return (
    <section className="relative overflow-hidden bg-pitch-900 py-16 text-bone-50">
      <div className="pitch-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-pitch-500/25 blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {next && !past ? (
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="flex items-center gap-3 font-cond text-sm font-bold uppercase tracking-[0.26em] text-gold-500">
                <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-gold-500" />
                Next Match · {next.comp}
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
                Ahenkan Football Academy <span className="text-pitch-400">{next.squad}</span>
                <span className="block text-gold-500">vs {next.opp}</span>
              </h2>
              <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-cond text-base font-semibold uppercase tracking-[0.18em] text-bone-50/70">
                <span>{fmtDate(next.date)} · {fmtTime(next.date)}</span>
                <span className="flex items-center gap-2">
                  <PinIcon className="h-4 w-4 text-gold-500" /> {next.venue}
                </span>
              </p>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-5">
              <div className="grid grid-cols-4 gap-px border-2 border-gold-500/50 bg-gold-500/30">
                {[
                  { v: d, l: "Days" },
                  { v: h, l: "Hrs" },
                  { v: m, l: "Min" },
                  { v: s, l: "Sec" },
                ].map((x) => (
                  <div key={x.l} className="bg-pitch-950 px-2 py-5 text-center">
                    <p className="tabular font-display text-4xl text-gold-500 sm:text-5xl">
                      {String(x.v).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-cond text-xs font-bold uppercase tracking-[0.24em] text-bone-50/60">{x.l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center font-cond text-sm font-semibold uppercase tracking-[0.2em] text-bone-50/50">
                Kick-off countdown · supporters welcome
              </p>
            </Reveal>
          </div>
        ) : (
          <p className="text-center font-display text-3xl uppercase text-bone-50">
            Full-time on the season — new fixtures coming soon.
          </p>
        )}
      </div>
    </section>
  );
}

export default function Fixtures() {
  const [filter, setFilter] = useState<Filter>("All");
  const fixtures = useFixtures();
  const allResults = useResults();

  const upcoming = fixtures.filter((f) => filter === "All" || f.squad === filter);
  const results = allResults.filter((r) => filter === "All" || r.squad === filter);

  return (
    <>
      <PageHead
        crumb="Fixtures"
        kicker="UWA Regional Youth League · Eastern Regional Cup"
        title="Fixtures & Results"
        sub="Every match our U-15 and U-17 squads play — upcoming fixtures, recent results and where Ahenkan sits in the table."
      />
      <Countdown />

      <section className="relative bg-bone-100 py-20 text-pitch-900 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="mr-3 font-cond text-sm font-bold uppercase tracking-[0.24em] text-pitch-900/50">Filter squads</p>
              {(["All", "U-15", "U-17"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border-2 px-5 py-2 font-cond text-base font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                    filter === f
                      ? "border-pitch-700 bg-pitch-700 text-bone-50"
                      : "border-pitch-900/15 text-pitch-900/70 hover:border-gold-600 hover:text-gold-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* upcoming */}
            <div className="lg:col-span-7">
              <h2 className="flex items-center gap-4 font-display text-3xl uppercase tracking-wide">
                Upcoming <span className="h-1 flex-1 bg-pitch-700/25" aria-hidden="true" />
              </h2>
              <div className="mt-6 space-y-4">
                {upcoming.map((f, i) => (
                  <Reveal key={f.id} delay={i * 60}>
                    <article className="group grid grid-cols-[auto_1fr] items-center gap-5 border-2 border-pitch-900/15 bg-bone-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600 hover:shadow-[0_14px_36px_rgba(8,32,21,0.12)] sm:grid-cols-[110px_1fr_auto] sm:p-5">
                      <div className="border-r-2 border-gold-600/50 pr-4 text-center sm:pr-5">
                        <p className="font-display text-2xl leading-none text-pitch-700">
                          {new Date(f.date).getDate()}
                        </p>
                        <p className="font-cond text-xs font-bold uppercase tracking-[0.18em] text-pitch-900/55">
                          {new Date(f.date).toLocaleDateString("en-GB", { month: "short" })} · {fmtTime(f.date)}
                        </p>
                      </div>
                      <div>
                        <p className="flex flex-wrap items-center gap-2.5">
                          <span className={`px-2 py-0.5 font-cond text-[11px] font-bold uppercase tracking-[0.16em] ${f.squad === "U-17" ? "bg-pitch-700 text-bone-50" : "bg-gold-500 text-pitch-950"}`}>
                            {f.squad}
                          </span>
                          <span className="font-cond text-xs font-semibold uppercase tracking-[0.18em] text-pitch-900/50">
                            {f.comp}
                          </span>
                        </p>
                        <h3 className="mt-1.5 font-display text-xl uppercase tracking-wide">
                          Ahenkan Football Academy <span className="text-gold-600">vs</span> {f.opp}
                        </h3>
                        <p className="mt-1 flex items-center gap-2 text-sm text-pitch-900/60">
                          <PinIcon className="h-4 w-4 text-pitch-600" /> {f.venue}
                        </p>
                      </div>
                      <StarIcon className="hidden h-5 w-5 text-pitch-900/15 transition-colors duration-300 group-hover:text-gold-500 sm:block" />
                    </article>
                  </Reveal>
                ))}
                {upcoming.length === 0 && (
                  <p className="border-2 border-dashed border-pitch-900/15 p-8 text-center text-pitch-900/50">
                    No fixtures for this squad yet — check back after the next draw.
                  </p>
                )}
              </div>
            </div>

            {/* results */}
            <div className="lg:col-span-5">
              <h2 className="flex items-center gap-4 font-display text-3xl uppercase tracking-wide">
                Recent Results <span className="h-1 flex-1 bg-pitch-700/25" aria-hidden="true" />
              </h2>
              <div className="mt-6 border-2 border-pitch-900/15 bg-bone-50">
                {results.map((r, i) => (
                  <Reveal key={r.id} delay={i * 50}>
                    <div
                      className={`flex items-center gap-4 px-5 py-4 ${
                        i !== results.length - 1 ? "border-b border-pitch-900/10" : ""
                      } transition-colors duration-200 hover:bg-bone-100`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center font-display text-lg ${RES_STYLE[r.res]}`}>
                        {r.res}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          Ahenkan {r.squad} <span className="font-display text-pitch-700">{r.score}</span> {r.opp}
                        </p>
                        <p className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-pitch-900/50">
                          {r.venue} · {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
                {results.length === 0 && (
                  <p className="p-8 text-center text-pitch-900/50">No results yet for this squad.</p>
                )}
              </div>

              {/* standings */}
              <h2 className="mt-12 flex items-center gap-4 font-display text-3xl uppercase tracking-wide">
                U-17 Table <span className="h-1 flex-1 bg-pitch-700/25" aria-hidden="true" />
              </h2>
              <Reveal delay={100}>
                <div className="mt-6 overflow-x-auto border-2 border-pitch-900/15">
                  <table className="w-full min-w-[430px] text-left text-sm">
                    <thead>
                      <tr className="bg-pitch-900 font-cond text-xs font-bold uppercase tracking-[0.18em] text-bone-50">
                        <th className="px-4 py-3">#</th>
                        <th className="px-2 py-3">Team</th>
                        <th className="px-2 py-3 text-center">P</th>
                        <th className="px-2 py-3 text-center">W</th>
                        <th className="px-2 py-3 text-center">D</th>
                        <th className="px-2 py-3 text-center">L</th>
                        <th className="px-2 py-3 text-center">GD</th>
                        <th className="px-4 py-3 text-center">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STANDINGS.map((t) => (
                        <tr
                          key={t.team}
                          className={`tabular border-t border-pitch-900/10 transition-colors ${
                            t.us ? "bg-pitch-700 font-bold text-bone-50" : "bg-bone-50 text-pitch-900/80 hover:bg-bone-100"
                          }`}
                        >
                          <td className="px-4 py-3 font-display">{t.pos}</td>
                          <td className="px-2 py-3">{t.team}{t.us && <span className="ml-2 text-gold-500">★</span>}</td>
                          <td className="px-2 py-3 text-center">{t.p}</td>
                          <td className="px-2 py-3 text-center">{t.w}</td>
                          <td className="px-2 py-3 text-center">{t.d}</td>
                          <td className="px-2 py-3 text-center">{t.l}</td>
                          <td className="px-2 py-3 text-center">+{t.gf - t.ga}</td>
                          <td className={`px-4 py-3 text-center font-display text-base ${t.us ? "text-gold-500" : ""}`}>{t.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
              <p className="mt-4 font-cond text-sm font-semibold uppercase tracking-[0.18em] text-pitch-900/45">
                UWA Regional Youth League · updated after every matchday
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
