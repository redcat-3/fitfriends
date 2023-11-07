import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '@project/shared/shared-dto';
import { validate } from 'class-validator';
import { adaptCreateDtoUser } from '@project/util/util-core';
import { ValidationArgumentType } from './pipe.constant';

export class CreateUserValidationPipe implements PipeTransform {
  async transform(dto: CreateUserDto, { type }: ArgumentMetadata) {
    if (type === ValidationArgumentType.Body) {
      let errors = [];
      const user = adaptCreateDtoUser(dto);
      errors = errors.concat(await validate(user, { validationError: { target: false }}));
      if (errors.length > 0) {
          throw new BadRequestException(errors)
      }
    }
    return dto;
  }
}
