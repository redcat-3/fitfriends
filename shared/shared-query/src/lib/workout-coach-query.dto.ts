import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class WorkoutCoachQueryDto {
  @ApiProperty({
    description: 'number of min max calories to spend',
    example: '1000,1500'
  })
  @IsString()
  @IsOptional()
  public calories: string;

  @ApiProperty({
    description: 'min max price',
    example: '100,500'
  })
  @IsString()
  @IsOptional()
  public price: string;

  @ApiProperty({
    description: 'min max rating',
    example: '1,5'
  })
  @IsString()
  @IsOptional()
  public rating: string;

  @ApiProperty({
    description: 'list of times of trainings',
    example: '10-30,80-100'
  })
  @IsString()
  @IsOptional()
  public duration: string;
}
