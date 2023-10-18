import { UserAbstract, UserGender, UserLevel, UserLocation, UserRole } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../user.constant';

export class UserAbstractEntity implements UserAbstract {
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

  constructor(userData: UserAbstract) {
    this._id = userData._id;
    this.email = userData.email;
    this.name = userData.name;
    this.avatarId = userData.avatarId;
    this.gender = userData.gender;
    this.dateBirth = userData.dateBirth;
    this.role = userData.role;
    this.description = userData.description;
    this.location = userData.location;
    this.image = userData.image;
    this.level = userData.level;
    this.typeOfTrain = userData.typeOfTrain;
    this.passwordHash = userData.passwordHash;
  }

  public toObject() {
    return {...this};
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
