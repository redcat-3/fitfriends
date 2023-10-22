import { UserCoachEntity } from "./user-coach.entity";
import { UserUserEntity } from "./user-user.entity";

export type UserEntity = UserCoachEntity | UserUserEntity;
