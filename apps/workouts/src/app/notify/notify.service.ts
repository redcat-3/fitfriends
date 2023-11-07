import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-workouts';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/shared-types';
import { NewsletterDto } from '@project/shared/shared-dto';


@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {
    console.log(rabbitConfig.KEY);
  }

  public async sendNewsletter(dto: NewsletterDto) {
    return this.rabbitClient.publish<NewsletterDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewsletter,
      { ...dto }
    );
  }
}
