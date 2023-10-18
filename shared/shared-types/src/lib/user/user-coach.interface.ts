import { UserAbstract } from "./user-abstract.interface.js";

export interface UserCoach extends UserAbstract {
  certificate: string;
  merit: string;
  personalTraining: boolean;
}