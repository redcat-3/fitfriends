import { Module } from '@nestjs/common';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [EmailSubscriberModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
