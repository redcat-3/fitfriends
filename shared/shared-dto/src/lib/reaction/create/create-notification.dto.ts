import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { NotificationTextLength } from '../reaction.constant';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'User ID',
    example: '652ffdf03cb7412c4cd5994a'
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Text of notification',
    example: 'Вас добавили в друзья'
  })
  @IsString()
  @MinLength(NotificationTextLength.Min)
  @MaxLength(NotificationTextLength.Max)
  public text: string;
}
