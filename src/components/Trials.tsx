import { useState, type FormEvent } from "react";
import { BRING, POSITIONS, PROGRAMS, TRIAL_DATES } from "../data";
import { Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

type FormState = {
  player: string;
  dob: string;
  program: string;
  position: string;
  parent: string;
  phone: string;
  email: string;
  notes: string;
};

const EMPTY: FormState = {
  player: "",
  dob: "",
  program: "",
  position: "",
  parent: "",
  phone: "",
  email: "",
  notes: "",
};

const inputCls = (err?: string) =>
  `w-full border-2 bg-bone-50 px-4 py-3 text-pitch-900 placeholder:text-pitch-800/40 outline-none transition-colors duration-200 focus:border-gold-500 ${
    err ? "border-clay-500" : "border-pitch-900/25"
  }`;

const labelCls = "mb-1.5 block font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-900";

export default function Trials() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState<{ ref: string; data: FormState } | null>(null);

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (form.player.trim().length < 3) er.player = "Enter the player's full name.";
    if (!form.dob) er.dob = "Date of birth is required.";
    if (!form.program) er.program = "Choose a program.";
    if (!form.position) er.position = "Choose a position.";
    if (form.parent.trim().length < 3) er.parent = "Parent / guardian name required.";
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone.trim()))
      er.phone = "Enter a valid phone number (e.g. +233 24 000 0000).";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "That email doesn't look right.";
    setErrors(er);
    if (Object.keys(er).length) return;
    const ref = `AFA-26-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setDone({ ref, data: form });
  };

  return (
    <section id="trials" className="relative overflow-hidden bg-gold-500 py-24 text-pitch-950 lg:py-32">
      <div className="diagonal-stripes absolute inset-0 opacity-40" aria-hidden="true" />
      <span
        className="text-outline-dark pointer-events-none absolute -top-6 left-0 select-none font-display text-[22vw] uppercase leading-none opacity-50 lg:text-[220px]"
        aria-hidden="true"
      >
        Trials
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12">
        {/* left: details */}
        <div className="lg:col-span-5">
          <SectionHead
            dark
            kicker="Open intake · March 2026"
            title="Earn Your Boots On"
            sub="Trials are free, judged on potential, and open to every player in Greater Accra. Register below — you'll receive a confirmation text within 24 hours."
          />

          <Reveal delay={150}>
            <div className="mt-10 space-y-3">
              {TRIAL_DATES.map((t) => (
                <div
                  key={t.date}
                  className="group flex items-center gap-5 border-2 border-pitch-950/80 bg-bone-50 px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="border-r-2 border-pitch-950/15 pr-5 text-center">
                    <p className="font-display text-xl uppercase leading-none">{t.day.slice(0, 3)}</p>
                    <p className="mt-1 font-cond text-xs font-bold uppercase tracking-widest text-clay-500">
                      {t.date.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-lg uppercase leading-tight">{t.group}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-cond text-sm font-semibold uppercase tracking-widest text-pitch-800/70">
                      <ClockIcon className="h-4 w-4 text-gold-600" /> {t.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 border-2 border-pitch-950/80 bg-pitch-900 p-6 text-bone-50">
              <h3 className="font-display text-xl uppercase tracking-wide text-gold-400">What to bring</h3>
              <ul className="mt-4 space-y-2.5">
                {BRING.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-bone-50/85">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 border-t border-bone-50/15 pt-5">
                <p className="flex items-center gap-3 font-cond text-sm font-semibold uppercase tracking-widest text-bone-50/85">
                  <PinIcon className="h-4 w-4 text-gold-400" /> Ahenkan Grounds, Spintex Rd, Accra
                </p>
                <p className="flex items-center gap-3 font-cond text-sm font-semibold uppercase tracking-widest text-bone-50/85">
                  <PhoneIcon className="h-4 w-4 text-gold-400" /> +233 24 555 0147
                </p>
                <p className="flex items-center gap-3 font-cond text-sm font-semibold uppercase tracking-widest text-bone-50/85">
                  <MailIcon className="h-4 w-4 text-gold-400" /> trials@ahenkanfa.com
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: form */}
        <Reveal variant="right" delay={120} className="lg:col-span-7">
          <div className="border-2 border-pitch-950 bg-bone-100 p-7 shadow-[12px_12px_0_rgba(5,19,12,0.85)] sm:p-10">
            {done ? (
              <div className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center bg-pitch-700 text-bone-50">
                  <CheckIcon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-3xl uppercase tracking-wide text-pitch-900">
                  Registration Received
                </h3>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-pitch-800/80">
                  Thank you, <strong>{done.data.parent}</strong>. <strong>{done.data.player}</strong> is
                  registered for the <strong>{done.data.program}</strong> trial as a{" "}
                  <strong>{done.data.position}</strong>. Our team will confirm your slot by SMS on{" "}
                  <strong>{done.data.phone}</strong> within 24 hours.
                </p>
                <p className="mx-auto mt-6 inline-block border-2 border-dashed border-pitch-900/40 bg-bone-50 px-6 py-3">
                  <span className="font-cond text-sm font-bold uppercase tracking-[0.2em] text-pitch-800/60">
                    Reference
                  </span>
                  <span className="tabular block font-display text-3xl text-clay-500">{done.ref}</span>
                </p>
                <p className="mt-5 text-sm text-pitch-800/60">
                  Show this reference at the registration desk on trial day.
                </p>
                <button
                  onClick={() => {
                    setDone(null);
                    setForm(EMPTY);
                  }}
                  className="group mt-8 inline-flex items-center gap-3 bg-pitch-900 px-7 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pitch-800"
                >
                  Register another player
                  <ArrowIcon className="h-4 w-4 text-gold-400 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-pitch-900 sm:text-3xl">
                    Trial Registration
                  </h3>
                  <p className="hidden font-cond text-sm font-bold uppercase tracking-[0.18em] text-clay-500 sm:block">
                    Free entry · All levels
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="player" className={labelCls}>
                      Player's full name *
                    </label>
                    <input
                      id="player"
                      type="text"
                      value={form.player}
                      onChange={set("player")}
                      placeholder="e.g. Selorm Agbeko"
                      className={inputCls(errors.player)}
                    />
                    {errors.player && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.player}</p>}
                  </div>
                  <div>
                    <label htmlFor="dob" className={labelCls}>
                      Date of birth *
                    </label>
                    <input
                      id="dob"
                      type="date"
                      value={form.dob}
                      onChange={set("dob")}
                      className={inputCls(errors.dob)}
                    />
                    {errors.dob && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.dob}</p>}
                  </div>
                  <div>
                    <label htmlFor="program" className={labelCls}>
                      Program *
                    </label>
                    <select
                      id="program"
                      value={form.program}
                      onChange={set("program")}
                      className={inputCls(errors.program)}
                    >
                      <option value="">Select a program…</option>
                      {PROGRAMS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} · {p.ages}
                        </option>
                      ))}
                    </select>
                    {errors.program && (
                      <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.program}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="position" className={labelCls}>
                      Position *
                    </label>
                    <select
                      id="position"
                      value={form.position}
                      onChange={set("position")}
                      className={inputCls(errors.position)}
                    >
                      <option value="">Select a position…</option>
                      {POSITIONS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    {errors.position && (
                      <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.position}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="parent" className={labelCls}>
                      Parent / guardian *
                    </label>
                    <input
                      id="parent"
                      type="text"
                      value={form.parent}
                      onChange={set("parent")}
                      placeholder="Full name"
                      className={inputCls(errors.parent)}
                    />
                    {errors.parent && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.parent}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelCls}>
                      Phone (SMS confirmation) *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+233 24 000 0000"
                      className={inputCls(errors.phone)}
                    />
                    {errors.phone && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelCls}>
                      Email (optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@example.com"
                      className={inputCls(errors.email)}
                    />
                    {errors.email && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className={labelCls}>
                      Anything we should know?
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={set("notes")}
                      placeholder="Previous clubs, injuries, school schedule…"
                      className={`${inputCls()} resize-none`}
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                  <p className="max-w-xs text-sm leading-snug text-pitch-800/70">
                    We only use your details to manage the trial. No fees, no agents, no pressure.
                  </p>
                  <button
                    type="submit"
                    className="group flex items-center gap-3 bg-clay-500 px-8 py-4 font-cond text-lg font-bold uppercase tracking-[0.14em] text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-clay-600 hover:shadow-[0_16px_40px_rgba(198,67,46,0.3)]"
                  >
                    Submit Registration
                    <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
