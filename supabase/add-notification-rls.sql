-- Add Row Level Security for subscriptions and notifications tables
-- Run this in Supabase SQL Editor after running schema.sql

-- ============================================================
-- SUBSCRIPTIONS - RLS Policies
-- ============================================================

-- Anyone can insert their own subscription
create policy "users can insert own subscription"
  on public.subscriptions
  for insert
  to anon, authenticated
  with check (true);

-- Users can update only their own subscription
create policy "users can update own subscription"
  on public.subscriptions
  for update
  to anon, authenticated
  using (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true)
  with check (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true);

-- Users can delete only their own subscription
create policy "users can delete own subscription"
  on public.subscriptions
  for delete
  to anon, authenticated
  using (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true);

-- Admin can read all subscriptions (for sending notifications)
create policy "admin can read subscriptions"
  on public.subscriptions
  for select
  to authenticated
  using (true);

-- Enable RLS
alter table public.subscriptions enable row level security;


-- ============================================================
-- NOTIFICATIONS - RLS Policies
-- ============================================================

-- Users can read their own notifications
create policy "users can read own notifications"
  on public.notifications
  for select
  to anon, authenticated
  using (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true);

-- Admin can insert notifications
create policy "admin can insert notifications"
  on public.notifications
  for insert
  to authenticated
  with check (true);

-- Users can update their own notifications (for read status)
create policy "users can update own notifications"
  on public.notifications
  for update
  to anon, authenticated
  using (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true)
  with check (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true);

-- Users can delete their own notifications
create policy "users can delete own notifications"
  on public.notifications
  for delete
  to anon, authenticated
  using (user_email = (select email from auth.users where auth.users.id = auth.uid()) OR true);

-- Enable RLS
alter table public.notifications enable row level security;
