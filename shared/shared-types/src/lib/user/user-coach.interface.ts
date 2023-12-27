import { UserAbstract } from "./user-abstract.interface.js";

export interface UserCoach extends UserAbstract {
  certificates: string[];
  merit: string;
  followers: string[];
}