-- ============================================================
-- Next-Gen Learning Dashboard — Supabase schema & seed data
-- Run this in the Supabase SQL Editor for your project.
-- ============================================================

-- Courses table -------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

alter table public.courses enable row level security;

-- Public read access (no auth implemented in this prototype).
-- Tighten this before shipping anything beyond a demo.
create policy "Allow public read access on courses"
  on public.courses for select
  using (true);

insert into public.courses (title, progress, icon_name, created_at) values
  ('Advanced React Patterns', 78, 'Atom', now() - interval '70 days'),
  ('Systems Design Fundamentals', 42, 'Network', now() - interval '60 days'),
  ('TypeScript Deep Dive', 95, 'FileCode2', now() - interval '45 days'),
  ('Applied Statistics', 16, 'BarChart3', now() - interval '20 days');

-- Activity table (optional, powers the contribution heatmap) ----
create table if not exists public.activity (
  id uuid primary key default gen_random_uuid(),
  activity_date date not null,
  minutes integer not null default 0
);

alter table public.activity enable row level security;

create policy "Allow public read access on activity"
  on public.activity for select
  using (true);

-- Seed ~18 weeks of pseudo-random activity for the heatmap.
insert into public.activity (activity_date, minutes)
select
  d::date,
  case
    when random() > 0.8 then (random() * 60 + 90)::int
    when random() > 0.55 then (random() * 40 + 40)::int
    when random() > 0.3 then (random() * 25 + 10)::int
    else 0
  end
from generate_series(
  current_date - interval '125 days',
  current_date,
  interval '1 day'
) as d;
