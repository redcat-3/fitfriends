import { Module } from '@nestjs/common';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { DEFAULT_OPTION_SPACE } from './email-subscriber/email-subscriber.constant';

@Module({
  imports: [
    ConfigNotifyModule,
    EmailSubscriberModule,
    MongooseModule.forRootAsync(getMongooseOptions(DEFAULT_OPTION_SPACE)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
