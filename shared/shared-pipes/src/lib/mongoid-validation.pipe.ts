import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BAD_MONGOID_ERROR, MongoidValidationError, VALIDATION_ARGUMENT_TYPE } from './pipe.constant';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== VALIDATION_ARGUMENT_TYPE) {
      throw new Error(MongoidValidationError.WrongType)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
