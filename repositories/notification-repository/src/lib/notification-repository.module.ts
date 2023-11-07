import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationRepository } from './notification.repository';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, NotificationRepository],
  exports: [PrismaModule, NotificationRepository]
})
export class NotificationRepositoryModule {}
