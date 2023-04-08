require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
