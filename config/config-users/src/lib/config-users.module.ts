import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { ENV_USERS_FILE_PATH } from './config-users.constant';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigUsersModule {}