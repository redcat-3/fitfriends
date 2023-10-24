import { UpdateUserUserDto } from './update-user-user.dto';
import { UpdateUserCoachDto } from './update-user-coach.dto';

export type UpdateUserDto = UpdateUserUserDto | UpdateUserCoachDto;
