import { Module } from '@nestjs/common';
import { ConfigWorkoutsModule } from '@project/config/config-workouts';

@Module({
    imports: [
        ConfigWorkoutsModule,
      ],
      controllers: [],
      providers: [],
})
export class WorkoutModule {}
