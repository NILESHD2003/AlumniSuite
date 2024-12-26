import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust based on your project structure
import { GetPostDto } from './dto/post.dto'; // Adjust the import path as well

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(
    hostId: string,
  ): Promise<{ success: boolean; message: string; data: GetPostDto[] }> {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          hostId: hostId,
        },
        include: {
          user: true, // Include related Member (user) data
          host: true, // Include related Host data (if you have a Host relation)
        },
      });

      const data = posts.map((post) => ({
        id: post.id,
        userId: post.user,
        hostId: post.host,
        content: post.content,
        attachments: post.attachments || [],
        likesCount: post.likesCount.toString(),
        commentsCount: post.commentsCount.toString(),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }));

      return {
        success: true,
        message: 'Posts Fetched Successfully',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data: data,
      };
    } catch (error) {
      console.error('Error getting all posts', error);
      throw new InternalServerErrorException('Failed to fetch posts');
    }
  }

  async createPost(dto: any): Promise<{ success: true; message: string }> {
    try {
      console.log('Creating new post for host: ', dto.hostId);
      console.log(dto);

      throw new InternalServerErrorException(
        'Failed to creating new post for host: ' + dto.hostId,
      );

      return {
        success: true,
        message: 'Post Created Successfully',
      };
    } catch (error) {
      console.error('Error during Creating Post:', error);
      throw new InternalServerErrorException('Error Creating Post');
    }
  }
}
