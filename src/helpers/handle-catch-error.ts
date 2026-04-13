import { BadRequestException } from '@nestjs/common';

type HttpErrorConstructor = new (message?: string) => Error;

export const handleCatchError = (
  error: unknown,
  Exception: HttpErrorConstructor = BadRequestException,
  fallbackMessage = 'Unknown error',
): never => {
  if (error instanceof Error) {
    throw new Exception(error.message);
  }

  throw new Exception(fallbackMessage);
};
