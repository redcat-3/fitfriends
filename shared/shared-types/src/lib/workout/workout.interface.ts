import { WorkoutType, UserLevel, UserGender } from "@prisma/client";

export interface IWorkout {
  workoutId?: number;
  coachId: string;
  name: string;
  background: string;
  level: UserLevel;
  type: WorkoutType;
  timeOfTraining: string;
  price: number;
  caloriesToSpend: number;
  description: string;
  gender: UserGender;
  video: string;
  rating: number;
  special: boolean;
  createdDate: string;
}