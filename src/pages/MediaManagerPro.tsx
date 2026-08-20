import { useState, useCallback, useEffect, FormEvent } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";
import { supabase, uploadToStorage, removeFromStorage } from "../supabase";

type MediaRow = { id?: string; kind: "image" | "video"; title: string; caption: string; url: string };

export default function MediaManager({ kind }: { kind: "image" | "video" }) {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [drag, setDrag] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase!.from("media").select("*").eq("kind", kind).order("created_at", { ascending: false });
    if (data) setRows(data as MediaRow[]);
  }, [kind]);

  useEffect(() => {
    load();
  }, [load]);

  // Preview file before upload
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  async function add(e: FormEvent) {
    e.preventDefault();
    if (!file && !url) {
      alert("Please select a file or enter a URL");
      return;
    }
    setBusy(true);
    try {
      const finalUrl = file ? await uploadToStorage(file, kind === "image" ? "images" : "videos") : url;
      if (!finalUrl) return;
      await supabase!.from("media").insert({ kind, title: title || "Untitled", caption: "", url: finalUrl });
      setFile(null);
      setTitle("");
      setUrl("");
      setPreview("");
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function del(row: MediaRow) {
    if (!confirm(`Delete "${row.title}"?`)) return;
    await removeFromStorage(row.url);
    await supabase!.from("media").delete().eq("id", row.id!);
    load();
  }

  const fileSize = file ? (file.size / 1024 / 1024).toFixed(2) : "0";
  const maxSize = kind === "video" ? 100 : 10;

  return (
    <div className="cms-content">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{kind === "image" ? "Media Library" : "Video Gallery"}</h2>
        <p className="mt-2 text-slate-600">Upload and manage {kind === "image" ? "images" : "videos"} for your website. Max {maxSize}MB per file.</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={add} className="cms-card overflow-hidden p-6">
        <h3 className="mb-6 text-lg font-bold">Upload {kind === "image" ? "Image" : "Video"}</h3>

        {/* Title Input */}
        <div className="mb-6">
          <label className="cms-label">Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="cms-input mt-2" placeholder={`Give this ${kind} a descriptive title`} />
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <label className="cms-label">Upload File</label>
          <label
            className={`mt-2 block rounded-xl border-2 border-dashed p-8 text-center transition cursor-pointer ${
              drag ? "border-purple-500 bg-purple-50" : file ? "border-green-400 bg-green-50" : "border-slate-300 hover:border-purple-400 hover:bg-purple-50/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              const dropped = e.dataTransfer.files?.[0];
              if (dropped) setFile(dropped);
            }}
          >
            <input
              type="file"
              accept={kind === "image" ? "image/*" : "video/*"}
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div>
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 font-semibold text-slate-700">Drag and drop or click to upload</p>
              <p className="mt-1 text-sm text-slate-500">
                {kind === "image" ? "JPG, PNG, WebP up to 10MB" : "MP4, WebM, MOV up to 100MB"}
              </p>
            </div>
          </label>

          {file && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-green-900">{file.name}</p>
                  <p className="mt-1 text-sm text-green-700">{fileSize} MB</p>
                  {Number(fileSize) > maxSize && <p className="mt-1 text-sm text-red-600">⚠️ File too large (max {maxSize}MB)</p>}
                </div>
                <button type="button" onClick={() => { setFile(null); setPreview(""); }} className="text-green-600 hover:text-green-700 font-semibold">
                  ✕
                </button>
              </div>

              {/* Preview */}
              {preview && (
                <div className="mt-4">
                  {kind === "image" ? (
                    <img src={preview} alt="Preview" className="h-32 w-32 rounded-lg bg-slate-100 object-contain" />
                  ) : (
                    <video src={preview} className="h-32 w-32 rounded-lg bg-black" controls />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* URL Option for Video */}
        {kind === "video" && (
          <div className="mb-6">
            <label className="cms-label">Or paste a video URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="cms-input mt-2"
              placeholder="https://example.com/video.mp4"
            />
            <p className="mt-2 text-xs text-slate-500">Leave both empty to upload from file</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          disabled={busy || (file ? Number(fileSize) > maxSize : false)}
          className="cms-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
              Uploading...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Upload to Website
            </>
          )}
        </button>
      </form>

      {/* Gallery */}
      <div className="cms-card mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="font-bold text-lg">{kind === "image" ? "Media" : "Video"} Gallery</h3>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">{rows.length} total</span>
        </div>

        {rows.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-100">
              <Upload className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-slate-700 font-semibold">No {kind}s yet</p>
            <p className="mt-1 text-sm text-slate-500">Upload your first {kind} to get started</p>
          </div>
        ) : (
          <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((row) => (
              <article
                key={row.id}
                className="group rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition bg-white"
              >
                {/* Thumbnail */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  {kind === "image" ? (
                    <img src={row.url} alt={row.title} className="h-full w-full bg-slate-100 object-contain" />
                  ) : (
                    <>
                      <video src={row.url} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                        <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="truncate font-semibold text-slate-900">{row.title}</h4>
                  {row.caption && <p className="mt-1 text-xs text-slate-500 line-clamp-2">{row.caption}</p>}

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cms-quick flex-1 text-center text-sm no-underline"
                    >
                      View
                    </a>
                    <button
                      onClick={() => del(row)}
                      className="cms-quick text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
