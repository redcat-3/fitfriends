export const OrdersError = {
  UserNotFound : "User  is not found",
  WrongRole : "User role is wrong",
  WorkoutNotFound : "Workout  is not found",
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
}as const;

export const  API_TAG_NAME ="Orders"
