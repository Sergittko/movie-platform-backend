import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { lettersAndSpacesRegex } from '../../helpers/regex';

export class AuthSignUpDto {
  @IsEmail({}, { message: 'Email is required and must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(64, { message: 'Email is too long' })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(64, { message: 'Password is too long' })
  password!: string;

  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(8, {
    message: 'Confirm password must be at least 8 characters long',
  })
  @MaxLength(64, { message: 'Confirm password is too long' })
  confirmPassword!: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(64, { message: 'Name is too long' })
  @Matches(lettersAndSpacesRegex, {
    message: 'Name must be only letters and spaces',
  })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  avatar?: string;
}

export class AuthSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}

export class AuthResetPasswordDto {
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(64, { message: 'Password is too long' })
  @IsOptional()
  oldPassword!: string;

  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(8, {
    message: 'Confirm password must be at least 8 characters long',
  })
  @MaxLength(64, { message: 'Confirm password is too long' })
  @IsOptional()
  newPassword!: string;
}
