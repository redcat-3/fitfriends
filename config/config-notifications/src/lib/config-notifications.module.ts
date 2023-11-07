import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_NOTIFICATIONS_FILE_PATH } from './config-notifications.constant';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, dbConfig],
      envFilePath: ENV_NOTIFICATIONS_FILE_PATH
    }),
  ]
})
export class ConfigNotificationsModule {}
