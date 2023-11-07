import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigRequestsModule } from '@project/config/config-requests';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { RequestRepositoryModule } from '@project/repositories/request-repository';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { RequestsController } from './request.controller';
import { JwtAccessStrategy } from '@project/util/util-core';
import { RequestsService } from './request.service';
import { NotificationRepositoryModule } from '@project/repositories/notification-repository';

@Module({
    imports: [
    ConfigRequestsModule,
    RequestRepositoryModule,
    UserRepositoryModule,
    NotificationRepositoryModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [RequestsController],
  providers: [RequestsService, JwtAccessStrategy],
})
export class RequestModule {}
