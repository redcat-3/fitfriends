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
    Friends: 'User friends list found'
  } as const;

  export const UserPath = {
    Main:'user',
    Id:'list/friends/:id',
    Update:'update',
    List:'list',
    Friends:'list/friends',
  }as const;
  