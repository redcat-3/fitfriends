import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';
import { Expose } from 'class-transformer';

export class UserCoachRdo extends UserRdo {
  @ApiProperty({
    description: 'Coach certificate id',
    example: '1'
  })
  @Expose()
  public certificate: string;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'John Doe is cool'
  })
  @Expose()
  public merit: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: true
  })
  @Expose()
  public personalTraining: boolean;
}
