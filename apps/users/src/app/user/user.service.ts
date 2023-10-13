import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@project/shared/shared-types';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }
  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findByEmail(id);
  }
}
