import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TypeEntityAdapter, UserRepository } from '@project/repositories/user-repository';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { UserQueryDto } from '@project/shared/shared-query';
import { User, UserRole } from '@project/shared/shared-types';
import { UserError } from './user.constant';
import { NotificationEntity, NotificationRepository } from '@project/repositories/notification-repository';
import dayjs from 'dayjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException (UserError.NotFound);
    }
    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException (UserError.NotFound);
    }
    return user;
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    let user = await this.userRepository.findById(id);
    user = {...user, ...dto};
    const userEntity = new TypeEntityAdapter[user.role](user);
    return await this.userRepository.update(id, userEntity);
  }

  public async getFriendsByUserId(userId: string): Promise<User[] | null> {
    return await this.userRepository.getFriendsByUserId(userId);
  }

  public async getUsersFeedbacks(ids: string[]): Promise<User[] | null> {
    return await this.userRepository.getUsersFeedbacks(ids);
  }

  public async getUsersList(id: string, query: UserQueryDto): Promise<User[] | null> {
    const user = await this.userRepository.findById(id);
    if (user.role === UserRole.Coach) {
      throw new BadRequestException (UserError.InvalidRole);
    }
    return await this.userRepository.getUsersList(query);
  }

  public async getUsersListCount(id: string, query: UserQueryDto): Promise<number> {
    const user = await this.userRepository.findById(id);
    if (user.role === UserRole.Coach) {
      throw new BadRequestException (UserError.InvalidRole);
    }
    return await this.userRepository.getUsersListCount(query);
  }

  public async followCoach(userId: string, followId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException (UserError.NotFound);
    }
    if (user.role === UserRole.Coach) {
      throw new BadRequestException (UserError.InvalidRole);
    }
    const coach = await this.userRepository.findById(followId);
    if (!coach) {
      throw new NotFoundException (UserError.NotFound);
    }
    if (coach.role === UserRole.User) {
      throw new BadRequestException (UserError.InvalidRole);
    }
    if (! this.userRepository.checkFollow(userId, followId)) {
      throw new NotFoundException (UserError.Follow);
    } else {
      this.userRepository.addToFollowById(userId, followId);
      const text = `Пользователь ${user.name} подписался на вас`;
      const notification = {
        text,
        userId: userId,
        createdDate: dayjs().toDate(),
      }
      const notificationEntity = new NotificationEntity(notification);
      this.notificationRepository.create(notificationEntity);
    }
  }

  public async unfollowCoach(userId: string, followId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const follow = await this.userRepository.findById(followId);
    if (!user || !follow) {
      throw new NotFoundException (UserError.NotFound);
    }
    if (this.userRepository.checkFollow(userId, followId)) {
      this.userRepository.removeFromFollowById(userId, followId);
    } else {
      throw new NotFoundException (UserError.NotFollow);
    }
  }

  public async removeFromFriends(userId: string, friendId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const follow = await this.userRepository.findById(friendId);
    if (!user || !follow) {
      throw new NotFoundException (UserError.NotFound);
    }
    if (this.userRepository.checkFriend(userId, friendId)) {
      this.userRepository.removeFromFriends(userId, friendId);
    } else {
      throw new NotFoundException (UserError.NotFriend);
    }
  }

  public async addToFriends(userId: string, friendId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const friend = await this.userRepository.findById(friendId);
    if (!user || !friend) {
      throw new NotFoundException (UserError.NotFound);
    }
    if (this.userRepository.checkFriend(userId, friendId)) {
      this.userRepository.addToFriends(userId, friendId);
      const text = `Пользователь ${user.name} добавил вас в друзья`;
      const notification = {
        text,
        userId: friendId,
        createdDate: dayjs().toDate(),
      }
      const notificationEntity = new NotificationEntity(notification);
      this.notificationRepository.create(notificationEntity);
    } else {
      throw new NotFoundException (UserError.Friend);
    }
  }

  public async checkFriends(userId: string, friendId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    const friend = await this.userRepository.findById(friendId);
    if (!user || !friend) {
      throw new NotFoundException (UserError.NotFound);
    }
    return this.userRepository.checkFriend(userId, friendId);
  }
}
