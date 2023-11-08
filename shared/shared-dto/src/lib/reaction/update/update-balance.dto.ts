import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { DEFAULT_NULL_VALUE } from '../reaction.constant';

export class UpdateBalanceDto {
  @ApiProperty({
    description: 'Balance ID',
    example: 2
  })
  @IsInt()
  public balanceId: number;

  @ApiProperty({
    description: 'Count of workouts',
    example: 4
  })
  @IsInt()
  @Min(DEFAULT_NULL_VALUE)
  public count: number;
}
