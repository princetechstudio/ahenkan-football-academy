import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://fhukpyegqthatoixvqgl.supabase.co";
const SUPABASE_ANON_KEY: string | undefined =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when a Supabase browser key is provided via .env. */
export const isSupabaseConfigured = Boolean(SUPABASE_ANON_KEY);

/** Null when unconfigured — the site then falls back to the built-in content. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY as string)
  : null;

export const MEDIA_BUCKET = "media";

export type NotificationType = "blog" | "video" | "result";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const normalized = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(normalized);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

/** Ask the browser for push permissions and register the current user for notifications. */
export async function requestPushNotifications(email: string): Promise<{ ok: boolean; message: string }> {
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    return { ok: false, message: "This browser does not support web notifications." };
  }

  if (Notification.permission === "denied") {
    return { ok: false, message: "Notifications are blocked in this browser. Please enable them in site settings." };
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return { ok: false, message: "Notification permission was not granted." };
  }

  const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  if (!vapidKey) {
    return { ok: false, message: "Push notifications are not configured yet for this site." };
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey),
  });

  const rawAuth = subscription.getKey("auth");
  const rawP256dh = subscription.getKey("p256dh");
  const payload = {
    userEmail: email,
    endpoint: subscription.endpoint,
    p256dh: rawP256dh ? btoa(String.fromCharCode(...Array.from(new Uint8Array(rawP256dh)))) : "",
    auth: rawAuth ? btoa(String.fromCharCode(...Array.from(new Uint8Array(rawAuth)))) : "",
  };

  if (!supabase) {
    localStorage.setItem("ahenkan_push_subscription", JSON.stringify(payload));
    return { ok: true, message: "Push notifications are enabled on this device." };
  }

  const { error } = await supabase.functions.invoke("subscribe-to-notifications", { body: payload });
  if (error) {
    console.error("Subscribe to notifications failed:", error);
    return { ok: false, message: error.message || "Could not save your push subscription." };
  }

  return { ok: true, message: "Push notifications are enabled on this device." };
}

/** Broadcast a site update to all active subscribers and save it to the notifications log. */
export async function broadcastNotification(options: {
  title: string;
  body: string;
  type: NotificationType;
  url?: string;
}): Promise<void> {
  if (!supabase) return;

  try {
    const { data: subscriptions } = await supabase.from("subscriptions").select("user_email");
    const emails = Array.from(new Set((subscriptions ?? []).map((item) => item.user_email).filter(Boolean))) as string[];

    if (emails.length) {
      const rows = emails.map((userEmail) => ({
        user_email: userEmail,
        type: options.type,
        title: options.title,
        message: options.body,
        link: options.url || "/",
        read: false,
      }));
      await supabase.from("notifications").insert(rows);
    }

    const pushPayload = {
      title: options.title,
      body: options.body,
      type: options.type,
      url: options.url || "/",
      icon: `${window.location.origin}/icon-192x192.png`,
      badge: `${window.location.origin}/icon-192x192.png`,
      tag: `ahenkan-${options.type}`,
    };

    const result = await supabase.functions.invoke("send-push-notifications", { body: pushPayload });
    if (result.error) {
      console.warn("Push notification delivery failed:", result.error);
    }
  } catch (error) {
    console.error("Could not deliver broadcast notification:", error);
  }
}

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
