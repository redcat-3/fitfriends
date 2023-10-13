import { User, UserTime } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserUserEntity extends UserAbstractEntity implements User {
    public timeOfTrain?: UserTime;
    public caloriesToReset: number;
    public caloriesToSpend: number;
    public trainingReady: boolean;

  constructor(userData: User) {
    super(userData);
    this.fillEntity(userData);
  }

  public fillEntity(userData: User) {
    this.timeOfTrain = userData.timeOfTrain;
    this.caloriesToReset = userData.caloriesToReset;
    this.caloriesToSpend = userData.caloriesToSpend;
    this.trainingReady = userData.trainingReady;
  }
}