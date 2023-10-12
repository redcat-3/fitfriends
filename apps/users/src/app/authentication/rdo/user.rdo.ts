import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from 'shared/shared-types/src/lib/user/user-gender.enum';

export class UserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'John Doe'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User registration date',
  })
  @Expose({ name: 'createdAt'})
  @Transform(({obj}) => obj.createdAt.toString())
  public createdAt: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male'
  })
  @Expose()
  public gender: UserGender;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public dateBirth: string;
}
