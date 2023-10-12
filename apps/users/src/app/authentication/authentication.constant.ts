export const  API_TAG_NAME ='authentication'

export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  PasswordWrong : 'Password is wrong',
  PasswordSimilar : 'Current and new password are similar',
  InvalidData: 'Data is invalid'
} as const;

export const AuthMessages = {
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "User data found",
  PasswordChanged: "Password successfully changed",
  Refresh: 'Get a new access/refresh tokens',
  AvatarAdded: "Avatar added successfully"
} as const;

export const DEFAULT_AMOUNT = 0;

export const AuthPath = {
  Main:'auth',
  Register:'register',
  Login:'login',
  Id:':id',
  Refresh:'refresh',
  Check:'check',
  ChangePassword:'change-password',
  UpdateAvatar: 'upload-avatar',
}as const;
