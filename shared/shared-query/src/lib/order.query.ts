import { IsNumber,IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIMIT } from './query.constant';

export class OrderQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}