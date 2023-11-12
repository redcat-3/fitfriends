import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId } from 'class-validator';
import { ExampleValue } from '../reaction.constant';

export class CreateBalanceDto {
  @ApiProperty({
    description: 'User ID',
    example: '652ffdf03cb7412c4cd5994a'
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Workout ID',
    example: ExampleValue.PrismaId
  })
  @IsInt()
  public workoutId: number;

  @ApiProperty({
    description: 'Price of workout',
    example: ExampleValue.Price
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'Count of workouts',
    example: ExampleValue.CountOfWorkouts
  })
  @IsInt()
  public count: number;
}
