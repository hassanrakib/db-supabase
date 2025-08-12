import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    "https://czvpvlzdnozcjxjlryaz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dnB2bHpkbm96Y2p4amxyeWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTcxMTgsImV4cCI6MjA3MDQ5MzExOH0.E6exTcZAs36Dy0JMekdvJfCxZiNmbto06uPmHhUAF-k"
);