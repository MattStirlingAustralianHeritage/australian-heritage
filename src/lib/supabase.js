import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvgudgalrcfyilbkhyev.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2Z3VkZ2FscmNmeWlsYmtoeWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTU2OTEsImV4cCI6MjA4NzEzMTY5MX0.npsY3_W0t8kYdheoG5pyVjaZK5YyxvS-AJp7LHd2Z6A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
