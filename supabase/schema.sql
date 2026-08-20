-- ============================================================
-- AHENKAN FOOTBALL ACADEMY · CMS SCHEMA
-- Run this once in: Supabase Dashboard → SQL Editor → New query
-- Project: fhukpyegqthatoixvqgl
-- ============================================================

-- ---------- tables ----------
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cat text default 'Academy',
  date text default '',
  excerpt text default '',
  content text default '',
  img text default '',
  video text default '',
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.fixtures (
  id uuid primary key default gen_random_uuid(),
  squad text not null default 'U-17',
  comp text default '',
  opp text not null,
  venue text default '',
  date timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  squad text not null default 'U-17',
  comp text default '',
  opp text not null,
  venue text default '',
  score text not null,
  res text not null check (res in ('W','D','L')),
  date timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('image','video')),
  title text not null,
  caption text default '',
  url text not null,
  created_at timestamptz default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  player text not null,
  age text not null,
  guardian text not null,
  phone text not null,
  email text default '',
  program text default '',
  notes text default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'accepted', 'closed')),
  created_at timestamptz default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age text not null,
  position text default '',
  squad text default '',
  bio text default '',
  achievements text default '',
  images text[] not null default '{}',
  created_at timestamptz default now()
);

create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  qualification text default '',
  years text default '',
  bio text default '',
  tags text[] not null default '{}',
  image text default '',
  created_at timestamptz default now()
);

-- ---------- reactions & comments ----------
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  user_name text not null,
  user_email text not null,
  emoji text not null check (emoji in ('❤️','👍','😂','🔥','💯')),
  created_at timestamptz default now(),
  unique(blog_id, user_email, emoji)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  user_name text not null,
  user_email text not null,
  content text not null,
  created_at timestamptz default now()
);

-- ---------- notifications ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  type text not null check (type in ('blog','video','result')),
  title text not null,
  message text not null,
  link text,
  read boolean default false,
  created_at timestamptz default now()
);

-- ---------- subscriptions (for web push notifications) ----------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_email text not null unique,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);

-- ---------- row level security ----------
alter table public.blogs enable row level security;
alter table public.fixtures enable row level security;
alter table public.results enable row level security;
alter table public.media enable row level security;
alter table public.applications enable row level security;
alter table public.players enable row level security;
alter table public.staff enable row level security;

-- visitors can read everything
create policy "public read blogs"    on public.blogs    for select using (true);
create policy "public read fixtures" on public.fixtures for select using (true);
create policy "public read results"  on public.results  for select using (true);
create policy "public read media"    on public.media    for select using (true);
create policy "public submit applications" on public.applications for insert to anon, authenticated with check (true);
create policy "admin read applications" on public.applications for select to authenticated using (true);
create policy "admin update applications" on public.applications for update to authenticated using (true) with check (true);
create policy "admin delete applications" on public.applications for delete to authenticated using (true);
create policy "public read players" on public.players for select using (true);
create policy "admin write players" on public.players for all to authenticated using (true) with check (true);
create policy "public read staff" on public.staff for select using (true);
create policy "admin write staff" on public.staff for all to authenticated using (true) with check (true);

-- only the signed-in admin can write
create policy "admin write blogs"    on public.blogs    for all to authenticated using (true) with check (true);
create policy "admin write fixtures" on public.fixtures for all to authenticated using (true) with check (true);
create policy "admin write results"  on public.results  for all to authenticated using (true) with check (true);
create policy "admin write media"    on public.media    for all to authenticated using (true) with check (true);

-- ---------- storage bucket for uploads ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media files"   on storage.objects for select using (bucket_id = 'media');
create policy "admin upload media files"  on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "admin update media files"  on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "admin delete media files"  on storage.objects for delete to authenticated using (bucket_id = 'media');
