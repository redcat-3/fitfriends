import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RequestRepository } from './request.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, RequestRepository],
  exports: [PrismaModule, RequestRepository]
})
export class RequestRepositoryModule {}
