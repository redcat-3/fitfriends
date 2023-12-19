import { plainToInstance } from 'class-transformer';
import {
  CreateUserDto,
  UserUserDto,
  UserCoachDto
} from '@project/shared/shared-dto';
import { UserRole } from '@project/shared/shared-types';

export function adaptCreateDtoUser(dto: CreateUserDto) {
  switch (dto.role) {
    case UserRole.User:
      return plainToInstance(UserUserDto, dto);
    case UserRole.Coach:
      return plainToInstance(UserCoachDto, dto);
  }
}

