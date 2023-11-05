import { RabbitRouting, Subscriber } from '@project/shared/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/config/config-notify';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EmailSubject } from './mail.constant';
import { NewsletterDto } from '@project/shared/shared-dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
  ) {}
  @RabbitSubscribe({
    exchange: 'fitfriends.subscriber',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.notify.subscriber',
  })
  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EmailSubject.AddSubscriber,
      template: '../../assets/add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.subscriber',
    routingKey: RabbitRouting.RemoveSubscriber,
    queue: 'fitfriends.notify.subscriber',
  })
  public async sendNotifyRemoveSubscriber(email: string, coach: string, name: string) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EmailSubject.RemoveSubscriber,
      template: '../../assets/remove-subscriber',
      context: {
        user: `${name}`,
        coach: `${coach}`,
      }
    })
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.newsletter',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'fitfriends.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: dto.email,
      subject: EmailSubject.Newsletter,
      template: '../../assets/newsletter',
      context: {
      user: dto.name,
      coach: dto.coach,
      workout: dto.workoutInfo
      }
    })
  }
}
