import { useState, type FormEvent } from "react";
import { NAV } from "../data";
import {
  Crest,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  XSocialIcon,
  YoutubeIcon,
} from "./Icons";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/ahenkanfa", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/ahenkanfa", Icon: FacebookIcon },
  { label: "X", href: "https://x.com/ahenkanfa", Icon: XSocialIcon },
  { label: "YouTube", href: "https://youtube.com/@ahenkanfa", Icon: YoutubeIcon },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-pitch-950 pt-20">
      <p
        className="text-outline pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap font-display text-[16vw] uppercase leading-none opacity-50"
        aria-hidden="true"
      >
        Ahenkan FA
      </p>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 border-b border-bone-50/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-3">
              <Crest className="h-12 w-12" />
              <span className="leading-none">
                <span className="block font-display text-2xl uppercase tracking-wide text-bone-50">
                  Ahenkan <span className="text-gold-500">FA</span>
                </span>
                <span className="mt-1 block font-cond text-[11px] font-semibold uppercase tracking-[0.3em] text-bone-50/55">
                  Miracle Mentality
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm leading-relaxed text-bone-50/65">
              A GFA-licensed youth football academy on Spintex Road, Accra — developing technique,
              education and character in Ghana's next generation since 2014.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center border border-bone-50/20 text-bone-50/70 transition-all duration-200 hover:-translate-y-1 hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-gold-400">Explore</h4>
            <ul className="mt-5 space-y-2.5">
              {[...NAV, { label: "Trials", href: "#trials" }].map((n) => (
                <li key={n.href + n.label}>
                  <a
                    href={n.href}
                    className="text-bone-50/70 transition-all duration-200 hover:pl-1.5 hover:text-bone-50"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-gold-400">Visit us</h4>
            <ul className="mt-5 space-y-3 text-bone-50/70">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                Ahenkan Grounds, Spintex Road,
                <br />
                opposite Palace Mall, Accra
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-500" />
                <a href="tel:+233245550147" className="transition-colors hover:text-gold-400">
                  +233 24 555 0147
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-gold-500" />
                <a
                  href="mailto:hello@ahenkanfootballacademy.com"
                  className="transition-colors hover:text-gold-400"
                >
                  hello@ahenkanfootballacademy.com
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-gold-400">
              Matchday broadcast
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-bone-50/65">
              Fixtures, line-ups and final scores in your inbox every matchday morning.
            </p>
            {state === "done" ? (
              <p className="mt-4 border-2 border-gold-500/50 bg-pitch-900 px-4 py-3 font-cond text-sm font-bold uppercase tracking-[0.16em] text-gold-400">
                ✓ You're on the list. See you matchday.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-4" noValidate>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setState("idle");
                    }}
                    placeholder="you@example.com"
                    aria-label="Email for matchday broadcast"
                    className={`min-w-0 flex-1 border-2 bg-pitch-900 px-4 py-3 text-sm text-bone-50 placeholder:text-bone-50/35 outline-none transition-colors focus:border-gold-500 ${
                      state === "error" ? "border-clay-500" : "border-bone-50/20"
                    }`}
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-gold-500 px-5 font-cond text-sm font-bold uppercase tracking-[0.14em] text-pitch-950 transition-colors hover:bg-gold-400"
                  >
                    Join
                  </button>
                </div>
                {state === "error" && (
                  <p className="mt-2 text-sm font-semibold text-clay-400">Please enter a valid email.</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-7">
          <p className="font-cond text-sm uppercase tracking-[0.18em] text-bone-50/45">
            © 2026 Ahenkan Football Academy · ahenkanfootballacademy.com
          </p>
          <p className="font-cond text-sm uppercase tracking-[0.18em] text-bone-50/45">
            GFA Licence YA-0214 · Built on Spintex Road
          </p>
        </div>
      </div>
    </footer>
  );
}
