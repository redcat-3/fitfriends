import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-users';
import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto } from '@project/shared/shared-dto';
import { RabbitRouting } from '@project/shared/shared-types';


@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async removeSubscriber(data: {email: string, coach: string, name: string}) {
    return this.rabbitClient.publish<typeof data>(
      this.rabbitOptions.exchange,
      RabbitRouting.RemoveSubscriber,
      { ... data }
    );
  }
}
