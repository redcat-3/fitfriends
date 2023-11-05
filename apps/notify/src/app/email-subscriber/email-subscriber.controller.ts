import { CreateSubscriberDto } from '@project/shared/shared-dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/shared-types';
import { NewsletterDto } from '@project/shared/shared-dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.subscriber',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.notify.subscriber',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.subscriber',
    routingKey: RabbitRouting.RemoveSubscriber,
    queue: 'fitfriends.notify.subscriber',
  })
  public async delete(email: string, coach: string, name: string) {
    this.subscriberService.removeSubscriber(email);
    await this.mailService.sendNotifyRemoveSubscriber(email, coach, name);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.newsletter',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'fitfriends.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const recipient = await this.subscriberService.getSubscriber(dto.email);
    if (recipient && dto.workoutInfo) {
      await this.mailService.sendNewsletter(dto);
    }
  }
}
