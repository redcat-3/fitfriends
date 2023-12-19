import { User, UserRole } from '@project/shared/shared-types';
import { fillObject } from './helpers';
import { UserCoachRdo } from '@project/shared/shared-rdo';
import { UserUserRdo } from '@project/shared/shared-rdo';

export function adaptRdoUser(user: User) {
  switch (user.role) {
    case UserRole.Coach:
      return fillObject(UserCoachRdo, user);
    case UserRole.User:
    default:
      return fillObject(UserUserRdo, user);
    }
}
