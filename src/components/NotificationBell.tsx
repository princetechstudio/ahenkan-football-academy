import { useState, useEffect } from "react";

interface Notification {
  id: string;
  type: "blog" | "video" | "result";
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  async function loadNotifications() {
    const userEmail = localStorage.getItem("user_email");
    if (!userEmail) return;

    try {
      const response = await fetch(`/api/notifications?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  }

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/notifications/${id}`, { method: "PATCH", body: JSON.stringify({ read: true }) });
      loadNotifications();
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
      >
        <span>🔔</span>
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-500">No notifications yet</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`border-b border-slate-100 px-4 py-3 cursor-pointer transition hover:bg-slate-50 ${
                    notif.read ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{notif.title}</p>
                      <p className="text-sm text-slate-600">{notif.message}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(notif.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export async function subscribeToNotifications(email: string) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.log("Push notifications not supported");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

    if (!vapidPublicKey) {
      console.warn("VITE_VAPID_PUBLIC_KEY is not configured");
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: Uint8Array.from(
        atob(vapidPublicKey.replace(/-/g, "+").replace(/_/g, "/")),
        (char) => char.charCodeAt(0)
      ),
    });

    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscribe-to-notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: email,
        endpoint: subscription.endpoint,
        p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")!))),
        auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!))),
      }),
    });

    console.log("Subscribed to push notifications");
  } catch (err) {
    console.error("Error subscribing to notifications:", err);
  }
}
