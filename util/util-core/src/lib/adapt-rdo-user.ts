import { User, UserRole } from '@project/shared/shared-types';
import { fillObject } from '@project/util/util-core';
import { UserCoachRdo } from '../../../../shared/shared-rdo/src/lib/auth/rdo/user-coach.rdo';
import { UserUserRdo } from '../../../../shared/shared-rdo/src/lib/auth/rdo/user-user.rdo';

export function adaptRdoUser(user: User) {
  switch (user.role) {
    case UserRole.Сoach:
      return fillObject(UserCoachRdo, user);
    case UserRole.User:
    default:
      return fillObject(UserUserRdo, user);
    }
}
