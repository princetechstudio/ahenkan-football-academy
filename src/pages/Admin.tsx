import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  isSupabaseConfigured,
  removeFromStorage,
  supabase,
  uploadToStorage,
  youtubeEmbed,
} from "../supabase";
import { PageHead, Reveal } from "../lib";
import {
  ArrowIcon,
  CheckIcon,
  FilmIcon,
  ImageIcon,
  NewsIcon,
  TargetIcon,
  TrophyIcon,
} from "../components/Icons";

/* ---------------- shared bits ---------------- */
const inputCls =
  "w-full border-2 border-pitch-900/20 bg-bone-50 px-4 py-2.5 text-pitch-900 placeholder:text-pitch-900/35 outline-none transition-colors focus:border-gold-600";
const labelCls = "mb-1 block font-cond text-xs font-bold uppercase tracking-[0.2em] text-pitch-800";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

function FilePicker({
  accept,
  file,
  onFile,
  hint,
}: {
  accept: string;
  file: File | null;
  onFile: (f: File | null) => void;
  hint: string;
}) {
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <span className={labelCls}>{hint}</span>
      <label className="flex cursor-pointer items-center justify-between gap-4 border-2 border-dashed border-pitch-900/25 bg-bone-100 px-4 py-4 transition-colors hover:border-gold-600">
        <span className="truncate font-cond text-sm font-semibold uppercase tracking-[0.12em] text-pitch-800">
          {file ? file.name : "Choose from your computer…"}
        </span>
        <span className="shrink-0 bg-pitch-700 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.14em] text-bone-50">
          Browse
        </span>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>
      {preview && accept.startsWith("image") && (
        <img src={preview} alt="Preview" className="mt-3 max-h-44 border-2 border-pitch-900/15 object-cover" />
      )}
      {preview && accept.startsWith("video") && (
        <video src={preview} controls className="mt-3 max-h-44 border-2 border-pitch-900/15" />
      )}
    </div>
  );
}

function fmtDbDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

/* ---------------- Blogs ---------------- */
type BlogRow = {
  id?: string;
  title: string;
  cat: string;
  date: string;
  excerpt: string;
  full: string;
  img: string;
  featured: boolean;
};
const EMPTY_BLOG: BlogRow = {
  title: "",
  cat: "Academy",
  date: "",
  excerpt: "",
  full: "",
  img: "",
  featured: false,
};

