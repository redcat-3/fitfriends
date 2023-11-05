import { IsEmail, IsMongoId, IsObject, IsString } from 'class-validator';
import { MailMessages } from '../reaction.constant';
import { IWorkout } from '@project/shared/shared-types';

export class NewsletterDto {
  @IsEmail({}, { message: MailMessages.InvalidEmail })
  public email: string;

  @IsObject()
  public workoutInfo: IWorkout;

  @IsString()
  name: string;

  @IsMongoId()
  coach: string;
}
