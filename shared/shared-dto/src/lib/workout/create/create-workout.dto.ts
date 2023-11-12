import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength, IsEnum, IsInt, Min, Max } from 'class-validator';
import { DEFAULT_AMOUNT, NameLength, WorkoutDescriptionLength } from '../workout-dto.constant';
import { UserGender, UserLevel, WorkoutType } from '@prisma/client';
import { CountCaloriesToReset, ExampleValue } from '../../user/user-dto.constant';
import { UserTime } from '@project/shared/shared-types';

export class CreateWorkoutDto {
  @ApiProperty({
    description: `Название тренировки. Ограничения: обязательно для заполнения; минимальная длина ${NameLength.Min} символ, максимальная длина ${NameLength.Max} символов.`,
    example: 'Joga'
  })
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки тренировки.',
    example: 'image.jpg'
  })
  @IsString()
  public background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: UserLevel.pro
  })
  @IsEnum(UserLevel)
  public level: UserLevel;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: WorkoutType.aerobics
  })
  @IsEnum(WorkoutType)
  public type: WorkoutType;

  @ApiProperty({
    description: 'Время на тренировку. Время на тренировку указывается в предопределённых интервалах в минутах.',
    example: UserTime.Three
  })
  @IsEnum(UserTime)
  @IsOptional()
  public timeOfTraining: string;

  @ApiProperty({
    description: `Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.`,
    example: ExampleValue.Price
  })
  @IsInt()
  @Min(DEFAULT_AMOUNT)
  public price: number;

  @ApiProperty({
    description: `Количество калорий. Ограничения: обязательно для заполнения; минимальное значение ${CountCaloriesToReset.Min}, максимально значение ${CountCaloriesToReset.Max}; только целые числа.`,
    example: ExampleValue.Calories
  })
  @IsInt()
  @Max(CountCaloriesToReset.Max)
  @Min(CountCaloriesToReset.Min)
  public caloriesToSpend: number;

  @ApiProperty({
    description: 'Описание тренировки.',
    example: 'John Doe is cool'
  })
  @IsString()
  @MinLength(WorkoutDescriptionLength.Min)
  @MaxLength(WorkoutDescriptionLength.Max)
  public description: string;

  @ApiProperty({
    description: 'Пол пользователя для которого предназначена тренировка.',
    example: UserGender.male,
  })
  @IsEnum(UserGender)
  public gender: UserGender;

  @ApiProperty({
    description: 'Видео файл с демонстрацией тренировки.',
    example: 'video.mov'
  })
  @IsString()
  public video: string;

  @ApiProperty({
    description: 'Флаг определяет участие тренировки (участвует, не участвует) в качестве специального предложения.',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  public special: boolean;
}
