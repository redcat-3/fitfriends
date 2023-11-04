import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncOptions } from '@project/util/util-core';
import { DEFAULT_OPTION_SPACE } from './mail.constant';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions(DEFAULT_OPTION_SPACE)),
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
