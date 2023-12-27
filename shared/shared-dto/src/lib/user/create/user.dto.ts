import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsBoolean, IsEmail, IsEnum, IsISO8601, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  EMAIL_ERROR,
  MAX_TRAIN_COUNT,
  USER_DATE_BIRTH_NOT_VALID,
  UserDescriptionLength,
  UserNameLength, 
  UserPasswordLength
} from '../user-dto.constant'
import { UserGender, UserLevel, UserLocation, UserRole } from '@project/shared/shared-types';

export class UserDto {
  @ApiProperty({
    description: 'Unique user email address',
    example: 'test@test.ru'
  })
  @IsEmail({}, { message: EMAIL_ERROR})
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John'
  })
  @IsString()
  @MinLength(UserNameLength.Min)
  @MaxLength(UserNameLength.Max)
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password: string;

  @ApiProperty({
    description: 'Avatar id from db',
    example: '123456'
  })
  @IsString()
  @IsOptional()
  public avatarId?: string;

  @ApiProperty({
    description: 'User gender',
    example: UserGender.Male,
  })
  @IsEnum(UserGender)
  public gender: UserGender;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: USER_DATE_BIRTH_NOT_VALID })
  @IsOptional()
  public dateBirth: string;

  @ApiProperty({
    description: 'User role',
    example: UserRole.Coach,
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({
    description: 'Текст с общей информацией.',
    example: 'John Doe is cool'
  })
  @IsString()
  @MinLength(UserDescriptionLength.Min)
  @MaxLength(UserDescriptionLength.Max)
  public description: string;

  @ApiProperty({
    description: 'Станция метро. Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная»',
    example: UserLocation.Pion
  })
  @IsEnum(UserLocation)
  public location: UserLocation;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: '123456'
  })
  @IsString()
  @IsOptional()
  public image: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: UserLevel.Pro
  })
  @IsEnum(UserLevel)
  public level: UserLevel;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: ['йога', 'бег', 'стрейчинг']
  })
  @ArrayMaxSize(MAX_TRAIN_COUNT)
  public typeOfTrain: string[];

  @ApiProperty({
    description: 'Флаг готовности пользователя к приглашениям на тренировку.',
    example: true
  })
  @IsBoolean()
  public trainingReady: boolean;
}
