import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mdaioxhwgmweoghcmztd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYWlveGh3Z213ZW9naGNtenRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwODc4MTAsImV4cCI6MjA2NDY2MzgxMH0.45ngRk1EbroPy0X1M38HqmlDrDLM6zCWe52ZnIAswSg'

export const supabase = createClient(supabaseUrl, supabaseKey)
