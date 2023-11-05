import { Module } from '@nestjs/common';
import { ConfigName, ConfigUsersModule } from '@project/config/config-users';
import { AuthenticationModule } from './authentication/authentication.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';
import { UserModule } from './user/user.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigUsersModule,
    AuthenticationModule,
    RefreshTokenModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConfigName.Db)),
    UserModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
