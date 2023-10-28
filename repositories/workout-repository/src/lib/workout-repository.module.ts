import { Module } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { PrismaModule } from './prisma/prisma.module';
// import { OrderRepository } from './order.repository';
import { FeedbackRepository } from './feedback.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, WorkoutRepository, FeedbackRepository],
  exports: [PrismaModule, WorkoutRepository, FeedbackRepository]
})
export class PostRepositoryModule {}
