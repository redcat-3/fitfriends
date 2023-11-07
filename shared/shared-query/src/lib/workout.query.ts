import { IsIn, IsEnum,IsOptional, IsNumber, IsInt } from 'class-validator';
import { UserTime } from '@project/shared/shared-types';
import { Transform } from 'class-transformer';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DefaultSortParam } from './query.constant';

export class WorkoutQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGE)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;

  @IsIn(['createdAt', 'price'])
  @IsOptional()
  public sortBy: 'createdAt' | 'price' = DefaultSortParam.Type;

  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public caloriesToSpend?: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public price?: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public rating?: number;

  @IsEnum(UserTime)
  @IsOptional()
  public timeOfTraining?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'asc' | 'desc' = DefaultSortParam.Direction;
}
