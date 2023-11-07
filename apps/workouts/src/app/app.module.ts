import { Module } from '@nestjs/common';
import { ConfigName, ConfigWorkoutsModule } from '@project/config/config-workouts';
import { WorkoutModule } from './workout/workout.module';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { FeedbackModule } from './feedback/feedback.module';
import { OrderModule } from './order/order.module';
import { NotifyModule } from './notify/notify.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { NotificationRepositoryModule } from '@project/repositories/notification-repository';

@Module({
  imports: [
    ConfigWorkoutsModule,
    WorkoutModule,
    FeedbackModule,
    UserRepositoryModule,
    NotificationRepositoryModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConfigName.Db)),
    OrderModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
