import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { UpdateWorkoutDto } from '@project/shared/shared-dto';
import { validate } from 'class-validator';
import { VALIDATION_ARGUMENT_TYPE } from '../workout.constant';

export class UpdateWorkoutValidationPipe implements PipeTransform {
  async transform(dto: UpdateWorkoutDto, { type }: ArgumentMetadata) {
    if (type === VALIDATION_ARGUMENT_TYPE) {
      let errors = [];
      errors = errors.concat(await validate(dto, { validationError: { target: false }}));
      if (errors.length > 0) {
          throw new BadRequestException(errors)
        }
    }
    return dto;
  }
}
