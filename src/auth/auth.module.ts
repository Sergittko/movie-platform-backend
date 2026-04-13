import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { SupabaseModule } from '@/auth/supabase/supabase.module';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule {}
