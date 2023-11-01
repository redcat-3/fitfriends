import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import { UserPasswordLength} from '../user-dto.constant'

export class ChangePasswordDto {

  @ApiProperty({
    description: 'Current password'
  })
  public currentPassword: string;

  @ApiProperty({
    description: 'New password'
  })
  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public newPassword: string;
}