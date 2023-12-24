import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Refresh token',
    example: 'test'
  })
  @Expose()
  public refreshToken: string;

  @ApiProperty({
    description: 'Access token',
    example: 'test'
  })
  @Expose()
  public accessToken: string;

}
