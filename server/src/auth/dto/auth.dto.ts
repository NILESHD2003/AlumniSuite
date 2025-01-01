import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum AccountType {
  HOST = 'host',
  ALUMNI = 'member',
}

export class loginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  // @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  role: AccountType;
}

export class registerHostDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  confirmPassword: string;

  @IsString()
  @MaxLength(8)
  @IsOptional()
  address?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;
}

export class sendOtpDto {
  @IsNotEmpty()
  @IsString()
  hostName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
