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
  full text default '',
  img text default '',
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

-- ---------- row level security ----------
alter table public.blogs enable row level security;
alter table public.fixtures enable row level security;
alter table public.results enable row level security;
alter table public.media enable row level security;

-- visitors can read everything
create policy "public read blogs"    on public.blogs    for select using (true);
create policy "public read fixtures" on public.fixtures for select using (true);
create policy "public read results"  on public.results  for select using (true);
create policy "public read media"    on public.media    for select using (true);

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
