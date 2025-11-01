create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  accent_color text,
  icon_url text,
  created_at timestamptz not null default now(),
  order_index integer not null default 0
);

create unique index if not exists categories_name_key on public.categories (lower(name));

insert into public.categories (name, slug, description, accent_color, order_index)
values
  ('Business', 'business', 'Market intelligence, corporate strategy, and growth insights.', '#f97316', 10),
  ('Technology', 'technology', 'Emerging tech, digital transformation, and innovation coverage.', '#2563eb', 20),
  ('Security', 'security', 'Cybersecurity trends, risk management, and resilience planning.', '#7c3aed', 30),
  ('Leadership', 'leadership', 'Executive leadership, culture, and people strategy features.', '#16a34a', 40),
  ('Markets', 'markets', 'Global markets, economics, and financial outlook.', '#ea580c', 50)
on conflict (slug) do nothing;

create table if not exists public.home_sections (
  id uuid primary key default gen_random_uuid(),
  internal_name text not null,
  kicker text,
  title text not null,
  subtitle text,
  layout_type text not null default 'feature',
  category_id uuid references public.categories(id) on delete set null,
  accent_color text,
  background_image_url text,
  action_label text,
  action_url text,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists home_sections_order_idx on public.home_sections (order_index);

create table if not exists public.home_section_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.home_sections(id) on delete cascade,
  title text not null,
  summary text,
  article_slug text,
  image_url text,
  badge text,
  action_label text,
  action_url text,
  featured boolean not null default false,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists home_section_items_section_order_idx on public.home_section_items (section_id, order_index);
create index if not exists home_section_items_article_slug_idx on public.home_section_items (article_slug);
