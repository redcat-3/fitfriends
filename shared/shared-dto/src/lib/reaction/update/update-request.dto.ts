import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateRequestDto {
  @ApiProperty({
    description: 'Status of request',
    example: RequestStatus.accept
  })
  @IsEnum(RequestStatus)
  public status: RequestStatus;

}
