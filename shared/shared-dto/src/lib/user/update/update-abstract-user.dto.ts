import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsDate, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  MAX_TRAIN_COUNT,
  UserDescriptionLength,
  UserNameLength
} from './user-dto.constant'
import { UserGender, UserLevel, UserLocation } from '@project/shared/shared-types';

export class UpdateAbstractUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John'
  })
  @IsOptional()
  @IsString()
  @MinLength(UserNameLength.Min)
  @MaxLength(UserNameLength.Max)
  public name: string;

  @ApiProperty({
    description: 'Avatar id from db',
    example: '123456'
  })
  @IsOptional()
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    description: 'User gender',
    example: UserGender.Male,
  })
  @IsOptional()
  @IsEnum(UserGender)
  public gender: UserGender;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsDate()
  @IsOptional()
  public dateBirth: Date;

  @ApiProperty({
    description: 'Текст с общей информацией.',
    example: 'John Doe is cool'
  })
  @IsOptional()
  @IsString()
  @MinLength(UserDescriptionLength.Min)
  @MaxLength(UserDescriptionLength.Max)
  public description: string;

  @ApiProperty({
    description: 'Станция метро. Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная»',
    example: UserLocation.Pion
  })
  @IsOptional()
  @IsEnum(UserLocation)
  public location: UserLocation;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: '123456'
  })
  @IsString()
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: UserLevel.Pro
  })
  @IsOptional()
  @IsEnum(UserLevel)
  public level: UserLevel;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: ['йога', 'бег', 'стрейчинг']
  })
  @IsOptional()
  @ArrayMaxSize(MAX_TRAIN_COUNT)
  public typeOfTrain: string[];
}
