import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/shared-types';
import { NewsletterDto } from './dto/newsletter.dto';
import { getNewWorkouts } from './utils/get-new-workouts';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.notify.subscriber',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'fitfriends.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const { email, workouts } = dto;
    const recipient = await this.subscriberService.getSubscriber(email);
    if (recipient && workouts.length > 0) {
      const newWorkouts = getNewWorkouts(dto, recipient);
      if (newWorkouts.length > 0) {
        await this.mailService.sendNewsletter(recipient.email, newWorkouts);
        this.subscriberService.updateDateSent(recipient);
      }
    }
  }
}
