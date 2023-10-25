import { UserGender } from "../user/user-gender.enum";
import { UserLevel } from "../user/user-level.enum";
import { UserTime } from "../user/user-time.enum";
import { WorkoutType } from "./workout-type.enum";

export interface Workout {
  id?: string;
  name: string;
  background: string;
  level: UserLevel;
  type: WorkoutType;
  timeOfTrain: UserTime;
  price: number;
  caloriesToSpend: number;
  description: string;
  gender: UserGender;
  video: string;
  rating: number;
  coach: string;
  special: boolean;
}