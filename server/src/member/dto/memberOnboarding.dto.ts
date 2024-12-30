import {
  IsNotEmpty,
  IsString,
  IsDate,
  MinLength,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export class MemberOnboardingBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  confirmPassword: string;
}

export class MemberOnboardingQueryDto {
  @IsNotEmpty()
  @IsString()
  invite: string;
}
