import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { User, UserRole } from '@project/shared/shared-types';
import { UserQuery } from '@project/shared/shared-query';
import { UserModel } from './user.model';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '@project/shared/shared-dto';
import { RETURNABLE_FIELDS } from './user-repository.constant';

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

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  public async getFriendsByUserId(userId: string): Promise<User[] | null> {
    const user = await this.userModel.findOne({ _id: userId });
    const friendsIds = user.friends.forEach((item) => {
      new mongoose.Types.ObjectId(item);
    })
    const friends = await this.userModel.find({
      _id: { $in: friendsIds},
    });
    return friends;
  }

  public async getUsersList(query?: UserQuery): Promise<User[] | null> {
    const{ location, typeOfTrain, level, sortBy } = query;
    if (!location && !typeOfTrain && !level && !sortBy) {
      return await this.userModel.find().sort({role: -1});
    }

    const sort = sortBy === UserRole.User ? 1 : -1;
    const types = typeOfTrain ? typeOfTrain.split(',') : [];
    const users = await this.userModel.find({
      location,
      typeOfTrain: {$in: types},
      level
    })
    .sort({role: sort});
    return users;
  }

  public async addToFollowById(
    userId: string,
    followId: string
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { followCoaches: new mongoose.Types.ObjectId(followId) },
      },
      { new: true, upsert: true }
    );

    await this.userModel.findOneAndUpdate(
      { _id: followId },
      {
        $addToSet: { followers: new mongoose.Types.ObjectId(userId) },
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
        $pull: { followCoaches: new mongoose.Types.ObjectId(followId) },
      },
      { new: true, upsert: true }
    );

    await this.userModel.findOneAndUpdate(
      { _id: followId },
      {
        $pull: { followers: new mongoose.Types.ObjectId(userId) },
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
