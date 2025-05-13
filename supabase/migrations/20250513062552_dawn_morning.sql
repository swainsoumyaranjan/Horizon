CREATE TYPE content_type AS ENUM (
  'video',
  'article',
  'book',
  'ted_talk',
  'documentary',
  'report',
  'tiktok'
);

-- Update content table
ALTER TABLE content 
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS content_type content_type,
ADD COLUMN IF NOT EXISTS chat_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS like_count integer DEFAULT 0;

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES content(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(content_id, user_id)
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Reactions are viewable by everyone"
  ON reactions FOR SELECT
  USING (true);

CREATE POLICY "Users can create reactions"
  ON reactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Chat messages are viewable by everyone"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Users can send chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);