const SUPABASE_URL = "https://jhwkbdhthtqcrbizherp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JAq4EornaeyWie3CjO5cyg_iTNpD9A_";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);