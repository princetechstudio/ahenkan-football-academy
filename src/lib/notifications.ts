/**
 * Push Notification Utility
 * Handles subscribing users to push notifications and requesting permissions
 */

export type NotificationType = "blog" | "video" | "result" | "fixture" | "media";

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
  type?: NotificationType;
}

export async function sendWebsiteNotification(
  options: NotificationOptions
): Promise<boolean> {
  const normalizedUrl = options.url
    ? options.url.startsWith("/#") || options.url.startsWith("/")
      ? options.url
      : `/#${options.url}`
    : "/#/";

  return sendPushNotification({
    ...options,
    url: normalizedUrl,
    type: options.type ?? "blog",
  });
}

export function getStoredUserEmail(): string {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem("push-user-email") || "";
}

export function storeUserEmail(email: string): string {
  const trimmed = email.trim();
  if (typeof localStorage === "undefined") return trimmed;
  if (!trimmed) return "";
  localStorage.setItem("push-user-email", trimmed);
  return trimmed;
}

/**
 * Check if browser supports push notifications
 */
export function isPushNotificationSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

export function isPushNotificationConfigured(): boolean {
  return Boolean(
    isPushNotificationSupported() &&
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_VAPID_PUBLIC_KEY
  );
}

/**
 * Send push notification to all subscribed users (admin function)
 */
export async function sendPushNotification(
  options: NotificationOptions
): Promise<boolean> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      console.error("VITE_SUPABASE_URL not configured");
      return false;
    }

    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-push-notifications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Failed to send notifications: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("✅ Push notifications sent:", data);
    return true;
  } catch (error) {
    console.error("❌ Error sending push notifications:", error);
    // Don't throw - allow publish to continue even if notifications fail
    return false;
  }
}

/**
 * Request permission from user for notifications
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    console.warn(
      "Push notifications not supported in this browser"
    );
    return false;
  }

  try {
    // Check if already granted
    if (Notification.permission === "granted") {
      console.log("✅ Notification permission already granted");
      return true;
    }

    // Skip if user previously denied
    if (Notification.permission === "denied") {
      console.log("⚠️ Notification permission was denied by user");
      return false;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    console.log(`📢 Notification permission: ${permission}`);
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
}

/**
 * Subscribe user to push notifications
 */
export async function subscribeToPushNotifications(
  userEmail: string,
  vapidPublicKey: string,
  supabaseUrl: string
): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    console.warn(
      "Push notifications not supported - skipping subscription"
    );
    return false;
  }

  try {
    // Get Service Worker registration
    const registration = await navigator.serviceWorker.ready;
    console.log("✅ Service Worker is ready");

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as unknown as BufferSource,
    });

    console.log("✅ Push subscription created");

    // Send subscription to backend
    const response = await fetch(
      `${supabaseUrl}/functions/v1/subscribe-to-notifications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          endpoint: subscription.endpoint,
          p256dh: arrayBufferToBase64(
            subscription.getKey("p256dh")!
          ),
          auth: arrayBufferToBase64(subscription.getKey("auth")!),
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error ||
          `Failed to subscribe: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("✅ Subscription saved to database:", data);
    localStorage.setItem("pushSubscribed", "true");
    return true;
  } catch (error) {
    console.error("❌ Error subscribing to notifications:", error);
    return false;
  }
}

/**
 * Unsubscribe user from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {
      console.log("No active subscription found");
      return true;
    }

    await subscription.unsubscribe();
    console.log("✅ Unsubscribed from push notifications");
    localStorage.removeItem("pushSubscribed");
    return true;
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return false;
  }
}

/**
 * Send test notification (for demo purposes)
 */
export async function sendTestNotification(
  supabaseUrl: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-push-notifications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "🎉 Test Notification",
          body: "If you see this, notifications are working!",
          tag: "test-notification",
          type: "blog",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error ||
          `Failed to send test: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("✅ Test notification sent:", data);
    return true;
  } catch (error) {
    console.error("❌ Error sending test notification:", error);
    return false;
  }
}

/**
 * Check if user is already subscribed
 */
export function isUserSubscribed(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem("pushSubscribed") === "true";
}

/**
 * Convert VAPID public key from base64 to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Convert ArrayBuffer to base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
