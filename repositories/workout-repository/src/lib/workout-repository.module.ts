import { Module } from '@nestjs/common';
import { PostRepository } from './workout.repository';
import { PrismaModule } from './prisma/prisma.module';
import { LikeRepository } from './like.repository';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, PostRepository,  LikeRepository, CommentRepository],
  exports: [PrismaModule, PostRepository,  LikeRepository, CommentRepository]
})
export class PostRepositoryModule {}
