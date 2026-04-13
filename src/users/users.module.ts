import { Module } from '@nestjs/common';

import { SupabaseModule } from '../auth/supabase/supabase.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';

@Module({
  imports: [SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
// eslint-disable-next-line prettier/prettier
export class UsersModule {}
