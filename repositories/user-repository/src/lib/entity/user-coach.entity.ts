import { UserCoach } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserCoachEntity extends UserAbstractEntity implements UserCoach {
  public certificate: string;
  public merit: string;
  public personalTraining: boolean;
  public followers: string[];

  constructor(userData: UserCoach) {
    super(userData);
    this.certificate = userData.certificate;
    this.merit = userData.merit;
    this.personalTraining = userData.personalTraining;
    this.followers = userData.followers;
  }
}