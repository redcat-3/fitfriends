import { Subscriber } from '@project/shared/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/config/config-notify';
import { EmailSubject } from './mail.constant';
import { NewsletterDto } from '@project/shared/shared-dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notifyConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notifyConfig>,
  ) {}

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
