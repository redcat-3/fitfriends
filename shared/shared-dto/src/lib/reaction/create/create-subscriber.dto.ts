import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import { SubscriberMessages } from '../reaction.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberMessages.InvalidEmail })
  public email: string;

  @IsNotEmpty({ message: SubscriberMessages.EmptyName })
  public name: string;

  @IsMongoId({ message: SubscriberMessages.InvalidCoachId })
  public coachId: string;
}
