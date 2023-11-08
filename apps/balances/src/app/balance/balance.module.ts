import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigBalancesModule } from '@project/config/config-balances';
import { UserRepositoryModule } from '@project/repositories/user-repository';
import { BalanceRepositoryModule } from '@project/repositories/balance-repository';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/util/util-core';
import { BalanceController } from './balance.controller';
import { JwtAccessStrategy } from '@project/util/util-core';
import { BalanceService } from './balance.service';

@Module({
    imports: [
    ConfigBalancesModule,
    BalanceRepositoryModule,
    UserRepositoryModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, JwtAccessStrategy],
})
export class BalanceModule {}
