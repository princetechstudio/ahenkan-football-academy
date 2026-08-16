import { useState, type FormEvent } from "react";
import { CONTACT, PROGRAMS, STEPS } from "../data";
import { Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

type Form = {
  player: string;
  age: string;
  guardian: string;
  phone: string;
  email: string;
  program: string;
  notes: string;
};

const EMPTY: Form = {
  player: "",
  age: "",
  guardian: "",
  phone: "",
  email: "",
  program: PROGRAMS[0].name,
  notes: "",
};

const inputCls =
  "w-full border-2 border-pitch-900/20 bg-bone-50 px-4 py-3 text-pitch-900 placeholder:text-pitch-800/35 outline-none transition-colors focus:border-gold-600";

const labelCls = "mb-1.5 block font-cond text-sm font-bold uppercase tracking-[0.18em] text-pitch-800";

export default function Trials() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState("");

  const set = (k: keyof Form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (form.player.trim().length < 2) er.player = "Enter the player's full name.";
    if (!form.age) er.age = "Select the player's age.";
    if (form.guardian.trim().length < 2) er.guardian = "Enter a parent or guardian name.";
    if (form.phone.replace(/\D/g, "").length < 9) er.phone = "Enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setRefCode(`AFA-2026-${String(Math.floor(1000 + Math.random() * 9000))}`);
    setDone(true);
  };

  return (
    <section id="trials" className="relative overflow-hidden bg-pitch-950 py-24 lg:py-32">
      <div className="pitch-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <span
        className="text-outline pointer-events-none absolute right-0 top-4 select-none font-display text-[18vw] uppercase leading-none opacity-40 lg:text-[190px]"
        aria-hidden="true"
      >
        Join Us
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        {/* left: copy + steps + contact */}
        <div className="lg:col-span-6">
          <SectionHead
            kicker="Admissions Open · Est. 2025"
            title="Ready to Become a World-Class Player?"
            sub="Join Ahenkan Football Academy and let us unearth your talent, guide your development, and train you to become a world-class football champion."
          />

          <div className="mt-10 space-y-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.no} delay={i * 110}>
                <div className="group flex gap-5 border-l-2 border-gold-500/40 pl-5 transition-all duration-300 hover:border-gold-500 hover:pl-6">
                  <span className="font-display text-3xl text-gold-500/60 transition-colors duration-300 group-hover:text-gold-500">
                    {s.no}
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-wide text-bone-50">{s.title}</h3>
                    <p className="mt-1.5 max-w-md leading-relaxed text-bone-50/65">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-10 grid grid-cols-1 gap-px border-2 border-bone-50/15 bg-bone-50/15 sm:grid-cols-3">
              {[
                { label: "Trial Day", value: "9am – 3pm", sub: "GH₵200 registration" },
                { label: "Call Us", value: CONTACT.phone, sub: `or ${CONTACT.altPhone}`, href: CONTACT.phoneHref },
                { label: "Email", value: CONTACT.email, sub: "Replies within 48h", href: `mailto:${CONTACT.email}` },
              ].map((c) => (
                <div key={c.label} className="bg-pitch-900 p-5 transition-colors duration-300 hover:bg-pitch-850">
                  <p className="font-cond text-xs font-bold uppercase tracking-[0.22em] text-gold-400">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-2 block break-words text-sm font-semibold text-bone-50 transition-colors hover:text-gold-400">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-2 break-words text-sm font-semibold text-bone-50">{c.value}</p>
                  )}
                  <p className="mt-1 text-xs text-bone-50/50">{c.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right: form */}
        <Reveal variant="right" delay={150} className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold-500/50" aria-hidden="true" />
            <div className="relative bg-bone-50 p-7 text-pitch-900 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-9">
              {done ? (
                <div className="py-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pitch-700 text-bone-50">
                    <CheckIcon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl uppercase tracking-wide">Application Received!</h3>
                  <p className="mt-3 text-pitch-800/75">
                    Thank you — <strong className="text-pitch-900">{form.player}</strong> is now in our
                    admissions queue. Our team will call <strong className="text-pitch-900">{form.phone}</strong>{" "}
                    within 48 hours with trial details.
                  </p>
                  <p className="mx-auto mt-6 inline-block border-2 border-dashed border-gold-600 bg-gold-500/10 px-5 py-3 font-cond text-lg font-bold uppercase tracking-[0.18em] text-pitch-900">
                    Ref · {refCode}
                  </p>
                  <p className="mt-4 text-sm text-pitch-800/60">
                    Remember: trial registration is GH₵200 · 9am – 3pm at our Adeiso grounds.
                  </p>
                  <button
                    onClick={() => {
                      setForm(EMPTY);
                      setDone(false);
                    }}
                    className="mt-7 inline-flex items-center gap-2 border-2 border-pitch-900 px-6 py-3 font-cond text-base font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:bg-pitch-900 hover:text-bone-50"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="flex items-center gap-3 font-cond text-sm font-bold uppercase tracking-[0.22em] text-clay-600">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-clay-500" />
                    Registration Form
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-wide">Join Our Academy</h3>
                  <p className="mt-2 text-sm text-pitch-800/70">
                    Fields marked * are required. Our admissions team confirms every application by phone.
                  </p>

                  <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="player" className={labelCls}>Player's full name *</label>
                      <input id="player" value={form.player} onChange={set("player")} placeholder="e.g. Kojo Mensah" className={inputCls} />
                      {errors.player && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.player}</p>}
                    </div>
                    <div>
                      <label htmlFor="age" className={labelCls}>Player's age *</label>
                      <select id="age" value={form.age} onChange={set("age")} className={inputCls}>
                        <option value="">Select age…</option>
                        {Array.from({ length: 13 }, (_, i) => i + 6).map((a) => (
                          <option key={a} value={a}>{a} years</option>
                        ))}
                      </select>
                      {errors.age && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.age}</p>}
                    </div>
                    <div>
                      <label htmlFor="program" className={labelCls}>Program</label>
                      <select id="program" value={form.program} onChange={set("program")} className={inputCls}>
                        {PROGRAMS.map((p) => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="guardian" className={labelCls}>Parent / guardian name *</label>
                      <input id="guardian" value={form.guardian} onChange={set("guardian")} placeholder="Who should we speak with?" className={inputCls} />
                      {errors.guardian && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.guardian}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone *</label>
                      <input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+233 …" className={inputCls} />
                      {errors.phone && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>Email (optional)</label>
                      <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
                      {errors.email && <p className="mt-1.5 text-sm font-semibold text-clay-600">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="notes" className={labelCls}>Anything we should know?</label>
                      <textarea id="notes" rows={3} value={form.notes} onChange={set("notes")} placeholder="Position played, previous clubs, school…" className={`${inputCls} resize-none`} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-7 flex w-full items-center justify-center gap-3 bg-pitch-900 px-7 py-4 font-cond text-lg font-bold uppercase tracking-[0.16em] text-bone-50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pitch-800 hover:shadow-[0_16px_40px_rgba(8,32,21,0.3)]"
                  >
                    Submit Application
                    <ArrowIcon className="h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-center font-cond text-sm font-semibold uppercase tracking-[0.14em] text-pitch-800/55">
                    <PinIcon className="h-4 w-4 text-gold-600" /> Ahenkan Grounds · {CONTACT.address}
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* contact strip */}
      <div className="relative mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-bone-50/12 py-6 font-cond text-base font-semibold uppercase tracking-[0.16em] text-bone-50/70">
            <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-gold-400">
              <PhoneIcon className="h-4 w-4 text-gold-500" /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 transition-colors hover:text-gold-400">
              <MailIcon className="h-4 w-4 text-gold-500" /> {CONTACT.email}
            </a>
            <span className="flex items-center gap-2.5">
              <PinIcon className="h-4 w-4 text-gold-500" /> {CONTACT.address} · {CONTACT.region}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
