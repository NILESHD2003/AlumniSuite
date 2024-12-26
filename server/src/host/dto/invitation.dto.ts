import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

enum Role {
  Student = 'Student',
  Alumni = 'Alumni',
}

export class InvitationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsString()
  hostId: string;
}
