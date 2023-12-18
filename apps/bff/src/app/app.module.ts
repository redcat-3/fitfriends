import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { WorkoutsController } from './workouts.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from './app.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    })
  ],
  controllers: [
    UsersController,
    WorkoutsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