function BlogsPanel() {
  const [rows, setRows] = useState<BlogRow[]>([]);
  const [form, setForm] = useState<BlogRow>(EMPTY_BLOG);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase!.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setRows(data as BlogRow[]);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      let img = form.img;
      if (imgFile) img = await uploadToStorage(imgFile, "images");
      const payload = { ...form, img };
      delete (payload as Partial<BlogRow>).id;
      if (editingId) {
        await supabase!.from("blogs").update(payload).eq("id", editingId);
        setMsg("Article updated.");
      } else {
        await supabase!.from("blogs").insert(payload);
        setMsg("Article published to the website.");
      }
      setOpen(false);
      setForm(EMPTY_BLOG);
      setEditingId(null);
      setImgFile(null);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this article from the website?")) return;
    await supabase!.from("blogs").delete().eq("id", id);
    setMsg("Article deleted.");
    load();
  }

  return (
    <div>
      <PanelHeader
        title="Blogs & Announcements"
        count={rows.length}
        action={
          <button
            onClick={() => {
              setOpen(!open);
              setForm(EMPTY_BLOG);
              setEditingId(null);
              setImgFile(null);
            }}
            className="btn-gold px-5! py-2.5! text-sm"
          >
            {open ? "Close editor" : "+ New article"}
          </button>
        }
      />

      {open && (
        <form onSubmit={save} className="mt-6 border-2 border-gold-500/60 bg-bone-100 p-6">
          <h3 className="font-display text-xl uppercase">
            {editingId ? "Edit article" : "New article"}
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Title *">
                <input required className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Matchday Report: Ahenkan U-17 …" />
              </Field>
            </div>
            <Field label="Category">
              <input className={inputCls} value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} placeholder="Community" />
            </Field>
            <Field label="Date (as shown)">
              <input className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="19 Jan 2024" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Excerpt (short)">
                <textarea rows={2} className={`${inputCls} resize-none`} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Full story">
                <textarea rows={5} className={`${inputCls} resize-y`} value={form.full} onChange={(e) => setForm({ ...form, full: e.target.value })} />
              </Field>
            </div>
            <FilePicker accept="image/*" file={imgFile} onFile={setImgFile} hint="Cover image — upload from computer" />
            <div>
              <Field label="…or paste an image URL">
                <input className={inputCls} value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="https://…" />
              </Field>
              <label className="mt-4 flex cursor-pointer items-center gap-3 font-cond text-sm font-bold uppercase tracking-[0.14em] text-pitch-800">
                <input type="checkbox" className="h-5 w-5 accent-[#f2b70a]" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Mark as featured
              </label>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <button type="submit" disabled={busy} className="btn-gold px-6! py-3! text-sm disabled:opacity-60">
              {busy ? "Saving…" : editingId ? "Save changes" : "Publish article"}
            </button>
            {msg && <p className="flex items-center gap-2 text-sm font-semibold text-pitch-600"><CheckIcon className="h-4 w-4" /> {msg}</p>}
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <article key={r.id} className="flex flex-wrap items-center gap-4 border-2 border-pitch-900/12 bg-bone-50 p-4 transition-colors hover:border-gold-600/60">
            {r.img ? (
              <img src={r.img} alt="" className="h-16 w-24 border border-pitch-900/15 object-cover" />
            ) : (
              <span className="flex h-16 w-24 items-center justify-center bg-pitch-900 text-gold-500"><NewsIcon className="h-6 w-6" /></span>
            )}
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2">
                <span className="truncate font-display text-lg uppercase">{r.title}</span>
                {r.featured && <span className="bg-gold-500 px-2 py-0.5 font-cond text-[10px] font-bold uppercase tracking-[0.14em] text-pitch-950">Featured</span>}
              </p>
              <p className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-pitch-900/50">{r.cat} · {r.date}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setForm(r);
                  setEditingId(r.id ?? null);
                  setImgFile(null);
                  setOpen(true);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
                className="border-2 border-pitch-700 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.14em] text-pitch-700 transition-colors hover:bg-pitch-700 hover:text-bone-50"
              >
                Edit
              </button>
              <button
                onClick={() => remove(r.id!)}
                className="border-2 border-clay-500 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.14em] text-clay-500 transition-colors hover:bg-clay-500 hover:text-bone-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
        {rows.length === 0 && <Empty note="No articles yet — publish your first one." />}
      </div>
    </div>
  );
}

/* ---------------- Fixtures & Results ---------------- */
type FixRow = { id?: string; squad: string; comp: string; opp: string; venue: string; date: string };
const EMPTY_FIX: FixRow = { squad: "U-17", comp: "UWA Regional Youth League", opp: "", venue: "Ahenkan Grounds, Adeiso", date: "" };

