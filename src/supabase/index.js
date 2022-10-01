import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgkveplzyagflujihxgq.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZna3ZlcGx6eWFnZmx1amloeGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0OTYyNjQsImV4cCI6MTk4MDA3MjI2NH0.mDNG62l-v7TP1soWuK_dvpt4_8PP2i8nVRhm1IWyyvg';

export const supabase = createClient(supabaseUrl, supabaseAnonToken);
