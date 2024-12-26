import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostDto, CreatePostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/all/:hostId')
  async getAllPosts(
    @Param('hostId') hostId: string,
  ): Promise<{ success: boolean; message: string; data: GetPostDto[] }> {
    return this.postService.getAllPosts(hostId);
  }

  @Post('/create')
  async createPost(
    @Body() dto: CreatePostDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.postService.createPost(dto);
  }
}
