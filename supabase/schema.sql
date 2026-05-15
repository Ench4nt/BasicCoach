-- Run this in the Supabase SQL Editor to create all tables

create table if not exists courses (
  id          text primary key,
  title       text not null,
  description text,
  price       integer not null, -- in cents
  thumbnail   text default '',
  level       text default 'Beginner',
  video_ids   text[] default '{}'
);

create table if not exists videos (
  id           text primary key,
  course_id    text not null references courses(id) on delete cascade,
  title        text not null,
  bunny_video_id text not null,
  "order"      integer not null default 0,
  duration     text
);

create table if not exists purchases (
  uid               text not null,
  course_id         text not null references courses(id),
  stripe_session_id text,
  amount            integer,
  purchased_at      timestamptz default now(),
  primary key (uid, course_id)
);

-- Indexes
create index if not exists videos_course_id_idx on videos(course_id);
create index if not exists purchases_uid_idx on purchases(uid);

-- RLS: enable but allow service-role key full access (all ops come from server)
alter table courses   enable row level security;
alter table videos    enable row level security;
alter table purchases enable row level security;

-- Courses and videos are publicly readable
create policy "courses are public"    on courses   for select using (true);
create policy "videos are public"     on videos    for select using (true);

-- Purchases: readable only by the owning user (when using anon key)
-- With service-role key (server-side) RLS is bypassed automatically
create policy "own purchases"         on purchases for select using (auth.uid()::text = uid);
