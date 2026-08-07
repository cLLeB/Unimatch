-- UniMatch Ghana — student state
--
-- One row per authenticated student. Row-level security is what protects the
-- data: the anon key is public by design and ships in the browser bundle, so
-- every policy below is load-bearing.

create table if not exists public.student_state (
  user_id uuid primary key references auth.users (id) on delete cascade,

  -- Profile
  name text not null default '',
  email text not null default '',
  school text not null default '',
  track text not null default '',

  -- WASSCE results, shaped as the domain's StudentResults.
  -- Stored as jsonb so the grade model can evolve without a migration per field.
  results jsonb,

  saved_programme_ids text[] not null default '{}',
  compared_programme_ids text[] not null default '{}',
  checklist jsonb not null default '{}'::jsonb,
  search_history text[] not null default '{}',

  reminders jsonb not null default
    '{"sms": false, "email": true, "whatsapp": false}'::jsonb,
  theme text not null default 'light' check (theme in ('light', 'dark')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.student_state is
  'Per-student app state. Mirrors StudentState in src/state/types.ts.';

-- Keep updated_at honest.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists student_state_touch_updated_at on public.student_state;
create trigger student_state_touch_updated_at
  before update on public.student_state
  for each row execute function public.touch_updated_at();

-- ── Row-level security ──────────────────────────────────────────────────────
alter table public.student_state enable row level security;

drop policy if exists "students read own state" on public.student_state;
create policy "students read own state"
  on public.student_state for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "students insert own state" on public.student_state;
create policy "students insert own state"
  on public.student_state for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "students update own state" on public.student_state;
create policy "students update own state"
  on public.student_state for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "students delete own state" on public.student_state;
create policy "students delete own state"
  on public.student_state for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Deliberately no policy for the `anon` role: a signed-out visitor can read and
-- write nothing here. Their grades stay in their own browser.
