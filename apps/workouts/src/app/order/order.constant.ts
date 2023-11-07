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
  IndexCoach:"coach/list/:coachId",
}as const;

export const  API_TAG_NAME ="Orders"
