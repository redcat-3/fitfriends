import { IWorkout, RabbitRouting, Subscriber } from '@project/shared/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/config/config-notify';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EmailSubject } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
  ) {}
  @RabbitSubscribe({
    exchange: 'fitfriends.notify.newsletter',
    routingKey: RabbitRouting.SendNewsletter,
    queue: 'fitfriends.notify.newsletter',
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

  public async sendNewsletter(email: string, workoutInfo: IWorkout[]) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EmailSubject.Newsletter,
      template: './newsletter',
      context: {
      posts: workoutInfo
      }
    })
  }
}
