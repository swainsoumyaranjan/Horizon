export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          bio: string | null
          location: unknown | null
          causes: Json | null
          impact_score: number
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          bio?: string | null
          location?: unknown | null
          causes?: Json | null
          impact_score?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          bio?: string | null
          location?: unknown | null
          causes?: Json | null
          impact_score?: number
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          description: string | null
          location: unknown | null
          website: string | null
          causes: Json | null
          verified: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          location?: unknown | null
          website?: string | null
          causes?: Json | null
          verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          location?: unknown | null
          website?: string | null
          causes?: Json | null
          verified?: boolean
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          location: unknown | null
          start_date: string
          end_date: string | null
          organizer_id: string
          causes: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location?: unknown | null
          start_date: string
          end_date?: string | null
          organizer_id: string
          causes?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: unknown | null
          start_date?: string
          end_date?: string | null
          organizer_id?: string
          causes?: Json | null
          created_at?: string
        }
      }
      content: {
        Row: {
          id: string
          title: string
          description: string | null
          url: string
          thumbnail: string | null
          type: string
          causes: Json | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          url: string
          thumbnail?: string | null
          type: string
          causes?: Json | null
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          url?: string
          thumbnail?: string | null
          type?: string
          causes?: Json | null
          featured?: boolean
          created_at?: string
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          organization_id: string
          description: string | null
          type: string
          causes: Json | null
          location: string | null
          deadline: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          organization_id: string
          description?: string | null
          type: string
          causes?: Json | null
          location?: string | null
          deadline?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          organization_id?: string
          description?: string | null
          type?: string
          causes?: Json | null
          location?: string | null
          deadline?: string | null
          created_at?: string
        }
      }
    }
  }
}