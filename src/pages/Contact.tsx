import { useState, type FormEvent } from "react";
import { CONTACT, PROGRAMS, STEPS } from "../data";
import { PageHead, Reveal, SectionHead } from "../lib";
import { ArrowIcon, CheckIcon, ClockIcon, FacebookIcon, MailIcon, PhoneIcon, PinIcon } from "../components/Icons";

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
  "w-full border-2 border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-royal-500";
const labelCls = "mb-1.5 block font-cond text-sm font-bold uppercase tracking-[0.18em] text-ink/70";

export default function Contact() {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHead
        crumb="Contact"
        kicker="Admissions Open · GH₵200 Registration"
        title="Join the Academy"
        sub="Apply for a trial, book a visit, or talk to our admissions team — we reply to every enquiry within 48 hours."
      />

      <section className="relative overflow-hidden bg-paper py-24 text-ink lg:py-28">
        <div className="pitch-lines-dark absolute inset-0" aria-hidden="true" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-royal-500/12 blur-[130px]" aria-hidden="true" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gold-500/15 blur-[110px]" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          {/* left */}
          <div className="lg:col-span-6">
            <SectionHead
              kicker="How Players Join"
              title="Three Steps to the Badge"
              sub="Every Ahenkan player starts the same way — one trial day, one chance to show us everything."
            />
            <div className="mt-10 space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.no} delay={i * 110}>
                  <div className="group flex gap-5 border-l-2 border-royal-500/40 pl-5 transition-all duration-300 hover:border-gold-500 hover:pl-6">
                    <span className="font-display text-3xl text-royal-300 transition-colors duration-300 group-hover:text-royal-500">
                      {s.no}
                    </span>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-wide">{s.title}</h3>
                      <p className="mt-1.5 max-w-md leading-relaxed text-ink/65">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div className="mt-10 grid grid-cols-1 gap-px border-2 border-ink/10 bg-ink/10 sm:grid-cols-2">
                {[
                  { Icon: PhoneIcon, label: "Call Us", value: CONTACT.phone, sub: `or ${CONTACT.altPhone}`, href: CONTACT.phoneHref },
                  { Icon: MailIcon, label: "Email Us", value: CONTACT.email, sub: "Replies within 48h", href: `mailto:${CONTACT.email}` },
                  { Icon: PinIcon, label: "Visit Us", value: CONTACT.address, sub: CONTACT.region },
                  { Icon: ClockIcon, label: "Trial Days", value: "9am – 3pm", sub: "GH₵200 registration · Ages 15–16" },
                ].map((c) => (
                  <div key={c.label} className="group bg-lav-50 p-6 transition-colors duration-300 hover:bg-lav-100">
                    <c.Icon className="h-6 w-6 text-royal-500" />
                    <p className="mt-3 font-cond text-xs font-bold uppercase tracking-[0.24em] text-royal-600">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-1.5 block break-words font-semibold transition-colors hover:text-royal-500">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1.5 break-words font-semibold">{c.value}</p>
                    )}
                    <p className="mt-1 text-xs text-ink/50">{c.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={360}>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 border-2 border-ink/20 px-6 py-3.5 font-cond text-base font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:border-royal-500 hover:text-royal-500"
              >
                <FacebookIcon className="h-5 w-5" />
                Follow us on Facebook
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal variant="right" delay={150} className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold-500" aria-hidden="true" />
              <div className="relative bg-lav-50 p-7 text-ink shadow-[0_30px_80px_rgba(126,1,183,0.18)] sm:p-9">
                {done ? (
                  <div className="py-8 text-center">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-royal-500 text-paper">
                      <CheckIcon className="h-8 w-8" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl uppercase tracking-wide">Application Received!</h3>
                    <p className="mt-3 text-ink/70">
                      Thank you — <strong className="text-ink">{form.player}</strong> is now in our admissions
                      queue. Our team will call <strong className="text-ink">{form.phone}</strong> within 48 hours
                      with trial details.
                    </p>
                    <p className="mx-auto mt-6 inline-block border-2 border-dashed border-royal-500 bg-royal-100 px-5 py-3 font-cond text-lg font-bold uppercase tracking-[0.18em] text-royal-700">
                      Ref · {refCode}
                    </p>
                    <p className="mt-4 text-sm text-ink/60">
                      Remember: trial registration is GH₵200 · 9am – 3pm at our Adeiso grounds.
                    </p>
                    <button
                      onClick={() => {
                        setForm(EMPTY);
                        setDone(false);
                      }}
                      className="mt-7 inline-flex items-center gap-2 border-2 border-royal-500 px-6 py-3 font-cond text-base font-bold uppercase tracking-[0.14em] text-royal-600 transition-all duration-200 hover:bg-royal-500 hover:text-paper"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <p className="flex items-center gap-3 font-cond text-sm font-bold uppercase tracking-[0.22em] text-loss">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-loss" />
                      Registration Form
                    </p>
                    <h3 className="mt-3 font-display text-3xl uppercase tracking-wide">Start Your Application</h3>
                    <p className="mt-2 text-sm text-ink/65">
                      Fields marked * are required. Our admissions team confirms every application by phone.
                    </p>

                    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="player" className={labelCls}>Player's full name *</label>
                        <input id="player" value={form.player} onChange={set("player")} placeholder="e.g. Kojo Mensah" className={inputCls} />
                        {errors.player && <p className="mt-1.5 text-sm font-semibold text-loss">{errors.player}</p>}
                      </div>
                      <div>
                        <label htmlFor="age" className={labelCls}>Player's age *</label>
                        <select id="age" value={form.age} onChange={set("age")} className={inputCls}>
                          <option value="">Select age…</option>
                          {Array.from({ length: 13 }, (_, i) => i + 6).map((a) => (
                            <option key={a} value={a}>{a} years</option>
                          ))}
                        </select>
                        {errors.age && <p className="mt-1.5 text-sm font-semibold text-loss">{errors.age}</p>}
                      </div>
                      <div>
                        <label htmlFor="program" className={labelCls}>Program</label>
                        <select id="program" value={form.program} onChange={set("program")} className={inputCls}>
                          {PROGRAMS.map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="guardian" className={labelCls}>Parent / guardian name *</label>
                        <input id="guardian" value={form.guardian} onChange={set("guardian")} placeholder="Who should we speak with?" className={inputCls} />
                        {errors.guardian && <p className="mt-1.5 text-sm font-semibold text-loss">{errors.guardian}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelCls}>Phone *</label>
                        <input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+233 …" className={inputCls} />
                        {errors.phone && <p className="mt-1.5 text-sm font-semibold text-loss">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelCls}>Email (optional)</label>
                        <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
                        {errors.email && <p className="mt-1.5 text-sm font-semibold text-loss">{errors.email}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="notes" className={labelCls}>Anything we should know?</label>
                        <textarea id="notes" rows={3} value={form.notes} onChange={set("notes")} placeholder="Position played, previous clubs, school…" className={`${inputCls} resize-none`} />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group mt-7 flex w-full items-center justify-center gap-3 bg-royal-500 px-7 py-4 font-cond text-lg font-bold uppercase tracking-[0.16em] text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-royal-700 hover:shadow-[0_16px_40px_rgba(126,1,183,0.35)]"
                    >
                      Submit Application
                      <ArrowIcon className="h-5 w-5 text-gold-500 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                    <p className="mt-4 flex items-center justify-center gap-2 text-center font-cond text-sm font-semibold uppercase tracking-[0.14em] text-ink/50">
                      <PinIcon className="h-4 w-4 text-royal-500" /> Ahenkan Grounds · {CONTACT.address}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
