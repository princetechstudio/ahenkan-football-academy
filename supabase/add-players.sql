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

alter table public.players enable row level security;
create policy "public read players" on public.players for select using (true);
create policy "admin write players" on public.players for all to authenticated using (true) with check (true);