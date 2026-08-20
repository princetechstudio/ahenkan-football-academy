import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, title, message, link } = await req.json();

    if (!type || !title || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials");
    }

    // Get all user emails from notifications table (unique subscribers)
    const response = await fetch(`${supabaseUrl}/rest/v1/notifications?select=user_email`, {
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
        "apikey": supabaseServiceKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch subscribers");
    }

    const subscribers = await response.json();
    const emails = [...new Set(subscribers.map((n: any) => n.user_email))];

    // Create notifications for each subscriber
    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/notifications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
        "apikey": supabaseServiceKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        emails.map((email) => ({
          user_email: email,
          type,
          title,
          message,
          link: link || null,
          read: false,
        }))
      ),
    });

    if (!insertResponse.ok) {
      throw new Error("Failed to create notifications");
    }

    return new Response(
      JSON.stringify({ success: true, notified: emails.length }),
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
