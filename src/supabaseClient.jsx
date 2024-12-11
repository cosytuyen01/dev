import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uvfozqvlvnitqnhykkqr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2Zm96cXZsdm5pdHFuaHlra3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NDg5OTUsImV4cCI6MjA0NzQyNDk5NX0.3wawVSnHQyKGFNyFOulE0lMPablNtw9uHdmN6agJb8o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
