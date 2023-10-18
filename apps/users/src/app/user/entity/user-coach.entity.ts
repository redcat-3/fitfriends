import { UserCoach } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserCoachEntity extends UserAbstractEntity implements UserCoach {
  public certificate: string;
  public merit: string;
  public personalTraining: boolean;

  constructor(userData: UserCoach) {
    super(userData);
    this.fillEntity(userData);
  }

  public fillEntity(userData: UserCoach) {
    this.certificate = userData.certificate;
    this.merit = userData.merit;
    this.personalTraining = userData.personalTraining;
  }
}