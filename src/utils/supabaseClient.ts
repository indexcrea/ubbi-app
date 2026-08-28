import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables with fallback support for both standard and NEXT_PUBLIC_ names
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://placeholder-ubbi.supabase.co";

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url !== undefined && url !== "" && url !== "https://placeholder-ubbi.supabase.co";
};
