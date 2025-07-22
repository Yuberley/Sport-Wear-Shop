import { createClient } from "@supabase/supabase-js";

const isServer = typeof window === 'undefined';

const supabaseUrl = isServer 
    ? process.env.SUPABASE_URL 
    : process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey = isServer 
    ? process.env.SUPABASE_KEY 
    : process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Supabase URL and Key must be defined. Server: ${isServer}, URL: ${supabaseUrl ? 'defined' : 'undefined'}, KEY: ${supabaseKey ? 'defined' : 'undefined'}`);
}

export const supabase = createClient(supabaseUrl, supabaseKey);