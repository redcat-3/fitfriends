import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepositoryModule } from '@project/repositories/workout-repository';
import { JwtAccessStrategy } from '@project/util/util-core';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigWorkoutsModule } from '@project/config/config-workouts';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { NotifyModule } from '../notify/notify.module';
import { NotificationRepositoryModule } from '@project/repositories/notification-repository';

@Module({
  imports: [
    WorkoutRepositoryModule,
    UserRepositoryModule,
    NotifyModule,
    ConfigWorkoutsModule,
    NotificationRepositoryModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, JwtAccessStrategy],
})
export class WorkoutModule {}
