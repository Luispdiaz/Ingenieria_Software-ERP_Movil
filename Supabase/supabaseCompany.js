import { createClient } from "@supabase/supabase-js"

const supabaseUrlcompany = "https://vsdhddvwfeuuhqdscygz.supabase.co"
const supabaseAnonKeycompany = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZGhkZHZ3ZmV1dWhxZHNjeWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjM3MDksImV4cCI6MjAyNTk5OTcwOX0.FE-0zUqoMrH204EwZKKCBhDzR9uLQGAp2XX3S8Sv2jw"

export const Supabase = 
createClient(supabaseUrlcompany,supabaseAnonKeycompany
);