import { Module } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { PrismaModule } from './prisma/prisma.module';
// import { OrderRepository } from './order.repository';
// import { FeeddbackRepository } from './feedback.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, WorkoutRepository],
  exports: [PrismaModule, WorkoutRepository]
})
export class PostRepositoryModule {}
