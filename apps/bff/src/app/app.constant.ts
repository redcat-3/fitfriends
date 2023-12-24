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
  AuthMain:'auth',
  Register:'register',
  Login:'login',
  Refresh:'refresh',
  Check:'check',
  ChangePassword:'change-password',
  UpdateAvatar: 'upload-avatar',
  UserMain:'users',
  UserId:'list/friends/:id',
  UserUpdate:'update',
  UserList:'list',
  UserListCount:'list/count',
  Friends:'list/friends',
  Follow: 'list/friends/follow/:id',
  Unfollow: 'list/friends/unfollow/:id',
  AddFriend:'friends/add/:id',
  RemoveFriend:'friends/remove/:id',
  WorkoutMain: 'workouts',
  WorkoutAdd: 'add',
  WorkoutList: 'list',
  WorkoutListCount: 'list/count',
  WorkoutCoachList: 'list/coach',
  WorkoutCoachListWithFilters: 'list/coach/:price/:calories/:rating/:duration',
  WorkoutId: 'list/coach/:id',
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
  WorkoutUpdate : "Workout is updated",
  WorkoutRemove: "Workout is removed",
  Register : "User is registered successfully",
  Login: "Login is successfull",
  UserFound: "User data is found",
  UserUpdated: 'User data is updated',
  PasswordChanged: "Password successfully changed",
  Refresh: 'Get a new access/refresh tokens',
  AvatarAdded: "Avatar added successfully",
  UserList: 'User list is found',
  Friends: 'User friends list is found',
  Follow: 'You have successfully signed up for the coach',
  Unfollow: 'You have successfully unsubscribed from the coach updates',
  AddFriend: 'You have successfully add friend',
  RemoveFriend: 'You have successfully remove friend',
} as const;

export const BffError = {
  WorkoutNotFound : 'Workout is not found',
  WorkoutDelete : 'Workout is not deleted',
  WorkoutWrongType : 'Wrong Workout type',
  WorkoutEmptyList: 'There are no workouts that can be loaded',
  NotUserAuthor:'User is not an author of this Workout',
  UserNotFound : 'User is not found',
  WrongRole : 'User role is wrong',
  UserExists: 'User with this email already exists',
  PasswordWrong : 'Password is wrong',
  PasswordSimilar : 'Current and new password are similar',
  InvalidData: 'Data is invalid',
  InvalidRole: 'Запросить список пользователей могут только авторизованные пользователи с ролью «Пользователь» ',
  NotFollow : 'User is not follow of this coach',
  Follow : 'User is follow of this coach',
  NotFriend : 'User is not in list of friends',
  Friend : 'User is in list of friends',
} as const;