import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubscriberMessages } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberMessages.InvalidEmail })
  public email: string;

  @IsNotEmpty({ message: SubscriberMessages.EmptyName })
  public name: string;
}
