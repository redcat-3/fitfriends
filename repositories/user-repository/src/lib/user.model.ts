import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserGender, UserLevel, UserLocation, UserRole, UserTime } from '@project/shared/shared-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: false,
  })
  public avatarId?: string;

  @Prop({
    required: true,
    type: String,
    enum: UserGender,
    default: UserGender.Male,
  })
  public gender: UserGender;

  @Prop({
    required: false,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Prop({
    required: false,
  })
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLocation,
    default: UserLocation.Petr,
  })
  public location: UserLocation;
  
  @Prop({
    required: false,
  })
  public image?: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLevel,
    default: UserLevel.Beginner,
  })
  public level: UserLevel;

  @Prop({
    required: false,
  })
  public typeOfTrain: string[];

  @Prop({
    required: false,
  })
  public friends: string[];

  @Prop({
    required: false,
    type: String,
    enum: UserTime,
    default: UserTime.One,
  })
  public timeOfTrain?: UserTime;

  @Prop({
    required: false,
  })
  public caloriesToReset: number;

  @Prop({
    required: false,
  })
  public caloriesToSpend: number;

  @Prop({
    required: false,
  })
  public trainingReady: boolean;

  @Prop({
    required: false,
  })
  public certificate: string;

  @Prop({
    required: false,
  })
  public merit: string;

  @Prop({
    required: false,
  })
  public personalTraining: boolean;

  @Prop({
    required: false,
  })
  public followCoaches: string[];

  @Prop({
    required: false,
  })
  public followers: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
