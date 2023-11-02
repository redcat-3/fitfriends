export const FeedbacksError = {
  UserNotFound : "User  is not found",
  WrongRole : "User role is wrong",
  WorkoutNotFound : "Workout  is not found",
  FeedbackNotFound: "Feedback is not existing",
  FeedbackExists: "Feedback already added"
} as const;

export const FeedbacksMessages = {
  Add : "Feedback added successfully",
  Show: "Feedback showing",
  Index: "Feedbacks are showing"
} as const;

export const FeedbacksPath = {
  Main:"feedback",
  Add:"add",
  Id:":feedbackId",
  Index:"list/:workoutId",
}as const;

export const  API_TAG_NAME ="Feedbacks"
