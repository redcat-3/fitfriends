import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsBoolean, IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { UserTime } from '@project/shared/shared-types';
import { CountCaloriesToReset, CountCaloriesToSpend } from './user-dto.constant';

export class UserUserDto extends UserDto{
  @ApiProperty({
    description: 'Время на тренировку. Время на тренировку указывается в предопределённых интервалах в минутах.',
    example: UserTime.Three
  })
  @IsEnum(UserTime)
  @IsOptional()
  public timeOfTrain?: UserTime;
     
  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: 2000
  })
  @IsNumber()
  @Min(CountCaloriesToReset.Min)
  @Max(CountCaloriesToReset.Max)
  public caloriesToReset: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: 2000
  })
  @IsNumber()
  @Min(CountCaloriesToSpend.Min)
  @Max(CountCaloriesToSpend.Max)
  public caloriesToSpend: number;

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    example: true
  })
  @IsBoolean()
  public trainingReady: boolean;
}
