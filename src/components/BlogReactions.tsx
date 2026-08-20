import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const REACTIONS = ["❤️", "👍", "😂", "🔥", "💯"];

export function BlogReactions({ blogId }: { blogId: string }) {
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadReactions();
  }, [blogId]);

  async function loadReactions() {
    if (!supabase) return;
    const { data } = await supabase
      .from("reactions")
      .select("emoji")
      .eq("blog_id", blogId);

    if (data) {
      const counts: Record<string, number> = {};
      data.forEach((r) => {
        counts[r.emoji] = (counts[r.emoji] || 0) + 1;
      });
      setReactions(counts);
    }
  }

  async function addReaction(emoji: string) {
    if (!supabase || !userEmail.trim()) {
      setShowForm(true);
      return;
    }

    try {
      if (userReaction === emoji) {
        await supabase
          .from("reactions")
          .delete()
          .eq("blog_id", blogId)
          .eq("user_email", userEmail)
          .eq("emoji", emoji);
        setUserReaction(null);
      } else {
        if (userReaction) {
          await supabase
            .from("reactions")
            .delete()
            .eq("blog_id", blogId)
            .eq("user_email", userEmail)
            .eq("emoji", userReaction);
        }

        await supabase.from("reactions").insert({
          blog_id: blogId,
          user_name: userName || "Anonymous",
          user_email: userEmail,
          emoji,
        });
        setUserReaction(emoji);
      }
      loadReactions();
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
  }

  return (
    <div className="mt-6 border-t border-pitch-900/12 pt-6">
      <p className="mb-3 font-cond text-sm font-bold uppercase tracking-[0.16em] text-pitch-600">
        React to this post
      </p>

      {!userEmail && showForm && (
        <div className="mb-4 grid gap-2 rounded-lg bg-pitch-900/5 p-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="rounded border border-pitch-900/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-600"
          />
          <input
            type="email"
            placeholder="Your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="rounded border border-pitch-900/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-600"
          />
          <button
            onClick={() => setShowForm(false)}
            className="col-span-2 rounded bg-gold-500 px-3 py-2 text-sm font-semibold text-pitch-950 hover:bg-gold-600"
          >
            Save
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => addReaction(emoji)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
              userReaction === emoji
                ? "bg-gold-500/20 ring-1 ring-gold-500"
                : "bg-pitch-900/8 hover:bg-pitch-900/12"
            }`}
          >
            <span className="text-lg">{emoji}</span>
            <span className="text-xs font-semibold text-pitch-700">
              {reactions[emoji] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
