import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import { Expose } from 'class-transformer';

export class RequestRdo {
  @ApiProperty({
    description: 'Unique request ID',
    example: 23
  })
  @Expose()
  public requestId: number;

  @ApiProperty({
    description: 'ID инициатора',
    example: 'kjhkjhlkhl6467467'
  })
  @Expose()
  public requester: string;

  @ApiProperty({
    description: 'ID пользователя',
    example: 'kjhkjhlkhl6467467'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Статус заявки.',
    example: RequestStatus.consider
  })
  @Expose()
  public status: RequestStatus;

  @ApiProperty({
    description: 'Request creating date',
  })
  @Expose()
  public createdDate: string;

  @ApiProperty({
    description: 'Request updating date',
  })
  @Expose()
  public updatedDate: string;
}
