import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { WorkoutsController } from './workouts.controller';
import { HttpModule } from '@nestjs/axios';
import { ENV_BFF_FILE_PATH, HttpClientParam } from './app.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';
import appConfig from './app.config';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: ENV_BFF_FILE_PATH
    }),
  ],
  controllers: [
    UsersController,
    WorkoutsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
