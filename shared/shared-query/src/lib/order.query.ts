import { IsIn, IsNumber,IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DefaultSortParam } from './query.constant';

export class OrderQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGE )
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'asc' | 'desc' = DefaultSortParam.Direction;

  @IsIn(['orderPrice', 'count'])
  @IsOptional()
  public sortBy: 'orderPrice' | 'count' = DefaultSortParam.OrderType;
}