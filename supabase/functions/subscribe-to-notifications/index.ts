// Subscribe user to push notifications
// Stores user's push subscription data in the database

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface SubscriptionRequest {
  userEmail: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}

serve(async (req: Request) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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
    const body: SubscriptionRequest = await req.json();

    // Validate required fields
    if (!body.userEmail || !body.endpoint || !body.p256dh || !body.auth) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: userEmail, endpoint, p256dh, auth",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`📢 Subscribing user: ${body.userEmail}`);

    // Upsert subscription (update if exists, insert if new)
    const { data, error } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_email: body.userEmail,
          endpoint: body.endpoint,
          p256dh: body.p256dh,
          auth: body.auth,
        },
        {
          onConflict: "user_email",
        }
      )
      .select();

    if (error) {
      console.error("Subscription error:", error);
      throw new Error(`Failed to subscribe: ${error.message}`);
    }

    console.log(`✅ User subscribed: ${body.userEmail}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully subscribed to notifications",
        data: data,
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
        error: error.message || "Failed to subscribe to notifications",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
