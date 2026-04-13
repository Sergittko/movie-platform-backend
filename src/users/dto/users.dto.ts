import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { lettersAndSpacesRegex } from '../../helpers/regex';

export class ProfilePatchDataDto {
  @IsEmail({}, { message: 'Mmust be a valid email address' })
  @MaxLength(64, { message: 'Email is too long' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(64, { message: 'Name is too long' })
  @Matches(lettersAndSpacesRegex, {
    message: 'Name must be only letters and spaces',
  })
  @IsOptional()
  name?: string;
}
