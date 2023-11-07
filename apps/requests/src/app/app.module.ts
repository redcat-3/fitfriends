import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { ConfigName, ConfigRequestsModule } from '@project/config/config-requests';
import { RequestRepositoryModule } from '@project/repositories/request-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { NotificationRepositoryModule } from '@project/repositories/notification-repository';

@Module({
  imports: [
    RequestModule,  
    ConfigRequestsModule,
    RequestRepositoryModule,
    NotificationRepositoryModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConfigName.Db)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
