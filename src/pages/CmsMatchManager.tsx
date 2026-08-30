import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Pencil, Plus, Save, Trash2, Trophy, X } from "lucide-react";
import { broadcastNotification, supabase } from "../supabase";

type FixtureRow = {
  id?: string;
  squad: string;
  comp: string;
  opp: string;
  venue: string;
  date: string;
};

type ResultRow = FixtureRow & {
  score: string;
  res: "W" | "D" | "L";
};

const MATCH_SQUADS = ["U-13", "U-15", "U-17", "Senior"] as const;

const emptyFixture: FixtureRow = {
  squad: "U-13",
  comp: "UWA Regional Youth League",
  opp: "",
  venue: "Ahenkan Grounds, Adeiso",
  date: "",
};

const emptyResult: ResultRow = {
  ...emptyFixture,
  score: "",
  res: "W",
};

function localInput(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function readableDate(iso: string) {
  if (!iso) return "Date not set";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function CmsMatchManager({ kind }: { kind: "fixtures" | "results" }) {
  const isResult = kind === "results";
  const [rows, setRows] = useState<(FixtureRow | ResultRow)[]>([]);
  const [form, setForm] = useState<FixtureRow | ResultRow>(isResult ? emptyResult : emptyFixture);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const table = kind;
  const title = isResult ? "Results" : "Fixtures";

  const load = useCallback(async () => {
    const { data } = await supabase!
      .from(table)
      .select("*")
      .order("date", { ascending: !isResult });
    if (data) setRows(data as (FixtureRow | ResultRow)[]);
  }, [isResult, table]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    setForm(isResult ? emptyResult : emptyFixture);
    setEditingId(null);
    setNotice("");
    setOpen(true);
  }

  function startEdit(row: FixtureRow | ResultRow) {
    setForm({ ...row, date: localInput(row.date) });
    setEditingId(row.id ?? null);
    setNotice("");
    setOpen(true);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      const payload = { ...form, date: new Date(form.date).toISOString() };
      delete (payload as Partial<FixtureRow | ResultRow>).id;
      if (editingId) {
        await supabase!.from(table).update(payload).eq("id", editingId);
        setNotice(`${isResult ? "Result" : "Fixture"} updated.`);
      } else {
        await supabase!.from(table).insert(payload);
        await broadcastNotification({
          title: isResult ? "Match result posted" : "New fixture announced",
          body: isResult
            ? `${(payload as ResultRow).squad || "Ahenkan team"} ${((payload as ResultRow).score || "played")} ${(payload as ResultRow).opp || "a match"}.`
            : `${(payload as FixtureRow).squad || "Ahenkan team"} vs ${(payload as FixtureRow).opp || "a new opponent"} is now on the fixture list.`,
          type: isResult ? "result" : "result",
          url: "/fixtures",
        });
        setNotice(`${isResult ? "Result" : "Fixture"} added.`);
      }
      setOpen(false);
      setEditingId(null);
      await load();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to save your changes.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(row: FixtureRow | ResultRow) {
    if (!row.id || !window.confirm(`Delete this ${isResult ? "result" : "fixture"}?`)) return;
    await supabase!.from(table).delete().eq("id", row.id);
    await load();
  }

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value } as FixtureRow | ResultRow));
  }

  return (
    <div className="cms-content">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-1 text-slate-600">
            {isResult ? "Record match outcomes and keep supporters updated." : "Schedule your next academy matches."}
          </p>
        </div>
        <button onClick={open ? () => setOpen(false) : startNew} className="cms-primary">
          {open ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {open ? "Close" : `New ${isResult ? "result" : "fixture"}`}
        </button>
      </div>

      {open && (
        <form onSubmit={save} className="cms-card mt-6 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-purple-700">Match centre</p>
              <h3 className="mt-1 text-lg font-bold">{editingId ? `Edit ${isResult ? "result" : "fixture"}` : `Add ${isResult ? "a result" : "a fixture"}`}</h3>
            </div>
            {isResult ? <Trophy className="h-7 w-7 text-purple-600" /> : <CalendarDays className="h-7 w-7 text-purple-600" />}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="cms-label">
              Squad
              <select className="cms-input mt-1" value={form.squad} onChange={(event) => update("squad", event.target.value)}>
                {MATCH_SQUADS.map((squad) => (
                  <option key={squad} value={squad}>{squad}</option>
                ))}
              </select>
            </label>
            <label className="cms-label">
              Opponent
              <input required className="cms-input mt-1" value={form.opp} onChange={(event) => update("opp", event.target.value)} placeholder="e.g. Kibi Stars" />
            </label>
            {isResult && (
              <label className="cms-label">
                Score
                <input required className="cms-input mt-1" value={(form as ResultRow).score} onChange={(event) => update("score", event.target.value)} placeholder="e.g. 3 – 1" />
              </label>
            )}
            {isResult && (
              <label className="cms-label">
                Outcome
                <select className="cms-input mt-1" value={(form as ResultRow).res} onChange={(event) => update("res", event.target.value as ResultRow["res"])}>
                  <option value="W">Win</option><option value="D">Draw</option><option value="L">Loss</option>
                </select>
              </label>
            )}
            <label className="cms-label">
              Competition
              <input className="cms-input mt-1" value={form.comp} onChange={(event) => update("comp", event.target.value)} />
            </label>
            <label className="cms-label">
              Venue
              <input className="cms-input mt-1" value={form.venue} onChange={(event) => update("venue", event.target.value)} />
            </label>
            <label className="cms-label">
              {isResult ? "Match date" : "Kick-off"}
              <input required type="datetime-local" className="cms-input mt-1" value={form.date} onChange={(event) => update("date", event.target.value)} />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="cms-primary" disabled={busy}><Save className="h-4 w-4" />{busy ? "Saving…" : editingId ? "Save changes" : `Add ${isResult ? "result" : "fixture"}`}</button>
            <button type="button" onClick={() => setOpen(false)} className="cms-secondary">Cancel</button>
            {notice && <span className="text-sm font-medium text-purple-700">{notice}</span>}
          </div>
        </form>
      )}

      <section className="cms-card mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="font-bold">{isResult ? "Recent match reports" : "Upcoming matches"}</h3>
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">{rows.length} total</span>
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((row) => {
            const result = row as ResultRow;
            return (
              <article key={row.id} className="flex flex-wrap items-center gap-4 p-4 transition hover:bg-slate-50">
                <span className={`grid h-11 w-11 place-items-center rounded-xl font-bold ${isResult ? result.res === "W" ? "bg-emerald-100 text-emerald-700" : result.res === "L" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"}`}>
                  {isResult ? result.res : <CalendarDays className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">Ahenkan {row.squad} {isResult && <span className="text-purple-700">{result.score}</span>} {isResult ? row.opp : `vs ${row.opp}`}</p>
                  <p className="mt-1 truncate text-sm text-slate-500">{row.comp || "Academy match"} · {row.venue || "Venue to be confirmed"}</p>
                </div>
                <p className="text-sm font-medium text-slate-600">{readableDate(row.date)}</p>
                <button onClick={() => startEdit(row)} className="cms-secondary"><Pencil className="h-4 w-4" /> Edit</button>
                <button onClick={() => remove(row)} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </article>
            );
          })}
          {!rows.length && <div className="p-12 text-center text-slate-500">No {isResult ? "results" : "fixtures"} yet. Add the first one above.</div>}
        </div>
      </section>
    </div>
  );
}
