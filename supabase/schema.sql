-- SHAHIN4L CMS schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;
create table if not exists public.admin_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 email text not null unique,
 created_at timestamptz not null default now()
);
create table if not exists public.posts (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 slug text not null unique,
 excerpt text,
 content text not null,
 cover_url text,
 status text not null default 'draft' check(status in ('draft','published')),
 published_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists posts_publication_idx on public.posts(status,published_at desc);
create or replace function public.is_site_admin()
returns boolean language sql stable security definer set search_path=''
as $$ select exists(select 1 from public.admin_users where user_id=(select auth.uid())); $$;
alter table public.admin_users enable row level security;
alter table public.posts enable row level security;
drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record" on public.admin_users for select to authenticated using(user_id=(select auth.uid()));
drop policy if exists "Published posts are public" on public.posts;
create policy "Published posts are public" on public.posts for select to anon,authenticated using(status='published' or public.is_site_admin());
drop policy if exists "Admins can create posts" on public.posts;
create policy "Admins can create posts" on public.posts for insert to authenticated with check(public.is_site_admin());
drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts" on public.posts for update to authenticated using(public.is_site_admin()) with check(public.is_site_admin());
drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts" on public.posts for delete to authenticated using(public.is_site_admin());
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('media','media',true,5242880,array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict(id) do update set public=true,file_size_limit=5242880,allowed_mime_types=array['image/jpeg','image/png','image/webp','application/pdf'];
drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media" on storage.objects for select to anon,authenticated using(bucket_id='media');
drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media" on storage.objects for insert to authenticated with check(bucket_id='media' and public.is_site_admin());
drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media" on storage.objects for update to authenticated using(bucket_id='media' and public.is_site_admin()) with check(bucket_id='media' and public.is_site_admin());
drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media" on storage.objects for delete to authenticated using(bucket_id='media' and public.is_site_admin());
-- After inviting your email in Supabase Auth, run:
-- insert into public.admin_users(user_id,email) select id,email from auth.users where email='YOUR-ADMIN-EMAIL';
