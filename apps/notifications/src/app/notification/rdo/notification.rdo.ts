import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationRdo {
  @ApiProperty({
    description: 'Unique Notification ID',
    example: 23
  })
  @Expose()
  public notificationId: number;

  @ApiProperty({
    description: 'ID пользователя',
    example: 'kjhkjhlkhl6467467'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Text of notification',
    example: 'Вас добавили в друзья'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Notification creating date',
  })
  @Expose()
  public createdDate: string;

  @ApiProperty({
    description: 'Flag active notification',
    example: true
  })
  @Expose()
  public isActive: boolean;
}
