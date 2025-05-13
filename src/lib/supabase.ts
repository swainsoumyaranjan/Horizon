import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Real-time subscriptions
export const subscribeToProfile = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`profile:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      },
      callback
    )
    .subscribe();
};

export const subscribeToContent = (callback: (payload: any) => void) => {
  return supabase
    .channel('content_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'content'
      },
      callback
    )
    .subscribe();
};

export const subscribeToChat = (roomId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`chat:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}`
      },
      callback
    )
    .subscribe();
};