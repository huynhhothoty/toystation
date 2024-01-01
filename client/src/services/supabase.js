import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ocgrkzagggmeexxbnmfz.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZ3JremFnZ2dtZWV4eGJubWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NDg5NTYsImV4cCI6MjAxNjIyNDk1Nn0.K675Z4y3xg9_DMPLldn7mU2NKZbs4V6Em6Izpcc3N1A';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
