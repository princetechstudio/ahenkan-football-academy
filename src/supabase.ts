import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://fhukpyegqthatoixvqgl.supabase.co";
const SUPABASE_ANON_KEY: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when the anon key is provided via .env (VITE_SUPABASE_ANON_KEY). */
export const isSupabaseConfigured = Boolean(SUPABASE_ANON_KEY);

/** Null when unconfigured — the site then falls back to the built-in content. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY as string)
  : null;

export const MEDIA_BUCKET = "media";

/** Upload a file from the admin's computer to Supabase Storage, returning its public URL. */
export async function uploadToStorage(file: File, folder: "images" | "videos"): Promise<string> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const ext = file.name.split(".").pop() || "bin";
  const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-").slice(0, 60);
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Best-effort removal of a storage object behind a public URL. */
export async function removeFromStorage(publicUrl: string): Promise<void> {
  if (!supabase) return;
  const marker = `/object/public/${MEDIA_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = decodeURIComponent(publicUrl.slice(idx + marker.length));
  await supabase.storage.from(MEDIA_BUCKET).remove([path]);
}

/** Convert a YouTube watch/share link into an embeddable URL (or null). */
export function youtubeEmbed(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{6,})/
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
