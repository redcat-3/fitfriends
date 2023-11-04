import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigWorkoutsModule } from '@project/config/config-workouts';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { WorkoutRepositoryModule } from '@project/repositories/workout-repository';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { FeedbacksController } from './feedback.controller';
import { JwtAccessStrategy } from '@project/util/util-core';
import { FeedbacksService } from './feedback.service';

@Module({
    imports: [
    WorkoutRepositoryModule,
    UserRepositoryModule,
    ConfigWorkoutsModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, JwtAccessStrategy],
})
export class FeedbackModule {}
