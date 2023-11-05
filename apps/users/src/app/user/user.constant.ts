export const DECIMAL = 10;

export const UserError = {
    UserExists: 'User with this email already exists',
    NotFound : 'User is not found',
    InvalidData: 'Data is invalid',
    InvalidRole: 'Запросить список пользователей могут только авторизованные пользователи с ролью «Пользователь» '
  } as const;

  export const UserMessages = {
    UserFound: 'User found',
    AvatarAdded: 'Avatar added successfully',
    List: 'User list found',
    Friends: 'User friends list found',
    Follow: 'You have successfully signed up for the coach',
    Unfollow: 'You have successfully unsubscribed from the coach updates',
  } as const;

  export const UserPath = {
    Main:'user',
    Id:'list/friends/:id',
    Update:'update',
    List:'list',
    Friends:'list/friends',
    Follow: 'list/friends/follow/:id',
    Unfollow: 'list/friends/unfollow/:id',
  }as const;
  