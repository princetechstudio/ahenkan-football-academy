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
import { RichTextEditor } from "../components/RichTextEditor";
import { sendWebsiteNotification } from "../lib/notifications";
import {
  ArrowIcon,
  CheckIcon,
  FilmIcon,
  ImageIcon,
  MailIcon,
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
        <img src={preview} alt="Preview" className="mt-3 max-h-44 border-2 border-pitch-900/15 object-contain" />
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
  content: string;
  img: string;
  video: string;
  featured: boolean;
};
const EMPTY_BLOG: BlogRow = {
  title: "",
  cat: "",
  date: "",
  excerpt: "",
  content: "",
  img: "",
  video: "",
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
  const [videoFile, setVideoFile] = useState<File | null>(null);

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
      let video = form.video;
      if (imgFile) img = await uploadToStorage(imgFile, "images");
      if (videoFile) video = await uploadToStorage(videoFile, "videos");
      
      // Build payload with only safe fields
      const payload: Record<string, any> = {
        title: form.title,
        cat: form.cat || "Academy",
        date: form.date || "",
        excerpt: form.excerpt || "",
        content: form.content || "",
        img: img || "",
        featured: form.featured,
      };
      
      // Only include video if it's actually set
      if (video) {
        payload.video = video;
      }
      
      console.log("Publishing with payload:", payload);
      if (editingId) {
        const { error } = await supabase!.from("blogs").update(payload).eq("id", editingId);
        if (error) throw new Error(`Update failed: ${error.message}`);
        setMsg("Article updated.");
      } else {
        const { error } = await supabase!.from("blogs").insert(payload);
        if (error) throw new Error(`Insert failed: ${error.message}`);
        setMsg("Article published to the website.");
        
        // Send push notification to all subscribers
        await sendWebsiteNotification({
          title: payload.title,
          body: payload.excerpt || "New article published!",
          icon: payload.img || "/icon-192x192.png",
          type: "blog",
          url: "/#/blogs",
        }).catch((err) => {
          console.warn("Failed to send notification:", err);
          // Don't fail the publish if notification fails
        });
      }
      await load();
      setOpen(false);
      setForm(EMPTY_BLOG);
      setEditingId(null);
      setImgFile(null);
      setVideoFile(null);
    } catch (err) {
      console.error("Save blog error:", err);
      const errorMsg = err instanceof Error ? err.message : "Could not save.";
      setMsg(errorMsg);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this article from the website?")) return;
    await supabase!.from("blogs").delete().eq("id", id);
    setMsg("Article deleted.");
    await load();
  }

  async function improveWithAI() {
    if (!form.content.trim()) {
      setMsg("Write some content first before using AI improvement.");
      return;
    }
    setBusy(true);
    setMsg("🤖 AI is enhancing your content...");
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
      const session = await supabase!.auth.getSession();
      const accessToken = session?.data?.session?.access_token;

      if (!accessToken) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/improve-with-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          content: form.content,
        }),
      });

      if (!response.ok) {
        let errorMsg = `Service error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // If response is not JSON, use default message
        }
        console.error("AI service error:", errorMsg);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      if (data.improved) {
        setForm({ ...form, content: data.improved });
        setMsg("✓ Content enhanced successfully! Review and save when ready.");
        setTimeout(() => setMsg(""), 5000);
      } else {
        throw new Error(data.error || "Unexpected response from AI service");
      }
    } catch (err) {
      console.error("AI improvement error:", err);
      const errorMsg = err instanceof Error ? err.message : "Could not enhance content";
      setMsg(`✗ Error: ${errorMsg}`);
    } finally {
      setBusy(false);
    }
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
              setVideoFile(null);
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
                <input required className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="" />
              </Field>
            </div>
            <Field label="Category">
              <input className={inputCls} value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} placeholder="" />
            </Field>
            <Field label="Date">
              <input 
                type="date" 
                className={inputCls} 
                value={form.date} 
                onChange={(e) => setForm({ ...form, date: e.target.value })} 
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Excerpt (short)">
                <textarea rows={2} className={`${inputCls} resize-none`} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Full story - Rich Text Editor">
                <RichTextEditor
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                  placeholder="Write your article content here..."
                  minHeight="350px"
                  onImproveAI={improveWithAI}
                  aiLoading={busy}
                  aiMessage={msg}
                />
              </Field>
            </div>
            <FilePicker accept="image/*" file={imgFile} onFile={setImgFile} hint="Cover image — upload from computer" />
            <div>
              <Field label="…or paste an image URL">
                <input className={inputCls} value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="" />
              </Field>
              <label className="mt-4 flex cursor-pointer items-center gap-3 font-cond text-sm font-bold uppercase tracking-[0.14em] text-pitch-800">
                <input type="checkbox" className="h-5 w-5 accent-[#f2b70a]" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Mark as featured
              </label>
            </div>
            <FilePicker accept="video/*" file={videoFile} onFile={setVideoFile} hint="Article video — upload from computer" />
            <div>
              <Field label="…or paste a video URL">
                <input className={inputCls} value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })} placeholder="" />
              </Field>
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
const EMPTY_FIX: FixRow = { squad: "", comp: "", opp: "", venue: "", date: "" };

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
      await sendWebsiteNotification({
        title: "New fixture announced",
        body: `${form.squad} vs ${form.opp}${form.comp ? ` · ${form.comp}` : ""}`,
        type: "fixture",
        url: "/#/fixtures",
      }).catch((err) => console.warn("Failed to send fixture notification:", err));
      await load();
      setForm(EMPTY_FIX);
      setOpen(false);
    } catch (err) {
      console.error("Save fixture error:", err);
      setMsg(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this fixture?")) return;
    await supabase!.from("fixtures").delete().eq("id", id);
    setMsg("Fixture deleted.");
    await load();
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
            <input required className={inputCls} value={form.opp} onChange={(e) => setForm({ ...form, opp: e.target.value })} placeholder="" />
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
              <p className="font-display text-lg uppercase">Ahenkan Football Academy vs {r.opp}</p>
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
const EMPTY_RES: ResRow = { squad: "", comp: "", opp: "", venue: "", score: "", res: "W", date: "" };

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
      await sendWebsiteNotification({
        title: "Match result published",
        body: `${form.squad} ${form.score} ${form.opp}${form.comp ? ` · ${form.comp}` : ""}`,
        type: "result",
        url: "/#/fixtures",
      }).catch((err) => console.warn("Failed to send result notification:", err));
      await load();
      setForm(EMPTY_RES);
      setOpen(false);
    } catch (err) {
      console.error("Save result error:", err);
      setMsg(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this result?")) return;
    await supabase!.from("results").delete().eq("id", id);
    setMsg("Result deleted.");
    await load();
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
            <input required className={inputCls} value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} placeholder="" />
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
      await sendWebsiteNotification({
        title: kind === "image" ? "New photo gallery update" : "New video published",
        body: (title || "Untitled") + (caption ? ` — ${caption}` : ""),
        type: kind === "image" ? "media" : "video",
        url: "/#/media",
      }).catch((err) => console.warn("Failed to send media notification:", err));
      await load();
      setTitle("");
      setCaption("");
      setYtUrl("");
      setFile(null);
    } catch (error) {
      console.error("Save media error:", error);
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
    await load();
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
              <input className={inputCls} value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} placeholder="" />
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

/* ---------------- Applications ---------------- */
type ApplicationRow = {
  id: string;
  player: string;
  age: string;
  guardian: string;
  phone: string;
  email: string;
  program: string;
  notes: string;
  status: "new" | "contacted" | "accepted" | "closed";
  created_at: string;
};

function ApplicationsPanel() {
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [busy, setBusy] = useState(true);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setBusy(true);
    if (supabase) {
      const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
      if (error) setMsg(`Could not load applications: ${error.message}`);
      else setRows((data || []) as ApplicationRow[]);
    } else {
      const stored = JSON.parse(localStorage.getItem("ahenkan_applications") || "[]");
      setRows(stored as ApplicationRow[]);
    }
    setBusy(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(row: ApplicationRow, status: ApplicationRow["status"]) {
    setMsg("");
    if (supabase) {
      const { error } = await supabase.from("applications").update({ status }).eq("id", row.id);
      if (error) {
        setMsg(`Could not update application: ${error.message}`);
        return;
      }
    } else {
      const updated = rows.map((item) => item.id === row.id ? { ...item, status } : item);
      localStorage.setItem("ahenkan_applications", JSON.stringify(updated));
    }
    setRows((current) => current.map((item) => item.id === row.id ? { ...item, status } : item));
  }

  return (
    <div>
      <PanelHeader title="Applications" count={rows.length} action={<button onClick={load} className="btn-ghost-dark px-4! py-2! text-sm">Refresh</button>} />
      {msg && <p className="mt-4 border-2 border-clay-500/40 bg-clay-400/10 p-3 text-sm font-semibold text-clay-500">{msg}</p>}
      {busy ? (
        <p className="mt-6 border-2 border-dashed border-pitch-900/20 p-8 text-center font-cond font-bold uppercase tracking-[0.14em] text-pitch-900/50">Loading applications…</p>
      ) : rows.length === 0 ? (
        <Empty note="No applications yet. New submissions will appear here." />
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((row) => (
            <article key={row.id} className="border-2 border-pitch-900/12 bg-bone-50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl uppercase">{row.player}</p>
                  <p className="mt-1 font-cond text-sm font-bold uppercase tracking-[0.14em] text-pitch-600">Age {row.age} · {row.program || "Academy application"}</p>
                </div>
                <select
                  value={row.status}
                  onChange={(event) => updateStatus(row, event.target.value as ApplicationRow["status"])}
                  className="border-2 border-pitch-900/20 bg-bone-100 px-3 py-2 font-cond text-sm font-bold uppercase tracking-[0.12em] text-pitch-900"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="accepted">Accepted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="mt-4 grid gap-3 border-t border-pitch-900/10 pt-4 text-sm sm:grid-cols-2">
                <p><strong>Guardian:</strong> {row.guardian}</p>
                <p><strong>Submitted:</strong> {fmtDbDate(row.created_at)}</p>
                <p><strong>Phone:</strong> <a className="text-pitch-600 underline" href={`tel:${row.phone}`}>{row.phone}</a></p>
                {row.email && <p><strong>Email:</strong> <a className="text-pitch-600 underline" href={`mailto:${row.email}`}>{row.email}</a></p>}
              </div>
              {row.notes && <p className="mt-4 border-l-2 border-gold-500 pl-3 text-sm text-pitch-900/70"><strong>Notes:</strong> {row.notes}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Players ---------------- */
type PlayerRow = {
  id?: string;
  name: string;
  age: string;
  position: string;
  squad: string;
  bio: string;
  achievements: string;
  images: string[];
};

const EMPTY_PLAYER: PlayerRow = { name: "", age: "", position: "", squad: "", bio: "", achievements: "", images: [] };

function PlayersPanel() {
  const [rows, setRows] = useState<PlayerRow[]>([]);
  const [form, setForm] = useState<PlayerRow>(EMPTY_PLAYER);
  const [files, setFiles] = useState<File[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    if (supabase) {
      const { data } = await supabase.from("players").select("*").order("created_at", { ascending: false });
      if (data) setRows(data as PlayerRow[]);
    } else {
      setRows(JSON.parse(localStorage.getItem("ahenkan_players") || "[]"));
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function startNew() {
    setForm(EMPTY_PLAYER);
    setFiles([]);
    setEditingId(null);
    setMsg("");
    setOpen(true);
  }

  function startEdit(row: PlayerRow) {
    setForm(row);
    setFiles([]);
    setEditingId(row.id || null);
    setMsg("");
    setOpen(true);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!editingId && files.length < 3) {
      setMsg("Please choose at least three player photos.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const images = files.length ? await Promise.all(files.slice(0, 6).map((file) => uploadToStorage(file, "images"))) : form.images;
      const payload = { ...form, images, id: undefined };
      delete payload.id;
      if (supabase) {
        const result = editingId
          ? await supabase.from("players").update(payload).eq("id", editingId)
          : await supabase.from("players").insert(payload);
        if (result.error) throw new Error(result.error.message);
      } else {
        const item = { ...payload, id: editingId || crypto.randomUUID() } as PlayerRow;
        const next = editingId ? rows.map((row) => row.id === editingId ? item : row) : [item, ...rows];
        localStorage.setItem("ahenkan_players", JSON.stringify(next));
      }
      setMsg(editingId ? "Player profile updated." : "Player profile published.");
      await load();
      setOpen(false);
      setForm(EMPTY_PLAYER);
      setFiles([]);
      setEditingId(null);
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Could not save player.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(row: PlayerRow) {
    if (!row.id || !window.confirm(`Delete ${row.name}'s player profile?`)) return;
    if (supabase) {
      const { error } = await supabase.from("players").delete().eq("id", row.id);
      if (error) { setMsg(error.message); return; }
      await Promise.all(row.images.map(removeFromStorage));
    } else {
      localStorage.setItem("ahenkan_players", JSON.stringify(rows.filter((item) => item.id !== row.id)));
    }
    await load();
  }

  return (
    <div>
      <PanelHeader title="Players" count={rows.length} action={<button onClick={open ? () => setOpen(false) : startNew} className="btn-gold px-5! py-2.5! text-sm">{open ? "Close" : "+ New player"}</button>} />
      {open && (
        <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 border-2 border-gold-500/60 bg-bone-100 p-6 sm:grid-cols-2">
          <Field label="Player name *"><input required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Age *"><input required type="number" min="1" max="30" className={inputCls} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></Field>
          <Field label="Position"><input className={inputCls} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Forward, midfielder..." /></Field>
          <Field label="Squad"><input className={inputCls} value={form.squad} onChange={(e) => setForm({ ...form, squad: e.target.value })} placeholder="U-15" /></Field>
          <div className="sm:col-span-2"><Field label="Player biography"><textarea rows={4} className={`${inputCls} resize-none`} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></Field></div>
          <div className="sm:col-span-2"><Field label="Achievements and useful information"><textarea rows={4} className={`${inputCls} resize-none`} value={form.achievements} onChange={(e) => setForm({ ...form, achievements: e.target.value })} /></Field></div>
          <div className="sm:col-span-2">
            <Field label="Player photos * (choose at least 3)">
              <input required={!editingId} type="file" accept="image/*" multiple className="w-full border-2 border-dashed border-pitch-900/25 bg-bone-50 p-4 text-sm" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
            </Field>
            <p className="mt-2 font-cond text-xs font-bold uppercase tracking-[0.14em] text-pitch-900/50">{files.length ? `${files.length} new photo(s) selected` : `${form.images.length} saved photo(s)`}</p>
          </div>
          <div className="flex items-center gap-4 sm:col-span-2">
            <button type="submit" disabled={busy} className="btn-gold px-6! py-3! text-sm disabled:opacity-60">{busy ? "Saving…" : editingId ? "Save player" : "Publish player"}</button>
            {msg && <p className="text-sm font-semibold text-pitch-600">{msg}</p>}
          </div>
        </form>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <article key={row.id} className="border-2 border-pitch-900/12 bg-bone-50 p-4">
            {row.images[0] && <img src={row.images[0]} alt={row.name} className="h-48 w-full bg-pitch-900 object-contain" />}
            <h3 className="mt-4 font-display text-xl uppercase">{row.name}</h3>
            <p className="mt-1 font-cond text-xs font-bold uppercase tracking-[0.14em] text-pitch-600">Age {row.age} · {row.position || "Player"} · {row.images.length} photos</p>
            <div className="mt-4 flex gap-2"><button onClick={() => startEdit(row)} className="btn-ghost-dark flex-1 px-3! py-2! text-xs">Edit</button><button onClick={() => remove(row)} className="border-2 border-clay-500 px-3 py-2 font-cond text-xs font-bold uppercase text-clay-500">Delete</button></div>
          </article>
        ))}
        {!rows.length && <div className="sm:col-span-2 lg:col-span-3"><Empty note="No player profiles yet — add the first player above." /></div>}
      </div>
    </div>
  );
}

