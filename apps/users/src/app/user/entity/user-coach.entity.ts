import { User } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserCoachEntity extends UserAbstractEntity implements User {
  public certificate: string;
  public merit: string;
  public personalTraining: boolean;

  constructor(userData: User) {
    super(userData);
    this.fillEntity(userData);
  }

  public fillEntity(userData: User) {
    this.certificate = userData.certificate;
    this.merit = userData.merit;
    this.personalTraining = userData.personalTraining;
  }
}