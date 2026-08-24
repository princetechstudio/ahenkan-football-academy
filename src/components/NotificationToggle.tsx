import { useState, useEffect } from "react";
import {
  getStoredUserEmail,
  isPushNotificationSupported,
  isPushNotificationConfigured,
  requestNotificationPermission,
  storeUserEmail,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  isUserSubscribed,
} from "../lib/notifications";
import { BellIcon } from "./Icons";

interface NotificationBellProps {
  userEmail?: string;
}

export function NotificationBell({ userEmail }: NotificationBellProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    setIsSupported(isPushNotificationSupported());
    setIsSubscribed(isUserSubscribed());
    setPermission(Notification.permission);
  }, []);

  const handleToggle = async () => {
    if (!isSubscribed && !window.confirm("Activate notifications for AFA?")) {
      return;
    }

    setIsLoading(true);
    try {
      if (!isPushNotificationConfigured()) {
        window.alert("Notifications are not configured on this deployment yet.");
        return;
      }

      if (isSubscribed) {
        // Unsubscribe
        const success = await unsubscribeFromPushNotifications();
        if (success) {
          setIsSubscribed(false);
          console.log("✅ Unsubscribed from notifications");
        }
      } else {
        // Request permission if needed
        if (permission !== "granted") {
          const granted = await requestNotificationPermission();
          if (!granted) {
            console.error("Notification permission denied");
            setPermission(Notification.permission);
            setIsLoading(false);
            return;
          }
          setPermission("granted");
        }

        // Subscribe to notifications
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

        if (!supabaseUrl || !vapidPublicKey) {
          console.error(
            "VAPID_PUBLIC_KEY or SUPABASE_URL not configured"
          );
          setIsLoading(false);
          return;
        }

        const emailToUse = userEmail || getStoredUserEmail();
        let finalEmail = emailToUse;
        if (!finalEmail) {
          const enteredEmail = window.prompt(
            "Enter your email to receive club updates and new publication alerts",
            getStoredUserEmail() || ""
          );
          if (!enteredEmail) {
            setIsLoading(false);
            return;
          }
          finalEmail = storeUserEmail(enteredEmail);
        }

        if (!finalEmail) {
          console.error("User email not available");
          setIsLoading(false);
          return;
        }

        const success = await subscribeToPushNotifications(
          finalEmail,
          vapidPublicKey,
          supabaseUrl
        );

        if (success) {
          setIsSubscribed(true);
          console.log("✅ Subscribed to notifications");
        }
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      aria-pressed={isSubscribed}
      title={
        isSubscribed
          ? "Click to disable notifications"
          : "Click to enable notifications"
      }
      className={`relative p-2 transition-all ${
        isSubscribed
          ? "grid h-10 w-10 place-items-center border border-bone-50 bg-bone-50 text-pitch-950 shadow-[0_0_0_3px_rgba(255,255,255,0.2)] hover:bg-gold-300"
          : "grid h-10 w-10 place-items-center border border-bone-50/25 text-bone-50/60 hover:border-bone-50 hover:text-bone-50"
      } disabled:opacity-50`}
      aria-label={
        isSubscribed
          ? "Notifications enabled - click to disable"
          : "Notifications disabled - click to enable"
      }
    >
      <BellIcon />
      {isSubscribed && (
        <span className="absolute top-1 right-1 inline-block h-2 w-2 bg-gold-600 rounded-full"></span>
      )}
      {isLoading && (
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold-600"></span>
      )}
    </button>
  );
}

export default NotificationBell;
