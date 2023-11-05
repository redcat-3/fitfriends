import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { NotifyService } from './notify.service';
import { DEFAULT_OPTION_SPACE } from './notify.constant';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule,
      getRabbitMQOptions(DEFAULT_OPTION_SPACE)
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
