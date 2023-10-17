import { CliCommandInterface, UserRole } from '@project/shared/shared-types';
import { CreateUserDto } from '@project/shared/shared-dto';
import mongoose from 'mongoose';
import { DECIMAL } from '../../user/user.constant.js';
import UserGenerator from '../user-generator.js';
import { UserRepository } from '../../user/user.repository.js';
import { UserModel } from '../../user/user.model.js';
import dayjs from 'dayjs';
import { ConflictException } from '@nestjs/common';
import { AuthError } from '../../authentication/authentication.constant.js';
import { TypeEntityAdapter } from '../../user/util/entity-adapter.js';

export default class FillDbCommand implements CliCommandInterface {
  public readonly name = '--fill-db';
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(new mongoose.Model(UserModel));
  }

  private async saveUser(dto: CreateUserDto) {
    const user = {
      ... dto,
      role: dto.role || UserRole.User,
      passwordHash: '',
      dateBirth: dayjs(dto.dateBirth).toDate(),
    };
    delete user.password;

    const existUser = await this.userRepository
      .findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AuthError.UserExists);
    }

    const userEntity = await new TypeEntityAdapter[user.role](user);
    await userEntity.setPassword(dto.password);

    return this.userRepository
      .create(userEntity);
  }

  public async execute(uri: string, count: string): Promise<void> {
    if(uri === undefined) {
      console.log('Connect string is undefined');
    }
    if(count === undefined) {
      console.log('Count of users is undefined');
    }

    await mongoose.connect(uri, { autoIndex: true});
    const itemCount = parseInt(count, DECIMAL);
    const user = new UserGenerator;

    for (let i = 0; i < itemCount; i++) {
      await this.saveUser(user.generate(i));
    }
    console.log(`Users was created!`);
    await mongoose.disconnect();
  }
}
