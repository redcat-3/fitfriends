export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/user',
  Auth = 'http://localhost:3001/api/auth',
  Workouts = 'http://localhost:3002/api/workout',
  Orders = 'http://localhost:3002/api/order',
  Feedbacks = 'http://localhost:3002/api/feedback',
  Notifications = 'http://localhost:3005/api/notification',
  Requests = 'http://localhost:3004/api/request',
  Balances = 'http://localhost:3006/api/balance',
}

export enum HttpClientParam {
  MaxRedirect = 5,
  Timeout = 5000
}

export const BffPath = {
  WorkoutMain: 'workouts',
  WorkoutAdd: 'add',
  WorkoutList: 'list',
  WorkoutListCount: 'list/count',
  WorkoutCoachList: 'list/coach',
  WorkoutCoachListWithFilters: 'list/coach/:price/:calories/:rating/:duration',
  WorkoutId: 'list/coach/:id'
}as const;

export const DEFAULT_ERROR_MESSAGE_BFF =  'Environments validation failed. Please check .env file. Error message: '

export const ConfigNameBFF = {
  App : 'application'
} as const;

export const ENV_BFF_FILE_PATH = '.bff.env';

export const ApiTagNameBFF = {
  Workouts : 'workouts',
} as const;

export const BffMessages = {
  WorkoutAdd : "Workout added successfully",
  WorkoutShow : "Workout is showing",
  WorkoutIndex : "Workouts are showing",
  WorkoutIndexCount : "Count of workouts are showing",
  WorkoutUpdate : "Workout updated",
  WorkoutRemove: "Workout removed"
} as const;

export const BffError = {
  WorkoutNotFound : 'Workout is not found',
  WorkoutDelete : 'Workout is not deleted',
  WorkoutWrongType : 'Wrong Workout type',
  NotUserAuthor:'User is not an author of this Workout',
  UserNotFound : 'User is not found',
  WrongRole : 'User role is wrong',
} as const;