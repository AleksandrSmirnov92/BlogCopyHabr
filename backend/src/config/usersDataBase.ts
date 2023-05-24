require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.ANON_KEY;
const supabaseUrl = "https://kwbwgorqvpvraiucnkqq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Yndnb3JxdnB2cmFpdWNua3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NTcyMzAsImV4cCI6MTk5NjQzMzIzMH0.VmWDc7nyEelhmjSO60IjxYnxZU9PZLw3KzaHluvHdxs";
export const supabase = createClient(supabaseUrl, supabaseKey);
