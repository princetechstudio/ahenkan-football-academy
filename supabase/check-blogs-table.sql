-- Check if video column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blogs';

-- If video column is missing, add it:
-- ALTER TABLE public.blogs ADD COLUMN video text default '';
