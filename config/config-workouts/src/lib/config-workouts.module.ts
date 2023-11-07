import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_WORKOUTS_FILE_PATH } from './config-workouts.constant';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';
import rabbitConfig from './config/rabbit.config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig, dbConfig],
      envFilePath: ENV_WORKOUTS_FILE_PATH
    }),
  ]
})
export class ConfigWorkoutsModule {}
