import { User, UserRole } from '@project/shared/shared-types';
import { fillObject } from '@project/util/util-core';
import { UserCoachRdo } from '../../../../apps/users/src/app/authentication/rdo/user-coach.rdo';
import { UserUserRdo } from '../../../../apps/users/src/app/authentication/rdo/user-user.rdo';

export function adaptRdoUser(user: User) {
  switch (user.role) {
    case UserRole.Сoach:
      return fillObject(UserCoachRdo, user);
    case UserRole.User:
      return fillObject(UserUserRdo, user);
    }
}
