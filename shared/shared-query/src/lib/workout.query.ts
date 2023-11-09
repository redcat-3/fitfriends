import { IsIn, IsEnum,IsOptional, IsNumber, IsString } from 'class-validator';
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

  @IsIn(['createdDate', 'price'])
  @IsOptional()
  public sortBy: 'createdDate' | 'price' = DefaultSortParam.Type;

  @IsString()
  @IsOptional()
  public caloriesToSpend?: string;

  @IsString()
  @IsOptional()
  public price?: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsString()
  @IsOptional()
  public rating?: string;

  @IsEnum(UserTime)
  @IsOptional()
  public timeOfTraining?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'asc' | 'desc' = DefaultSortParam.Direction;
}
