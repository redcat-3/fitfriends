import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_WORKOUTS_FILE_PATH } from './config-workouts.constant';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig],
      envFilePath: ENV_WORKOUTS_FILE_PATH
    }),
  ]
})
export class ConfigWorkoutsModule {}
