import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigName, ConfigNotificationsModule } from '@project/config/config-notifications';
import { NotificationRepositoryModule } from '@project/repositories/notification-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    NotificationModule,  
    ConfigNotificationsModule,
    NotificationRepositoryModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConfigName.Db)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
