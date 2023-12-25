import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './controllers/users.controller';
import { WorkoutsController } from './controllers/workouts.controller';
import { HttpModule } from '@nestjs/axios';
import { ENV_BFF_FILE_PATH, HttpClientParam } from './app.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';
import appConfig from './app.config';
import { RequestsController } from './controllers/requests.controller';
import { OrdersController } from './controllers/orders.controller';
import { FeedbacksController } from './controllers/feedbacks.controller';
import { NotificationsController } from './controllers/notifications.controller';
import { BalancesController } from './controllers/balances.controller';

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
    RequestsController,
    OrdersController,
    FeedbacksController,
    NotificationsController,
    BalancesController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
