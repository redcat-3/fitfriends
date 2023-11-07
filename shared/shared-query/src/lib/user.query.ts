import { IsIn, IsEnum,IsString, IsOptional, IsNumber } from 'class-validator';
import { UserLevel, UserLocation } from '@project/shared/shared-types';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DefaultSortParam } from './query.constant';
import { Transform } from 'class-transformer';

export class UserQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGE)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;
  
  @IsEnum(UserLocation)
  @IsOptional()
  public location?: UserLocation;

  @IsString()
  @IsOptional()
  public typeOfTrain?: string;

  @IsEnum(UserLevel)
  @IsOptional()
  public level?: UserLevel;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'asc' | 'desc' = DefaultSortParam.Direction;
}
