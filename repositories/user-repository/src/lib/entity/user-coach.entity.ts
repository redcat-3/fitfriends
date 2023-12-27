import { UserCoach } from '@project/shared/shared-types';
import { UserAbstractEntity } from './user-abstract.entity';

export class UserCoachEntity extends UserAbstractEntity implements UserCoach {
  public certificates: string[];
  public merit: string;
  public personalTraining: boolean;
  public followers: string[];

  constructor(userData: UserCoach) {
    super(userData);
    this.certificates = userData.certificates;
    this.merit = userData.merit;
    this.followers = userData.followers;
  }
}