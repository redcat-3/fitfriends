import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BalanceRdo {
  @ApiProperty({
    description: 'Unique Balance ID',
    example: 23
  })
  @Expose()
  public balanceId: number;

  @ApiProperty({
    description: 'ID пользователя',
    example: 'kjhkjhlkhl6467467'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Workout ID',
    example: 23
  })
  @Expose()
  public workoutId: number;

  @ApiProperty({
    description: 'Price of workout',
    example: 200
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Count of workouts',
    example: 4
  })
  @Expose()
  public count: number;
}
