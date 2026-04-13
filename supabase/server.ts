/* eslint-disable @typescript-eslint/no-floating-promises */
import { ConfigModule } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

ConfigModule.forRoot();

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
);
