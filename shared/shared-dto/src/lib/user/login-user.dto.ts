import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import {EMAIL_ERROR, UserPasswordLength} from './create/user-dto.constant'

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@test.ru'
  })
  @IsEmail({}, { message: EMAIL_ERROR})
  public email: string;
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password: string;
}
