import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { User } from '@project/shared/shared-types';
import { UserQueryDto } from '@project/shared/shared-query';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RETURNABLE_FIELDS } from './user-repository.constant';
import { buildFilterQuery } from './utils/build-filter-query';

export type UserFields = {
  id: string,
  email: string,
  name: string,
};

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  public async getFriendsByUserId(userId: string): Promise<User[] | null> {
    const user = await this.userModel.findOne({ _id: userId });
    const friendsIds = user.friends;
    const friends = await this.userModel.find({
      _id: { $in: friendsIds},
    });
    return friends;
  }

  public async getUsersFeedbacks(ids: string[]): Promise<User[] | null> {
    const users = await this.userModel.find({
      _id: { $in: ids},
    });
    return users;
  }

  public async getUsersList(query?: UserQueryDto): Promise<User[] | null> {
    const{ location, typeOfTrain, level, sortDirection, limit, page, trainigReady } = query;
    const sort = sortDirection === 'asc' ? 1 : -1;
    if (!location && !typeOfTrain && !level) {
      return await this.userModel
        .find()
        .limit(limit)
        .skip(page > 0 ? limit * (page - 1) : undefined)
        .sort({role: sort});
    }
    const queryFilter = buildFilterQuery (location, typeOfTrain, level, trainigReady)
    return await this.userModel
      .find(queryFilter)
      .limit(limit)
      .skip(page > 0 ? limit * (page - 1) : undefined)
      .sort({role: sort});
  }

  public async getUsersListCount(query?: UserQueryDto): Promise<number> {
    const{ location, typeOfTrain, level, trainigReady} = query;
    const queryFilter = buildFilterQuery (location, typeOfTrain, level, trainigReady)
    const users = await this.userModel.find(queryFilter);
    return users.length;
  }

  public async addToFollowById(
    userId: string,
    followId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { followCoaches: followId },
      },
      { new: true, upsert: true }
    );

    await this.userModel.findOneAndUpdate(
      { _id: followId },
      {
        $addToSet: { followers: userId },
      },
      { new: true, upsert: true }
    );
  }

  public async removeFromFollowById(
    userId: string,
    followId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { followCoaches: followId },
      },
      { new: true, upsert: true }
    );

    await this.userModel.findOneAndUpdate(
      { _id: followId },
      {
        $pull: { followers: userId },
      },
      { new: true, upsert: true }
    );
  }

  public async checkFriend(userId: string, friendId: string): Promise<boolean> {
    const user = await this.userModel.findOne(
      { _id: userId }
    );
    return user.friends.includes(friendId);
  }

  public async checkFollow(userId: string, followId: string): Promise<boolean> {
    const user = await this.userModel.findOne(
      { _id: userId }
    );
    return user.followCoaches.includes(followId);
  }

  public async addToFriends(
    userId: string,
    friendId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { friends: friendId },
      },
      { new: true, upsert: true }
    );

    await this.userModel.findOneAndUpdate(
      { _id: friendId },
      {
        $addToSet: { friends: userId },
      },
      { new: true, upsert: true }
    );
  }

  public async removeFromFriends(
    userId: string,
    friendId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { friends: friendId },
      },
      { new: true, upsert: true }
    );

    await this.userModel.findOneAndUpdate(
      { _id: friendId },
      {
        $pull: { friends: userId },
      },
      { new: true, upsert: true }
    );
  }

  public async getFollowCoachesByUserId(userId: string): Promise<string[] | null> {
    const user = await this.userModel.findOne({ _id: userId });
    return user.followCoaches;
  }

  public async getFollowersByUserId(userId: string): Promise<UserFields[] | null> {
    const user = await this.userModel.findOne({ _id: userId });
    return this.userModel
    .aggregate([
      {
        $match: {
          _id: {
            $in: [...user.followers],
          },
        },
      },
      { $project: RETURNABLE_FIELDS },
    ])
    .exec();
  }
}
