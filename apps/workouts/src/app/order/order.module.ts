import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigWorkoutsModule } from '@project/config/config-workouts';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { WorkoutRepositoryModule } from '@project/repositories/workout-repository';
import { BalanceRepositoryModule } from '@project/repositories/balance-repository';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { OrdersController } from './order.controller';
import { JwtAccessStrategy } from '@project/util/util-core';
import { OrdersService } from './order.service';

@Module({
    imports: [
    WorkoutRepositoryModule,
    UserRepositoryModule,
    ConfigWorkoutsModule,
    BalanceRepositoryModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtAccessStrategy],
})
export class OrderModule {}
