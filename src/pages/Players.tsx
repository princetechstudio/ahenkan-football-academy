import { useEffect, useState } from "react";
import { PageHead, Reveal, SectionHead } from "../lib";
import { usePlayers, type Player } from "../hooks/useContent";
import { CloseIcon, PinIcon } from "../components/Icons";

function PlayerModal({ player, onClose }: { player: Player; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-pitch-950/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="player-modal-title" onMouseDown={onClose}>
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto border-2 border-gold-500 bg-bone-50 text-pitch-900 shadow-[0_30px_100px_rgba(0,0,0,0.55)]" onMouseDown={(event) => event.stopPropagation()}>
        <button onClick={onClose} aria-label="Close player profile" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border-2 border-pitch-900/20 bg-bone-50 text-pitch-900 transition-colors hover:border-gold-600 hover:text-gold-700">
          <CloseIcon />
        </button>
        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {player.images.slice(0, 3).map((image, index) => (
                <img key={image} src={image} alt={`${player.name} profile ${index + 1}`} className={`h-48 w-full bg-pitch-900 object-contain sm:h-56 ${index === 0 ? "col-span-2 sm:col-span-2" : ""}`} />
              ))}
            </div>
            {player.images.length < 3 && <p className="mt-3 font-cond text-xs font-bold uppercase tracking-[0.14em] text-clay-500">More player photos will be added soon.</p>}
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-cond text-sm font-bold uppercase tracking-[0.24em] text-gold-700">Player profile</p>
            <h2 id="player-modal-title" className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">{player.name}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 border-y-2 border-pitch-900/10 py-4 font-cond text-sm font-bold uppercase tracking-[0.14em]">
              <p><span className="block text-pitch-900/45">Age</span>{player.age}</p>
              <p><span className="block text-pitch-900/45">Position</span>{player.position || "Academy player"}</p>
              <p><span className="block text-pitch-900/45">Squad</span>{player.squad || "Academy squad"}</p>
            </div>
            {player.bio && <p className="mt-6 leading-relaxed text-pitch-900/75">{player.bio}</p>}
            {player.achievements && (
              <div className="mt-6 border-l-4 border-gold-500 bg-bone-100 p-4">
                <p className="font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Achievements & notes</p>
                <p className="mt-2 leading-relaxed text-pitch-900/75">{player.achievements}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Players() {
  const players = usePlayers();
  const [selected, setSelected] = useState<Player | null>(null);

  return (
    <>
      <PageHead crumb="Players" kicker="The Next Generation" title="Meet Our Players" sub="Discover the young talent building their football future at Ahenkan Academy." />
      <section className="relative bg-bone-100 py-24 text-pitch-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead kicker="Talent In Motion" title="Our Player Roster" sub="Click a player to see their story, details and photo gallery." />
          {players.length === 0 ? (
            <div className="mx-auto mt-14 max-w-2xl border-2 border-dashed border-pitch-900/20 bg-bone-50 p-12 text-center">
              <PinIcon className="mx-auto h-8 w-8 text-gold-600" />
              <h3 className="mt-4 font-display text-2xl uppercase">Player profiles coming soon</h3>
              <p className="mt-2 text-pitch-900/65">Our academy team is preparing the first player profiles.</p>
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {players.map((player, index) => (
                <Reveal key={player.id} delay={(index % 3) * 90}>
                  <button type="button" onClick={() => setSelected(player)} className="group block w-full border-2 border-pitch-900/15 bg-bone-50 text-left transition-all duration-300 hover:-translate-y-2 hover:border-gold-600 hover:shadow-[0_22px_50px_rgba(8,32,21,0.16)]">
                    <div className="relative h-72 overflow-hidden bg-pitch-900">
                      {player.images[0] ? <img src={player.images[0]} alt={player.name} className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" /> : <div className="grid h-full place-items-center font-display text-7xl text-gold-500/60">{player.name.charAt(0)}</div>}
                      <span className="absolute left-0 top-4 bg-gold-500 px-3 py-1 font-cond text-xs font-bold uppercase tracking-[0.18em] text-pitch-950">View profile</span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl uppercase tracking-wide">{player.name}</h3>
                      <p className="mt-2 font-cond text-sm font-bold uppercase tracking-[0.16em] text-pitch-600">Age {player.age} · {player.position || "Player"}</p>
                      {player.bio && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-pitch-900/65">{player.bio}</p>}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
