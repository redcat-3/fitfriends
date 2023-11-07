import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigNotificationsModule } from '@project/config/config-notifications';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { NotificationRepositoryModule } from '@project/repositories/notification-repository';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { NotificationController } from './notification.controller';
import { JwtAccessStrategy } from '@project/util/util-core';
import { NotificationService } from './notification.service';

@Module({
    imports: [
    ConfigNotificationsModule,
    NotificationRepositoryModule,
    UserRepositoryModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, JwtAccessStrategy],
})
export class NotificationModule {}
