import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsNumber, IsString } from 'class-validator';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DefaultSortParam } from './query.constant';

export class WorkoutQueryDto {
  @ApiProperty({
    description: 'limit of workouts',
    example: DEFAULT_LIMIT
  })
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_LIMIT;

  @ApiProperty({
    description: 'page',
    example: DEFAULT_PAGE
  })
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;

  @ApiProperty({
    description: 'property for sort',
    example: DefaultSortParam.Type
  })
  @IsIn(['createdDate', 'price'])
  @IsOptional()
  public sortBy: 'createdDate' | 'price' = DefaultSortParam.Type;

  @ApiProperty({
    description: 'number of min max calories to spend',
    example: '1000,1500'
  })
  @IsString()
  @IsOptional()
  public caloriesToSpend?: string;

  @ApiProperty({
    description: 'min max price',
    example: '100,500'
  })
  @IsString()
  @IsOptional()
  public price?: string;

  @ApiProperty({
    description: 'list of types of trainings',
    example: 'yoga,run'
  })
  @IsString()
  @IsOptional()
  public type?: string;

  @ApiProperty({
    description: 'min max rating',
    example: '1,5'
  })
  @IsString()
  @IsOptional()
  public rating?: string;

  @ApiProperty({
    description: 'list of times of trainings',
    example: '10-30,80-100'
  })
  @IsString()
  @IsOptional()
  public timeOfTraining?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'asc' | 'desc' = DefaultSortParam.Direction;
}
