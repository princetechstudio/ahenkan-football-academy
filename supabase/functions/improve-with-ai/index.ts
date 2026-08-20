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
    const { content } = await req.json();

    if (!content || !content.trim()) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const groqApiKey = Deno.env.get("GROQ_API_KEY");

    if (!groqApiKey) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Clean HTML content by removing tags for better AI processing
    const cleanContent = content
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (cleanContent.length < 10) {
      return new Response(
        JSON.stringify({
          error: "Please provide more content to improve",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Sending content to Groq API, length:", cleanContent.length);

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content:
              "You are an expert sports journalist specializing in youth football academy content. Your task is to improve the provided text to be more engaging, professional, and clear while maintaining the original meaning. Keep the tone appropriate for a football academy website. Preserve the overall structure and length but enhance clarity, grammar, and engagement. Return ONLY the improved text with no explanations or metadata.",
          },
          {
            role: "user",
            content: `Please improve this article content:\n\n${cleanContent}`,
          },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    console.log("Groq response status:", groqResponse.status);

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error("Groq API error:", errorData);

      // Handle rate limiting
      if (groqResponse.status === 429) {
        return new Response(
          JSON.stringify({
            error: "AI service is temporarily busy. Please try again in a moment.",
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Handle authentication errors
      if (groqResponse.status === 401) {
        return new Response(
          JSON.stringify({
            error: "AI service authentication failed. Please contact the administrator.",
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          error: errorData.error?.message || "Failed to improve content",
        }),
        { status: groqResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await groqResponse.json();
    console.log("Groq response received:", data.choices?.length, "choices");

    if (data.choices && data.choices[0]?.message?.content) {
      const improvedText = data.choices[0].message.content.trim();

      // Convert back to HTML format if needed
      // For now, return as plain text and let the client handle formatting
      return new Response(
        JSON.stringify({
          improved: improvedText,
          status: "success",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.error("Unexpected Groq response structure:", data);
    return new Response(
      JSON.stringify({
        error: "Unexpected response from AI service. Please try again.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in improve-with-ai function:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: `An error occurred: ${errorMsg}`,
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
