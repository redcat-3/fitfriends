import { UserTime } from "./user-time.enum.js";
import { UserAbstract } from "./user-abstract.interface.js";

export interface UserUser extends UserAbstract {
  timeOfTrain?: UserTime;
  caloriesToReset: number;
  caloriesToSpend: number;
  followCoaches?: string[];
}