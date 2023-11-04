export const  DEFAULT_OPTION_SPACE ='application.db'

export const  DEFAULT_OPTION_RABBIT_SPACE ='application.rabbit'

export const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

export const EmailError = {
  InvalidEmail: 'User with this email already exists',
  EmptyName : 'Name is empty',
  NotFoundSubscriber: 'Subscriber not found'
} as const;

export const SubscriberMessages = {
  InvalidEmail: 'The email is not valid',
  EmptyName : 'The name is empty',
} as const;
