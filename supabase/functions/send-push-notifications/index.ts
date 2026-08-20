// Send web push notifications to subscribed users
// Deno server-side function to send push notifications using Web Push Protocol

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Web Push Protocol constants
const WEBPUSH_ENDPOINT = "https://push.ahenkan.app/notify"; // Mock endpoint for demo
const VAPID_CLAIM_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

interface PushSubscription {
  id: string;
  user_email: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}

interface SendNotificationRequest {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
  type?: "blog" | "video" | "result";
}

// Generate JWT for VAPID (simplified - in production use proper JWT library)
async function generateVapidClaim(vapidPrivateKey: string): Promise<string> {
  const header = { alg: "ES256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (VAPID_CLAIM_DURATION / 1000);
  
  const payload = {
    aud: "https://push.ahenkan.app", // FCM, APNs, or other push service
    exp: exp,
    sub: "mailto:admin@ahenkanfootballacademy.com",
  };

  // Note: Simplified JWT. In production, use proper ES256 signing
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  
  return `${encodedHeader}.${encodedPayload}.signature`;
}

// Send push notification to a single endpoint
async function sendPushNotification(
  subscription: PushSubscription,
  notification: SendNotificationRequest
): Promise<boolean> {
  try {
    const payload = JSON.stringify({
      title: notification.title,
      body: notification.body,
      icon: notification.icon || "https://ahenkanfootballacademy.com/icon-192x192.png",
      badge: notification.badge || "https://ahenkanfootballacademy.com/badge-72x72.png",
      tag: notification.tag || "ahenkan-notification",
      data: {
        url: notification.url || "/",
        type: notification.type || "blog",
      },
    });

    // Generate VAPID claim
    const vapidClaim = await generateVapidClaim(vapidPrivateKey);

    // Send to push service
    const response = await fetch(subscription.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Encoding": "aes128gcm",
        "TTL": "86400", // 24 hours
        "Urgency": "high",
        "Topic": "ahenkan-notifications",
        Authorization: `vapid t=${vapidClaim}, k=${vapidPublicKey}`,
      },
      body: payload,
    });

    if (response.ok) {
      console.log(`✓ Notification sent to ${subscription.user_email}`);
      return true;
    } else if (response.status === 410) {
      // Subscription expired, remove it
      console.log(`🗑️ Removing expired subscription for ${subscription.user_email}`);
      await supabase
        .from("subscriptions")
        .delete()
        .eq("id", subscription.id);
      return false;
    } else {
      console.error(
        `✗ Failed to send notification to ${subscription.user_email}: ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error(`✗ Error sending notification to ${subscription.user_email}:`, error);
    return false;
  }
}

serve(async (req: Request) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const body: SendNotificationRequest = await req.json();

    // Validate required fields
    if (!body.title || !body.body) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: title, body",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`📤 Sending notification: ${body.title}`);

    // Get all active subscriptions
    const { data: subscriptions, error: dbError } = await supabase
      .from("subscriptions")
      .select("*");

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to fetch subscriptions: ${dbError.message}`);
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log("No active subscriptions found");
      return new Response(
        JSON.stringify({
          success: true,
          sentCount: 0,
          message: "No active subscriptions to notify",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`📤 Found ${subscriptions.length} active subscriptions`);

    // Send to all subscriptions
    const results = await Promise.all(
      subscriptions.map((sub: PushSubscription) =>
        sendPushNotification(sub, body)
      )
    );

    const successCount = results.filter((r) => r).length;
    const failCount = results.filter((r) => !r).length;

    console.log(`✅ Notifications: ${successCount} sent, ${failCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sentCount: successCount,
        failedCount: failCount,
        totalSubscriptions: subscriptions.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send notifications",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
