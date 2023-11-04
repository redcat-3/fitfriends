import { IsArray, IsEmail, IsString } from 'class-validator';
import { EmailError} from '../email-subscriber.constant';
import { IWorkout } from '@project/shared/shared-types';

export class NewsletterDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsArray()
  public workouts: IWorkout[];

  @IsString()
  public id: string;
}
