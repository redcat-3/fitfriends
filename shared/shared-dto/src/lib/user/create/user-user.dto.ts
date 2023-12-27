import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { UserTime } from '@project/shared/shared-types';
import { CountCaloriesToReset, CountCaloriesToSpend, ExampleValueUser } from '../user-dto.constant';

export class UserUserDto extends UserDto{
  @ApiProperty({
    description: 'Время на тренировку. Время на тренировку указывается в предопределённых интервалах в минутах.',
    example: UserTime.Three
  })
  @IsEnum(UserTime)
  @IsOptional()
  public timeOfTraining?: UserTime;
     
  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: ExampleValueUser.Calories
  })
  @IsNumber()
  @Min(CountCaloriesToReset.Min)
  @Max(CountCaloriesToReset.Max)
  public caloriesToReset: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: ExampleValueUser.Calories
  })
  @IsNumber()
  @Min(CountCaloriesToSpend.Min)
  @Max(CountCaloriesToSpend.Max)
  public caloriesToSpend: number;
}
