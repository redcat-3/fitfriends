import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserGender, UserLevel, WorkoutType } from '@prisma/client';
import { UserTime } from '@project/shared/shared-types';

export class WorkoutRdo {
  @ApiProperty({
    description: 'Unique Workout ID',
    example: '1'
  })
  @Expose()
  public workoutId: string;

  @ApiProperty({
    description: `Название тренировки.`,
    example: 'John Doe is cool'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки тренировки.',
    example: 'image.jpg'
  })
  @Expose()
  public background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: UserLevel.pro
  })
  @Expose()
  public level: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: WorkoutType.aerobics
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Время на тренировку. Время на тренировку указывается в предопределённых интервалах в минутах.',
    example: UserTime.Three
  })
  @Expose()
  public timeOfTraining: string;

  @ApiProperty({
    description: `Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.`,
    example: 'John Doe is cool'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: `Количество калорий.`,
    example: 'John Doe is cool'
  })
  @Expose()
  public caloriesToSpend: number;

  @ApiProperty({
    description: 'Описание тренировки.',
    example: 'John Doe is cool'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Пол пользователя для которого предназначена тренировка.',
    example: UserGender.male,
  })
  @Expose()
  public gender: string;

  @ApiProperty({
    description: 'Видео файл с демонстрацией тренировки.',
    example: 'image.jpg'
  })
  @Expose()
  public video: string;

  @ApiProperty({
    description: 'Рейтинг тренировки, рассчитывается автоматически',
    example: 4
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Флаг определяет участие тренировки (участвует, не участвует) в качестве специального предложения.',
    example: true
  })
  @Expose()
  public special: boolean;
}
