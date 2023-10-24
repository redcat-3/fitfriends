import { IsIn, IsEnum,IsString, IsOptional } from 'class-validator';
import { UserLevel, UserLocation } from '@project/shared/shared-types';

export class UserQuery {
  @IsEnum(UserLocation)
  @IsOptional()
  public location?: UserLocation;

  @IsString()
  @IsOptional()
  public typeOfTrain?: string;

  @IsEnum(UserLevel)
  @IsOptional()
  public level?: UserLevel;

  @IsIn(['user', 'coach'])
  @IsOptional()
  public sortBy?: 'user' | 'coach';
}
