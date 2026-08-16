-- Comments for the museum.
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- Row Level Security is ON with no policies, which denies every anon/authenticated
-- request outright. Only the service-role key can read or write, and that key is
-- used exclusively from the server in app/api/comments/route.ts. The browser never
-- talks to Supabase directly, so there is no public key to abuse.

create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  slug       text        not null,
  parent_id  uuid        references public.comments (id) on delete cascade,
  author     text        not null check (char_length(author) between 1 and 40),
  body       text        not null check (char_length(body) between 1 and 2000),
  ip_hash    text,
  created_at timestamptz not null default now()
);

-- listing a thread
create index if not exists comments_slug_created_idx
  on public.comments (slug, created_at);

-- rate limiting looks up recent posts by the same hashed IP
create index if not exists comments_ip_recent_idx
  on public.comments (ip_hash, created_at desc);

alter table public.comments enable row level security;

-- Deleting spam: Dashboard → Table Editor → comments → select the row → Delete.
-- Deleting a parent removes its replies too (on delete cascade).
