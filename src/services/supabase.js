import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltbwtffhuhfnakyripjb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0Ynd0ZmZodWhmbmFreXJpcGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NjMzOTgsImV4cCI6MjAxNjAzOTM5OH0.i3auA9wRIuAh8iBWA215-kHWrz5ChV_97RjxV-RTIqk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);