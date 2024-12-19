import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcijucimrhbtywyadqlb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjaWp1Y2ltcmhidHl3eWFkcWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTQ2MDMsImV4cCI6MjA1MDE5MDYwM30.TS4IUrlcA4LQYGMWyKjL5x20_3GvtnGIso4I3UKt-LQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
