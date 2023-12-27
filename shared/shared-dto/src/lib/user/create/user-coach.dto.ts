import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CoachMeritLength } from '../user-dto.constant';

export class UserCoachDto extends UserDto{
  @ApiProperty({
    description: 'Coach certificate id',
    example: '1'
    })
    @IsString()
  public certificates: string[];
     
  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'John Doe is cool'
  })
  @IsString()
  @MinLength(CoachMeritLength.Min)
  @MaxLength(CoachMeritLength.Max)
  @IsOptional()
  public merit: string;
}
