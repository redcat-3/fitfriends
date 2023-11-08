import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BalanceRepository } from './balance.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, BalanceRepository],
  exports: [PrismaModule, BalanceRepository]
})
export class BalanceRepositoryModule {}
