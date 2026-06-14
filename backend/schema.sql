-- Database schema (Supabase / PostgreSQL).
-- Run in: Supabase Dashboard -> SQL Editor -> New query.

create table if not exists projects (
  id          bigint generated always as identity primary key,
  title       text        not null,
  description text        not null,
  tech_stack  text[]      not null default '{}',
  repo_url    text,
  live_url    text,
  image_url   text,
  featured    boolean     not null default false,
  "order"     integer     not null default 0,   -- quoted: 'order' is a reserved word
  created_at  timestamptz not null default now()
);

create table if not exists messages (
  id         bigint generated always as identity primary key,
  name       text        not null,
  email      text        not null,
  body       text        not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: the backend uses the service key (which bypasses RLS),
-- but we keep the tables closed by default against the anon key.
alter table projects enable row level security;
alter table messages enable row level security;

-- Public read access for projects (if you prefer exposing them via the anon key
-- directly). If all access goes through the backend with the service key, you can
-- omit this policy.
create policy "projects_public_read" on projects
  for select using (true);
