import { IWorkout, UserGender, UserLevel, WorkoutType } from "@project/shared/shared-types";

export const OrdersError = {
  UserNotFound: "User  is not found",
  WrongRole: "User role is wrong",
  AuthWorkoutError: "User is not creator of this workout",
  AuthError: "User is not creator of this workout, and is not recipient of this order",
  WorkoutNotFound: "Workout  is not found",
  OrderNotFound: "Order is not existing",
  OrderExists: "Order already added"
} as const;

export const OrdersMessages = {
  Add : "Order added successfully",
  Show: "Order showing",
  Index: "Orders are showing"
} as const;

export const OrdersPath = {
  Main:"order",
  Add:"add",
  Id:":orderId",
  Index:"list/:workoutId",
  IndexCoach:"coach/list/index",
  IndexUser:"user/list/index",
}as const;

export const  API_TAG_NAME ="Orders"

export const EMPTY_WORKOUT: IWorkout = {
  workoutId: 0,
  coachId: '',
  name: '',
  background: '',
  level: UserLevel.Beginner,
  type: WorkoutType.Aerobics,
  timeOfTraining: '',
  price: 0,
  caloriesToSpend: 0,
  description: '',
  gender: UserGender.Male,
  video: '',
  rating: 0,
  special: false,
  createdDate: '',
}