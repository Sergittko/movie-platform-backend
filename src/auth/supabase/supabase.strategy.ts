import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticatedUser } from '@/interfaces/auth';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      algorithms: ['ES256'],

      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,

        jwksUri: 'https://ndqfvkxhwkdkwjowgsvj.supabase.co/auth/v1/.well-known/jwks.json',
      }),
    });
  }

  validate(payload: any): AuthenticatedUser {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
