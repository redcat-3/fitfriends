import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'test'
  })
  @Expose()
  public accessToken: string;

}
