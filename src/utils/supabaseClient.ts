import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables or use fallback placeholder for safe initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-ubbi.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder-ubbi.supabase.co"
  );
};
