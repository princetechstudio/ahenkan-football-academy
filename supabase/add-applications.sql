-- Run this migration if the existing Supabase project already has schema.sql applied.
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

alter table public.applications enable row level security;

create policy "public submit applications" on public.applications
  for insert to anon, authenticated with check (true);
create policy "admin read applications" on public.applications
  for select to authenticated using (true);
create policy "admin update applications" on public.applications
  for update to authenticated using (true) with check (true);
create policy "admin delete applications" on public.applications
  for delete to authenticated using (true);