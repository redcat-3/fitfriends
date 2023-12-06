export const DECIMAL = 10;

export const UserError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  InvalidData: 'Data is invalid',
  InvalidRole: 'Запросить список пользователей могут только авторизованные пользователи с ролью «Пользователь» ',
  NotFollow : 'User is not follow of this coach',
  Follow : 'User is follow of this coach',
  NotFriend : 'User is not in list of friends',
  Friend : 'User is in list of friends',
} as const;

  export const UserMessages = {
  UserFound: 'User found',
  AvatarAdded: 'Avatar added successfully',
  List: 'User list found',
  Friends: 'User friends list found',
  Follow: 'You have successfully signed up for the coach',
  Unfollow: 'You have successfully unsubscribed from the coach updates',
  AddFriend: 'You have successfully add friend',
  RemoveFriend: 'You have successfully remove friend',
} as const;

export const UserPath = {
  Main:'user',
  Id:'list/friends/:id',
  Update:'update',
  List:'list',
  Friends:'list/friends',
  Follow: 'list/friends/follow/:id',
  Unfollow: 'list/friends/unfollow/:id',
  AddFriend:'friends/add/:id',
  RemoveFriend:'friends/remove/:id',
} as const;
  