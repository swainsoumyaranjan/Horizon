CREATE EXTENSION IF NOT EXISTS postgis;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  bio text,
  location geometry(Point, 4326),
  causes jsonb DEFAULT '[]'::jsonb,
  impact_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  location geometry(Point, 4326),
  website text,
  causes jsonb DEFAULT '[]'::jsonb,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location geometry(Point, 4326),
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  organizer_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  causes jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Content table
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail text,
  type text NOT NULL,
  causes jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  description text,
  type text NOT NULL,
  causes jsonb DEFAULT '[]'::jsonb,
  location text,
  deadline timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Organizations are viewable by everyone"
  ON organizations FOR SELECT
  USING (true);

CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Content is viewable by everyone"
  ON content FOR SELECT
  USING (true);

CREATE POLICY "Opportunities are viewable by everyone"
  ON opportunities FOR SELECT
  USING (true);