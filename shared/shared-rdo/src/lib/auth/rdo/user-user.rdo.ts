import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';
import { Expose } from 'class-transformer';
import { UserTime } from '@project/shared/shared-types';

export class UserUserRdo extends UserRdo {
  @ApiProperty({
    description: 'Время на тренировку. Время на тренировку указывается в предопределённых интервалах в минутах.',
    example: UserTime.Three
  })
  @Expose()
  public timeOfTrain?: UserTime

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: 2000
  })
  @Expose()
  public caloriesToReset: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: 2000
  })
  @Expose()
  public caloriesToSpend: number;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    example: true
  })
  @Expose()
  public trainingReady: boolean;
}
