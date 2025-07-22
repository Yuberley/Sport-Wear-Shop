import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase SOLO para Client Components
// Las variables con NEXT_PUBLIC_ están disponibles en el cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY must be defined for client-side Supabase client");
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
