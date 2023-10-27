import { IsIn, IsEnum,IsOptional, IsNumber, IsInt } from 'class-validator';
import { UserTime } from '@project/shared/shared-types';
import { Transform } from 'class-transformer';
import { DefaultPostsLimit, DefaultSortParam } from './query.constant';

export class WorkoutQuery {
  @Transform(({ value } ) => +value || DefaultPostsLimit.Query)
  @IsNumber()
  @IsOptional()
  public limit = DefaultPostsLimit.Query;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsIn(['postedDate', 'likesCount', 'commentsCount'])
  @IsOptional()
  public sortBy?: 'postedDate' | 'likesCount' | 'commentsCount' = DefaultSortParam.Type;

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
  public timeOfTraining: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DefaultSortParam.Direction;
}
