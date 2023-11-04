import { IsIn, IsEnum,IsOptional, IsNumber, IsInt } from 'class-validator';
import { UserTime } from '@project/shared/shared-types';
import { Transform } from 'class-transformer';
import { DEFAULT_PAGE, DefaultPostsLimit, DefaultSortParam } from './query.constant';

export class WorkoutQuery {
  @Transform(({ value } ) => +value || DefaultPostsLimit.Query)
  @IsNumber()
  @IsOptional()
  public limit = DefaultPostsLimit.Query;

  @Transform(({ value }) => +value || DEFAULT_PAGE)
  @IsOptional()
  public page = DEFAULT_PAGE;

  @IsIn(['createdAt', 'price'])
  @IsOptional()
  public sortBy: string = DefaultSortParam.Type;

  @IsInt()
  @IsOptional()
  public caloriesToSpend?: number;

  @IsInt()
  @IsOptional()
  public price?: number;

  @IsInt()
  @IsOptional()
  public rating?: number;

  @IsEnum(UserTime)
  @IsOptional()
  public timeOfTraining?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: string = DefaultSortParam.Direction;
}
