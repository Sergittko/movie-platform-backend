import { Injectable } from '@nestjs/common';
import { BadRequest } from 'http-errors';

import { AuthResetPasswordDto, AuthSignInDto, AuthSignUpDto } from '@/auth/dto/auth.dto';
import { Supabase } from '@/auth/supabase/supabase';
import { handleCatchError } from '@/helpers/handle-catch-error';
import { throwError } from '@/helpers/throwError';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: Supabase,
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async signUp(dto: AuthSignUpDto): Promise<any> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequest(`Confirm password doesn't match password`);
    }

    const supabase = this.supabase.getClient();

    const { data: response, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (error) throwError({ error });

    if (!response?.user) {
      throw new BadRequest('User creation failed');
    }

    await this.prisma.profile.create({
      data: {
        email: dto.email,
        name: dto.name,
        userId: response.user.id,
      },
    });

    return {
      data: {
        user: {
          email: response.user.email,
          id: response.user.id,
        },
        access_token: response.session?.access_token,
        refresh_token: response.session?.refresh_token,
      },
    };
  }

  public async signIn(dto: AuthSignInDto): Promise<any> {
    const supabase = this.supabase.getClient();

    const { data: response, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) throwError({ error });

    if (!response?.session) {
      throw new BadRequest('Auth session missing');
    }

    return {
      data: {
        user: {
          email: response.user.email,
          id: response.user.id,
        },
        access_token: response.session.access_token,
        refresh_token: response.session.refresh_token,
      },
    };
  }

  public async resetPassword({
    dto: { oldPassword, newPassword },
    email,
  }: {
    dto: AuthResetPasswordDto;
    email: string;
  }): Promise<any> {
    try {
      const supabase = this.supabase.getClient();

      if (newPassword === oldPassword) {
        throw new BadRequest(`Old password should not match new password`);
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: oldPassword,
      });

      if (signInError) {
        throw new BadRequest(signInError.message);
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw new BadRequest(updateError.message);
      }

      return { message: 'Password updated successfully' };
    } catch (error) {
      handleCatchError(error);
    }
  }

  public async refreshTokens(refreshToken: string): Promise<any> {
    try {
      const supabase = this.supabase.getClient();

      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) throw new BadRequest(error.message);

      if (!data?.session) throw new BadRequest('Auth session missing!');

      const { session } = data;

      return {
        data: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          user: {
            id: session.user.id,
            email: session.user.email,
          },
        },
      };
    } catch (error) {
      handleCatchError(error);
    }
  }

  public getMe(user: { id: string; email: string }) {
    return {
      data: {
        user,
      },
    };
  }
}
