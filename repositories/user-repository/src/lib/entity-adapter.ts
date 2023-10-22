import { UserCoachEntity } from "./entity/user-coach.entity";
import { UserUserEntity } from "./entity/user-user.entity";

export const TypeEntityAdapter = {
  'user': UserUserEntity,
  'coach': UserCoachEntity
}