import { IWorkout } from "../workout/workout.interface";

export interface OrderToCoach {
  workout: IWorkout;
  orderPrice: number;
  countWorkout: number;
}