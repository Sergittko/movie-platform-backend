import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { AppController } from '@/app.controller';
import { AuthModule } from '@/auth/auth.module';
import { SupabaseGuard } from '@/auth/supabase/supabase.guard';
import { SupabaseModule } from '@/auth/supabase/supabase.module';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule,
    SupabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    PrismaService,
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
