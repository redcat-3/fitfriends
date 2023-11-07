import { UserGender } from "./user-gender.enum";
import { UserLevel } from "./user-level.enum";
import { UserLocation } from "./user-location.enum";
import { UserRole } from "./user-role.enum";
import { UserTime } from "./user-time.enum";

export interface User {
  _id?: string;
  email: string;
  name: string;
  avatar?: string;
  passwordHash: string;
  gender: UserGender;
  dateBirth?: Date;
  role: UserRole;
  description?: string;
  location: UserLocation;
  createdAt?: Date;
  image?: string;
  level: UserLevel;
  typeOfTrain?: string[];
  timeOfTraining?: UserTime;
  caloriesToReset: number;
  caloriesToSpend: number;
  trainingReady: boolean;
  certificate: string;
  merit: string;
  personalTraining: boolean;
  followers: string[];
  followCoaches: string[];
  friends?: string[];
}