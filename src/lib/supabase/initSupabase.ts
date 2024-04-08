import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from '@/environment';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);