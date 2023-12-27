import { IsIn, IsEnum,IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { UserLevel } from '@project/shared/shared-types';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DefaultSortParam } from './query.constant';

export class UserQueryDto {
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_LIMIT;

  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;
  
  @IsString()
  @IsOptional()
  public location?: string;

  @IsString()
  @IsOptional()
  public typeOfTrain?: string;

  @IsEnum(UserLevel)
  @IsOptional()
  public level?: UserLevel;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'asc' | 'desc' = DefaultSortParam.Direction;

  @IsBoolean()
  @IsOptional()
  public trainigReady: boolean;
}
