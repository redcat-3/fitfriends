import { CreateUserDto } from '@project/shared/shared-dto';

export interface UserGeneratorInterface {
  generate(number: number): CreateUserDto;
}
