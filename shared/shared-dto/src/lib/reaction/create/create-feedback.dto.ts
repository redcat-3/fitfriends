import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ExampleValue, FeedbackTextLength, Rating } from '../reaction.constant';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Workout ID',
    example: ExampleValue.PrismaId
  })
  @IsInt()
  public workoutId: number;

  @ApiProperty({
    description: 'Rating of workout',
    example: ExampleValue.Rating
  })
  @IsInt()
  @Min(Rating.Min)
  @Max(Rating.Max)
  public rating: number;

  @ApiProperty({
    description: 'Feedback text',
    example: 'Мне понравилось, тренер просто лапушка. Подходил, помогал, объяснял асаны. У нее теплые руки. Мне понравилось, тренер просто лапушка. Подходил, помогал, объяснял асаны. У нее теплые руки.'
  })
  @IsString()
  @MinLength(FeedbackTextLength.Min)
  @MaxLength(FeedbackTextLength.Max)
  public text: string;
}
