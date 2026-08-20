import { useState, useEffect } from "react";
import { supabase } from "../supabase";

interface Comment {
  id: string;
  user_name: string;
  user_email: string;
  content: string;
  created_at: string;
}

export function BlogComments({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadComments();
  }, [blogId]);

  async function loadComments() {
    if (!supabase) return;
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("blog_id", blogId)
      .order("created_at", { ascending: false });

    if (data) setComments(data as Comment[]);
  }

  async function postComment(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !content.trim() || !userEmail.trim()) return;

    setBusy(true);
    try {
      await supabase.from("comments").insert({
        blog_id: blogId,
        user_name: userName || "Anonymous",
        user_email: userEmail,
        content,
      });
      setContent("");
      loadComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 border-t border-pitch-900/12 pt-8">
      <h3 className="font-cond text-lg font-bold uppercase tracking-[0.16em] text-pitch-900">
        Comments {comments.length > 0 && <span className="text-pitch-600">({comments.length})</span>}
      </h3>

      <form onSubmit={postComment} className="mt-6 space-y-3 rounded-lg bg-pitch-900/5 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
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
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="rounded border border-pitch-900/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-600"
          />
        </div>
        <textarea
          placeholder="Write your comment..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full rounded border border-pitch-900/20 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-600"
        />
        <button
          type="submit"
          disabled={busy}
          className="border-2 border-gold-500 bg-gold-500 px-5 py-2 font-cond text-sm font-bold uppercase tracking-[0.12em] text-pitch-950 transition-colors hover:bg-gold-600 disabled:opacity-50"
        >
          {busy ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-pitch-600">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-lg border border-pitch-900/12 bg-bone-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-pitch-900">{comment.user_name}</p>
                  <p className="text-xs text-pitch-600">
                    {new Date(comment.created_at).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-pitch-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
