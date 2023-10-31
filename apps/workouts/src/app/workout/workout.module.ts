import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutRepositoryModule } from '@project/repositories/workout-repository';
import { JwtAccessStrategy } from '@project/util/util-core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigWorkoutsModule } from '@project/config/config-workouts';

@Module({
  imports: [
    WorkoutRepositoryModule,
    ConfigWorkoutsModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secretOrPrivateKey: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, JwtAccessStrategy],
})
export class WorkoutModule {}
