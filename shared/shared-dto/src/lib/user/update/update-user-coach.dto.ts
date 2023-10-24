import { ApiProperty } from '@nestjs/swagger';
import { UpdateAbstractUserDto } from './update-abstract-user.dto';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CoachMeritLength } from './user-dto.constant';

export class UpdateUserCoachDto extends UpdateAbstractUserDto {
  @ApiProperty({
    description: 'Coach certificate id',
    example: '1'
    })
    @IsOptional()
    @IsString()
  public certificate: string;
     
  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'John Doe is cool'
  })
  @IsString()
  @MinLength(CoachMeritLength.Min)
  @MaxLength(CoachMeritLength.Max)
  @IsOptional()
  public merit: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  public personalTraining: boolean;
}
