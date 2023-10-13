import { User, UserGender, UserLevel, UserLocation, UserRole } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../user.constant';

export class UserAbstractEntity implements User {
    public _id: string;
    public email: string;
    public name: string;
    public passwordHash: string;
    public avatarId?: string;
    public gender: UserGender;
    public dateBirth: Date;
    public role: UserRole;
    public description: string;
    public location: UserLocation;
    public image?: string;
    public level: UserLevel;
    public typeOfTrain: string[];

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
      avatarId: this.avatarId,
      gender: this.gender,
      dateBirth: this.dateBirth,
      role: this.role,
      description: this.description,
      location: this.location,
      image: this.image,
      level: this.level,
      typeOfTrain: this.typeOfTrain
    };
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.avatarId = user.avatar;
    this.gender = user.gender;
    this.dateBirth = user.dateBirth;
    this.role = user.role;
    this.description = user.description;
    this.location = user.location;
    this.image = user.image;
    this.level = user.level;
    this.typeOfTrain = user.typeOfTrain;
  }

  public async setPassword(password: string): Promise<UserAbstractEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
