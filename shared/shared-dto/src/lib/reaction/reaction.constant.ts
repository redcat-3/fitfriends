export const Rating = {
  Min: 1,
  Max: 5,
};

export const OrderCount = {
  Min: 1,
  Max: 50,
};

export const RequestTextLength = {
  Min: 10,
  Max: 1024,
};

export const FeedbackTextLength = {
  Min: 100,
  Max: 1024,
};

export const NotificatioTextLength = {
  Min: 10,
  Max: 1024,
};

export const SubscriberMessages = {
  InvalidEmail: 'The email is not valid',
  EmptyName : 'The name is empty',
  InvalidCoachId: 'Coach ID must be mongo ID'
} as const;

export const RequestMessages = {
  AddFriends: 'Вас добавили в друзья',
  EmptyName : 'The name is empty',
  InvalidUserId: 'User ID must be mongo ID'
} as const;

export const MailMessages = {
  InvalidEmail: 'User with this email already exists'
} as const;