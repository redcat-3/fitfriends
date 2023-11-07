import { IsNumber,IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './query.constant';

export class FeedbackQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_LIMIT;

  @Transform(({ value }) => +value || DEFAULT_PAGE )
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;
}