import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({
    description: 'User ID',
    example: '652ffdf03cb7412c4cd5994a'
  })
  @IsMongoId()
  public userId: string;

}