/* ---------------- Staff ---------------- */
type StaffRow = { id?: string; name: string; role: string; qualification: string; years: string; bio: string; tags: string[]; image: string };
const EMPTY_STAFF: StaffRow = { name: "", role: "", qualification: "", years: "", bio: "", tags: [], image: "" };

function StaffPanel() {
  const [rows, setRows] = useState<StaffRow[]>([]);
  const [form, setForm] = useState<StaffRow>(EMPTY_STAFF);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    if (supabase) {
      const { data } = await supabase.from("staff").select("*").order("created_at", { ascending: false });
      if (data) setRows(data as StaffRow[]);
    } else {
      setRows(JSON.parse(localStorage.getItem("ahenkan_staff") || "[]"));
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  function begin(row?: StaffRow) {
    setForm(row || EMPTY_STAFF);
    setFile(null);
    setEditingId(row?.id || null);
    setMsg("");
    setOpen(true);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!editingId && !file) { setMsg("Choose a staff profile photo."); return; }
    setBusy(true);
    setMsg("");
    try {
      const image = file ? await uploadToStorage(file, "images") : form.image;
      const payload = { ...form, image, id: undefined };
      delete payload.id;
      if (supabase) {
        const result = editingId ? await supabase.from("staff").update(payload).eq("id", editingId) : await supabase.from("staff").insert(payload);
        if (result.error) throw new Error(result.error.message);
      } else {
        const item = { ...payload, id: editingId || crypto.randomUUID() } as StaffRow;
        const next = editingId ? rows.map((row) => row.id === editingId ? item : row) : [item, ...rows];
        localStorage.setItem("ahenkan_staff", JSON.stringify(next));
      }
      setMsg(editingId ? "Staff profile updated." : "Staff profile published.");
      await load();
      setOpen(false);
      setForm(EMPTY_STAFF);
      setFile(null);
      setEditingId(null);
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Could not save staff profile.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(row: StaffRow) {
    if (!row.id || !window.confirm(`Delete ${row.name}'s staff profile?`)) return;
    if (supabase) {
      const { error } = await supabase.from("staff").delete().eq("id", row.id);
      if (error) { setMsg(error.message); return; }
      await removeFromStorage(row.image);
    } else {
      localStorage.setItem("ahenkan_staff", JSON.stringify(rows.filter((item) => item.id !== row.id)));
    }
    await load();
  }

  return (
    <div>
      <PanelHeader title="Staff" count={rows.length} action={<button onClick={() => open ? setOpen(false) : begin()} className="btn-gold px-5! py-2.5! text-sm">{open ? "Close" : "+ New staff"}</button>} />
      {open && <form onSubmit={save} className="mt-6 grid grid-cols-1 gap-4 border-2 border-gold-500/60 bg-bone-100 p-6 sm:grid-cols-2">
        <Field label="Full name *"><input required className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Role *"><input required className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Head Coach" /></Field>
        <Field label="Qualification"><input className={inputCls} value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} placeholder="CAF License A" /></Field>
        <Field label="Experience"><input className={inputCls} value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} placeholder="15+ years" /></Field>
        <div className="sm:col-span-2"><Field label="Biography"><textarea rows={4} className={`${inputCls} resize-none`} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></Field></div>
        <Field label="Specialties (comma separated)"><input className={inputCls} value={form.tags.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} placeholder="Technique, fitness, goalkeeping" /></Field>
        <Field label="Profile photo *"><input required={!editingId} type="file" accept="image/*" className="w-full border-2 border-dashed border-pitch-900/25 bg-bone-50 p-3 text-sm" onChange={(e) => setFile(e.target.files?.[0] || null)} /></Field>
        <div className="flex items-center gap-4 sm:col-span-2"><button type="submit" disabled={busy} className="btn-gold px-6! py-3! text-sm disabled:opacity-60">{busy ? "Saving…" : editingId ? "Save staff" : "Publish staff"}</button>{msg && <p className="text-sm font-semibold text-pitch-600">{msg}</p>}</div>
      </form>}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((row) => <article key={row.id} className="border-2 border-pitch-900/12 bg-bone-50 p-4">{row.image && <img src={row.image} alt={row.name} className="h-48 w-full bg-pitch-900 object-contain" />}<h3 className="mt-4 font-display text-xl uppercase">{row.name}</h3><p className="mt-1 font-cond text-xs font-bold uppercase tracking-[.14em] text-pitch-600">{row.role}</p><div className="mt-4 flex gap-2"><button onClick={() => begin(row)} className="btn-ghost-dark flex-1 px-3! py-2! text-xs">Edit</button><button onClick={() => remove(row)} className="border-2 border-clay-500 px-3 py-2 font-cond text-xs font-bold uppercase text-clay-500">Delete</button></div></article>)}{!rows.length && <div className="sm:col-span-2 lg:col-span-3"><Empty note="No staff profiles yet — add the first staff member above." /></div>}</div>
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

type Tab = "applications" | "blogs" | "fixtures" | "results" | "images" | "videos" | "players" | "staff" | "settings";
const TABS: { id: Tab; label: string; Icon: (p: { className?: string }) => JSX.Element }[] = [
  { id: "applications", label: "Applications", Icon: MailIcon },
  { id: "blogs", label: "Blogs", Icon: NewsIcon },
  { id: "fixtures", label: "Fixtures", Icon: TargetIcon },
  { id: "results", label: "Results", Icon: TrophyIcon },
  { id: "images", label: "Images", Icon: ImageIcon },
  { id: "videos", label: "Videos", Icon: FilmIcon },
  { id: "players", label: "Players", Icon: ImageIcon },
  { id: "staff", label: "Staff", Icon: ImageIcon },
  { id: "settings", label: "Settings", Icon: CheckIcon },
];

function SettingsPanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function handlePasswordChange(e: FormEvent) {
    e.preventDefault();
    if (!currentPassword.trim()) {
      setMsg("Please enter your current password.");
      return;
    }
    if (newPassword.length < 6) {
      setMsg("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("New passwords do not match.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const { error } = await supabase!.auth.updateUser({ password: newPassword });
      if (error) {
        setMsg("Error: " + error.message);
      } else {
        setMsg("✓ Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setMsg(""), 5000);
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Unable to update password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 font-cond text-2xl font-bold uppercase tracking-[0.2em] text-pitch-900">Account Settings</h2>

      <div className="space-y-8 rounded-lg border-2 border-pitch-900/15 bg-bone-50 p-8">
        <div>
          <h3 className="mb-4 font-cond text-lg font-semibold uppercase tracking-[0.16em] text-pitch-900">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Field label="Current Password">
              <input
                required
                type="password"
                className={inputCls}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>

            <Field label="New Password">
              <input
                required
                type="password"
                className={inputCls}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </Field>

            <Field label="Confirm New Password">
              <input
                required
                type="password"
                className={inputCls}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </Field>

            {msg && (
              <div
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  msg.includes("✓") || msg.includes("successfully")
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                } border-2`}
              >
                {msg}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setMsg("");
                }}
                className="border-2 border-pitch-900/15 bg-white px-6 py-3 font-cond font-semibold uppercase tracking-[0.12em] text-pitch-900 transition-colors hover:border-pitch-900/30 hover:bg-pitch-900/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="border-2 border-gold-500 bg-gold-500 px-6 py-3 font-cond font-semibold uppercase tracking-[0.12em] text-pitch-950 transition-colors hover:bg-gold-600 disabled:opacity-50"
              >
                {busy ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

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
              <strong>Enable applications.</strong> If the project already uses the schema, also run <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">supabase/add-applications.sql</code> so submitted forms appear in the Applications dashboard.
            </li>
            <li>
              <strong>Enable player profiles.</strong> Run <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">supabase/add-players.sql</code> to create the public player roster and allow admins to publish profiles with photo galleries.
            </li>
            <li>
              <strong>Enable staff profiles.</strong> Run <code className="bg-pitch-900/8 px-1.5 py-0.5 font-cond text-sm text-pitch-700">supabase/add-staff.sql</code> to let admins publish staff members to the Staff page.
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
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {TABS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setTab(id)}
                      className={`flex items-center gap-2 border-2 px-3 py-2 font-cond text-sm font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
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
                {tab === "applications" && <ApplicationsPanel />}
                {tab === "blogs" && <BlogsPanel />}
                {tab === "fixtures" && <FixturesPanel />}
                {tab === "results" && <ResultsPanel />}
                {tab === "images" && <MediaPanel kind="image" />}
                {tab === "videos" && <MediaPanel kind="video" />}
                {tab === "players" && <PlayersPanel />}
                {tab === "staff" && <StaffPanel />}
                {tab === "settings" && <SettingsPanel />}
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
