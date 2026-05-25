import { Body, Controller, Get, Post, Request } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { AuthResetPasswordDto, AuthSignInDto, AuthSignUpDto } from '@/auth/dto/auth.dto';
import { AuthResponse } from '@/auth/dto/auth-response.dto';
import { Public } from '@/common/decorators/public.decorator';
import type { RequestWithUser } from '@/interfaces/http';

@Controller()
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signUp')
  signUp(@Body() dto: AuthSignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signIn')
  signIn(@Body() dto: AuthSignInDto): Promise<AuthResponse> {
    return this.authService.signIn(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: AuthResetPasswordDto, @Request() req: any): Promise<any> {
    return this.authService.resetPassword({ dto, email: req.user.email });
  }

  @Public()
  @Post('refresh')
  refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  @Get('me')
  getMe(@Request() req: RequestWithUser) {
    return this.authService.getMe(req.user);
  }
}
