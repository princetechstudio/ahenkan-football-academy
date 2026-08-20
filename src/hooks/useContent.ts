import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { BLOGS, FIXTURES, RESULTS } from "../data";

export type Blog = {
  id: string | number;
  title: string;
  cat: string;
  date: string;
  excerpt: string;
  content: string;
  img: string;
  video?: string;
  featured?: boolean;
};

export type Fixture = {
  id: string | number;
  squad: string;
  comp: string;
  opp: string;
  venue: string;
  date: string;
};

export type Result = {
  id: string | number;
  squad: string;
  comp: string;
  opp: string;
  venue: string;
  score: string;
  res: "W" | "D" | "L";
  date: string;
};

export type MediaItem = {
  id: string | number;
  kind: "image" | "video";
  title: string;
  caption: string;
  url: string;
  created_at?: string;
};

export type Player = {
  id: string | number;
  name: string;
  age: string;
  position: string;
  squad: string;
  bio: string;
  achievements: string;
  images: string[];
  created_at?: string;
};

export type StaffMember = {
  id: string | number;
  name: string;
  role: string;
  qualification: string;
  years: string;
  bio: string;
  tags: string[];
  image: string;
  created_at?: string;
};

const FALLBACK_BLOGS: Blog[] = BLOGS.map((blog) => ({
  ...blog,
  content: blog.full,
}));

/** Live blogs from Supabase, falling back to built-in content when offline/unconfigured. */
export function useBlogs(): Blog[] {
  const [items, setItems] = useState<Blog[]>(FALLBACK_BLOGS);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length && alive) {
          const blogs = data.map((blog: any) => ({
            ...blog,
            content: blog.full || blog.content,
          })) as Blog[];
          setItems(blogs);
        }
      });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}

/** Live upcoming fixtures (soonest first). */
export function useFixtures(): Fixture[] {
  const [items, setItems] = useState<Fixture[]>(FIXTURES as Fixture[]);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from("fixtures")
      .select("*")
      .order("date", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length && alive) setItems(data as Fixture[]);
      });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}

/** Live recent results (newest first). */
export function useResults(): Result[] {
  const [items, setItems] = useState<Result[]>(RESULTS as Result[]);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from("results")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length && alive) setItems(data as Result[]);
      });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}

/** Live gallery images and videos uploaded from the admin dashboard. */
export function useMedia(): MediaItem[] {
  const [items, setItems] = useState<MediaItem[]>([]);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && alive) setItems(data as MediaItem[]);
      });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}

export function usePlayers(): Player[] {
  const [items, setItems] = useState<Player[]>([]);
  useEffect(() => {
    if (!supabase) {
      const stored = JSON.parse(localStorage.getItem("ahenkan_players") || "[]");
      setItems(stored as Player[]);
      return;
    }
    let alive = true;
    supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (alive && data) setItems(data as Player[]);
      });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}

export function useStaff(): StaffMember[] {
  const [items, setItems] = useState<StaffMember[]>([]);
  useEffect(() => {
    if (!supabase) {
      setItems(JSON.parse(localStorage.getItem("ahenkan_staff") || "[]") as StaffMember[]);
      return;
    }
    let alive = true;
    supabase
      .from("staff")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (alive && data) setItems(data as StaffMember[]);
      });
    return () => {
      alive = false;
    };
  }, []);
  return items;
}
