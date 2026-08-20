-- Add missing 'video' column to blogs table if it doesn't exist
-- Run this in Supabase Dashboard → SQL Editor → New query

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'video'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN video text default '';
  END IF;
END $$;
