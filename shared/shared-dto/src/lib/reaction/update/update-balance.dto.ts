import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { DEFAULT_NULL_VALUE, ExampleValue } from '../reaction.constant';

export class UpdateBalanceDto {
  @ApiProperty({
    description: 'Balance ID',
    example: ExampleValue.PrismaId
  })
  @IsInt()
  public balanceId: number;

  @ApiProperty({
    description: 'Count of workouts',
    example: ExampleValue.CountOfWorkouts
  })
  @IsInt()
  @Min(DEFAULT_NULL_VALUE)
  public count: number;
}
