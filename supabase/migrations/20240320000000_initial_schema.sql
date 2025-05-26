-- Enable RLS
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz
);

-- Create social_accounts table
create table public.social_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  platform text not null,
  platform_account_id text not null,
  account_name text not null,
  access_token_encrypted text not null,
  token_expires_at timestamptz,
  connected_at timestamptz default now() not null,
  status text default 'active' not null,
  constraint valid_platform check (platform in ('facebook', 'instagram')),
  constraint valid_status check (status in ('active', 'revoked', 'needs_reauth'))
);

-- Create scheduled_posts table
create table public.scheduled_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  social_account_id uuid references public.social_accounts on delete cascade not null,
  content text not null,
  media_urls text[],
  scheduled_at timestamptz not null,
  status text default 'pending' not null,
  published_at timestamptz,
  error_message text,
  created_at timestamptz default now() not null,
  constraint valid_status check (status in ('pending', 'publishing', 'published', 'failed'))
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.social_accounts enable row level security;
alter table public.scheduled_posts enable row level security;

-- Create RLS policies for profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create RLS policies for social_accounts
create policy "Users can view own social accounts"
  on public.social_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own social accounts"
  on public.social_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own social accounts"
  on public.social_accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete own social accounts"
  on public.social_accounts for delete
  using (auth.uid() = user_id);

-- Create RLS policies for scheduled_posts
create policy "Users can view own scheduled posts"
  on public.scheduled_posts for select
  using (auth.uid() = user_id);

create policy "Users can insert own scheduled posts"
  on public.scheduled_posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own scheduled posts"
  on public.scheduled_posts for update
  using (auth.uid() = user_id);

create policy "Users can delete own scheduled posts"
  on public.scheduled_posts for delete
  using (auth.uid() = user_id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 