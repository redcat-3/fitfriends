import { IsNumber,IsOptional } from 'class-validator';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './query.constant';

export class FeedbackQueryDto {
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_LIMIT;

  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_PAGE;
}