import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId } from 'class-validator';

export class CreateBalanceDto {
  @ApiProperty({
    description: 'User ID',
    example: '652ffdf03cb7412c4cd5994a'
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Workout ID',
    example: 2
  })
  @IsInt()
  public workoutId: number;

  @ApiProperty({
    description: 'Price of workout',
    example: 200
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'Count of workouts',
    example: 4
  })
  @IsInt()
  public count: number;
}
