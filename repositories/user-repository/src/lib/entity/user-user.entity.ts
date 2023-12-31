import { UserTime, UserUser } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserUserEntity extends UserAbstractEntity implements UserUser {
    public timeOfTrain?: UserTime;
    public caloriesToReset: number;
    public caloriesToSpend: number;
    public followCoaches: string[];

  constructor(userData: UserUser) {
    super(userData);
    this.timeOfTrain = userData.timeOfTrain;
    this.caloriesToReset = userData.caloriesToReset;
    this.caloriesToSpend = userData.caloriesToSpend;
    this.followCoaches = userData.followCoaches;
  }

}