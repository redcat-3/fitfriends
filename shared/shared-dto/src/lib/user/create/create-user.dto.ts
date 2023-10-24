import { UserUserDto } from './user-user.dto';
import { UserCoachDto } from './user-coach.dto';

export type CreateUserDto = UserUserDto | UserCoachDto;
