-- Manaslu Circuit Trek Companion — Supabase schema.
--
-- Run this in your Supabase project: SQL Editor -> New query -> paste -> Run.
-- It is idempotent (safe to re-run). It creates the tables, Row Level Security
-- policies, the public "photos" storage bucket, and the RPC that powers the public
-- live-tracking link.

create extension if not exists pgcrypto;

-- ============================================================================
-- profiles: one row per user; share_token drives the public follow link
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  share_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ============================================================================
-- progress: synced stage completion
-- ============================================================================
create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  stage_id text not null,
  done_at timestamptz not null default now(),
  primary key (user_id, stage_id)
);

alter table public.progress enable row level security;

drop policy if exists progress_all_own on public.progress;
create policy progress_all_own on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- locations: GPS breadcrumbs for live sharing
-- ============================================================================
create table if not exists public.locations (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  lat double precision not null,
  lng double precision not null,
  accuracy double precision,
  elevation double precision,
  recorded_at timestamptz not null default now()
);

create index if not exists locations_user_time_idx
  on public.locations (user_id, recorded_at desc);

alter table public.locations enable row level security;

-- Owner can write and read their own breadcrumbs. Anonymous followers do NOT read
-- this table directly — they use the latest_shared_location() RPC below.
drop policy if exists locations_insert_own on public.locations;
create policy locations_insert_own on public.locations
  for insert with check (auth.uid() = user_id);

drop policy if exists locations_select_own on public.locations;
create policy locations_select_own on public.locations
  for select using (auth.uid() = user_id);

-- ============================================================================
-- news: public feed, authenticated users post
-- ============================================================================
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  title text not null,
  category text not null default 'general',
  summary text not null,
  source text,
  author uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.news enable row level security;

drop policy if exists news_select_public on public.news;
create policy news_select_public on public.news
  for select using (true);

drop policy if exists news_insert_auth on public.news;
create policy news_insert_auth on public.news
  for insert to authenticated with check (auth.uid() = author);

drop policy if exists news_update_own on public.news;
create policy news_update_own on public.news
  for update to authenticated using (auth.uid() = author);

drop policy if exists news_delete_own on public.news;
create policy news_delete_own on public.news
  for delete to authenticated using (auth.uid() = author);

-- ============================================================================
-- journal: private photo journal (owner-only)
-- ============================================================================
create table if not exists public.journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  caption text,
  image_path text not null,
  stage_id text,
  lat double precision,
  lng double precision,
  taken_at timestamptz not null default now()
);

alter table public.journal enable row level security;

drop policy if exists journal_all_own on public.journal;
create policy journal_all_own on public.journal
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- tracks: imported GPX watch tracks (id is a client-generated string)
-- ============================================================================
create table if not exists public.tracks (
  id text primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  geojson jsonb not null,
  stats jsonb,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.tracks enable row level security;

drop policy if exists tracks_all_own on public.tracks;
create policy tracks_all_own on public.tracks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- RPC: latest shared location for a public follow token
-- SECURITY DEFINER so anonymous followers see only the latest position + name,
-- never the underlying locations table.
-- ============================================================================
create or replace function public.latest_shared_location(token uuid)
returns table (
  lat double precision,
  lng double precision,
  accuracy double precision,
  elevation double precision,
  recorded_at timestamptz,
  display_name text
)
language sql
security definer
set search_path = public
as $$
  select l.lat, l.lng, l.accuracy, l.elevation, l.recorded_at, p.display_name
  from public.profiles p
  join public.locations l on l.user_id = p.id
  where p.share_token = token
  order by l.recorded_at desc
  limit 1;
$$;

grant execute on function public.latest_shared_location(uuid) to anon, authenticated;

-- ============================================================================
-- Storage: public "photos" bucket for the journal
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

drop policy if exists photos_public_read on storage.objects;
create policy photos_public_read on storage.objects
  for select using (bucket_id = 'photos');

drop policy if exists photos_insert_own on storage.objects;
create policy photos_insert_own on storage.objects
  for insert to authenticated
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists photos_update_own on storage.objects;
create policy photos_update_own on storage.objects
  for update to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists photos_delete_own on storage.objects;
create policy photos_delete_own on storage.objects
  for delete to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
