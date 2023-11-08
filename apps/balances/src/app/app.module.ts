import { Module } from '@nestjs/common';
import { BalanceModule } from './balance/balance.module';
import { ConfigName, ConfigBalancesModule } from '@project/config/config-balances';
import { BalanceRepositoryModule } from '@project/repositories/balance-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/util/util-core';

@Module({
  imports: [
    BalanceModule,  
    ConfigBalancesModule,
    BalanceRepositoryModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConfigName.Db)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
