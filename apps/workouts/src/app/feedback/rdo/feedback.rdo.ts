import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FeedbackRdo {
  @ApiProperty({
    description: 'Unique feedback ID',
    example: 23
  })
  @Expose()
  public feedbackId: number;

  @ApiProperty({
    description: 'Workout ID',
    example: 23
  })
  @Expose()
  public workoutId: number;

  @ApiProperty({
    description: 'User-creator of feedback ID',
    example: 'fhsfjfk'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Rating of workout',
    example: 4
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Feedback text',
    example: 'Мне понравилось, тренер просто лапушка. Подходил, помогал, объяснял асаны. У нее теплые руки. Мне понравилось, тренер просто лапушка. Подходил, помогал, объяснял асаны. У нее теплые руки.'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Feedback post date',
  })
  @Expose()
  public createdDate: string;
}
