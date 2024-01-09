import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@project/shared/shared-types';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User role',
    example: UserRole.User
  })
  @Expose()
  public role: UserRole;
  
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
