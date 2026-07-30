import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log("======================================");
console.log("SUPABASE URL:", supabaseUrl);
console.log(
  "SUPABASE KEY:",
  supabaseAnonKey
    ? supabaseAnonKey.substring(0, 30) + "..."
    : "NÃO ENCONTRADA"
);
console.log("======================================");

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);