
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvolwmhbfqrtwamvhvzc.supabase.co';
const supabaseKey = 'sb_publishable_SJmNrHsYTNirf243nXfXcg_-k0Pbzbf';

export const supabase = createClient(supabaseUrl, supabaseKey);