function FixturesPanel() {
  const [rows, setRows] = useState<FixRow[]>([]);
  const [form, setForm] = useState<FixRow>(EMPTY_FIX);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase!.from("fixtures").select("*").order("date", { ascending: true });
    if (data) setRows(data as FixRow[]);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await supabase!.from("fixtures").insert({ ...form, date: new Date(form.date).toISOString() });
      setMsg("Fixture added to the website.");
      setForm(EMPTY_FIX);
      setOpen(false);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this fixture?")) return;
    await supabase!.from("fixtures").delete().eq("id", id);
    setMsg("Fixture deleted.");
    load();
  }

  return (
    <div>
      <PanelHeader
        title="Upcoming Fixtures"
        count={rows.length}
        action={
          <button onClick={() => setOpen(!open)} className="btn-gold px-5! py-2.5! text-sm">
            {open ? "Close" : "+ New fixture"}
          </button>
        }
      />
      {open && (
        <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 border-2 border-gold-500/60 bg-bone-100 p-6 sm:grid-cols-2">
          <Field label="Squad *">
            <select className={inputCls} value={form.squad} onChange={(e) => setForm({ ...form, squad: e.target.value })}>
              <option>U-15</option>
              <option>U-17</option>
            </select>
          </Field>
          <Field label="Competition">
            <input className={inputCls} value={form.comp} onChange={(e) => setForm({ ...form, comp: e.target.value })} />
          </Field>
          <Field label="Opponent *">
            <input required className={inputCls} value={form.opp} onChange={(e) => setForm({ ...form, opp: e.target.value })} placeholder="e.g. Kibi Stars" />
          </Field>
          <Field label="Venue">
            <input className={inputCls} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          </Field>
          <Field label="Kick-off date & time *">
            <input required type="datetime-local" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <div className="flex items-end gap-4">
            <button type="submit" disabled={busy} className="btn-gold px-6! py-2.5! text-sm disabled:opacity-60">{busy ? "Saving…" : "Add fixture"}</button>
            {msg && <p className="text-sm font-semibold text-pitch-600">{msg}</p>}
          </div>
        </form>
      )}
      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <article key={r.id} className="flex flex-wrap items-center gap-4 border-2 border-pitch-900/12 bg-bone-50 p-4">
            <span className="bg-pitch-700 px-2.5 py-1 font-cond text-xs font-bold uppercase tracking-[0.14em] text-bone-50">{r.squad}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg uppercase">Ahenkan FA vs {r.opp}</p>
              <p className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-pitch-900/50">{r.comp} · {r.venue}</p>
            </div>
            <p className="tabular font-cond text-sm font-bold text-pitch-600">{fmtDbDate(r.date)}</p>
            <button onClick={() => remove(r.id!)} className="border-2 border-clay-500 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.14em] text-clay-500 transition-colors hover:bg-clay-500 hover:text-bone-50">
              Delete
            </button>
          </article>
        ))}
        {rows.length === 0 && <Empty note="No fixtures yet — the public page shows built-in fixtures until you add live ones." />}
      </div>
    </div>
  );
}

type ResRow = { id?: string; squad: string; comp: string; opp: string; venue: string; score: string; res: "W" | "D" | "L"; date: string };
const EMPTY_RES: ResRow = { squad: "U-17", comp: "UWA Regional Youth League", opp: "", venue: "Ahenkan Grounds, Adeiso", score: "", res: "W", date: "" };

function ResultsPanel() {
  const [rows, setRows] = useState<ResRow[]>([]);
  const [form, setForm] = useState<ResRow>(EMPTY_RES);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase!.from("results").select("*").order("date", { ascending: false });
    if (data) setRows(data as ResRow[]);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await supabase!.from("results").insert({ ...form, date: new Date(form.date).toISOString() });
      setMsg("Result posted.");
      setForm(EMPTY_RES);
      setOpen(false);
      load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this result?")) return;
    await supabase!.from("results").delete().eq("id", id);
    setMsg("Result deleted.");
    load();
  }

  return (
    <div>
      <PanelHeader
        title="Recent Results"
        count={rows.length}
        action={
          <button onClick={() => setOpen(!open)} className="btn-gold px-5! py-2.5! text-sm">
            {open ? "Close" : "+ New result"}
          </button>
        }
      />
      {open && (
        <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 border-2 border-gold-500/60 bg-bone-100 p-6 sm:grid-cols-3">
          <Field label="Squad *">
            <select className={inputCls} value={form.squad} onChange={(e) => setForm({ ...form, squad: e.target.value })}>
              <option>U-15</option>
              <option>U-17</option>
            </select>
          </Field>
          <Field label="Opponent *">
            <input required className={inputCls} value={form.opp} onChange={(e) => setForm({ ...form, opp: e.target.value })} />
          </Field>
          <Field label="Score *">
            <input required className={inputCls} value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} placeholder="3 – 1" />
          </Field>
          <Field label="Outcome *">
            <select className={inputCls} value={form.res} onChange={(e) => setForm({ ...form, res: e.target.value as ResRow["res"] })}>
              <option value="W">Win</option>
              <option value="D">Draw</option>
              <option value="L">Loss</option>
            </select>
          </Field>
          <Field label="Match date *">
            <input required type="datetime-local" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field label="Competition">
            <input className={inputCls} value={form.comp} onChange={(e) => setForm({ ...form, comp: e.target.value })} />
          </Field>
          <div className="flex items-end gap-4 sm:col-span-3">
            <button type="submit" disabled={busy} className="btn-gold px-6! py-2.5! text-sm disabled:opacity-60">{busy ? "Saving…" : "Post result"}</button>
            {msg && <p className="text-sm font-semibold text-pitch-600">{msg}</p>}
          </div>
        </form>
      )}
      <div className="mt-6 space-y-3">
        {rows.map((r) => (
          <article key={r.id} className="flex flex-wrap items-center gap-4 border-2 border-pitch-900/12 bg-bone-50 p-4">
            <span className={`flex h-10 w-10 items-center justify-center font-display text-lg ${r.res === "W" ? "bg-gold-500 text-pitch-950" : r.res === "D" ? "bg-pitch-300 text-pitch-950" : "bg-clay-500 text-bone-50"}`}>{r.res}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg uppercase">Ahenkan {r.squad} <span className="text-pitch-600">{r.score}</span> {r.opp}</p>
              <p className="font-cond text-xs font-semibold uppercase tracking-[0.16em] text-pitch-900/50">{r.comp} · {r.venue}</p>
            </div>
            <p className="tabular font-cond text-sm font-bold text-pitch-600">{fmtDbDate(r.date)}</p>
            <button onClick={() => remove(r.id!)} className="border-2 border-clay-500 px-4 py-2 font-cond text-xs font-bold uppercase tracking-[0.14em] text-clay-500 transition-colors hover:bg-clay-500 hover:text-bone-50">
              Delete
            </button>
          </article>
        ))}
        {rows.length === 0 && <Empty note="No results yet — add your first matchday report." />}
      </div>
    </div>
  );
}

