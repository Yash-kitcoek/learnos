-- ============================================================
-- LearnOS — Supabase Setup & Seed
-- Run this in your Supabase SQL Editor:
-- https://app.supabase.com/project/<id>/sql/new
-- ============================================================

-- 1. Create the courses table
create table if not exists public.courses (
  id          uuid        default gen_random_uuid() primary key,
  title       text        not null,
  progress    integer     not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text        not null default 'BookOpen',
  created_at  timestamptz default now() not null
);

-- 2. Enable Row Level Security (recommended)
alter table public.courses enable row level security;

-- 3. Allow public read access (for server-side fetching)
create policy "Public read access"
  on public.courses
  for select
  using (true);

-- 4. Seed data — 4 courses matching Lucide icon names
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',   75, 'Code2'),
  ('Machine Learning Basics',   42, 'Brain'),
  ('PostgreSQL & Supabase',     88, 'Database'),
  ('Next.js App Router',        60, 'Globe');
