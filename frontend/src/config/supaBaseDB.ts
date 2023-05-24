import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://kwbwgorqvpvraiucnkqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Yndnb3JxdnB2cmFpdWNua3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NTcyMzAsImV4cCI6MTk5NjQzMzIzMH0.VmWDc7nyEelhmjSO60IjxYnxZU9PZLw3KzaHluvHdxs"
);
export default supabase;