/* ---------------- Media (images & videos) ---------------- */
type MediaRow = { id?: string; kind: "image" | "video"; title: string; caption: string; url: string };

function MediaPanel({ kind }: { kind: "image" | "video" }) {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [ytUrl, setYtUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase!.from("media").select("*").eq("kind", kind).order("created_at", { ascending: false });
    if (data) setRows(data as MediaRow[]);
  }, [kind]);
  useEffect(() => {
    load();
  }, [load]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");
    try {
      let url = "";
      if (file) {
        url = await uploadToStorage(file, kind === "image" ? "images" : "videos");
      } else if (kind === "video" && ytUrl.trim()) {
        url = ytUrl.trim();
      } else {
        throw new Error(kind === "image" ? "Choose an image file to upload." : "Upload a video file or paste a YouTube link.");
      }
      await supabase!.from("media").insert({ kind, title: title || "Untitled", caption, url });
      setMsg(kind === "image" ? "Photo uploaded to the gallery." : "Video published to the website.");
      setTitle("");
      setCaption("");
      setYtUrl("");
      setFile(null);
      load();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(row: MediaRow) {
    if (!window.confirm("Delete this item? The file will also be removed from storage.")) return;
    await removeFromStorage(row.url);
    await supabase!.from("media").delete().eq("id", row.id!);
    setMsg("Deleted.");
    load();
  }

  return (
    <div>
      <PanelHeader
        title={kind === "image" ? "Photo Gallery Uploads" : "Training Videos"}
        count={rows.length}
        action={null}
      />

      <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 border-2 border-gold-500/60 bg-bone-100 p-6 sm:grid-cols-2">
        <Field label="Title *">
          <input required className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === "image" ? "e.g. Golden hour ball-mastery" : "e.g. Morning rondo — full session"} />
        </Field>
        <Field label="Caption">
          <input className={inputCls} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Optional one-line description" />
        </Field>
        <div className="sm:col-span-2">
          <FilePicker
            accept={kind === "image" ? "image/*" : "video/*"}
            file={file}
            onFile={(f) => {
              setFile(f);
              setErr("");
            }}
            hint={kind === "image" ? "Image — upload from your computer (JPG, PNG, WEBP)" : "Video — upload from your computer (MP4, MOV, WEBM)"}
          />
        </div>
        {kind === "video" && (
          <div className="sm:col-span-2">
            <Field label="…or paste a YouTube link instead">
              <input className={inputCls} value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} placeholder="https://youtube.com/watch?v=…" />
            </Field>
          </div>
        )}
        <div className="flex items-center gap-4 sm:col-span-2">
          <button type="submit" disabled={busy} className="btn-gold px-6! py-3! text-sm disabled:opacity-60">
            {busy ? "Uploading…" : kind === "image" ? "Upload photo" : "Publish video"}
          </button>
          {msg && <p className="flex items-center gap-2 text-sm font-semibold text-pitch-600"><CheckIcon className="h-4 w-4" /> {msg}</p>}
          {err && <p className="text-sm font-semibold text-clay-500">{err}</p>}
        </div>
      </form>

      <div className={`mt-6 grid grid-cols-1 gap-4 ${kind === "image" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
        {rows.map((r) => (
          <article key={r.id} className="group overflow-hidden border-2 border-pitch-900/12 bg-bone-50">
            {kind === "image" ? (
              <img src={r.url} alt={r.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            ) : youtubeEmbed(r.url) ? (
              <iframe src={youtubeEmbed(r.url)!} title={r.title} className="aspect-video w-full" allowFullScreen />
            ) : (
              <video src={r.url} controls preload="metadata" className="aspect-video w-full" />
            )}
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-display text-base uppercase">{r.title}</p>
                <p className="truncate font-cond text-xs font-semibold uppercase tracking-[0.14em] text-pitch-900/50">{r.caption || r.url.split("/").pop()}</p>
              </div>
              <button onClick={() => remove(r)} className="shrink-0 border-2 border-clay-500 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-[0.12em] text-clay-500 transition-colors hover:bg-clay-500 hover:text-bone-50">
                Delete
              </button>
            </div>
          </article>
        ))}
        {rows.length === 0 && <Empty note={kind === "image" ? "No photos yet — upload the first one from your computer." : "No videos yet — upload an MP4 or paste a YouTube link."} />}
      </div>
    </div>
  );
}

/* ---------------- scaffolding ---------------- */
function PanelHeader({ title, count, action }: { title: string; count: number; action: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h2 className="flex items-center gap-3 font-display text-2xl uppercase tracking-wide text-pitch-900">
        {title}
        <span className="bg-pitch-700 px-2.5 py-0.5 font-cond text-sm text-bone-50">{count}</span>
      </h2>
      {action}
    </div>
  );
}

function Empty({ note }: { note: string }) {
  return (
    <p className="border-2 border-dashed border-pitch-900/20 bg-bone-100 p-8 text-center font-cond text-base font-semibold uppercase tracking-[0.14em] text-pitch-900/50">
      {note}
    </p>
  );
}

type Tab = "blogs" | "fixtures" | "results" | "images" | "videos";
const TABS: { id: Tab; label: string; Icon: (p: { className?: string }) => JSX.Element }[] = [
  { id: "blogs", label: "Blogs", Icon: NewsIcon },
  { id: "fixtures", label: "Fixtures", Icon: TargetIcon },
  { id: "results", label: "Results", Icon: TrophyIcon },
  { id: "images", label: "Images", Icon: ImageIcon },
  { id: "videos", label: "Videos", Icon: FilmIcon },
];

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: err } = await supabase!.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    onSuccess();
  }

  return (
    <div className="mx-auto mt-14 max-w-lg">
      <Reveal>
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold-500/60" aria-hidden="true" />
          <form onSubmit={submit} className="relative bg-bone-50 p-8 text-pitch-900 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <p className="font-cond text-sm font-bold uppercase tracking-[0.22em] text-gold-700">Restricted area</p>
            <h2 className="mt-2 font-display text-3xl uppercase">Admin Sign In</h2>
            <p className="mt-2 text-sm text-pitch-900/65">
              Sign in with the admin account created in Supabase Authentication to manage the website
              and upload media from your computer.
            </p>
            <div className="mt-6 space-y-4">
              <Field label="Email">
                <input required type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ahenkanacademy.com" />
              </Field>
              <Field label="Password">
                <input required type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </Field>
            </div>
            {error && <p className="mt-3 text-sm font-semibold text-clay-500">{error}</p>}
            <button type="submit" disabled={busy} className="btn-gold mt-6 w-full disabled:opacity-60">
              {busy ? "Signing in…" : "Sign in to the CMS"}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}

function SetupGuide() {
  return (
    <div className="mx-auto mt-14 max-w-3xl">
      <Reveal>
        <div className="border-2 border-gold-500/60 bg-bone-50 p-8 text-pitch-900 sm:p-10">
          <p className="font-cond text-sm font-bold uppercase tracking-[0.22em] text-clay-500">Almost there</p>
          <h2 className="mt-2 font-display text-3xl uppercase">Connect your Supabase project</h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 leading-relaxed text-pitch-900/80">
            <li>
              <strong>Run the schema.</strong> Open your Supabase dashboard{" "}
              <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">fhukpyegqthatoixvqgl</code>{" "}
              → SQL Editor, paste the contents of <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">supabase/schema.sql</code> and run it. This creates the tables,
              the public <em>media</em> storage bucket and the security rules.
            </li>
            <li>
              <strong>Add your API keys.</strong> Dashboard → Settings → API. Copy the project URL and
              the <em>anon public</em> key into a <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">.env</code> file (see{" "}
              <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">.env.example</code>), then rebuild.
            </li>
            <li>
              <strong>Create the admin login.</strong> Dashboard → Authentication → Users → Add user.
              Use those credentials on this page to sign in, publish content and upload videos and
              images straight from your computer.
            </li>
          </ol>
          <p className="mt-6 border-l-4 border-gold-500 bg-bone-100 px-4 py-3 text-sm text-pitch-900/70">
            Until the keys are added, the public website keeps serving the built-in content — nothing
            breaks for visitors.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const [tab, setTab] = useState<Tab>("blogs");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <PageHead
        crumb="Admin"
        kicker="Ahenkan CMS · Powered by Supabase"
        title="Content Dashboard"
        sub="Publish blogs, fixtures and results — and upload videos and images straight from your computer."
      />

      <section className="relative bg-bone-100 py-20 text-pitch-900 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {!isSupabaseConfigured && <SetupGuide />}

          {isSupabaseConfigured && !ready && (
            <p className="mt-14 text-center font-cond text-lg font-bold uppercase tracking-[0.2em] text-pitch-900/50">
              Loading CMS…
            </p>
          )}

          {isSupabaseConfigured && ready && !session && (
            <Login onSuccess={() => setTab("blogs")} />
          )}

          {isSupabaseConfigured && session && (
            <>
              <Reveal>
                <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-pitch-900/15 bg-pitch-900 px-6 py-4 text-bone-50">
                  <p className="font-cond text-base font-semibold uppercase tracking-[0.16em]">
                    Signed in as <span className="text-gold-400">{session.user?.email}</span>
                  </p>
                  <button
                    onClick={() => supabase!.auth.signOut()}
                    className="border-2 border-gold-500 px-5 py-2 font-cond text-sm font-bold uppercase tracking-[0.14em] text-gold-400 transition-colors hover:bg-gold-500 hover:text-pitch-950"
                  >
                    Sign out
                  </button>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {TABS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setTab(id)}
                      className={`flex items-center gap-2.5 border-2 px-5 py-3 font-cond text-base font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                        tab === id
                          ? "border-gold-500 bg-gold-500 text-pitch-950"
                          : "border-pitch-900/15 bg-bone-50 text-pitch-900/70 hover:border-gold-600 hover:text-pitch-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </button>
                  ))}
                </div>
              </Reveal>

              <div className="mt-8">
                {tab === "blogs" && <BlogsPanel />}
                {tab === "fixtures" && <FixturesPanel />}
                {tab === "results" && <ResultsPanel />}
                {tab === "images" && <MediaPanel kind="image" />}
                {tab === "videos" && <MediaPanel kind="video" />}
              </div>

              <p className="mt-12 flex flex-wrap items-center gap-3 font-cond text-sm font-semibold uppercase tracking-[0.16em] text-pitch-900/50">
                <ArrowIcon className="h-4 w-4 text-gold-600" />
                Changes go live instantly on the public site · files are stored in the Supabase “media” bucket
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
