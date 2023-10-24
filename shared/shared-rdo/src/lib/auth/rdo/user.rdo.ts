import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from 'shared/shared-types/src/lib/user/user-gender.enum';
import { UserLevel, UserLocation, UserRole } from '@project/shared/shared-types';

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
    example: UserGender.Male
  })
  @Expose()
  public gender: UserGender;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public dateBirth: string;

  
  @ApiProperty({
    description: 'User role',
    example: UserRole.User
  })
  @Expose()
  public role: UserGender;

  @ApiProperty({
    description: 'Текст с общей информацией.',
    example: 'John Doe is cool'
  })
  @Expose()
  public description: string;
  
  @ApiProperty({
    description: 'Станция метро. Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная»',
    example: UserLocation.Pion
  })
  @Expose()
  public location: UserLocation;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: '123456'
  })
  @Expose()
  public image?: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: UserLevel.Pro
  })
  @Expose()
  public level: UserLevel;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: ['йога', 'бег', 'стрейчинг']
  })
  @Expose()
  public typeOfTrain: string[];
}
