import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@project/repositories/user-repository';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { UserQuery } from '@project/shared/shared-query';
import { User, UserRole } from '@project/shared/shared-types';
import { UserError } from './user.constant';

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
    return await this.userRepository.findById(id);
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    return await this.userRepository.update(id, dto);
  }

  public async getFriendsByUserId(userId: string): Promise<User[] | null> {
    return await this.userRepository.getFriendsByUserId(userId);
  }

  public async getUsersList(id: string, query: UserQuery): Promise<User[] | null> {
    const user = await this.userRepository.findById(id);
    if (user.role === UserRole.Сoach) {
      throw new BadRequestException (UserError.InvalidRole);
    }
    return await this.userRepository.getUsersList(query);
  }

}
