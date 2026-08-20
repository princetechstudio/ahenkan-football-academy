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

alter table public.staff enable row level security;
create policy "public read staff" on public.staff for select using (true);
create policy "admin write staff" on public.staff for all to authenticated using (true) with check (true);