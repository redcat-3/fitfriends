import { UserTime, UserUser } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserUserEntity extends UserAbstractEntity implements UserUser {
    public timeOfTrain?: UserTime;
    public caloriesToReset: number;
    public caloriesToSpend: number;
    public trainingReady: boolean;

  constructor(userData: UserUser) {
    super(userData);
    this.fillEntity(userData);
  }

  public fillEntity(userData: UserUser) {
    this.timeOfTrain = userData.timeOfTrain;
    this.caloriesToReset = userData.caloriesToReset;
    this.caloriesToSpend = userData.caloriesToSpend;
    this.trainingReady = userData.trainingReady;
  }
}