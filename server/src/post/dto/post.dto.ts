import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetPostDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsObject()
  userId: object;

  @IsObject()
  hostId: object;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  attachments: Array<string>;

  @IsNotEmpty()
  @IsString()
  likesCount: string;

  @IsNotEmpty()
  @IsString()
  commentsCount: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  hostId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  attachments?: string[];
}
