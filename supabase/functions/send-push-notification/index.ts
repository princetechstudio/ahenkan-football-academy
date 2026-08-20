import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper to send web push notification
async function sendPushNotification(
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  payload: string,
  vapidPublicKey: string,
  vapidPrivateKey: string
) {
  const vapidHeaders = generateVAPIDHeaders(vapidPublicKey, vapidPrivateKey);

  const response = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "aes128gcm",
      ...vapidHeaders,
    },
    body: payload,
  });

  return response.ok;
}

// Generate VAPID headers for web push
function generateVAPIDHeaders(vapidPublicKey: string, vapidPrivateKey: string) {
  // This is simplified - in production, use proper web-push library
  return {
    "Authorization": `vapid t=${vapidPublicKey}, k=${vapidPrivateKey}`,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, title, message, link } = await req.json();

    if (!email || !title || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, title, message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY") || "";
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials");
    }

    // Get subscriptions for this email
    const subResponse = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?user_email=eq.${email}`,
      {
        headers: {
          Authorization: `Bearer ${supabaseServiceKey}`,
          "apikey": supabaseServiceKey,
        },
      }
    );

    if (!subResponse.ok) {
      throw new Error("Failed to fetch subscriptions");
    }

    const subscriptions = await subResponse.json();

    let sentCount = 0;
    for (const sub of subscriptions) {
      try {
        // Send push notification if VAPID keys are configured
        if (vapidPublicKey && vapidPrivateKey) {
          await sendPushNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify({ title, message, link }),
            vapidPublicKey,
            vapidPrivateKey
          );
        }
        sentCount++;
      } catch (err) {
        console.error(`Failed to send push to ${sub.endpoint}:`, err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, sent: sentCount }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
