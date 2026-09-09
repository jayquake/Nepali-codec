-- Automated news feed — run this in the Supabase SQL Editor AFTER deploying the
-- `news-fetch` Edge Function. Idempotent (safe to re-run).

-- 1) A stable, unique link column so the fetcher can upsert without duplicates.
alter table public.news add column if not exists link text;
create unique index if not exists news_link_key on public.news (link);

-- 2) Schedule the fetcher every 6 hours via pg_cron + pg_net.
--    (Deploy the function with JWT verification OFF so the cron call needs no key:
--     `supabase functions deploy news-fetch --no-verify-jwt`, or toggle it in the
--     Dashboard. The function itself writes with its own service-role key.)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Remove any previous copy of this job, then (re)create it.
select cron.unschedule('news-fetch-6h')
where exists (select 1 from cron.job where jobname = 'news-fetch-6h');

select cron.schedule(
  'news-fetch-6h',
  '0 */6 * * *',
  $$
  select net.http_post(
    url := 'https://bffwiqssacxedytwjztk.supabase.co/functions/v1/news-fetch',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

-- 3) Trigger one run right now to populate the feed immediately:
-- select net.http_post(
--   url := 'https://bffwiqssacxedytwjztk.supabase.co/functions/v1/news-fetch',
--   headers := '{"Content-Type":"application/json"}'::jsonb,
--   body := '{}'::jsonb
-- );
