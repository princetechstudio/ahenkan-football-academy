import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LEADERSHIP } from "../data";
import { useStaff, type StaffMember } from "../hooks/useContent";
import { ArrowIcon, CloseIcon } from "../components/Icons";
import { PageHead, Reveal, SectionHead } from "../lib";

function StaffModal({ member, onClose }: { member: StaffMember; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-pitch-950/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="staff-modal-title" onMouseDown={onClose}>
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border-2 border-gold-500 bg-bone-50 text-pitch-900 shadow-[0_30px_100px_rgba(0,0,0,.55)]" onMouseDown={(event) => event.stopPropagation()}>
        <button onClick={onClose} aria-label="Close staff profile" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center border-2 border-pitch-900/20 bg-bone-50 hover:border-gold-600"><CloseIcon /></button>
        <div className="grid gap-8 p-6 sm:p-9 md:grid-cols-[.9fr_1.1fr]">
          <div className="bg-pitch-900 p-3"><img src={member.image} alt={member.name} className="aspect-[4/5] w-full object-contain" /></div>
          <div className="flex flex-col justify-center">
            <p className="font-cond text-sm font-bold uppercase tracking-[.22em] text-gold-700">Staff profile</p>
            <h2 id="staff-modal-title" className="mt-2 font-display text-4xl uppercase leading-none">{member.name}</h2>
            <p className="mt-3 font-cond text-sm font-bold uppercase tracking-[.16em] text-pitch-600">{member.role}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 border-y-2 border-pitch-900/10 py-4 font-cond text-sm font-bold uppercase tracking-[.12em]"><p><span className="block text-pitch-900/45">Qualification</span>{member.qualification || "Academy staff"}</p><p><span className="block text-pitch-900/45">Experience</span>{member.years || "Dedicated to development"}</p></div>
            {member.bio && <p className="mt-6 leading-relaxed text-pitch-900/70">{member.bio}</p>}
            {!!member.tags.length && <div className="mt-6 flex flex-wrap gap-2">{member.tags.map((tag) => <span key={tag} className="border border-gold-500/45 bg-bone-100 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-[.12em] text-pitch-700">{tag}</span>)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Staff() {
  const staff = useStaff();
  const [selected, setSelected] = useState<StaffMember | null>(null);

  return (
    <>
      <PageHead crumb="Staff" kicker="Qualified & Dedicated" title="Our Academy Staff" sub="Meet the professionals guiding player development, character and football intelligence at Ahenkan Academy." />
      <section className="relative bg-bone-50 py-20 text-pitch-900 lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHead kicker="Experienced Leaders" title="Leadership Team" sub="Experienced leaders guiding our academy's vision." /><div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">{LEADERSHIP.map((leader, index) => <Reveal key={leader.role} delay={index * 120} variant={index === 0 ? "left" : "right"}><article className="grid grid-cols-[38%_1fr] overflow-hidden border-2 border-pitch-900/15 bg-bone-100 transition-all duration-300 hover:-translate-y-1 hover:border-gold-600 hover:shadow-[0_18px_44px_rgba(8,32,21,.14)]"><div className="overflow-hidden bg-pitch-900"><img src={leader.img} alt={leader.name} className="h-full min-h-52 w-full object-contain" /></div><div className="p-6"><p className="font-cond text-xs font-bold uppercase tracking-[.22em] text-pitch-600">{leader.role}</p><h3 className="mt-2 font-display text-xl uppercase leading-snug sm:text-2xl">{leader.name}</h3><p className="mt-3 text-sm leading-relaxed text-pitch-900/65">{leader.bio}</p></div></article></Reveal>)}</div></div></section>
      <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-28"><span className="text-outline-dark pointer-events-none absolute right-0 top-6 select-none font-display text-[16vw] uppercase leading-none opacity-60 lg:text-[180px]" aria-hidden="true">Staff</span><div className="relative mx-auto max-w-7xl px-4 sm:px-6"><SectionHead kicker="Coaches & Specialists" title="Meet The Team" sub="Profiles published by the academy admin team. Select a staff member to view their full profile." />{staff.length === 0 ? <div className="mx-auto mt-14 max-w-2xl border-2 border-dashed border-pitch-900/20 bg-bone-50 p-12 text-center"><h3 className="font-display text-2xl uppercase">Staff profiles coming soon</h3><p className="mt-2 text-pitch-900/65">Our academy team is preparing the first staff profiles.</p></div> : <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">{staff.map((member, index) => <Reveal key={member.id} delay={(index % 3) * 90}><button type="button" onClick={() => setSelected(member)} className="group block w-full border-2 border-pitch-900/15 bg-bone-50 text-left transition-all duration-300 hover:-translate-y-2 hover:border-gold-600 hover:shadow-[0_22px_50px_rgba(8,32,21,.16)]"><div className="relative h-72 overflow-hidden bg-pitch-900">{member.image ? <img src={member.image} alt={member.name} className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" /> : <div className="grid h-full place-items-center font-display text-7xl text-gold-500/60">{member.name.charAt(0)}</div>}<span className="absolute left-0 top-4 bg-gold-500 px-3 py-1 font-cond text-xs font-bold uppercase tracking-[.18em] text-pitch-950">View profile</span></div><div className="p-6"><h3 className="font-display text-2xl uppercase tracking-wide">{member.name}</h3><p className="mt-2 font-cond text-sm font-bold uppercase tracking-[.16em] text-pitch-600">{member.role}</p>{member.bio && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-pitch-900/65">{member.bio}</p>}</div></button></Reveal>)}</div>}
          <Reveal delay={180}><div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-2 border-pitch-900/15 bg-bone-50 px-7 py-6"><p className="font-display text-2xl uppercase sm:text-3xl">Want to join our <span className="text-pitch-600">staff team?</span></p><Link to="/contact" className="group inline-flex items-center gap-3 bg-pitch-700 px-7 py-3.5 font-cond text-base font-bold uppercase tracking-[.14em] text-bone-50 hover:bg-pitch-600">Contact the academy<ArrowIcon className="h-5 w-5 text-gold-400 transition-transform group-hover:translate-x-1.5" /></Link></div></Reveal>
        </div></section>
      {selected && <StaffModal member={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
