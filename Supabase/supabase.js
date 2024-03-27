import { createClient } from "@supabase/supabase-js"


const SupaBaseURL = 'https://ktwhvzmmaqaumjvobuqn.supabase.co'
const SupaBaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0d2h2em1tYXFhdW1qdm9idXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3OTE4NzksImV4cCI6MjAyMjM2Nzg3OX0.S8wSTR3T7nKW5sfBE6m4zUsjo0nVyaAp9OC8zDeDhOc'

export const Supa = 
createClient(SupaBaseURL,SupaBaseAnonKey);