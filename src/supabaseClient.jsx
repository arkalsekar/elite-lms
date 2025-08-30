import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase project details
const supabaseUrl = import.meta.env.VITE_SUPABSE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
